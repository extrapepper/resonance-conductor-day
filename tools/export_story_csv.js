const fs = require("fs");
const path = require("path");
const vm = require("vm");

const projectRoot = process.argv[2] || "D:/resonance-conductor-day";
const outputPath =
  process.argv[3] || path.join(projectRoot, "docs", "story-review-export.csv");
const includeAllLocales = process.argv.includes("--all-locales");

function loadContent(root) {
  const context = { window: {} };
  vm.createContext(context);
  const files = includeAllLocales
    ? ["story.zh-CN.js", "story.en-US.js", "story.rewrite.zh-CN.js"]
    : ["story.zh-CN.js", "story.rewrite.zh-CN.js"];
  for (const file of files) {
    const filePath = path.join(root, "data", file);
    if (!fs.existsSync(filePath)) continue;
    const source = fs.readFileSync(filePath, "utf8");
    vm.runInContext(source, context, { filename: file });
  }
  const locales = [["zh-CN", context.window.GAME_CONTENT_ZH]];
  if (includeAllLocales && context.window.GAME_CONTENT_EN) locales.push(["en-US", context.window.GAME_CONTENT_EN]);
  return locales;
}

function csvCell(value) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

function csvLine(row, headers) {
  return headers.map((header) => csvCell(row[header])).join(",");
}

function effects(choice) {
  const parts = [];
  for (const [key, value] of Object.entries(choice?.effects?.stats || {})) {
    parts.push(`stat.${key}${value >= 0 ? "+" : ""}${value}`);
  }
  for (const [key, value] of Object.entries(choice?.effects?.crew || {})) {
    parts.push(`crew.${key}${value >= 0 ? "+" : ""}${value}`);
  }
  return parts.join(" / ");
}

function requirements(choice) {
  const format = (req) => {
    if (req.flag) return `flag:${req.flag}`;
    if (typeof req.gte === "number") return `${req.stat}>=${req.gte}`;
    if (typeof req.lte === "number") return `${req.stat}<=${req.lte}`;
    return req.stat || "";
  };
  const all = (choice?.requires || []).map(format);
  const any = (choice?.requiresAny || []).map(format);
  const parts = [];
  if (all.length) parts.push(`all: ${all.join(" / ")}`);
  if (any.length) parts.push(`any: ${any.join(" / ")}`);
  return parts.join(" ; ");
}

function pushText(rows, base, line, lineIndex) {
  rows.push({
    ...base,
    line_index: lineIndex,
    speaker: line?.speaker || "",
    text: line?.text || "",
  });
}

function buildRowsForLocale(locale, content) {
  const rows = [];

  for (let index = 0; index < (content.prologue || []).length; index += 1) {
    pushText(
      rows,
      {
        locale,
        section: "prologue",
        type: "dialogue",
        source_id: "prologue",
        day: 0,
        day_title: locale === "zh-CN" ? "开场" : "Prologue",
      },
      content.prologue[index],
      index + 1,
    );
  }

  for (let dayIndex = 0; dayIndex < content.timeline.length; dayIndex += 1) {
    const day = content.timeline[dayIndex];
    for (let slotIndex = 0; slotIndex < day.slots.length; slotIndex += 1) {
      const slot = day.slots[slotIndex];
      const slotBase = {
        locale,
        section: "main",
        day: day.day,
        day_title: day.title,
        slot_index: slotIndex + 1,
        phase: slot.phase,
        scene: slot.scene,
        location: slot.location,
        time: slot.time,
        focus: slot.focus || "",
      };

      for (let lineIndex = 0; lineIndex < (slot.lines || []).length; lineIndex += 1) {
        pushText(
          rows,
          {
            ...slotBase,
            type: "dialogue",
            source_id: `d${day.day}s${slotIndex + 1}.lines`,
          },
          slot.lines[lineIndex],
          lineIndex + 1,
        );
      }

      for (const choice of slot.choices || []) {
        rows.push({
          ...slotBase,
          type: "choice",
          source_id: choice.id,
          choice_id: choice.id,
          choice_title: choice.title,
          choice_hint: choice.hint,
          effects: effects(choice),
          requirements: requirements(choice),
          ending_id: choice.ending || "",
        });

        for (let lineIndex = 0; lineIndex < (choice.result || []).length; lineIndex += 1) {
          pushText(
            rows,
            {
              ...slotBase,
              type: "choice_result",
              source_id: `${choice.id}.result`,
              choice_id: choice.id,
              choice_title: choice.title,
              effects: effects(choice),
              requirements: requirements(choice),
              ending_id: choice.ending || "",
            },
            choice.result[lineIndex],
            lineIndex + 1,
          );
        }
      }
    }
  }

  for (const member of content.crew || []) {
    rows.push({
      locale,
      section: "crew",
      type: "crew_profile",
      source_id: member.id,
      character_id: member.id,
      speaker: member.name,
      text: member.role,
    });

    for (const tier of ["low", "mid", "high"]) {
      const key = `line${tier[0].toUpperCase()}${tier.slice(1)}`;
      rows.push({
        locale,
        section: "crew",
        type: `crew_status_${tier}`,
        source_id: `${member.id}.${tier}`,
        character_id: member.id,
        speaker: member.name,
        text: member[key] || "",
      });

      const talks = member.talks?.[tier] || [];
      for (let lineIndex = 0; lineIndex < talks.length; lineIndex += 1) {
        pushText(
          rows,
          {
            locale,
            section: "crew",
            type: `crew_talk_${tier}`,
            source_id: `${member.id}.talks.${tier}`,
            character_id: member.id,
          },
          talks[lineIndex],
          lineIndex + 1,
        );
      }

      if (member.epilogues?.[tier]) {
        rows.push({
          locale,
          section: "crew",
          type: `crew_epilogue_${tier}`,
          source_id: `${member.id}.epilogues.${tier}`,
          character_id: member.id,
          speaker: member.name,
          text: member.epilogues[tier],
        });
      }
    }
  }

  for (const [endingId, ending] of Object.entries(content.endings || {})) {
    rows.push({
      locale,
      section: "ending",
      type: "ending_title",
      source_id: endingId,
      ending_id: endingId,
      text: ending.title,
    });

    for (let lineIndex = 0; lineIndex < (ending.body || []).length; lineIndex += 1) {
      rows.push({
        locale,
        section: "ending",
        type: "ending_body",
        source_id: endingId,
        ending_id: endingId,
        line_index: lineIndex + 1,
        text: ending.body[lineIndex],
      });
    }
  }

  return rows;
}

const headers = [
  "locale",
  "section",
  "type",
  "source_id",
  "day",
  "day_title",
  "slot_index",
  "phase",
  "scene",
  "location",
  "time",
  "focus",
  "character_id",
  "choice_id",
  "choice_title",
  "choice_hint",
  "effects",
  "requirements",
  "ending_id",
  "line_index",
  "speaker",
  "text",
];

const rows = loadContent(projectRoot).flatMap(([locale, content]) =>
  buildRowsForLocale(locale, content),
);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(
  outputPath,
  `\uFEFF${headers.join(",")}\r\n${rows.map((row) => csvLine(row, headers)).join("\r\n")}\r\n`,
  "utf8",
);
console.log(`Exported ${rows.length} rows to ${outputPath}`);

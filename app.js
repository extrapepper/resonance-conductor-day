const content = window.GAME_CONTENT;

const els = {
  stage: document.querySelector("#game-stage"),
  day: document.querySelector("#day-label"),
  phase: document.querySelector("#phase-label"),
  logCount: document.querySelector("#log-count"),
  moraleValue: document.querySelector("#morale-value"),
  conditionValue: document.querySelector("#condition-value"),
  fatigueValue: document.querySelector("#fatigue-value"),
  moraleBar: document.querySelector("#morale-bar"),
  conditionBar: document.querySelector("#condition-bar"),
  fatigueBar: document.querySelector("#fatigue-bar"),
  resourceList: document.querySelector("#resource-list"),
  crewList: document.querySelector("#crew-list"),
  characterLayer: document.querySelector("#character-layer"),
  sceneLocation: document.querySelector("#scene-location"),
  sceneTime: document.querySelector("#scene-time"),
  storyText: document.querySelector("#story-text"),
  choices: document.querySelector("#choices"),
  restart: document.querySelector("#restart-button"),
  endingDialog: document.querySelector("#ending-dialog"),
  endingTitle: document.querySelector("#ending-title"),
  endingBody: document.querySelector("#ending-body"),
  endingRestart: document.querySelector("#ending-restart"),
  phaseSteps: document.querySelectorAll("[data-phase-step]"),
};

let state;

function clampStat(key, value) {
  const config = content.stats[key];
  if (!config) return value;
  return Math.max(config.min, Math.min(config.max, value));
}

function newState() {
  return {
    dayIndex: 0,
    slotIndex: 0,
    stats: { ...content.initialStats },
    crew: Object.fromEntries(content.crew.map((member) => [member.stat, member.initialValue])),
    flags: new Set(),
    log: [],
    awaitingNext: false,
    ended: false,
    scene: "freeport",
    focus: "livia",
    lastEffects: null,
  };
}

function currentDay() {
  return content.timeline[state.dayIndex];
}

function currentSlot() {
  return currentDay().slots[state.slotIndex];
}

function phaseIndex() {
  return state.slotIndex % content.phases.length;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render() {
  const day = currentDay();
  const slot = currentSlot();
  const phase = content.phases[phaseIndex()];

  els.day.textContent = `第 ${day.day} 天`;
  els.phase.textContent = phase;
  els.logCount.textContent = `${state.log.length} 条记录`;

  els.moraleValue.textContent = state.stats.morale;
  els.conditionValue.textContent = state.stats.condition;
  els.fatigueValue.textContent = state.stats.fatigue;
  els.moraleBar.style.width = `${state.stats.morale}%`;
  els.conditionBar.style.width = `${state.stats.condition}%`;
  els.fatigueBar.style.width = `${state.stats.fatigue}%`;

  els.phaseSteps.forEach((step) => {
    const index = Number(step.dataset.phaseStep);
    step.classList.toggle("is-active", index === phaseIndex());
    step.classList.toggle("is-complete", index < phaseIndex());
  });

  els.stage.className = `game-stage scene-${state.scene || slot.scene}`;
  els.sceneLocation.textContent = slot.location;
  els.sceneTime.textContent = `第 ${day.day} 天 / ${slot.time}`;

  renderResourceHud();
  renderCrewHud();
  renderCharacters();
}

function renderResourceHud() {
  const keys = ["fuel", "supplies", "onTime", "clues", "risk", "credit", "shizuru"];
  els.resourceList.innerHTML = keys
    .map((key) => {
      const config = content.stats[key];
      const value = state.stats[key];
      const danger = config.dangerHigh ? value >= 70 : value <= 15;
      return `
        <div class="resource-pill ${danger ? "is-danger" : ""}">
          <span>${escapeHtml(config.label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `;
    })
    .join("");
}

function renderCrewHud() {
  els.crewList.innerHTML = content.crew
    .map((member) => {
      const value = state.crew[member.stat];
      return `
        <article class="crew-card">
          <div class="portrait">${escapeHtml(member.initial)}</div>
          <div>
            <div class="crew-name">
              <span>${escapeHtml(member.name)}</span>
              <span>${escapeHtml(member.valueLabel)} ${escapeHtml(value)}</span>
            </div>
            <div class="crew-role">${escapeHtml(member.role)}</div>
          </div>
          <div class="trust-track" aria-label="${escapeHtml(member.name)} ${escapeHtml(member.valueLabel)} ${escapeHtml(value)}">
            <span style="width:${value}%"></span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCharacters() {
  els.characterLayer.innerHTML = content.crew
    .map((member, index) => {
      const muted = state.focus !== "all" && state.focus !== member.id ? "is-muted" : "";
      const focus = state.focus === member.id ? "is-focus" : "";
      return `
        <button class="character ${muted} ${focus}" type="button" data-character="${member.id}" style="--char-index:${index}" aria-label="查看${escapeHtml(member.name)}">
          <span class="sprite-art"></span>
          <span class="name-tag">${escapeHtml(member.name)}</span>
        </button>
      `;
    })
    .join("");
}

function renderSlot() {
  const slot = currentSlot();
  state.awaitingNext = false;
  state.scene = slot.scene;
  state.focus = slot.focus || "all";
  els.storyText.innerHTML = formatLines(slot.lines);
  renderChoices(slot.choices);
  render();
}

function formatLines(lines) {
  return lines
    .map((line) => {
      const speaker = line.speaker && line.speaker !== "旁白" ? `<b>${escapeHtml(line.speaker)}</b>` : "";
      return `<p>${speaker}${escapeHtml(line.text)}</p>`;
    })
    .join("");
}

function renderChoices(choices) {
  els.choices.innerHTML = choices
    .map((choice) => {
      const available = isChoiceAvailable(choice);
      const reason = available ? "" : `<em>${escapeHtml(requirementText(choice))}</em>`;
      return `
        <button class="location-button ${available ? "" : "is-disabled"}" type="button" data-action="${escapeHtml(choice.id)}" ${available ? "" : "disabled"}>
          <strong>${escapeHtml(choice.title)}</strong>
          <small>${escapeHtml(choice.hint || "")}</small>
          ${reason}
        </button>
      `;
    })
    .join("");
}

function renderContinue() {
  els.choices.innerHTML = `
    <button class="location-button continue-button" type="button" data-continue="true">
      <strong>继续</strong>
      <small>进入下一段值乘</small>
    </button>
  `;
}

function isChoiceAvailable(choice) {
  const allRequirements = choice.requires || [];
  const anyRequirements = choice.requiresAny || [];
  const allPass = allRequirements.every(requirementPasses);
  const anyPass = anyRequirements.length === 0 || anyRequirements.some(requirementPasses);
  return allPass && anyPass;
}

function requirementPasses(requirement) {
  const value = getValue(requirement.stat);
  if (typeof requirement.gte === "number" && value < requirement.gte) return false;
  if (typeof requirement.lte === "number" && value > requirement.lte) return false;
  if (requirement.flag && !state.flags.has(requirement.flag)) return false;
  return true;
}

function getValue(key) {
  if (key in state.stats) return state.stats[key];
  if (key in state.crew) return state.crew[key];
  return 0;
}

function requirementText(choice) {
  const all = choice.requires || [];
  const any = choice.requiresAny || [];
  const parts = [];
  if (all.length) parts.push(all.map(formatRequirement).join(" / "));
  if (any.length) parts.push(`满足其一：${any.map(formatRequirement).join(" 或 ")}`);
  return parts.length ? `需要：${parts.join(" / ")}` : "条件不足";
}

function formatRequirement(requirement) {
  if (requirement.flag) return requirement.flag;
  const label = content.stats[requirement.stat]?.label || crewNameByStat(requirement.stat) || requirement.stat;
  if (typeof requirement.gte === "number") return `${label} >= ${requirement.gte}`;
  if (typeof requirement.lte === "number") return `${label} <= ${requirement.lte}`;
  return label;
}

function crewNameByStat(stat) {
  const member = content.crew.find((item) => item.stat === stat);
  if (!member) return "";
  return `${member.name}${member.valueLabel}`;
}

function chooseAction(actionId) {
  if (state.ended || state.awaitingNext) return;

  const slot = currentSlot();
  const choice = slot.choices.find((item) => item.id === actionId);
  if (!choice || !isChoiceAvailable(choice)) return;

  applyChoice(choice);

  const resultLines = choice.result || [];
  const effectLine = describeEffects(choice.effects);
  els.storyText.innerHTML = [
    ...resultLines.map((line) => {
      const speaker = line.speaker && line.speaker !== "旁白" ? `<b>${escapeHtml(line.speaker)}</b>` : "";
      return `<p>${speaker}${escapeHtml(line.text)}</p>`;
    }),
    effectLine ? `<p class="effect-line">${escapeHtml(effectLine)}</p>` : "",
  ].join("");

  state.log.push(`第 ${currentDay().day} 天 ${currentSlot().phase}：${choice.title}`);
  render();

  if (choice.ending) {
    showEnding(choice.ending);
    return;
  }

  state.awaitingNext = true;
  renderContinue();
}

function applyChoice(choice) {
  const effects = choice.effects || {};
  const statEffects = effects.stats || {};
  const crewEffects = effects.crew || {};

  for (const [key, value] of Object.entries(statEffects)) {
    if (key in state.stats) {
      state.stats[key] = clampStat(key, state.stats[key] + value);
    }
  }

  for (const [key, value] of Object.entries(crewEffects)) {
    if (key in state.crew) {
      state.crew[key] = Math.max(0, Math.min(100, state.crew[key] + value));
    }
  }

  (choice.flags || []).forEach((flag) => state.flags.add(flag));
}

function describeEffects(effects = {}) {
  const parts = [];
  for (const [key, value] of Object.entries(effects.stats || {})) {
    parts.push(`${content.stats[key]?.label || key} ${value > 0 ? "+" : ""}${value}`);
  }
  for (const [key, value] of Object.entries(effects.crew || {})) {
    parts.push(`${crewNameByStat(key)} ${value > 0 ? "+" : ""}${value}`);
  }
  return parts.join(" / ");
}

function advance() {
  if (!state.awaitingNext) return;
  if (state.slotIndex < currentDay().slots.length - 1) {
    state.slotIndex += 1;
  } else if (state.dayIndex < content.timeline.length - 1) {
    state.dayIndex += 1;
    state.slotIndex = 0;
    state.stats.fatigue = clampStat("fatigue", state.stats.fatigue - 6);
    state.stats.morale = clampStat("morale", state.stats.morale + 1);
  }
  renderSlot();
}

function showCharacterLine(characterId) {
  const member = content.crew.find((item) => item.id === characterId);
  if (!member || state.awaitingNext) return;

  state.focus = characterId;
  const value = state.crew[member.stat];
  const line = value >= 55 ? member.lineHigh : value >= 35 ? member.lineMid : member.lineLow;

  els.sceneLocation.textContent = member.name;
  els.sceneTime.textContent = `${member.valueLabel} ${value}`;
  els.storyText.innerHTML = `<p><b>${escapeHtml(member.name)}</b>${escapeHtml(line)}</p>`;
  render();
}

function showEnding(endingId) {
  const ending = content.endings[endingId] || content.endings.storm;
  state.ended = true;
  els.endingTitle.textContent = ending.title;
  els.endingBody.innerHTML = `
    ${ending.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    <p>最终状态：士气 ${state.stats.morale} / 车况 ${state.stats.condition} / 疲劳 ${state.stats.fatigue} / 线索 ${state.stats.clues} / 商会信用 ${state.stats.credit}</p>
    <ul>
      ${content.crew.map((member) => `<li>${escapeHtml(epilogueFor(member))}</li>`).join("")}
    </ul>
  `;
  els.endingDialog.showModal();
}

function epilogueFor(member) {
  const value = state.crew[member.stat];
  if (member.id === "box" && value < 45) return "波克士进入检修模式，仍坚持把本次功劳记在自己名下。";
  if (value >= 55) return `${member.name}在结算后主动留下，参与下一班车的准备。`;
  if (value >= 35) return `${member.name}完成了自己的记录，临走前和你交换了一个短短的点头。`;
  return `${member.name}仍保持着一点距离，但把今日报告放到了你的桌面正中。`;
}

function restart() {
  state = newState();
  if (els.endingDialog.open) els.endingDialog.close();
  renderSlot();
}

els.choices.addEventListener("click", (event) => {
  const continueButton = event.target.closest("[data-continue]");
  if (continueButton) {
    advance();
    return;
  }

  const button = event.target.closest("[data-action]");
  if (!button) return;
  chooseAction(button.dataset.action);
});

els.characterLayer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-character]");
  if (!button) return;
  showCharacterLine(button.dataset.character);
});

els.restart.addEventListener("click", restart);
els.endingRestart.addEventListener("click", restart);

restart();

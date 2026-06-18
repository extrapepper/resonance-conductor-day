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
  dialogueBox: document.querySelector(".dialogue-box"),
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
    ended: false,
    mode: "prologue",
    scene: "freeport",
    focus: "livia",
    script: [],
    lineIndex: 0,
    afterScript: null,
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

function currentLine() {
  return state.script[state.lineIndex] || null;
}

function startScript(lines, options = {}) {
  state.mode = options.mode || "script";
  state.script = [...(lines || [])];
  state.lineIndex = 0;
  state.afterScript = options.after || null;
  state.scene = options.scene || state.scene;
  state.focus = options.focus || state.focus;
  state.displayLocation = options.location || null;
  state.displayTime = options.time || null;
  els.choices.innerHTML = "";

  if (!state.script.length) {
    finishScript();
    return;
  }

  render();
}

function advanceScript() {
  if (state.ended || state.mode === "choice") return;
  if (state.lineIndex < state.script.length - 1) {
    state.lineIndex += 1;
    render();
    return;
  }
  finishScript();
}

function finishScript() {
  const after = state.afterScript;
  state.afterScript = null;

  if (!after) {
    state.mode = "choice";
    renderChoices(currentSlot().choices);
    render();
    return;
  }

  if (after.type === "slot") {
    startSlot();
    return;
  }

  if (after.type === "choices") {
    state.mode = "choice";
    renderChoices(currentSlot().choices);
    render();
    return;
  }

  if (after.type === "continue") {
    state.mode = "continue";
    renderContinue();
    render();
    return;
  }

  if (after.type === "ending") {
    showEnding(after.endingId);
    return;
  }
}

function startPrologue() {
  const firstSlot = currentSlot();
  startScript(content.prologue || firstSlot.lines, {
    mode: "prologue",
    scene: "freeport",
    focus: "livia",
    location: "7号自由港站台",
    time: "委托开始前",
    after: { type: "slot" },
  });
}

function startSlot() {
  const slot = currentSlot();
  startScript(slot.lines, {
    mode: "slot",
    scene: slot.scene,
    focus: slot.focus || "livia",
    location: slot.location,
    time: `第 ${currentDay().day} 天 / ${slot.time}`,
    after: { type: "choices" },
  });
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
  els.stage.dataset.mode = state.mode;

  renderStory();
  renderResourceHud();
  renderCrewHud();
  renderCharacters();
}

function renderStory() {
  const line = currentLine();
  const slot = currentSlot();
  const speaker = line?.speaker || (state.mode === "choice" ? "行动选择" : "旁白");
  const isNarration = speaker === "旁白";
  const location = state.displayLocation || slot.location;
  const time = state.displayTime || `第 ${currentDay().day} 天 / ${slot.time}`;

  els.sceneLocation.textContent = isNarration ? location : speaker;
  els.sceneTime.textContent = isNarration ? time : `${location} · ${time}`;

  if (line) {
    const text = escapeHtml(line.text);
    const prompt = state.mode === "choice" ? "" : `<span class="next-cue">点击继续</span>`;
    els.storyText.innerHTML = `<p class="${isNarration ? "is-narration" : ""}">${text}</p>${prompt}`;
    return;
  }

  if (state.mode === "choice") {
    els.storyText.innerHTML = `<p class="is-narration">请选择这一时段的行动，也可以先点选左侧乘员确认他们的状态。</p>`;
    return;
  }

  if (state.mode === "continue") {
    els.storyText.innerHTML = `<p class="is-narration">本段值乘记录已写入行车日志。</p>`;
  }
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
      const avatar = member.sprite
        ? `<img src="${escapeHtml(member.sprite)}" alt="" draggable="false" />`
        : escapeHtml(member.initial);
      return `
        <button class="crew-card" type="button" data-character="${escapeHtml(member.id)}" ${state.mode === "choice" ? "" : "disabled"}>
          <div class="portrait">${avatar}</div>
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
        </button>
      `;
    })
    .join("");
}

function renderCharacters() {
  const member = activeMember();
  if (!member) {
    els.characterLayer.innerHTML = "";
    return;
  }

  const sprite = member.sprite
    ? `<img class="sprite-art" src="${escapeHtml(member.sprite)}" alt="${escapeHtml(member.name)}立绘" draggable="false" />`
    : `<span class="sprite-art sprite-fallback">${escapeHtml(member.initial)}</span>`;

  els.characterLayer.innerHTML = `
    <button class="character is-focus" type="button" data-character="${escapeHtml(member.id)}" ${state.mode === "choice" ? "" : "disabled"} aria-label="与${escapeHtml(member.name)}对话">
      ${sprite}
      <span class="name-tag">${escapeHtml(member.name)}</span>
    </button>
  `;
}

function activeMember() {
  const line = currentLine();
  const explicitFocus = line?.focus || line?.character;
  if (explicitFocus) return content.crew.find((member) => member.id === explicitFocus);

  const bySpeaker = content.crew.find((member) => member.name === line?.speaker || member.id === line?.speaker);
  if (bySpeaker) return bySpeaker;

  if (state.mode === "choice" || state.mode === "continue" || state.mode === "talk") {
    return content.crew.find((member) => member.id === state.focus);
  }

  return null;
}

function renderChoices(choices = []) {
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
      <strong>继续值乘</strong>
      <small>进入下一段剧情</small>
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
  if (state.ended || state.mode !== "choice") return;

  const slot = currentSlot();
  const choice = slot.choices.find((item) => item.id === actionId);
  if (!choice || !isChoiceAvailable(choice)) return;

  applyChoice(choice);
  state.log.push(`第 ${currentDay().day} 天 ${slot.phase}：${choice.title}`);

  const resultLines = [...(choice.result || [])];
  const effectLine = describeEffects(choice.effects);
  if (effectLine) {
    resultLines.push({ speaker: "行车日志", text: `状态变化：${effectLine}` });
  }

  startScript(resultLines, {
    mode: "result",
    scene: choice.scene || slot.scene,
    focus: choice.focus || slot.focus || state.focus,
    location: slot.location,
    time: `第 ${currentDay().day} 天 / ${slot.time}`,
    after: choice.ending ? { type: "ending", endingId: choice.ending } : { type: "continue" },
  });
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

function advanceTime() {
  if (state.mode !== "continue") return;
  if (state.slotIndex < currentDay().slots.length - 1) {
    state.slotIndex += 1;
  } else if (state.dayIndex < content.timeline.length - 1) {
    state.dayIndex += 1;
    state.slotIndex = 0;
    state.stats.fatigue = clampStat("fatigue", state.stats.fatigue - 6);
    state.stats.morale = clampStat("morale", state.stats.morale + 1);
  }
  startSlot();
}

function talkToCharacter(characterId) {
  if (state.ended || state.mode !== "choice") return;

  const member = content.crew.find((item) => item.id === characterId);
  if (!member) return;

  const value = state.crew[member.stat];
  const tier = value >= 55 ? "high" : value >= 35 ? "mid" : "low";
  const talks = member.talks || {};
  const fallback = value >= 55 ? member.lineHigh : value >= 35 ? member.lineMid : member.lineLow;
  const lines = talks[tier] || [{ speaker: member.name, text: fallback }];

  state.focus = member.id;
  startScript(lines, {
    mode: "talk",
    scene: currentSlot().scene,
    focus: member.id,
    location: member.name,
    time: `${member.valueLabel} ${value}`,
    after: { type: "choices" },
  });
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
  startPrologue();
}

els.choices.addEventListener("click", (event) => {
  const continueButton = event.target.closest("[data-continue]");
  if (continueButton) {
    advanceTime();
    return;
  }

  const button = event.target.closest("[data-action]");
  if (!button) return;
  chooseAction(button.dataset.action);
});

els.characterLayer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-character]");
  if (!button) return;
  talkToCharacter(button.dataset.character);
});

els.crewList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-character]");
  if (!button) return;
  talkToCharacter(button.dataset.character);
});

els.dialogueBox.addEventListener("click", (event) => {
  if (event.target.closest("button")) return;
  advanceScript();
});

window.addEventListener("keydown", (event) => {
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    advanceScript();
  }
});

els.restart.addEventListener("click", restart);
els.endingRestart.addEventListener("click", restart);

restart();

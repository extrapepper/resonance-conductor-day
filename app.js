const LOCALE_KEY = "resonance-conductor-day-locale-v1";
const SAVE_KEY = "resonance-conductor-day-saves-v1";
const SAVE_SLOT_COUNT = 3;
const HISTORY_LIMIT = 500;

const UI_TEXT = {
  "zh-CN": {
    appLabel: "雷索纳斯：列车长的一日",
    dutyStatus: "值乘状态",
    phaseProgress: "时段进度",
    trainStatus: "列车状态",
    interactiveCrew: "可互动乘员",
    locationActions: "地点行动",
    crewTrust: "乘员信任",
    brandKicker: "Resonance Fan Prototype",
    brandTitle: "列车长的一日",
    languageButton: "Switch to English",
    languageLabel: "EN",
    historyButton: "对话回看",
    saveButton: "存档读档",
    restartButton: "重新开始",
    close: "关闭",
    historyKicker: "Dialogue Log",
    historyTitle: "对话回看",
    saveKicker: "Save Data",
    saveTitle: "存档 / 读档",
    endingKicker: "Arrival Report",
    endingFallbackTitle: "旅程结算",
    endingRestart: "再跑一趟",
    prologueTime: "委托开始前",
    dayLabel: (day) => `第 ${day} 天`,
    sceneTime: (day, time) => `第 ${day} 天 / ${time}`,
    logCount: (count) => `${count} 条记录`,
    choiceSpeaker: "行动选择",
    narrationSpeaker: "旁白",
    logSpeaker: "行车日志",
    nextCue: "点击继续",
    choicePrompt: "请选择这一时段的行动，也可以先点选左侧乘员确认他们的状态。",
    continuePrompt: "本段值乘记录已写入行车日志。",
    continueTitle: "继续值乘",
    continueHint: "进入下一段剧情",
    requirementAny: (items) => `满足其一：${items.join(" 或 ")}`,
    requirementPrefix: (items) => `需要：${items.join(" / ")}`,
    requirementMissing: "条件不足",
    effectsAria: "行动影响",
    statusChange: "状态变化",
    actionLog: (day, phase, title) => `第 ${day} 天 ${phase}：${title}`,
    talkAria: (name) => `与${name}对话`,
    avatarAlt: (name) => `${name}头像`,
    spriteAlt: (name) => `${name}立绘`,
    finalStats: (stats, labels) =>
      `最终状态：${labels.morale} ${stats.morale} / ${labels.condition} ${stats.condition} / ${labels.fatigue} ${stats.fatigue} / ${labels.clues} ${stats.clues} / ${labels.credit} ${stats.credit}`,
    epilogue: {
      boxLow: "波克士进入检修模式，仍坚持把本次功劳记在自己名下。",
      high: (name) => `${name}在结算后主动留下，参与下一班车的准备。`,
      mid: (name) => `${name}完成了自己的记录，临走前和你交换了一个短短的点头。`,
      low: (name) => `${name}仍保持着一点距离，但把今日报告放到了你的桌面正中。`,
    },
    emptySave: "空存档",
    unknownTime: "未知时段",
    saveSlot: (index) => `存档 ${index}`,
    save: "保存",
    load: "读取",
    emptyHistory: "还没有可回看的对话。",
  },
  "en-US": {
    appLabel: "Resonance: A Conductor's Day",
    dutyStatus: "Duty Status",
    phaseProgress: "Time Progress",
    trainStatus: "Train Status",
    interactiveCrew: "Interactive Crew",
    locationActions: "Location Actions",
    crewTrust: "Crew Trust",
    brandKicker: "Resonance Fan Prototype",
    brandTitle: "A Conductor's Day",
    languageButton: "切换为中文",
    languageLabel: "中",
    historyButton: "Dialogue Log",
    saveButton: "Save / Load",
    restartButton: "Restart",
    close: "Close",
    historyKicker: "Dialogue Log",
    historyTitle: "Dialogue Log",
    saveKicker: "Save Data",
    saveTitle: "Save / Load",
    endingKicker: "Arrival Report",
    endingFallbackTitle: "Journey Report",
    endingRestart: "Run Again",
    prologueTime: "Before the Commission",
    dayLabel: (day) => `Day ${day}`,
    sceneTime: (day, time) => `Day ${day} / ${time}`,
    logCount: (count) => `${count} log${count === 1 ? "" : "s"}`,
    choiceSpeaker: "Action",
    narrationSpeaker: "Narration",
    logSpeaker: "Driving Log",
    nextCue: "Click to continue",
    choicePrompt: "Choose an action for this time slot. You can also tap a crew member on the left to check in first.",
    continuePrompt: "This duty segment has been written into the driving log.",
    continueTitle: "Continue Duty",
    continueHint: "Proceed to the next scene",
    requirementAny: (items) => `One of: ${items.join(" or ")}`,
    requirementPrefix: (items) => `Requires: ${items.join(" / ")}`,
    requirementMissing: "Requirements not met",
    effectsAria: "Action effects",
    statusChange: "Status change",
    actionLog: (day, phase, title) => `Day ${day} ${phase}: ${title}`,
    talkAria: (name) => `Talk with ${name}`,
    avatarAlt: (name) => `${name} avatar`,
    spriteAlt: (name) => `${name} sprite`,
    finalStats: (stats, labels) =>
      `Final status: ${labels.morale} ${stats.morale} / ${labels.condition} ${stats.condition} / ${labels.fatigue} ${stats.fatigue} / ${labels.clues} ${stats.clues} / ${labels.credit} ${stats.credit}`,
    epilogue: {
      boxLow: "BOX enters maintenance mode while still insisting all credit belongs to itself.",
      high: (name) => `${name} stays behind after the report and helps prepare the next run.`,
      mid: (name) => `${name} finishes their own record and trades a brief nod with you before leaving.`,
      low: (name) => `${name} keeps a little distance, but places today's report squarely at the center of your desk.`,
    },
    emptySave: "Empty Slot",
    unknownTime: "Unknown Time",
    saveSlot: (index) => `Slot ${index}`,
    save: "Save",
    load: "Load",
    emptyHistory: "No dialogue has been logged yet.",
  },
};

const els = {
  root: document.querySelector(".game-root"),
  stage: document.querySelector("#game-stage"),
  brandKicker: document.querySelector("#brand-kicker"),
  brandTitle: document.querySelector("#brand-title"),
  day: document.querySelector("#day-label"),
  phase: document.querySelector("#phase-label"),
  logCount: document.querySelector("#log-count"),
  disclaimer: document.querySelector("#disclaimer-text"),
  moraleLabel: document.querySelector("#morale-label"),
  conditionLabel: document.querySelector("#condition-label"),
  fatigueLabel: document.querySelector("#fatigue-label"),
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
  languageButton: document.querySelector("#language-button"),
  languageLabel: document.querySelector("#language-label"),
  restart: document.querySelector("#restart-button"),
  endingDialog: document.querySelector("#ending-dialog"),
  endingKicker: document.querySelector("#ending-kicker"),
  endingTitle: document.querySelector("#ending-title"),
  endingBody: document.querySelector("#ending-body"),
  endingRestart: document.querySelector("#ending-restart"),
  historyButton: document.querySelector("#history-button"),
  historyDialog: document.querySelector("#history-dialog"),
  historyKicker: document.querySelector("#history-kicker"),
  historyTitle: document.querySelector("#history-title"),
  historyClose: document.querySelector("#history-close"),
  historyList: document.querySelector("#history-list"),
  saveButton: document.querySelector("#save-button"),
  saveDialog: document.querySelector("#save-dialog"),
  saveKicker: document.querySelector("#save-kicker"),
  saveTitle: document.querySelector("#save-title"),
  saveClose: document.querySelector("#save-close"),
  saveSlots: document.querySelector("#save-slots"),
  phaseSteps: document.querySelectorAll("[data-phase-step]"),
  dialogueBox: document.querySelector(".dialogue-box"),
};

const locales = {
  "zh-CN": window.GAME_CONTENT_ZH || window.GAME_CONTENT,
  "en-US": window.GAME_CONTENT_EN,
};

let currentLocale = initialLocale();
let content = locales[currentLocale] || locales["zh-CN"];
let state;

function initialLocale() {
  const saved = localStorage.getItem(LOCALE_KEY);
  if (saved && locales[saved]) return saved;
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language || ""];
  return languages.some((language) => language.toLowerCase().startsWith("zh")) ? "zh-CN" : "en-US";
}

function t() {
  return UI_TEXT[currentLocale] || UI_TEXT["zh-CN"];
}

function setLocale(locale, options = {}) {
  if (!locales[locale]) return;
  currentLocale = locale;
  content = locales[locale];
  localStorage.setItem(LOCALE_KEY, locale);
  updateStaticText();
  if (options.restart) restart();
  else if (state && options.sync !== false) {
    syncStateToLocale();
  } else if (state) {
    render();
  }
}

function toggleLocale() {
  setLocale(currentLocale === "zh-CN" ? "en-US" : "zh-CN");
}

function updateStaticText() {
  const ui = t();
  document.documentElement.lang = currentLocale;
  document.title = content.meta.title;
  els.root?.setAttribute("aria-label", ui.appLabel);
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    if (ui[key]) element.setAttribute("aria-label", ui[key]);
  });
  els.brandKicker.textContent = ui.brandKicker;
  els.brandTitle.textContent = ui.brandTitle;
  els.disclaimer.textContent = content.meta.disclaimer;
  els.moraleLabel.textContent = content.stats.morale.label;
  els.conditionLabel.textContent = content.stats.condition.label;
  els.fatigueLabel.textContent = content.stats.fatigue.label;
  els.phaseSteps.forEach((step) => {
    step.textContent = content.phases[Number(step.dataset.phaseStep)] || "";
  });
  setButtonText(els.languageButton, ui.languageButton);
  els.languageLabel.textContent = ui.languageLabel;
  setButtonText(els.historyButton, ui.historyButton);
  setButtonText(els.saveButton, ui.saveButton);
  setButtonText(els.restart, ui.restartButton);
  setButtonText(els.historyClose, ui.close);
  setButtonText(els.saveClose, ui.close);
  els.historyKicker.textContent = ui.historyKicker;
  els.historyTitle.textContent = ui.historyTitle;
  els.saveKicker.textContent = ui.saveKicker;
  els.saveTitle.textContent = ui.saveTitle;
  els.endingKicker.textContent = ui.endingKicker;
  els.endingRestart.textContent = ui.endingRestart;
  els.endingTitle.textContent = ui.endingFallbackTitle;
}

function setButtonText(button, label) {
  if (!button) return;
  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);
}

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
    scriptRef: null,
    lineIndex: 0,
    afterScript: null,
    history: [],
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

function formatSceneTime(day, time) {
  return t().sceneTime(day, time);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function backgroundFor(sceneKey) {
  const slot = state ? currentSlot() : null;
  const timeKey = slot?.time ? `${sceneKey}:${slot.time}` : "";
  return content.backgrounds?.[timeKey] || content.backgrounds?.[sceneKey] || null;
}

function applySceneBackground(sceneKey) {
  const background = backgroundFor(sceneKey);
  els.stage.className = `game-stage scene-${sceneKey}${background ? " has-bg" : ""}`;
  els.stage.style.setProperty("--scene-bg", background ? `url("${background.src}")` : "none");
  els.stage.style.setProperty("--scene-position", background?.position || "center center");
  els.stage.style.setProperty("--scene-filter", background?.filter || "none");
}

function currentLine() {
  return state.script[state.lineIndex] || null;
}

function pushHistoryLine(line) {
  if (!line?.text) return;
  const slot = currentSlot();
  const entry = {
    speaker: line.speaker || t().narrationSpeaker,
    text: line.text,
    location: state.displayLocation || slot.location,
    time: state.displayTime || formatSceneTime(currentDay().day, slot.time),
  };
  const previous = state.history[state.history.length - 1];
  if (
    previous &&
    previous.speaker === entry.speaker &&
    previous.text === entry.text &&
    previous.location === entry.location &&
    previous.time === entry.time
  ) {
    return;
  }
  state.history.push(entry);
  if (state.history.length > HISTORY_LIMIT) {
    state.history.splice(0, state.history.length - HISTORY_LIMIT);
  }
}

function startScript(lines, options = {}) {
  state.mode = options.mode || "script";
  state.script = [...(lines || [])];
  state.scriptRef = options.scriptRef || null;
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

  pushHistoryLine(currentLine());
  render();
}

function currentSlotForRef(ref) {
  return content.timeline[ref.dayIndex]?.slots?.[ref.slotIndex] || currentSlot();
}

function resultLinesForChoice(choice) {
  const resultLines = [...(choice.result || [])];
  const effectLine = describeEffects(choice.effects);
  if (effectLine) {
    resultLines.push({ speaker: t().logSpeaker, text: `${t().statusChange}: ${effectLine}` });
  }
  return resultLines;
}

function talkTierForValue(value) {
  return value >= 55 ? "high" : value >= 35 ? "mid" : "low";
}

function talkLinesForMember(member, tier, value) {
  const talks = member.talks || {};
  const fallback = value >= 55 ? member.lineHigh : value >= 35 ? member.lineMid : member.lineLow;
  return talks[tier] || [{ speaker: member.name, text: fallback }];
}

function scriptConfigFromRef(ref) {
  if (!ref) return null;

  if (ref.type === "prologue") {
    const firstSlot = content.timeline[0].slots[0];
    return {
      lines: content.prologue || firstSlot.lines,
      mode: "prologue",
      scene: "freeport",
      focus: "livia",
      location: firstSlot.location,
      time: t().prologueTime,
      after: { type: "slot" },
    };
  }

  if (ref.type === "slot") {
    const slot = currentSlotForRef(ref);
    const day = content.timeline[ref.dayIndex] || currentDay();
    return {
      lines: slot.lines,
      mode: "slot",
      scene: slot.scene,
      focus: slot.focus || "livia",
      location: slot.location,
      time: formatSceneTime(day.day, slot.time),
      after: { type: "choices" },
    };
  }

  if (ref.type === "result") {
    const slot = currentSlotForRef(ref);
    const day = content.timeline[ref.dayIndex] || currentDay();
    const choice = slot.choices.find((item) => item.id === ref.choiceId);
    if (!choice) return null;
    return {
      lines: resultLinesForChoice(choice),
      mode: "result",
      scene: choice.scene || slot.scene,
      focus: choice.focus || slot.focus || state.focus,
      location: slot.location,
      time: formatSceneTime(day.day, slot.time),
      after: choice.ending ? { type: "ending", endingId: choice.ending } : { type: "continue" },
    };
  }

  if (ref.type === "talk") {
    const member = content.crew.find((item) => item.id === ref.characterId);
    if (!member) return null;
    const value = state.crew[member.stat];
    const tier = ref.tier || talkTierForValue(value);
    return {
      lines: talkLinesForMember(member, tier, value),
      mode: "talk",
      scene: currentSlot().scene,
      focus: member.id,
      location: member.name,
      time: `${member.valueLabel} ${value}`,
      after: { type: "choices" },
    };
  }

  return null;
}

function syncStateToLocale() {
  const previousLineIndex = state.lineIndex;
  const config = scriptConfigFromRef(state.scriptRef);

  if (config && state.mode !== "choice" && state.mode !== "continue") {
    state.mode = config.mode;
    state.script = [...(config.lines || [])];
    state.lineIndex = Math.min(previousLineIndex, Math.max(0, state.script.length - 1));
    state.afterScript = config.after || null;
    state.scene = config.scene || state.scene;
    state.focus = config.focus || state.focus;
    state.displayLocation = config.location || null;
    state.displayTime = config.time || null;
  } else {
    state.script = [];
    state.lineIndex = 0;
    state.afterScript = state.mode === "continue" ? { type: "continue" } : null;
    state.displayLocation = null;
    state.displayTime = null;
  }

  renderModeControls();
  render();
  if (els.historyDialog.open) renderHistory();
  if (els.saveDialog.open) renderSaveSlots();
  if (state.ended && state.endingId && els.endingDialog.open) {
    showEnding(state.endingId);
  }
}

function advanceScript() {
  if (state.ended || state.mode === "choice" || state.mode === "continue" || !state.script.length) return;
  if (state.lineIndex < state.script.length - 1) {
    state.lineIndex += 1;
    pushHistoryLine(currentLine());
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
  }
}

function startPrologue() {
  const firstSlot = currentSlot();
  startScript(content.prologue || firstSlot.lines, {
    mode: "prologue",
    scriptRef: { type: "prologue" },
    scene: "freeport",
    focus: "livia",
    location: firstSlot.location,
    time: t().prologueTime,
    after: { type: "slot" },
  });
}

function startSlot() {
  const slot = currentSlot();
  startScript(slot.lines, {
    mode: "slot",
    scriptRef: { type: "slot", dayIndex: state.dayIndex, slotIndex: state.slotIndex },
    scene: slot.scene,
    focus: slot.focus || "livia",
    location: slot.location,
    time: formatSceneTime(currentDay().day, slot.time),
    after: { type: "choices" },
  });
}

function render() {
  const day = currentDay();
  const slot = currentSlot();
  const phase = content.phases[phaseIndex()];

  els.day.textContent = t().dayLabel(day.day);
  els.phase.textContent = phase;
  els.logCount.textContent = t().logCount(state.log.length);

  els.moraleValue.textContent = state.stats.morale;
  els.conditionValue.textContent = state.stats.condition;
  els.fatigueValue.textContent = state.stats.fatigue;
  els.moraleBar.style.width = `${state.stats.morale}%`;
  els.conditionBar.style.width = `${state.stats.condition}%`;
  els.fatigueBar.style.width = `${state.stats.fatigue}%`;

  els.phaseSteps.forEach((step) => {
    const index = Number(step.dataset.phaseStep);
    step.textContent = content.phases[index] || "";
    step.classList.toggle("is-active", index === phaseIndex());
    step.classList.toggle("is-complete", index < phaseIndex());
  });

  applySceneBackground(state.scene || slot.scene);
  els.stage.dataset.mode = state.mode;

  renderStory();
  renderResourceHud();
  renderCrewHud();
  renderCharacters();
}

function renderStory() {
  const line = currentLine();
  const slot = currentSlot();
  const speaker = line?.speaker || (state.mode === "choice" ? t().choiceSpeaker : t().narrationSpeaker);
  const isNarration = speaker === t().narrationSpeaker;
  const location = state.displayLocation || slot.location;
  const time = state.displayTime || formatSceneTime(currentDay().day, slot.time);

  els.sceneLocation.textContent = isNarration ? location : speaker;
  els.sceneTime.textContent = isNarration ? time : `${location} · ${time}`;

  if (line) {
    const prompt = state.mode === "choice" ? "" : `<span class="next-cue">${escapeHtml(t().nextCue)}</span>`;
    els.storyText.innerHTML = `<p class="${isNarration ? "is-narration" : ""}">${escapeHtml(line.text)}</p>${prompt}`;
    return;
  }

  if (state.mode === "choice") {
    els.storyText.innerHTML = `<p class="is-narration">${escapeHtml(t().choicePrompt)}</p>`;
    return;
  }

  if (state.mode === "continue") {
    els.storyText.innerHTML = `<p class="is-narration">${escapeHtml(t().continuePrompt)}</p>`;
  }
}

function renderResourceHud() {
  const keys = ["fuel", "supplies", "onTime", "clues", "risk", "credit", "shizuru"];
  els.resourceList.innerHTML = keys
    .map((key) => {
      const config = content.stats[key];
      const value = state.stats[key];
      const danger = config.dangerHigh ? value >= 70 : value <= 15;
      const title = config.help ? ` title="${escapeHtml(config.help)}"` : "";
      return `
        <div class="resource-pill ${danger ? "is-danger" : ""}"${title}>
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
      const avatarSrc = member.avatar || member.sprite;
      const avatar = avatarSrc
        ? `<img src="${escapeHtml(avatarSrc)}" alt="${escapeHtml(t().avatarAlt(member.name))}" draggable="false" />`
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
  const canTalk = state.mode === "choice" && content.crew.some((crewMember) => crewMember.id === member.id);
  const sprite = member.sprite
    ? `<img class="sprite-art" src="${escapeHtml(member.sprite)}" alt="${escapeHtml(t().spriteAlt(member.name))}" draggable="false" />`
    : `<span class="sprite-art sprite-fallback">${escapeHtml(member.initial)}</span>`;

  els.characterLayer.innerHTML = `
    <button class="character is-focus" type="button" data-character="${escapeHtml(member.id)}" ${canTalk ? "" : "disabled"} aria-label="${escapeHtml(t().talkAria(member.name))}">
      ${sprite}
      <span class="name-tag">${escapeHtml(member.name)}</span>
    </button>
  `;
}

function allCharacters() {
  return [...(content.cast || []), ...content.crew];
}

function activeMember() {
  const line = currentLine();
  const explicitFocus = line?.focus || line?.character;
  if (explicitFocus) return allCharacters().find((member) => member.id === explicitFocus);

  const bySpeaker = allCharacters().find((member) => speakerMatchesMember(member, line?.speaker));
  if (bySpeaker) return bySpeaker;

  if (state.mode === "choice" || state.mode === "continue" || state.mode === "talk") {
    return content.crew.find((member) => member.id === state.focus);
  }

  return null;
}

function speakerMatchesMember(member, speaker) {
  if (!speaker) return false;
  const aliases = member.aliases || member.speakerAliases || [];
  return member.name === speaker || member.id === speaker || aliases.includes(speaker);
}

function renderChoices(choices = []) {
  els.choices.innerHTML = choices
    .map((choice) => {
      const available = isChoiceAvailable(choice);
      const reason = available ? "" : `<em>${escapeHtml(requirementText(choice))}</em>`;
      const effects = renderChoiceEffects(choice.effects);
      return `
        <button class="location-button ${available ? "" : "is-disabled"}" type="button" data-action="${escapeHtml(choice.id)}" ${available ? "" : "disabled"}>
          <strong>${escapeHtml(choice.title)}</strong>
          <small>${escapeHtml(choice.hint || "")}</small>
          ${effects}
          ${reason}
        </button>
      `;
    })
    .join("");
}

function renderContinue() {
  els.choices.innerHTML = `
    <button class="location-button continue-button" type="button" data-continue="true">
      <strong>${escapeHtml(t().continueTitle)}</strong>
      <small>${escapeHtml(t().continueHint)}</small>
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
  if (any.length) parts.push(t().requirementAny(any.map(formatRequirement)));
  return parts.length ? t().requirementPrefix(parts) : t().requirementMissing;
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

function effectTone(key, value, scope) {
  if (value === 0) return "neutral";
  if (scope === "crew") return value > 0 ? "good" : "bad";
  const direction = content.stats[key]?.goodDirection || "high";
  return direction === "low"
    ? value < 0 ? "good" : "bad"
    : value > 0 ? "good" : "bad";
}

function effectParts(effects = {}) {
  const parts = [];
  for (const [key, value] of Object.entries(effects.stats || {})) {
    parts.push({
      key,
      label: content.stats[key]?.label || key,
      value,
      tone: effectTone(key, value, "stat"),
    });
  }
  for (const [key, value] of Object.entries(effects.crew || {})) {
    parts.push({
      key,
      label: crewNameByStat(key),
      value,
      tone: effectTone(key, value, "crew"),
    });
  }
  return parts;
}

function renderChoiceEffects(effects = {}) {
  const parts = effectParts(effects);
  if (!parts.length) return "";
  return `
    <span class="choice-effects" aria-label="${escapeHtml(t().effectsAria)}">
      ${parts
        .map((part) => `<span class="effect-chip is-${part.tone}">${escapeHtml(part.label)} ${part.value > 0 ? "+" : ""}${escapeHtml(part.value)}</span>`)
        .join("")}
    </span>
  `;
}

function renderModeControls() {
  if (state.mode === "choice") {
    renderChoices(currentSlot().choices);
    return;
  }
  if (state.mode === "continue") {
    renderContinue();
    return;
  }
  els.choices.innerHTML = "";
}

function chooseAction(actionId) {
  if (state.ended || state.mode !== "choice") return;

  const slot = currentSlot();
  const choice = slot.choices.find((item) => item.id === actionId);
  if (!choice || !isChoiceAvailable(choice)) return;

  applyChoice(choice);
  state.log.push(t().actionLog(currentDay().day, slot.phase, choice.title));

  const resultLines = resultLinesForChoice(choice);

  startScript(resultLines, {
    mode: "result",
    scriptRef: { type: "result", dayIndex: state.dayIndex, slotIndex: state.slotIndex, choiceId: choice.id },
    scene: choice.scene || slot.scene,
    focus: choice.focus || slot.focus || state.focus,
    location: slot.location,
    time: formatSceneTime(currentDay().day, slot.time),
    after: choice.ending ? { type: "ending", endingId: choice.ending } : { type: "continue" },
  });
}

function applyChoice(choice) {
  const effects = choice.effects || {};
  for (const [key, value] of Object.entries(effects.stats || {})) {
    if (key in state.stats) {
      state.stats[key] = clampStat(key, state.stats[key] + value);
    }
  }
  for (const [key, value] of Object.entries(effects.crew || {})) {
    if (key in state.crew) {
      state.crew[key] = Math.max(0, Math.min(100, state.crew[key] + value));
    }
  }
  (choice.flags || []).forEach((flag) => state.flags.add(flag));
}

function describeEffects(effects = {}) {
  return effectParts(effects)
    .map((part) => `${part.label} ${part.value > 0 ? "+" : ""}${part.value}`)
    .join(" / ");
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
  const tier = talkTierForValue(value);
  const lines = talkLinesForMember(member, tier, value);

  state.focus = member.id;
  startScript(lines, {
    mode: "talk",
    scriptRef: { type: "talk", characterId: member.id, tier },
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
  state.endingId = endingId;
  const labels = {
    morale: content.stats.morale.label,
    condition: content.stats.condition.label,
    fatigue: content.stats.fatigue.label,
    clues: content.stats.clues.label,
    credit: content.stats.credit.label,
  };
  els.endingTitle.textContent = ending.title;
  els.endingBody.innerHTML = `
    ${ending.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    <p>${escapeHtml(t().finalStats(state.stats, labels))}</p>
    <ul>
      ${content.crew.map((member) => `<li>${escapeHtml(epilogueFor(member))}</li>`).join("")}
    </ul>
  `;
  if (!els.endingDialog.open) {
    els.endingDialog.showModal();
  }
}

function epilogueFor(member) {
  const value = state.crew[member.stat];
  const epilogue = t().epilogue;
  if (member.id === "box" && value < 45) return epilogue.boxLow;
  if (value >= 55) return epilogue.high(member.name);
  if (value >= 35) return epilogue.mid(member.name);
  return epilogue.low(member.name);
}

function restart() {
  state = newState();
  if (els.endingDialog.open) els.endingDialog.close();
  if (els.historyDialog.open) els.historyDialog.close();
  if (els.saveDialog.open) els.saveDialog.close();
  startPrologue();
}

function saveKey(slotIndex) {
  return `${SAVE_KEY}:${slotIndex}`;
}

function serializeState() {
  return {
    ...state,
    locale: currentLocale,
    flags: [...state.flags],
    savedAt: new Date().toISOString(),
    version: 2,
  };
}

function hydrateState(saved) {
  return {
    ...newState(),
    ...saved,
    stats: { ...content.initialStats, ...(saved.stats || {}) },
    crew: { ...Object.fromEntries(content.crew.map((member) => [member.stat, member.initialValue])), ...(saved.crew || {}) },
    flags: new Set(saved.flags || []),
    log: saved.log || [],
    script: saved.script || [],
    history: saved.history || [],
    afterScript: saved.afterScript || null,
  };
}

function loadSaves() {
  return Array.from({ length: SAVE_SLOT_COUNT }, (_, index) => {
    try {
      const raw = localStorage.getItem(saveKey(index));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
}

function saveToSlot(slotIndex) {
  localStorage.setItem(saveKey(slotIndex), JSON.stringify(serializeState()));
  renderSaveSlots();
}

function loadFromSlot(slotIndex) {
  const saved = loadSaves()[slotIndex];
  if (!saved) return;
  if (saved.locale && saved.locale !== currentLocale && locales[saved.locale]) {
    setLocale(saved.locale, { restart: false });
  }
  state = hydrateState(saved);
  if (els.endingDialog.open) els.endingDialog.close();
  if (els.saveDialog.open) els.saveDialog.close();
  renderModeControls();
  render();
}

function formatSaveTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(currentLocale, {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function saveSummary(saved) {
  if (!saved) return t().emptySave;
  const saveLocale = saved.locale || currentLocale;
  const saveContent = locales[saveLocale] || content;
  const day = saveContent.timeline[saved.dayIndex];
  const slot = day?.slots?.[saved.slotIndex];
  const phase = slot?.phase || saveContent.phases[saved.slotIndex % saveContent.phases.length] || "";
  const time = slot?.time || t().unknownTime;
  const ui = UI_TEXT[saveLocale] || t();
  return `${ui.dayLabel(day?.day || "?")} ${phase} / ${time}`;
}

function renderSaveSlots() {
  const saves = loadSaves();
  els.saveSlots.innerHTML = saves
    .map((saved, index) => {
      const hasSave = Boolean(saved);
      return `
        <article class="save-slot ${hasSave ? "" : "is-empty"}">
          <div>
            <strong>${escapeHtml(t().saveSlot(index + 1))}</strong>
            <span>${escapeHtml(saveSummary(saved))}</span>
            ${hasSave ? `<em>${escapeHtml(formatSaveTime(saved.savedAt))}</em>` : ""}
          </div>
          <div class="save-actions">
            <button type="button" data-save-slot="${index}">${escapeHtml(t().save)}</button>
            <button type="button" data-load-slot="${index}" ${hasSave ? "" : "disabled"}>${escapeHtml(t().load)}</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function openSaveDialog() {
  renderSaveSlots();
  els.saveDialog.showModal();
}

function renderHistory() {
  if (!state.history.length) {
    els.historyList.innerHTML = `<p class="empty-history">${escapeHtml(t().emptyHistory)}</p>`;
    return;
  }
  els.historyList.innerHTML = state.history
    .map((entry) => `
      <article class="history-entry">
        <header>
          <strong>${escapeHtml(entry.speaker)}</strong>
          <span>${escapeHtml(entry.location)} · ${escapeHtml(entry.time)}</span>
        </header>
        <p>${escapeHtml(entry.text)}</p>
      </article>
    `)
    .join("");
  els.historyList.scrollTop = els.historyList.scrollHeight;
}

function openHistoryDialog() {
  renderHistory();
  els.historyDialog.showModal();
}

function preloadBackgrounds() {
  const urls = [...new Set(Object.values(content.backgrounds || {}).map((item) => item.src).filter(Boolean))];
  for (const url of urls) {
    const image = new Image();
    image.decoding = "async";
    image.src = url;
  }
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
  if (els.historyDialog.open || els.saveDialog.open) return;
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    advanceScript();
  }
});

els.languageButton.addEventListener("click", toggleLocale);
els.restart.addEventListener("click", restart);
els.endingRestart.addEventListener("click", restart);
els.historyButton.addEventListener("click", openHistoryDialog);
els.historyClose.addEventListener("click", () => els.historyDialog.close());
els.saveButton.addEventListener("click", openSaveDialog);
els.saveClose.addEventListener("click", () => els.saveDialog.close());
els.saveSlots.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save-slot]");
  if (saveButton) {
    saveToSlot(Number(saveButton.dataset.saveSlot));
    return;
  }
  const loadButton = event.target.closest("[data-load-slot]");
  if (loadButton) {
    loadFromSlot(Number(loadButton.dataset.loadSlot));
  }
});

setLocale(currentLocale, { restart: false });
restart();

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(preloadBackgrounds, { timeout: 2500 });
} else {
  window.setTimeout(preloadBackgrounds, 800);
}

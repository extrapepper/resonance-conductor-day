const phases = ["上午", "下午", "夜晚"];

const crew = [
  {
    id: "aria",
    name: "阿莉娅",
    role: "护卫乘员 / 总是先确认别人是否安全",
    initial: "护",
    trust: 24,
  },
  {
    id: "mika",
    name: "米卡",
    role: "维修乘员 / 能听出引擎里细小的杂音",
    initial: "修",
    trust: 24,
  },
  {
    id: "noel",
    name: "诺艾尔",
    role: "医疗乘员 / 把每次问候都记在便签上",
    initial: "医",
    trust: 24,
  },
];

const actions = [
  {
    id: "cab",
    title: "前往驾驶室",
    location: "驾驶室",
    scene: "cab",
    focus: "mika",
    hint: "校准航路，听听前方风声。",
    effects: { condition: 4, fatigue: 5, mika: 4 },
    text: [
      "驾驶室的玻璃外压着深色风暴云，仪表灯像一排安静的星。",
      "米卡钻到副控台下面，声音闷闷地传来：别急，我知道它哪里不舒服。你没有催她，只是在旁边递过去一支备用灯。",
    ],
  },
  {
    id: "dining",
    title: "去餐车帮忙",
    location: "餐车",
    scene: "dining",
    focus: "aria",
    hint: "热汤、闲聊和一点不正式的安慰。",
    effects: { morale: 6, fatigue: -2, noel: 3, aria: 3 },
    text: [
      "餐车的灯比走廊暖一些，汤锅轻轻冒着热气。几名乘员把紧绷了一整天的肩膀放松下来。",
      "阿莉娅说今天的汤淡了点，但还是喝完了。诺艾尔悄悄把多出来的面包留给值夜班的人。",
    ],
  },
  {
    id: "clinic",
    title: "查看医疗车厢",
    location: "医疗车厢",
    scene: "clinic",
    focus: "noel",
    hint: "补药箱，也补上被忽略的心情。",
    effects: { fatigue: -6, morale: 2, noel: 6 },
    text: [
      "医疗车厢里消毒水的味道很淡，灯光被帘布滤得柔和。",
      "诺艾尔看到你进来，先问的不是伤员，而是你昨晚睡了多久。你没有逞强，只是坐下来让她重新包扎手背上的小伤。",
    ],
  },
  {
    id: "lounge",
    title: "回到休息室",
    location: "休息车厢",
    scene: "lounge",
    focus: "all",
    hint: "听乘员说一点和任务无关的事。",
    effects: { morale: 4, fatigue: -3, aria: 4, mika: 2, noel: 2 },
    text: [
      "休息车厢里有人在修一台旧收音机，有人在窗边看荒原退向车尾。",
      "话题从今天的颠簸，慢慢变成各自喜欢的站台小吃。列车仍在前进，但这一刻它像一间有灯的屋子。",
    ],
  },
  {
    id: "cargo",
    title: "整理货仓",
    location: "货仓",
    scene: "cargo",
    focus: "aria",
    hint: "确认物资，也确认没有人独自硬撑。",
    effects: { condition: 2, morale: 2, fatigue: 4, aria: 5 },
    text: [
      "货仓的固定锁有两处松动。箱体在轨道震动里发出低低的碰撞声。",
      "阿莉娅已经在你之前发现了它们，却把最重的箱子一个人搬到角落。你接过她手里的清单，告诉她列车长也可以搬箱子。",
    ],
  },
];

const milestones = {
  aria: [
    { at: 35, text: "阿莉娅承认，她不是不累，只是不习惯把后背交给别人。" },
    { at: 48, text: "阿莉娅开始在巡逻表上给你留备注，字很短，却每次都很准。" },
  ],
  mika: [
    { at: 35, text: "米卡把一枚旧螺母塞给你，说这是引擎今天心情不错的证据。" },
    { at: 48, text: "米卡允许你碰她的工具箱第二层。她说这在维修组里算很高礼遇。" },
  ],
  noel: [
    { at: 35, text: "诺艾尔在你的值班杯旁贴了一张便签：请列车长本人也遵守医嘱。" },
    { at: 48, text: "诺艾尔不再只问大家疼不疼，也开始说自己什么时候会害怕。" },
  ],
};

const dayOpenings = [
  "始发铃响过后，列车驶离站台。今天的任务不重，但每个人都知道，平稳本身就是一种胜利。",
  "第二天清晨，车窗上凝着细小水珠。昨夜的风没有追上来，乘员们的脚步比昨天轻了一些。",
  "第三天，终点站的信号偶尔从杂讯里露头。越接近抵达，大家越像在等待一口真正松下来的气。",
];

let state;

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

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function newState() {
  return {
    day: 1,
    phaseIndex: 0,
    stats: { morale: 62, condition: 68, fatigue: 24 },
    crew: Object.fromEntries(crew.map((member) => [member.id, member.trust])),
    seenMilestones: {},
    log: [],
    ended: false,
    scene: "lounge",
    focus: "all",
  };
}

function render() {
  els.day.textContent = `第 ${state.day} 天`;
  els.phase.textContent = phases[state.phaseIndex];
  els.logCount.textContent = `${state.log.length} 条记录`;

  els.moraleValue.textContent = state.stats.morale;
  els.conditionValue.textContent = state.stats.condition;
  els.fatigueValue.textContent = state.stats.fatigue;
  els.moraleBar.style.width = `${state.stats.morale}%`;
  els.conditionBar.style.width = `${state.stats.condition}%`;
  els.fatigueBar.style.width = `${state.stats.fatigue}%`;

  els.phaseSteps.forEach((step) => {
    const index = Number(step.dataset.phaseStep);
    step.classList.toggle("is-active", index === state.phaseIndex);
    step.classList.toggle("is-complete", index < state.phaseIndex);
  });

  els.stage.className = `game-stage scene-${state.scene}`;

  renderCrewHud();
  renderCharacters();
}

function renderCrewHud() {
  els.crewList.innerHTML = crew
    .map((member) => {
      const trust = state.crew[member.id];
      return `
        <article class="crew-card">
          <div class="portrait">${member.initial}</div>
          <div>
            <div class="crew-name"><span>${member.name}</span><span>${trust}</span></div>
            <div class="crew-role">${member.role}</div>
          </div>
          <div class="trust-track" aria-label="${member.name} 信任 ${trust}">
            <span style="width:${trust}%"></span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCharacters() {
  els.characterLayer.innerHTML = crew
    .map((member) => {
      const muted = state.focus !== "all" && state.focus !== member.id ? "is-muted" : "";
      const focus = state.focus === member.id ? "is-focus" : "";
      return `
        <button class="character ${muted} ${focus}" type="button" data-character="${member.id}" aria-label="查看${member.name}">
          <span class="sprite-art"></span>
          <span class="name-tag">${member.name}</span>
        </button>
      `;
    })
    .join("");
}

function renderIntro() {
  state.scene = "lounge";
  state.focus = "all";
  els.sceneLocation.textContent = "休息车厢";
  els.sceneTime.textContent = "风暴预报 17:30";
  els.storyText.innerHTML = `
    <p>${dayOpenings[0]}</p>
    <p>选择一个地点前往。背景会切换到对应车厢，可互动乘员也会留在画面中。</p>
  `;
  renderChoices();
}

function renderChoices() {
  els.choices.innerHTML = actions
    .map(
      (action) => `
        <button class="location-button" type="button" data-action="${action.id}">
          <strong>${action.title}</strong>
          <small>${action.hint}</small>
        </button>
      `,
    )
    .join("");
}

function chooseAction(actionId) {
  if (state.ended) return;

  const action = actions.find((item) => item.id === actionId);
  if (!action) return;

  state.scene = action.scene;
  state.focus = action.focus;
  applyEffects(action.effects);

  const milestonesText = collectMilestones();
  const phase = phases[state.phaseIndex];
  const logLine = `第 ${state.day} 天 ${phase}：${action.location}，${describeEffects(action.effects)}`;
  state.log.push(logLine);

  els.sceneLocation.textContent = action.location;
  els.sceneTime.textContent = `第 ${state.day} 天 / ${phase}`;
  els.storyText.innerHTML = [
    ...action.text.map((paragraph) => `<p>${paragraph}</p>`),
    ...milestonesText.map((paragraph) => `<p>${paragraph}</p>`),
    `<p class="effect-line">${describeEffects(action.effects)}</p>`,
  ].join("");

  advanceTime();
  render();

  if (state.ended) {
    showEnding();
  } else {
    renderChoices();
  }
}

function showCharacterLine(characterId) {
  const member = crew.find((item) => item.id === characterId);
  if (!member) return;

  state.focus = characterId;
  const trust = state.crew[characterId];
  const line =
    trust >= 48
      ? `${member.name}看向你，语气比最初轻松了很多：列车长，下一站也一起平稳抵达吧。`
      : trust >= 35
        ? `${member.name}停下手边的事，认真听你说完了今天的安排。`
        : `${member.name}向你点了点头，仍然保持着一点距离，但没有移开目光。`;

  els.sceneLocation.textContent = member.name;
  els.sceneTime.textContent = `信任 ${trust}`;
  els.storyText.innerHTML = `<p>${line}</p>`;
  render();
}

function applyEffects(effects) {
  for (const [key, value] of Object.entries(effects)) {
    if (key in state.stats) {
      state.stats[key] = clamp(state.stats[key] + value);
    } else if (key in state.crew) {
      state.crew[key] = clamp(state.crew[key] + value);
    }
  }
}

function collectMilestones() {
  const unlocked = [];
  for (const member of crew) {
    const entries = milestones[member.id] || [];
    for (const entry of entries) {
      const key = `${member.id}-${entry.at}`;
      if (state.crew[member.id] >= entry.at && !state.seenMilestones[key]) {
        state.seenMilestones[key] = true;
        unlocked.push(entry.text);
      }
    }
  }
  return unlocked;
}

function describeEffects(effects) {
  return Object.entries(effects)
    .map(([key, value]) => `${effectLabel(key)} ${value > 0 ? "+" : ""}${value}`)
    .join(" / ");
}

function effectLabel(key) {
  const names = {
    morale: "士气",
    condition: "车况",
    fatigue: "疲劳",
    aria: "阿莉娅信任",
    mika: "米卡信任",
    noel: "诺艾尔信任",
  };
  return names[key] || key;
}

function advanceTime() {
  if (state.phaseIndex < phases.length - 1) {
    state.phaseIndex += 1;
    return;
  }

  if (state.day < 3) {
    state.day += 1;
    state.phaseIndex = 0;
    state.stats.fatigue = clamp(state.stats.fatigue - 8);
    state.stats.morale = clamp(state.stats.morale + 2);
    state.log.push(`第 ${state.day} 天清晨：短暂休整后，疲劳 -8，士气 +2`);
    setTimeout(() => {
      if (!state.ended) {
        state.scene = "lounge";
        state.focus = "all";
        els.sceneLocation.textContent = "休息车厢";
        els.sceneTime.textContent = `第 ${state.day} 天 / 上午`;
        els.storyText.innerHTML = `<p>${dayOpenings[state.day - 1]}</p><p>新的一天开始了。选择下一段执勤安排。</p>`;
        render();
      }
    }, 140);
    return;
  }

  state.ended = true;
}

function getOverallGrade() {
  const score = state.stats.morale + state.stats.condition - state.stats.fatigue;
  if (score >= 135) return ["优秀", "这趟短途执勤被记录为一次漂亮的平稳抵达。"];
  if (score >= 95) return ["平稳", "列车带着一些小擦痕抵达终点，但车上的灯始终亮着。"];
  return ["勉强", "旅途不算轻松，不过没有人被落在风暴里。"];
}

function crewEpilogue(member) {
  const trust = state.crew[member.id];
  if (trust >= 52) {
    return `${member.name} 在终点站前主动来找你，说下次值乘时可以把最麻烦的那一班也排给自己。`;
  }
  if (trust >= 40) {
    return `${member.name} 和你交换了一个短短的点头。那不是客套，是已经习惯你在车上的位置。`;
  }
  return `${member.name} 仍然有些拘谨，但离站前还是把今日报告放到了你的桌面正中。`;
}

function showEnding() {
  const [grade, summary] = getOverallGrade();
  els.endingTitle.textContent = `旅程结算：${grade}`;
  els.endingBody.innerHTML = `
    <p>${summary}</p>
    <p>最终状态：士气 ${state.stats.morale} / 车况 ${state.stats.condition} / 疲劳 ${state.stats.fatigue}</p>
    <ul>
      ${crew.map((member) => `<li>${crewEpilogue(member)}</li>`).join("")}
    </ul>
    <p>当前美术是 CSS 占位立绘和场景。后续可以把角色立绘放入 assets/characters，把车厢背景放入 assets/bg 后替换。</p>
  `;
  els.endingDialog.showModal();
}

function restart() {
  state = newState();
  if (els.endingDialog.open) {
    els.endingDialog.close();
  }
  renderIntro();
  render();
}

els.choices.addEventListener("click", (event) => {
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

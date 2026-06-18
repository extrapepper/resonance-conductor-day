const phases = ["上午", "下午", "夜晚"];

const crew = [
  {
    id: "aria",
    name: "阿莉娅",
    role: "护卫乘员 / 总是先确认别人是否安全",
    initial: "护",
    trust: 24,
    tags: ["guard", "morale"],
  },
  {
    id: "mika",
    name: "米卡",
    role: "维修乘员 / 能听出引擎里细小的杂音",
    initial: "修",
    trust: 24,
    tags: ["repair", "condition"],
  },
  {
    id: "noel",
    name: "诺艾尔",
    role: "医疗乘员 / 把每次问候都记在便签上",
    initial: "医",
    trust: 24,
    tags: ["medic", "fatigue"],
  },
];

const actions = [
  {
    id: "cab",
    title: "巡视驾驶室",
    location: "驾驶室",
    hint: "校准航路，听听前方风声。",
    effects: { condition: 4, fatigue: 5, mika: 4 },
    text: [
      "你把手搭在驾驶台边缘，仪表盘的微光映在袖口上。前方风暴云像沉默的墙，路线却仍有一条窄窄的缝。",
      "米卡钻到副控台下面，声音闷闷地传来：别急，我知道它哪里不舒服。你没有催她，只是在旁边递过去一支备用灯。",
    ],
  },
  {
    id: "dining",
    title: "去餐车帮忙",
    location: "餐车",
    hint: "热汤、闲聊和一点不正式的安慰。",
    effects: { morale: 6, fatigue: -2, noel: 3, aria: 3 },
    text: [
      "餐车里飘着热汤的味道。你帮着把餐盘推到桌边，几名乘员把紧绷了一整天的肩膀放松下来。",
      "阿莉娅说今天的汤淡了点，但还是喝完了。诺艾尔悄悄把多出来的面包留给值夜班的人。",
    ],
  },
  {
    id: "clinic",
    title: "查看医疗车厢",
    location: "医疗车厢",
    hint: "补药箱，也补上被忽略的心情。",
    effects: { fatigue: -6, morale: 2, noel: 6 },
    text: [
      "医疗车厢的灯比其他地方更柔和。诺艾尔正在整理药品标签，看到你进来，她先问的却是你昨晚睡了多久。",
      "你没有逞强，只是坐下来让她重新包扎手背上的小伤。她满意地点头，像完成了一项重要调度。",
    ],
  },
  {
    id: "lounge",
    title: "在休息室停留",
    location: "休息室",
    hint: "听乘员说一点和任务无关的事。",
    effects: { morale: 4, fatigue: -3, aria: 4, mika: 2, noel: 2 },
    text: [
      "休息室里有人在修一台旧收音机，有人在窗边看荒原退向车尾。你没有宣布会议，只是把自己也放进这段安静里。",
      "话题从今天的颠簸，慢慢变成各自喜欢的站台小吃。列车仍在前进，但这一刻它像一间有灯的屋子。",
    ],
  },
  {
    id: "cargo",
    title: "整理货仓",
    location: "货仓",
    hint: "确认物资，也确认没有人独自硬撑。",
    effects: { condition: 2, morale: 2, fatigue: 4, aria: 5 },
    text: [
      "货仓的固定锁有两处松动。阿莉娅已经在你之前发现了它们，却把最重的箱子一个人搬到角落。",
      "你接过她手里的清单，告诉她列车长也可以搬箱子。她愣了一下，然后把第二重的那只推给你。",
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
  sceneLocation: document.querySelector("#scene-location"),
  sceneTime: document.querySelector("#scene-time"),
  storyText: document.querySelector("#story-text"),
  choices: document.querySelector("#choices"),
  log: document.querySelector("#event-log"),
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
  };
}

function render() {
  els.day.textContent = `第 ${state.day} 天`;
  els.phase.textContent = phases[state.phaseIndex];
  els.logCount.textContent = `${state.log.length} 条`;

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

  els.crewList.innerHTML = crew
    .map((member) => {
      const trust = state.crew[member.id];
      return `
        <article class="crew-card">
          <div class="portrait">${member.initial}</div>
          <div>
            <div class="crew-name"><span>${member.name}</span><span>${trust}</span></div>
            <div class="crew-role">${member.role}</div>
            <div class="trust-track" aria-label="${member.name} 信任 ${trust}">
              <span style="width:${trust}%"></span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  els.log.innerHTML = state.log
    .slice()
    .reverse()
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function renderIntro() {
  els.sceneLocation.textContent = "始发站台";
  els.sceneTime.textContent = "风暴预报 17:30";
  els.storyText.innerHTML = `
    <p>${dayOpenings[0]}</p>
    <p>选择今天上午要先去的车厢。每个选择都会让列车和乘员发生一点变化。</p>
  `;
  renderChoices();
}

function renderChoices() {
  els.choices.innerHTML = actions
    .map((action, index) => {
      const chips = Object.entries(action.effects)
        .map(([key, value]) => `<i>${effectLabel(key)} ${value > 0 ? "+" : ""}${value}</i>`)
        .join("");

      return `
        <button class="choice-button" type="button" data-action="${action.id}">
          <span class="choice-title">
            <strong>${action.title}</strong>
            <em class="choice-index">0${index + 1}</em>
          </span>
          <span>${action.hint}</span>
          <span class="effect-chips">${chips}</span>
        </button>
      `;
    })
    .join("");
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

function chooseAction(actionId) {
  if (state.ended) return;

  const action = actions.find((item) => item.id === actionId);
  if (!action) return;

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
        els.sceneLocation.textContent = "列车清晨";
        els.sceneTime.textContent = `第 ${state.day} 天 / 上午`;
        els.storyText.innerHTML = `<p>${dayOpenings[state.day - 1]}</p><p>新的一天开始了。选择下一段执勤安排。</p>`;
      }
    }, 120);
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
    <p>非商业同人原型。角色名与美术可在后续版本替换为你提供的《雷索纳斯》素材。</p>
  `;
  els.endingDialog.showModal();
}

function restart() {
  state = newState();
  if (els.endingDialog.open) {
    els.endingDialog.close();
  }
  render();
  renderIntro();
}

els.choices.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  chooseAction(button.dataset.action);
});

els.restart.addEventListener("click", restart);
els.endingRestart.addEventListener("click", restart);

restart();

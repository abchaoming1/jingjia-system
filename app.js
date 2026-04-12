const STORAGE_KEY = "auction-study-workspace-v5";
const UI_STORAGE_KEY = "auction-study-workspace-ui-v2";
const PRESET_TAGS = ["重点看", "已吃透", "回看", "慎做提醒"];
const DECISION_OPTIONS = [
  { value: "do", label: "可做" },
  { value: "watch", label: "观察" },
  { value: "skip", label: "不做" },
];
const CASE_WORKFLOW_SHORTCUTS = [
  { label: "等回落", field: "miniReview", value: "等回落确认承接后再接。" },
  { label: "只前排", field: "miniReview", value: "只做前排和最先上板，不碰后排跟风。" },
  { label: "看承接", field: "note", value: "重点看回落后的承接是否接得住。" },
  { label: "题材弱不接", field: "note", value: "题材强度不够，除非盘中转强，否则不接。" },
  { label: "次日兑现", field: "miniReview", value: "次日按冲高兑现流程处理，不恋战。" },
];
const PATTERN_KEYWORDS = [
  "一字",
  "弱转强",
  "强转弱",
  "试盘",
  "抛压",
  "分歧",
  "承接",
  "回落",
  "加速",
  "抢筹",
  "放量",
  "爆量",
  "炸板",
  "长阳线",
  "跳空",
  "高开",
  "晚回落",
  "早回落",
  "盘中转强",
  "竞价加单",
  "竞价弱转强",
  "一致转分歧",
];

const PLAYBOOK_GROUPS = [
  { kind: "must", label: "一定要做", longLabel: "一定要做清单", intro: "最标准、最值得优先研究和执行的模型。" },
  { kind: "best", label: "最好要做", longLabel: "最好要做清单", intro: "承接和容错更舒服，通常是高优先级备选。" },
  { kind: "can", label: "可以做", longLabel: "可以做清单", intro: "条件满足可以做，但仍然要核对题材、身位和换手质量。" },
  { kind: "caution", label: "慎做", longLabel: "慎做清单", intro: "不是绝对不能做，但更吃临盘反应和退出纪律。" },
  { kind: "avoid", label: "禁做", longLabel: "禁做清单", intro: "优先规避，防止一致转分歧、炸板和弱转弱。" },
];

const mantraCards = [
  {
    title: "先看竞价结构",
    points: [
      "20 分之前看诱多试盘，主力试盘越充分越好。",
      "20 分之后看真实抛压，真实抛压越轻越好。",
      "回落越晚越好，说明主力不急着让出价格。",
    ],
  },
  {
    title: "抛压和承接要配套",
    points: [
      "抛压大不一定差，关键是下面有没有人接，有没有人兜住。",
      "抛压小时更要看分歧小，说明大家不急着卖，筹码更惜售。",
      "真正要看的不是单边大小，而是抛压和承接是否匹配。",
    ],
  },
  {
    title: "竞昨比分区间看",
    points: [
      "竞昨比低于 15%，越高越强，但至少要比昨天更强。",
      "竞昨比在 15%-35% 之间，越低越安全，越不容易在板上出货。",
      "如果一字预期下直接爆量，往往就是一致转分歧的预警。",
    ],
  },
  {
    title: "板上质量重于表象",
    points: [
      "涨停时间越早越好，炸板次数越少越好。",
      "炸板金额大说明换手更充分，板上成交少说明封板更干净。",
      "二板可以放量，但只接受温和放量，不接受失控爆量。",
    ],
  },
  {
    title: "题材与身位优先",
    points: [
      "题材越大越好，故事越强，接力溢价越高。",
      "个股身位越前越好，涨停时间越早越有优势。",
      "同等条件下优先做前排，不做后排跟风。",
    ],
  },
  {
    title: "只做最强的一批",
    points: [
      "同等条件下宁可做低人气未明牌，也不做高人气过度拥挤。",
      "每天只做前 8 个一进二涨停，越往后资金合力通常越弱。",
      "回落深度、题材延续、炸板质量不达标，就直接放弃。",
    ],
  },
];

const executionSteps = [
  "09:15-09:20：先看主力有没有主动试盘，谁在试、试得狠不狠。",
  "09:20-09:25：看大单撤掉后真实抛压是否加剧，下方匹配量是否放大。",
  "结合竞昨比：低于 15% 看是否继续走强，15%-35% 看是否仍在安全区。",
  "结合题材强度、板块地位、个股身位和是否属于当天前排一进二。",
  "开盘后重点看回落深度、回落时间、炸板次数、炸板金额和回封速度。",
  "最后只做抛压与承接匹配、题材与身位靠前、换手质量最好的那一批。",
];

const detailCards = [
  {
    title: "买点一：竞价直接接",
    points: [
      "适合强一致、题材大、身位前、竞价结构标准的票。",
      "要求 20 分前试盘明确，20 分后真实抛压不加剧，竞昨比在合理区间。",
      "我更建议先上基础仓 10%，先拿先手，不在竞价阶段一次打满。",
    ],
  },
  {
    title: "买点二：开盘回踩接",
    points: [
      "适合小分歧、小抛压、回落后不破竞价低点或关键均线的票。",
      "重点看回踩深度、回踩时间和承接是否马上出现，容错通常比直接接高。",
      "确认回踩承接有效后，再从 10% 加到 15%。",
    ],
  },
  {
    title: "买点三：第一次回封接",
    points: [
      "适合盘中弱转强，或者炸板换手后快速回封的票。",
      "重点看炸板金额、回封速度、板块共振和是否破坏竞价低点。",
      "第一次高质量回封可以再加 5%，强票单票上限按 20% 控制。",
    ],
  },
  {
    title: "仓位起手：基础仓 10%",
    points: [
      "所有标准票先按 10% 起手，先拿判断权，不先拿情绪仓。",
      "不标准票、后排票、题材一般的票，不建议在 10% 之上继续加。",
      "如果 10% 都嫌不稳，通常结论不是缩仓，而是先不做。",
    ],
  },
  {
    title: "仓位阶梯：10% → 15% → 20%",
    points: [
      "第一档：基础仓 10%，用于竞价直接接或开盘先拿先手。",
      "第二档：确认回踩承接或当日一字继续强，再加 5%，总仓到 15%。",
      "第三档：盘中第一次高质量回封再加 5%，强票单票上限到 20%。",
    ],
  },
  {
    title: "特殊加仓：一字与最先上板",
    points: [
      "当日一字板可以加仓，但只给最标准、最前排、最强题材的票。",
      "最先上板的票拥有更大仓位资格，单票最高按 20% 来管。",
      "盘中买的板可以分开加仓，每次只加一档，不建议跳档猛加。",
    ],
  },
];

const sellFlowSteps = [
  {
    title: "步骤 1：先看次日竞价是否及预期",
    body: "如果次日竞价直接转弱、竞昨比掉下去、抛压明显放大，优先把“冲高兑现”改成“开盘保护利润”，不要强等拉高。",
    action: "竞价弱于预期：准备开盘先减或直接走。",
  },
  {
    title: "步骤 2：开盘 1-3 分钟看第一波上冲",
    body: "如果开盘后快速上冲但量能跟不上、板块不同步、前高附近明显受阻，这一波就是最先兑现的窗口。",
    action: "第一波冲高先卖 1/3。",
  },
  {
    title: "步骤 3：冲高延续时继续分批卖",
    body: "如果第一波后还能继续拉，但封板不坚决、分时斜率放缓、抛压开始变重，就继续兑现，不等回落再卖。",
    action: "继续冲高但质量一般：再卖 1/3。",
  },
  {
    title: "步骤 4：只把最强票留小底仓",
    body: "只有题材仍是主线、个股还是最前排、分时继续强、板块共振也在时，才值得留底仓去看更高。",
    action: "最强前排可留 1/3 底仓，否则清掉。",
  },
  {
    title: "步骤 5：底仓也有退出条件",
    body: "留底仓不是格局到底。只要冲高回落后跌破关键分时承接、炸板回封弱、板块开始掉队，底仓也要结束。",
    action: "留底仓后转弱：余仓全部兑现。",
  },
];

const glossaryCards = [
  {
    title: "试盘",
    body: "20 分前主力用大单去测试上方筹码和市场态度。试盘越充分，越说明主力有进攻意愿；但真正关键还得看 20 分后大单撤掉时真实抛压会不会放大。",
  },
  {
    title: "抛压",
    body: "卖盘兑现压力。抛压大不一定坏，坏的是抛压大却没人接；抛压小时也不一定一定强，还要看分歧是不是同步变小。",
  },
  {
    title: "分歧",
    body: "多空交换筹码的程度。小分歧常常意味着惜售，大分歧则必须继续看能不能被承接和换手消化。",
  },
  {
    title: "承接",
    body: "下方真实买盘兜底的能力。抛压越大，越要看承接是否足够强；有承接，才说明大抛压不是单边砸盘，而是可消化的换手。",
  },
  {
    title: "竞昨比",
    body: "今天竞价强度相对昨天的比较值，用来判断今天竞价是否比昨天更强，或者是否已经强到接近出货区。",
  },
  {
    title: "人气",
    body: "市场关注度与拥挤度。在这套体系里，人气过高未必是好事；低人气、未明牌、但又处在前排的票，反而更容易拿到舒服性价比。",
  },
  {
    title: "身位",
    body: "个股在题材内部的先后排序。涨停越早、越前排，通常抗跌性越好，也越容易集中资金去顶，次日溢价也更高。",
  },
];

const casePlaybookLabels = {
  "炸板回落一字板一致转分歧": { label: "禁做清单", kind: "avoid" },
  "次日无溢价一字板次日转弱": { label: "禁做清单", kind: "avoid" },
  "无试盘大抛压提前释放大分歧": { label: "禁做清单", kind: "avoid" },
  "大试盘无抛压小分歧一字加速": { label: "一定要做清单", kind: "must" },
  "中试盘无抛压小分歧竞价加单": { label: "一定要做清单", kind: "must" },
  "大试盘中小抛压小分歧晚回落": { label: "一定要做清单", kind: "must" },
  "大试盘中大抛压小分歧早回落": { label: "一定要做清单", kind: "must" },
  "大试盘大抛压大分歧强承接晚回落": { label: "最好要做清单", kind: "best" },
  "中试盘中抛压中分歧晚回落": { label: "最好要做清单", kind: "best" },
  "中小试盘大抛压大分歧强承接晚回落": { label: "最好要做清单", kind: "best" },
  "中试盘小抛压小分歧早回落": { label: "最好要做清单", kind: "best" },
  "无试盘小抛压小分歧早回落": { label: "可以做清单", kind: "can" },
  "无试盘中抛压中分歧中承接竞价弱转强": { label: "可以做清单", kind: "can" },
  "无试盘中抛压大分歧强承接竞价弱盘中转强": { label: "慎做清单", kind: "caution" },
};

let studyState = loadStudyState();
let uiState = loadUiState();
let currentData = null;
let sectionSpyObserver = null;
let caseGroupSpyObserver = null;
let isRestoringSavedAnchor = false;

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildHaystack(parts) {
  return parts
    .flat()
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function normalizeForMatch(value = "") {
  return String(value)
    .replace(/\s+/g, "")
    .replace(/[（）()【】\[\]·\-—_]/g, "")
    .replace(/\d+/g, "")
    .toLowerCase();
}

function normalizeTagList(raw = "") {
  return [...new Set(String(raw).split(/[\s,，、/]+/).map((item) => item.trim()).filter(Boolean))].slice(0, 12);
}

function appendUniqueLine(existing = "", addition = "") {
  const nextLine = String(addition).trim();
  if (!nextLine) {
    return String(existing || "");
  }

  const current = String(existing || "").trim();
  if (!current) {
    return nextLine;
  }
  if (current.includes(nextLine)) {
    return current;
  }
  return `${current}\n${nextLine}`;
}

function escapeRegExp(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function formatRichText(text = "") {
  let html = escapeHtml(text);

  html = html.replace(/^([^：:]{1,24})(：|:)/, "<strong>$1$2</strong>");

  [
    "20 分之前",
    "20 分之后",
    "20 分前",
    "20 分后",
    "15%-35%",
    "15% 以下",
    "10%",
    "15%",
    "20%",
    "一字板",
    "竞昨比",
    "抛压",
    "承接",
    "分歧",
    "回落",
    "题材",
    "身位",
    "试盘",
    "炸板",
    "弱转强",
    "强转弱",
    "最先上板",
    "一定要做",
    "禁做",
    "卖点",
    "买点",
    "仓位",
  ].forEach((keyword) => {
    const pattern = new RegExp(escapeRegExp(keyword), "g");
    html = html.replace(pattern, `<strong>${keyword}</strong>`);
  });

  return html;
}

function renderRichList(items = []) {
  return items.map((item) => `<li>${formatRichText(item)}</li>`).join("");
}

function defaultCardState() {
  return {
    reviewed: false,
    presetTags: [],
    customTags: "",
    decision: "",
    decisionReason: "",
    note: "",
    miniReview: "",
    updatedAt: 0,
  };
}

function defaultUiState() {
  return {
    caseView: "playbook",
    mobileTopbarCollapsed: true,
    todayTheme: "",
    currentCaseGroup: "must",
    lastAnchorId: "",
    lastAnchorLabel: "",
  };
}

function loadUiState() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(UI_STORAGE_KEY) || "{}");
    return {
      ...defaultUiState(),
      ...(parsed || {}),
    };
  } catch {
    return defaultUiState();
  }
}

function loadStudyState() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      cards: parsed.cards || {},
    };
  } catch {
    return { cards: {} };
  }
}

function persistUiState() {
  window.localStorage.setItem(UI_STORAGE_KEY, JSON.stringify(uiState));
}

function persistStudyState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(studyState));
}

function getCardState(cardId) {
  return {
    ...defaultCardState(),
    ...(studyState.cards[cardId] || {}),
  };
}

function hasStateNotes(state) {
  return Boolean((state.note || "").trim() || (state.miniReview || "").trim() || (state.decisionReason || "").trim());
}

function getCustomTags(state) {
  return normalizeTagList(state.customTags);
}

function getAllTags(state) {
  return [...new Set([...(state.presetTags || []), ...getCustomTags(state)])];
}

function updateCardState(cardId, patch) {
  studyState.cards[cardId] = {
    ...getCardState(cardId),
    ...patch,
    updatedAt: Date.now(),
  };
  persistStudyState();
}

function getCaseViewMode() {
  return uiState.caseView === "sections" ? "sections" : "playbook";
}

function setCaseViewMode(nextMode) {
  uiState = {
    ...defaultUiState(),
    ...uiState,
    caseView: nextMode === "sections" ? "sections" : "playbook",
  };
  persistUiState();
}

function getTodayTheme(data) {
  const available = (data?.cases?.topThemes || []).map((item) => item.name).filter(Boolean);
  if (uiState.todayTheme && available.includes(uiState.todayTheme)) {
    return uiState.todayTheme;
  }
  return available[0] || "";
}

function setTodayTheme(nextTheme = "") {
  uiState = {
    ...defaultUiState(),
    ...uiState,
    todayTheme: String(nextTheme || ""),
  };
  persistUiState();
}

function getCurrentCaseGroup() {
  const known = new Set(PLAYBOOK_GROUPS.map((item) => item.kind));
  return known.has(uiState.currentCaseGroup) ? uiState.currentCaseGroup : "must";
}

function setCurrentCaseGroup(nextGroup = "must") {
  uiState = {
    ...defaultUiState(),
    ...uiState,
    currentCaseGroup: nextGroup,
  };
  persistUiState();
}

function getLastAnchor() {
  return {
    id: String(uiState.lastAnchorId || ""),
    label: String(uiState.lastAnchorLabel || ""),
  };
}

function setLastAnchor(nextId = "", nextLabel = "") {
  uiState = {
    ...defaultUiState(),
    ...uiState,
    lastAnchorId: String(nextId || ""),
    lastAnchorLabel: String(nextLabel || ""),
  };
  persistUiState();
  syncResumeLinks();
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 820px)").matches;
}

function getMobileTopbarCollapsed() {
  return isMobileViewport() ? uiState.mobileTopbarCollapsed !== false : false;
}

function setMobileTopbarCollapsed(nextValue) {
  uiState = {
    ...defaultUiState(),
    ...uiState,
    mobileTopbarCollapsed: Boolean(nextValue),
  };
  persistUiState();
}

function extractThemeLabel(marketContext = "") {
  const match = String(marketContext).match(/（([^）]+)）/);
  if (match) {
    return match[1].trim();
  }

  const beforeDash = String(marketContext).split("-")[0].trim();
  return beforeDash || "";
}

function extractPatternKeywords(...texts) {
  const source = texts.filter(Boolean).join(" | ");
  return PATTERN_KEYWORDS.filter((keyword) => source.includes(keyword));
}

function getCasePlaybookMeta(sectionName = "") {
  const direct = casePlaybookLabels[sectionName];
  if (direct) {
    return direct;
  }

  const normalized = normalizeForMatch(sectionName);
  const fuzzy = Object.entries(casePlaybookLabels).find(([name]) => {
    const candidate = normalizeForMatch(name);
    return normalized.includes(candidate) || candidate.includes(normalized);
  });
  if (fuzzy) {
    return fuzzy[1];
  }

  const buckets = [
    { kind: "avoid", label: "禁做清单", keywords: ["一致转分歧", "次日转弱", "提前释放", "炸板回落"] },
    { kind: "must", label: "一定要做清单", keywords: ["一字加速", "竞价加单", "小分歧晚回落", "小分歧早回落"] },
    { kind: "best", label: "最好要做清单", keywords: ["强承接晚回落", "中分歧晚回落", "小分歧早回落"] },
    { kind: "caution", label: "慎做清单", keywords: ["盘中转强", "竞价弱转强"] },
    { kind: "can", label: "可以做清单", keywords: ["中承接", "无试盘小抛压", "小分歧"] },
  ];

  for (const bucket of buckets) {
    if (bucket.keywords.some((keyword) => sectionName.includes(keyword))) {
      return { label: bucket.label, kind: bucket.kind };
    }
  }

  return null;
}

function createPlaybookTag(meta) {
  if (!meta) {
    return "";
  }
  return `<span class="tag tag-${escapeHtml(meta.kind)}">${escapeHtml(meta.label)}</span>`;
}

function createMetric(label, value, id = "") {
  const attr = id ? ` data-metric="${escapeHtml(id)}"` : "";
  return `
    <article class="metric"${attr}>
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(String(value))}</strong>
    </article>
  `;
}

function createCaseSectionMarkup(section, { nested = false } = {}) {
  const meta = getCasePlaybookMeta(section.name);
  const containerTag = nested ? "article" : "section";
  const containerClass = nested ? "section-cluster filter-group" : "deck-section filter-group";
  const label = nested ? `PPT Section ${String(section.index).padStart(2, "0")}` : `Section ${String(section.index).padStart(2, "0")}`;

  return `
    <${containerTag} class="${containerClass}" id="${escapeHtml(section.id)}">
      <div class="section-head">
        <div>
          <span class="section-number">${escapeHtml(label)}</span>
          <div class="section-title-row">
            <h2>${escapeHtml(section.name)}</h2>
            ${createPlaybookTag(meta)}
          </div>
          <p class="section-summary">${escapeHtml(section.summary)}</p>
          <div class="section-tags">
            ${section.keywords.map((keyword) => `<span class="tag">${escapeHtml(keyword)}</span>`).join("")}
          </div>
        </div>
        <div class="section-stat">
          <strong>${escapeHtml(String(section.slideCount))}</strong>
          <span>页案例</span>
        </div>
      </div>
      <div class="card-grid cases-grid">
        ${section.cases.map((slide) => buildSlideCardMarkup(section.name, section.id, slide, "cases")).join("")}
      </div>
    </${containerTag}>
  `;
}

function createCaseOutlineCard(section) {
  const meta = getCasePlaybookMeta(section.name);
  return `
    <article class="outline-card">
      <div class="outline-topline">
        <span class="case-index">PPT Section ${escapeHtml(String(section.index).padStart(2, "0"))}</span>
        <span class="case-stock">${escapeHtml(String(section.slideCount))} 页</span>
      </div>
      <div class="section-title-row">
        <h3>${escapeHtml(section.name)}</h3>
        ${createPlaybookTag(meta)}
      </div>
      <p>${escapeHtml(section.summary)}</p>
      <div class="section-tags">
        ${section.keywords.slice(0, 5).map((keyword) => `<span class="tag">${escapeHtml(keyword)}</span>`).join("")}
      </div>
      <div class="outline-actions">
        <a class="mini-link" href="#${escapeHtml(section.id)}">进入这一章</a>
      </div>
    </article>
  `;
}

function getGroupedCaseSections(data) {
  const grouped = {
    must: [],
    best: [],
    can: [],
    caution: [],
    avoid: [],
  };

  data.cases.sections.forEach((section) => {
    const meta = getCasePlaybookMeta(section.name);
    if (meta) {
      grouped[meta.kind].push({ ...section, meta });
    }
  });

  return grouped;
}

function filterGroupedSectionsByTheme(data, grouped, theme = "") {
  if (!theme) {
    return grouped;
  }

  const filtered = Object.fromEntries(
    Object.entries(grouped).map(([kind, sections]) => [
      kind,
      sections.filter((section) =>
        section.cases.some((card) => extractThemeLabel(card.marketContext) === theme)
      ),
    ])
  );

  const hasAny = Object.values(filtered).some((sections) => sections.length);
  return hasAny ? filtered : grouped;
}

function pickWorkbenchItems(primary = [], fallback = [], limit = 3) {
  const primaryItems = Array.isArray(primary) ? primary : [];
  const fallbackItems = Array.isArray(fallback) ? fallback : [];
  const source = primaryItems.length ? primaryItems : fallbackItems;
  return source.slice(0, limit);
}

function getTodayWorkbenchData(data) {
  const grouped = getGroupedCaseSections(data);
  const todayTheme = getTodayTheme(data);
  const themeButtons = (data.cases.topThemes || []).slice(0, 6);
  const themedGrouped = filterGroupedSectionsByTheme(data, grouped, todayTheme);
  const mustItems = pickWorkbenchItems(themedGrouped.must, grouped.must, 3);
  const avoidItems = pickWorkbenchItems(themedGrouped.avoid, grouped.avoid, 3);
  const tomorrowItems = pickWorkbenchItems(
    [...themedGrouped.best, ...themedGrouped.can],
    [...grouped.best, ...grouped.can],
    3
  );

  return {
    todayTheme,
    themeButtons,
    grouped,
    themedGrouped,
    mustItems,
    avoidItems,
    tomorrowItems,
  };
}

function getProgressStats(data) {
  const totalCards = data.basics.slideCount + data.cases.slideCount;
  const cards = Object.values(studyState.cards || {});
  const reviewedCount = cards.filter((item) => item.reviewed).length;
  const notedCount = cards.filter((item) => hasStateNotes(item)).length;
  const taggedCount = cards.filter((item) => getAllTags(item).length > 0).length;
  return { totalCards, reviewedCount, notedCount, taggedCount };
}

function renderMetrics(data) {
  const stats = getProgressStats(data);
  const root = document.querySelector("#hero-metrics");
  root.innerHTML = [
    createMetric("基础页数", data.basics.slideCount, "basics"),
    createMetric("案例页数", data.cases.slideCount, "cases"),
    createMetric("已复盘", stats.reviewedCount, "reviewed"),
    createMetric("有批注", stats.notedCount, "noted"),
  ].join("");

  document.querySelector("#basics-stat").innerHTML = `<strong>${escapeHtml(String(data.basics.slideCount))}</strong><span>页基础内容</span>`;
  document.querySelector("#cases-stat").innerHTML = `<strong>${escapeHtml(String(data.cases.slideCount))}</strong><span>页案例内容</span>`;
}

function trimLabel(value = "", maxLength = 14) {
  const text = String(value || "").trim();
  if (!text) {
    return "";
  }
  return text.length > maxLength ? `${text.slice(0, Math.max(0, maxLength - 1))}…` : text;
}

function describeAnchor(anchorId = "") {
  const node = document.getElementById(anchorId);
  if (!node) {
    return "";
  }

  const selectors = [".case-title", ".section-head h2", ".section-heading h2", ".panel-head h2", "h2", "h3"];
  for (const selector of selectors) {
    const labelNode = node.matches(selector) ? node : node.querySelector(selector);
    const label = labelNode?.textContent?.trim();
    if (label) {
      return label;
    }
  }

  return anchorId.replace(/^card-/, "");
}

function rememberLastAnchor(anchorId = "") {
  if (!anchorId || isRestoringSavedAnchor) {
    return;
  }

  const label = describeAnchor(anchorId) || getLastAnchor().label || "";
  const currentAnchor = getLastAnchor();
  if (currentAnchor.id === anchorId && currentAnchor.label === label) {
    return;
  }

  setLastAnchor(anchorId, label);
}

function syncResumeLinks() {
  const resume = getLastAnchor();
  const hasResume = Boolean(resume.id);

  document.querySelectorAll('[data-role="resume-link"]').forEach((link) => {
    if (!(link instanceof HTMLAnchorElement)) {
      return;
    }

    if (!hasResume) {
      link.hidden = true;
      link.classList.add("is-hidden");
      return;
    }

    link.hidden = false;
    link.classList.remove("is-hidden");
    link.href = `#${resume.id}`;
    link.textContent = resume.label ? `继续上次 · ${trimLabel(resume.label, 14)}` : "继续上次";
  });
}

function restoreSavedAnchor() {
  if (window.location.hash) {
    syncResumeLinks();
    return;
  }

  const resume = getLastAnchor();
  const target = resume.id ? document.getElementById(resume.id) : null;
  if (!target) {
    syncResumeLinks();
    return;
  }

  isRestoringSavedAnchor = true;
  window.requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "auto", block: "start" });
    window.setTimeout(() => {
      isRestoringSavedAnchor = false;
      rememberLastAnchor(resume.id);
    }, 180);
  });
}

function renderHeroActions(data) {
  const reviewTemplateTargets = findReviewTemplateTargets(data);
  const reviewTarget = reviewTemplateTargets[0] ? `#card-${reviewTemplateTargets[0]}` : "#part-basics";
  const resume = getLastAnchor();
  const root = document.querySelector("#hero-actions");
  if (!root) {
    return;
  }

  root.innerHTML = `
    <a class="part-chip part-chip-primary" href="#daily-entry">今日复盘入口</a>
    <a class="part-chip part-chip-strong" href="#cases-group-must">今日一定要做</a>
    <a class="part-chip part-chip-muted" href="#cases-group-avoid">今日禁做</a>
    <a class="part-chip" href="#part-basics">第一部分</a>
    <a class="part-chip" href="#part-cases">第二部分</a>
    <a
      class="part-chip part-chip-resume ${resume.id ? "" : "is-hidden"}"
      href="${resume.id ? `#${escapeHtml(resume.id)}` : "#top"}"
      id="hero-resume-link"
      data-role="resume-link"
      ${resume.id ? "" : "hidden"}
    >${escapeHtml(resume.label ? `继续上次 · ${trimLabel(resume.label, 14)}` : "继续上次")}</a>
    <a class="part-chip" href="${escapeHtml(reviewTarget)}" id="hero-review-link">直达复盘模板</a>
  `;
}

function renderWorkspaceSummary(data) {
  const stats = getProgressStats(data);
  const workbench = getTodayWorkbenchData(data);
  const resume = getLastAnchor();
  const root = document.querySelector("#workspace-summary");
  root.innerHTML = `
    <p class="panel-label">今日工作台</p>
    <div class="hero-note-block workbench-head">
      <h3>先定今天主看什么，再定今天不做什么</h3>
      <div class="theme-preset-row">
        ${workbench.themeButtons
          .map(
            (topic) => `
              <button
                type="button"
                class="theme-preset-chip ${workbench.todayTheme === topic.name ? "is-active" : ""}"
                data-action="set-today-theme"
                data-theme="${escapeHtml(topic.name)}"
              >
                ${escapeHtml(topic.name)}
              </button>
            `
          )
          .join("")}
      </div>
      <div class="quick-links">
        <button type="button" class="mini-link subtle-button" data-action="apply-today-theme">只看这个题材</button>
        <a class="mini-link" href="#cases-playbook">直达五类清单</a>
        ${
          resume.id
            ? `<a class="mini-link" href="#${escapeHtml(resume.id)}">继续上次 · ${escapeHtml(trimLabel(resume.label, 10) || "回到上次位置")}</a>`
            : ""
        }
      </div>
    </div>

    <div class="workspace-brief-grid">
      <article class="workspace-brief-card">
        <span class="workspace-brief-label">今日主看题材</span>
        <strong>${escapeHtml(workbench.todayTheme || "先选一个题材")}</strong>
        <p>今天优先围绕这个题材看结构、看前排、看承接。</p>
      </article>
      <article class="workspace-brief-card">
        <span class="workspace-brief-label">今日一定要做</span>
        <strong>${escapeHtml(workbench.mustItems[0]?.name || "先看标准强势形")}</strong>
        <p>${escapeHtml(workbench.mustItems.length)} 个优先模型，先从前排标准形开始刷。</p>
      </article>
      <article class="workspace-brief-card">
        <span class="workspace-brief-label">今日禁做</span>
        <strong>${escapeHtml(workbench.avoidItems[0]?.name || "先看禁做错形")}</strong>
        <p>先把今天最容易犯错的形态刻进脑子，再谈执行。</p>
      </article>
      <article class="workspace-brief-card">
        <span class="workspace-brief-label">今日状态</span>
        <strong>${escapeHtml(String(stats.reviewedCount))} / ${escapeHtml(String(stats.totalCards))}</strong>
        <p>已复盘 ${escapeHtml(String(stats.reviewedCount))} 张，有批注 ${escapeHtml(String(stats.notedCount))} 张。</p>
      </article>
    </div>

    <div class="workspace-board">
      <article class="workspace-board-column">
        <span class="workspace-brief-label">今天做什么</span>
        <div class="workbench-link-grid">
          ${workbench.mustItems
            .map((section) => `<a class="mini-link" href="#${escapeHtml(section.id)}">${escapeHtml(section.name)}</a>`)
            .join("") || `<span class="workbench-tag">先看一定要做清单</span>`}
        </div>
      </article>
      <article class="workspace-board-column">
        <span class="workspace-brief-label">今天不做什么</span>
        <div class="workbench-link-grid">
          ${workbench.avoidItems
            .map((section) => `<a class="mini-link" href="#${escapeHtml(section.id)}">${escapeHtml(section.name)}</a>`)
            .join("") || `<span class="workbench-tag">先看禁做清单</span>`}
        </div>
      </article>
      <article class="workspace-board-column">
        <span class="workspace-brief-label">明天看什么</span>
        <div class="workbench-link-grid">
          ${workbench.tomorrowItems
            .map((section) => `<a class="mini-link" href="#${escapeHtml(section.id)}">${escapeHtml(section.name)}</a>`)
            .join("") || `<span class="workbench-tag">优先看最好要做 / 可以做</span>`}
        </div>
      </article>
    </div>

    <div class="workspace-stats">
      <article><strong>${escapeHtml(String(stats.reviewedCount))}</strong><span>已复盘</span></article>
      <article><strong>${escapeHtml(String(stats.notedCount))}</strong><span>有备注</span></article>
      <article><strong>${escapeHtml(String(stats.taggedCount))}</strong><span>有标签</span></article>
      <article><strong>${escapeHtml(String(stats.totalCards))}</strong><span>总卡片</span></article>
    </div>
  `;
}

function renderDailyEntry(data) {
  const reviewTemplateCards = findReviewTemplateTargets(data);
  const resume = getLastAnchor();
  const root = document.querySelector("#daily-entry-grid");
  root.innerHTML = [
    {
      title: "今日复盘入口",
      body: "先筛选，再定今天先刷哪一类。",
      links: [
        { label: "打开筛选台", href: "#search-workbench" },
        { label: "五类清单", href: "#cases-playbook" },
        ...(resume.id ? [{ label: `继续上次 · ${trimLabel(resume.label, 12) || "回到上次位置"}`, href: `#${resume.id}` }] : []),
      ],
    },
    {
      title: "核心口诀与禁做",
      body: "先剔除禁做，再优先看一定要做。",
      links: [
        { label: "五大清单", href: "#cases-playbook" },
        { label: "禁做 / 一定要做", href: "#cases-group-bar" },
      ],
    },
    {
      title: "第一部分操作手册",
      body: "先把仓位、买点、卖点钉住，再去刷案例。",
      links: [
        { label: "导读与结构", href: `#${escapeHtml(data.basics.chapters[0].id)}` },
        { label: "复盘模板", href: reviewTemplateCards[0] ? `#card-${escapeHtml(reviewTemplateCards[0])}` : "#part-basics" },
      ],
    },
  ]
    .map(
      (item) => `
        <article class="quick-entry-card">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.body)}</p>
          <div class="quick-links">
            ${item.links.map((link) => `<a class="mini-link" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderHeroSupport(data) {
  const workbench = getTodayWorkbenchData(data);
  const workflowCard = document.querySelector("#workflow-card");
  const mustCard = document.querySelector("#must-card");
  const avoidCard = document.querySelector("#avoid-card");
  const mantraCard = document.querySelector("#mantra-card");
  const newbieCard = document.querySelector("#newbie-card");
  const reviewTemplateCards = findReviewTemplateTargets(data);

  workflowCard.innerHTML = `
    <span class="kicker">今日入口</span>
    <h3>今天先动哪几步</h3>
    <ol class="support-list ordered">
      ${executionSteps.slice(0, 2).map((step) => `<li>${formatRichText(step)}</li>`).join("")}
    </ol>
  `;

  mustCard.innerHTML = `
    <span class="kicker">一定要做</span>
    <h3>${escapeHtml(workbench.todayTheme || "今日优先模型")}</h3>
    <div class="support-chips">
      ${workbench.mustItems.map((section) => `<a class="mini-link" href="#${escapeHtml(section.id)}">${escapeHtml(section.name)}</a>`).join("") || `<a class="mini-link" href="#cases-group-must">看一定要做清单</a>`}
    </div>
  `;

  avoidCard.innerHTML = `
    <span class="kicker">禁做清单</span>
    <h3>今天先排除这些</h3>
    <div class="support-chips">
      ${workbench.avoidItems.map((section) => `<a class="mini-link" href="#${escapeHtml(section.id)}">${escapeHtml(section.name)}</a>`).join("") || `<a class="mini-link" href="#cases-group-avoid">看禁做清单</a>`}
    </div>
  `;

  mantraCard.innerHTML = `
    <span class="kicker">口诀浓缩版</span>
    <h3>首页只记这四句</h3>
    <ul class="support-list">
      <li>${formatRichText("20 分前看试盘，20 分后看真实抛压。")}</li>
      <li>${formatRichText("抛压大就必须看承接，小分歧才值得直接接。")}</li>
      <li>${formatRichText("题材越大越好，身位越前越好，最先上板更值得给仓位。")}</li>
      <li>${formatRichText("每天只做最标准、最前排、最值得拿先手的一批。")}</li>
    </ul>
  `;

  newbieCard.innerHTML = `
    <span class="kicker">快捷跳转</span>
    <h3>今天主看 ${escapeHtml(workbench.todayTheme || "这个题材")}</h3>
    <div class="support-chips">
      <button type="button" class="mini-link subtle-button" data-action="apply-today-theme">按题材筛案例</button>
      <a class="mini-link" href="#part-cases">第二部分</a>
      <a class="mini-link" href="${reviewTemplateCards[0] ? `#card-${escapeHtml(reviewTemplateCards[0])}` : "#part-basics"}">复盘模板</a>
    </div>
  `;
}

function renderMantras() {
  const root = document.querySelector("#mantra-grid");
  root.innerHTML = mantraCards
    .map(
      (item, index) => `
        <article class="mantra-card manual-card">
          <span class="manual-index">规则 ${escapeHtml(String(index + 1).padStart(2, "0"))}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <ul>
            ${renderRichList(item.points)}
          </ul>
        </article>
      `
    )
    .join("");

  document.querySelector("#execution-list").innerHTML = executionSteps
    .map((step) => `<li>${escapeHtml(step)}</li>`)
    .join("");
}

function renderDetailCards() {
  const root = document.querySelector("#detail-grid");
  root.innerHTML = detailCards
    .map(
      (item, index) => `
        <article class="question-card manual-card">
          <span class="manual-index">手册 ${escapeHtml(String(index + 1).padStart(2, "0"))}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <ul>
            ${renderRichList(item.points)}
          </ul>
        </article>
      `
    )
    .join("");
}

function renderGlossary() {
  const root = document.querySelector("#glossary-grid");
  root.innerHTML = glossaryCards
    .map(
      (item, index) => `
        <article class="question-card manual-card">
          <span class="manual-index">术语 ${escapeHtml(String(index + 1).padStart(2, "0"))}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${formatRichText(item.body)}</p>
        </article>
      `
    )
    .join("");
}

function renderSellFlow() {
  const root = document.querySelector("#sell-flow-grid");
  root.innerHTML = sellFlowSteps
    .map(
      (step, index) => `
        <article class="flow-step">
          <span class="flow-index">${escapeHtml(String(index + 1).padStart(2, "0"))}</span>
          <h3>${escapeHtml(step.title)}</h3>
          <p>${escapeHtml(step.body)}</p>
          <strong>${escapeHtml(step.action)}</strong>
        </article>
      `
    )
    .join("");
}

function renderTopicCloud(data) {
  const root = document.querySelector("#topic-cloud");
  root.innerHTML = data.cases.topThemes
    .map(
      (topic) => `
        <button type="button" class="topic-chip" data-topic="${escapeHtml(topic.name)}">
          ${escapeHtml(topic.name)} · ${escapeHtml(String(topic.count))}
        </button>
      `
    )
    .join("");
}

function renderFilterControls(data) {
  const scopeRoot = document.querySelector("#scope-filter");
  const playbookRoot = document.querySelector("#playbook-filter");
  const annotationRoot = document.querySelector("#annotation-filter");
  const themeSelect = document.querySelector("#theme-filter");
  const patternSelect = document.querySelector("#pattern-filter");

  scopeRoot.innerHTML = [
    ["all", "全部"],
    ["basics", "只看基础"],
    ["cases", "只看案例"],
  ]
    .map(
      ([value, label], index) => `
        <button type="button" class="filter-chip ${index === 0 ? "is-active" : ""}" data-filter="scope" data-value="${escapeHtml(value)}">
          ${escapeHtml(label)}
        </button>
      `
    )
    .join("");

  playbookRoot.innerHTML = [
    { value: "all", label: "全部" },
    ...PLAYBOOK_GROUPS.map((item) => ({ value: item.kind, label: item.label })),
  ]
    .map(
      (item, index) => `
        <button type="button" class="filter-chip ${index === 0 ? "is-active" : ""}" data-filter="bucket" data-value="${escapeHtml(item.value)}">
          ${escapeHtml(item.label)}
        </button>
      `
    )
    .join("");

  annotationRoot.innerHTML = [
    ["all", "全部"],
    ["pending", "未复盘"],
    ["reviewed", "已复盘"],
    ["noted", "有备注"],
    ["tagged", "有标签"],
  ]
    .map(
      ([value, label], index) => `
        <button type="button" class="filter-chip ${index === 0 ? "is-active" : ""}" data-filter="annotation" data-value="${escapeHtml(value)}">
          ${escapeHtml(label)}
        </button>
      `
    )
    .join("");

  const themes = [
    ...new Set(
      data.cases.sections
        .map((section) => section.cases.map((card) => extractThemeLabel(card.marketContext)))
        .flat()
        .filter(Boolean)
    ),
  ];

  themeSelect.innerHTML = [
    `<option value="all">全部题材 / 板块</option>`,
    ...themes.map((theme) => `<option value="${escapeHtml(theme)}">${escapeHtml(theme)}</option>`),
  ].join("");

  const patterns = [
    ...new Set(
      data.cases.sections
        .map((section) =>
          extractPatternKeywords(section.name, section.summary, ...section.cases.map((card) => `${card.title} ${card.summary || ""}`))
        )
        .flat()
        .filter(Boolean)
    ),
  ];

  patternSelect.innerHTML = [
    `<option value="all">全部形态关键词</option>`,
    ...patterns.map((pattern) => `<option value="${escapeHtml(pattern)}">${escapeHtml(pattern)}</option>`),
  ].join("");
}

function buildStateBadgeMarkup(state) {
  const badges = [];

  if (state.reviewed) {
    badges.push(`<span class="state-chip state-chip-reviewed">已复盘</span>`);
  }

  if (state.decision === "do") {
    badges.push(`<span class="state-chip state-chip-decision state-chip-do">可做</span>`);
  }
  if (state.decision === "watch") {
    badges.push(`<span class="state-chip state-chip-decision state-chip-watch">观察</span>`);
  }
  if (state.decision === "skip") {
    badges.push(`<span class="state-chip state-chip-decision state-chip-skip">不做</span>`);
  }

  getAllTags(state).forEach((tag) => {
    badges.push(`<span class="state-chip">${escapeHtml(tag)}</span>`);
  });

  return badges.join("");
}

function buildPresetButtons(cardId, state) {
  return PRESET_TAGS.map((tag) => {
    const active = (state.presetTags || []).includes(tag);
    return `
      <button
        type="button"
        class="preset-chip ${active ? "is-active" : ""}"
        data-card-id="${escapeHtml(cardId)}"
        data-tag="${escapeHtml(tag)}"
        data-action="toggle-tag"
      >
        ${escapeHtml(tag)}
      </button>
    `;
  }).join("");
}

function buildAnnotationBox(cardId, kind, state) {
  const noteLabel = kind === "cases" ? "03 盘中观察点" : "学习备注";
  const notePlaceholder =
    kind === "cases"
      ? "这里写风险点、触发条件，或者盘中最该盯的一笔。"
      : "写下这一页你真正记住了什么，或者下次复盘还要重点回看的地方。";
  const planLabel = "04 次日执行计划";

  return `
    <div class="annotation-box">
      <div class="annotation-head">
        <label class="review-toggle">
          <input
            type="checkbox"
            data-card-id="${escapeHtml(cardId)}"
            data-card-field="reviewed"
            ${state.reviewed ? "checked" : ""}
          >
          <span>已复盘</span>
        </label>
        <span class="annotation-tip">自动保存在本地浏览器</span>
      </div>

      ${
        kind === "cases"
          ? `
            <div class="annotation-workflow">
              <section class="workflow-block workflow-block-primary">
                <div class="workflow-stephead">
                  <span class="workflow-index">01</span>
                  <div>
                    <strong>先下结论</strong>
                    <p>先判断可做、观察还是不做，再补一句核心原因。</p>
                  </div>
                </div>
                <div class="decision-bar">
                  <div class="decision-row">
                    ${DECISION_OPTIONS.map((option) => {
                      const active = state.decision === option.value;
                      return `
                        <button
                          type="button"
                          class="decision-chip ${active ? "is-active" : ""}"
                          data-card-id="${escapeHtml(cardId)}"
                          data-value="${escapeHtml(option.value)}"
                          data-action="set-decision"
                        >
                          ${escapeHtml(option.label)}
                        </button>
                      `;
                    }).join("")}
                  </div>
                  <input
                    class="note-input note-input-compact"
                    type="text"
                    value="${escapeHtml(state.decisionReason || "")}"
                    data-card-id="${escapeHtml(cardId)}"
                    data-card-field="decisionReason"
                    placeholder="一句话下结论：比如承接强 / 题材弱 / 回落太早"
                  >
                </div>
              </section>

              <section class="workflow-block">
                <div class="workflow-stephead">
                  <span class="workflow-index">02</span>
                  <div>
                    <strong>再快速补记</strong>
                    <p>一键塞入常用复盘句，少打字，先把动作记下来。</p>
                  </div>
                </div>
                <div class="workflow-quick-row">
                  ${CASE_WORKFLOW_SHORTCUTS.map((item) => `
                    <button
                      type="button"
                      class="workflow-chip"
                      data-action="apply-workflow"
                      data-card-id="${escapeHtml(cardId)}"
                      data-field="${escapeHtml(item.field)}"
                      data-template="${escapeHtml(item.value)}"
                    >
                      ${escapeHtml(item.label)}
                    </button>
                  `).join("")}
                </div>
                <div class="preset-row">
                  ${buildPresetButtons(cardId, state)}
                </div>
              </section>
            </div>
          `
          : `
            <div class="preset-row">
              ${buildPresetButtons(cardId, state)}
            </div>
          `
      }

      <label class="field-label" for="custom-tags-${escapeHtml(cardId)}">自定义标签</label>
      <input
        id="custom-tags-${escapeHtml(cardId)}"
        class="note-input"
        type="text"
        value="${escapeHtml(state.customTags || "")}"
        data-card-id="${escapeHtml(cardId)}"
        data-card-field="customTags"
        placeholder="比如：重点研究、题材龙头、回封质量高"
      >

      <div class="custom-tag-preview" data-role="tag-preview">
        ${getCustomTags(state).map((tag) => `<span class="state-chip">${escapeHtml(tag)}</span>`).join("")}
      </div>

      ${
        kind === "cases"
          ? `
            <div class="workflow-columns">
              <section class="workflow-block">
                <label class="field-label" for="note-${escapeHtml(cardId)}">${escapeHtml(noteLabel)}</label>
                <textarea
                  id="note-${escapeHtml(cardId)}"
                  class="note-area"
                  rows="3"
                  data-card-id="${escapeHtml(cardId)}"
                  data-card-field="note"
                  placeholder="${escapeHtml(notePlaceholder)}"
                >${escapeHtml(state.note || "")}</textarea>
              </section>
              <section class="workflow-block">
                <label class="field-label" for="mini-review-${escapeHtml(cardId)}">${escapeHtml(planLabel)}</label>
                <textarea
                  id="mini-review-${escapeHtml(cardId)}"
                  class="note-area compact"
                  rows="3"
                  data-card-id="${escapeHtml(cardId)}"
                  data-card-field="miniReview"
                  placeholder="这里写明天怎么做：等回落、只做前排、冲高兑现，还是继续观察。"
                >${escapeHtml(state.miniReview || "")}</textarea>
              </section>
            </div>
          `
          : `
            <label class="field-label" for="note-${escapeHtml(cardId)}">${escapeHtml(noteLabel)}</label>
            <textarea
              id="note-${escapeHtml(cardId)}"
              class="note-area"
              rows="3"
              data-card-id="${escapeHtml(cardId)}"
              data-card-field="note"
              placeholder="${escapeHtml(notePlaceholder)}"
            >${escapeHtml(state.note || "")}</textarea>
          `
      }
    </div>
  `;
}

function buildReviewTemplateDetails(slide) {
  const points = (slide.points || []).slice(0, slide.pointLimit || slide.points?.length || 0);
  const groupLabel = points[0] || slide.summary || "";
  const lead = points[1] || "";
  const qaSource = points.slice(2);
  let closingNote = "";

  if (qaSource.length % 2 === 1) {
    closingNote = qaSource.pop();
  }

  const qaPairs = [];
  for (let index = 0; index < qaSource.length; index += 2) {
    qaPairs.push({
      question: qaSource[index],
      answer: qaSource[index + 1] || "",
    });
  }

  return `
    <div class="review-template-intro">
      ${groupLabel ? `<p class="review-template-kicker">${escapeHtml(groupLabel)}</p>` : ""}
      ${lead ? `<p class="review-template-lead">${escapeHtml(lead)}</p>` : ""}
      ${slide.subtitle && slide.subtitle !== lead ? `<p class="review-template-summary">${escapeHtml(slide.subtitle)}</p>` : ""}
    </div>
    ${
      qaPairs.length
        ? `
          <div class="review-template-grid">
            ${qaPairs
              .map(
                (pair, index) => `
                  <article class="review-template-item">
                    <div class="review-template-item-top">
                      <span class="review-template-step">${escapeHtml(String(index + 1).padStart(2, "0"))}</span>
                    </div>
                    <h4 class="review-template-question">${escapeHtml(pair.question)}</h4>
                    ${pair.answer ? `<p class="review-template-answer">${escapeHtml(pair.answer)}</p>` : ""}
                  </article>
                `
              )
              .join("")}
          </div>
        `
        : ""
    }
    ${closingNote ? `<div class="review-template-note">${escapeHtml(closingNote)}</div>` : ""}
  `;
}

function buildSlideCardMarkup(parentName, sectionId, slide, kind) {
  const cardId = `${kind}-${sectionId}-${slide.number}`;
  const state = getCardState(cardId);
  const isReviewTemplate = kind === "basics" && String(slide.eyebrow || "").startsWith("REVIEW TEMPLATE");
  const points =
    kind === "basics"
      ? (slide.points || []).slice(0, slide.pointLimit || 4)
      : (slide.takeaways || []).slice(0, 2);
  const caseMeta = kind === "cases" ? getCasePlaybookMeta(parentName) : null;
  const theme = kind === "cases" ? extractThemeLabel(slide.marketContext) : "基础";
  const patterns =
    kind === "cases"
      ? extractPatternKeywords(parentName, slide.title, slide.summary, slide.marketContext, slide.stockName)
      : extractPatternKeywords(parentName, slide.title, slide.subtitle, ...(slide.points || []));

  const articleClasses = ["study-card", "filter-card"];
  if (kind === "cases") {
    articleClasses.push("case-study-card");
  } else {
    articleClasses.push("basic-study-card");
  }
  if (isReviewTemplate) {
    articleClasses.push("review-template-card");
  }

  const baseHaystack = buildHaystack([
    parentName,
    slide.eyebrow,
    slide.title,
    slide.subtitle,
    slide.summary,
    slide.marketContext,
    slide.stockName,
    ...(slide.points || []),
    ...(slide.takeaways || []),
    ...(slide.notes || []),
    ...(patterns || []),
    caseMeta?.label,
    theme,
  ]);

  const fullHaystack = buildHaystack([
    baseHaystack,
    state.decision,
    state.decisionReason,
    state.note,
    state.miniReview,
    state.customTags,
    ...(state.presetTags || []),
  ]);
  const topLabel =
    kind === "basics"
      ? slide.eyebrow || `基础页 ${slide.number}`
      : `案例 ${String(slide.number).padStart(2, "0")}`;
  const rightLabel =
    kind === "basics"
      ? isReviewTemplate
        ? `${Math.floor(Math.max((points.length - 2) / 2, 0))} 问模板`
        : slide.subtitle || ""
      : slide.stockName || "待补充个股";
  const summary =
    kind === "basics"
      ? slide.summary || slide.subtitle || ""
      : slide.marketContext || slide.summary || "";

  return `
    <article
      id="card-${escapeHtml(cardId)}"
      class="${articleClasses.join(" ")}"
      data-card-id="${escapeHtml(cardId)}"
      data-kind="${escapeHtml(kind)}"
      data-bucket="${escapeHtml(caseMeta?.kind || "none")}"
      data-theme="${escapeHtml(theme || "none")}"
      data-patterns="${escapeHtml(patterns.join("|"))}"
      data-base-haystack="${escapeHtml(baseHaystack)}"
      data-haystack="${escapeHtml(fullHaystack)}"
      data-reviewed="${state.reviewed ? "1" : "0"}"
      data-noted="${hasStateNotes(state) ? "1" : "0"}"
      data-tagged="${getAllTags(state).length ? "1" : "0"}"
    >
      <button
        type="button"
        class="thumb-button"
        data-image="${escapeHtml(slide.image)}"
        data-title="${escapeHtml(slide.title)}"
        data-caption="${escapeHtml(summary)}"
      >
        <img src="${escapeHtml(slide.image)}" alt="${escapeHtml(slide.title)}">
      </button>

      <div class="card-body">
        <div class="case-topline">
          <span class="case-index">${escapeHtml(topLabel)}</span>
          <span class="case-stock">${escapeHtml(rightLabel)}</span>
        </div>

        <h3 class="case-title">${escapeHtml(slide.title)}</h3>

        <div class="state-badges" data-role="state-badges">
          ${buildStateBadgeMarkup(state)}
        </div>

        <div class="card-tags">
          ${kind === "cases" ? createPlaybookTag(caseMeta) : ""}
          ${theme && theme !== "基础" ? `<span class="tag">${escapeHtml(theme)}</span>` : ""}
          ${patterns.slice(0, 4).map((keyword) => `<span class="tag">${escapeHtml(keyword)}</span>`).join("")}
        </div>

        ${
          isReviewTemplate
            ? buildReviewTemplateDetails(slide)
            : `
              ${summary ? `<p class="case-context">${escapeHtml(summary)}</p>` : ""}
              <ul class="case-points">
                ${renderRichList(points)}
              </ul>
            `
        }

        ${buildAnnotationBox(cardId, kind, state)}
      </div>
    </article>
  `;
}

function renderBasics(data) {
  const tocRoot = document.querySelector("#basics-toc");
  const sectionsRoot = document.querySelector("#basics-sections");

  tocRoot.innerHTML = `
    <h3>第一部分目录</h3>
    <div class="toc-list">
      ${data.basics.chapters
        .map(
          (chapter) => `
            <a class="toc-link" href="#${escapeHtml(chapter.id)}" data-spy-link="${escapeHtml(chapter.id)}">
              <span>${escapeHtml(chapter.index === 0 ? chapter.name : `第 ${chapter.index} 章 · ${chapter.name}`)}</span>
              <span>${escapeHtml(String(chapter.slideCount))} 页</span>
            </a>
          `
        )
        .join("")}
    </div>
  `;

  sectionsRoot.innerHTML = data.basics.chapters
    .map(
      (chapter) => `
        <section class="deck-section filter-group" id="${escapeHtml(chapter.id)}">
          <div class="section-head">
            <div>
              <span class="section-number">${escapeHtml(chapter.index === 0 ? "Intro" : `Chapter ${String(chapter.index).padStart(2, "0")}`)}</span>
              <h2>${escapeHtml(chapter.name)}</h2>
              <p class="section-summary">${escapeHtml(chapter.summary)}</p>
            </div>
            <div class="section-stat">
              <strong>${escapeHtml(String(chapter.slideCount))}</strong>
              <span>页基础内容</span>
            </div>
          </div>
          <div class="card-grid basics-grid">
            ${chapter.slides.map((slide) => buildSlideCardMarkup(chapter.name, chapter.id, slide, "basics")).join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function renderCases(data) {
  const tocRoot = document.querySelector("#cases-toc");
  const sectionsRoot = document.querySelector("#cases-sections");
  const grouped = getGroupedCaseSections(data);
  const mode = getCaseViewMode();

  if (mode === "playbook") {
    tocRoot.innerHTML = `
      <h3>第二部分目录 · 清单模式</h3>
      <div class="toc-list">
        ${PLAYBOOK_GROUPS.map((group) => {
          const items = grouped[group.kind] || [];
          const slideTotal = items.reduce((sum, item) => sum + item.slideCount, 0);
          if (!items.length) {
            return "";
          }
          return `
            <a class="toc-link" href="#cases-group-${escapeHtml(group.kind)}" data-spy-link="cases-group-${escapeHtml(group.kind)}">
              <span class="toc-main">
                <span>${escapeHtml(group.label)}</span>
                ${createPlaybookTag({ label: group.longLabel, kind: group.kind })}
              </span>
              <span>${escapeHtml(String(items.length))} 章 / ${escapeHtml(String(slideTotal))} 页</span>
            </a>
          `;
        }).join("")}
      </div>
    `;

    sectionsRoot.innerHTML = PLAYBOOK_GROUPS.map((group) => {
      const items = grouped[group.kind] || [];
      const slideTotal = items.reduce((sum, item) => sum + item.slideCount, 0);
      if (!items.length) {
        return "";
      }
      return `
        <section class="deck-section bucket-section bucket-section-${escapeHtml(group.kind)} filter-group" id="cases-group-${escapeHtml(group.kind)}">
          <div class="section-head">
            <div>
              <span class="section-number">Checklist View</span>
              <div class="section-title-row">
                <h2>${escapeHtml(group.longLabel)}</h2>
                ${createPlaybookTag({ label: group.longLabel, kind: group.kind })}
              </div>
              <p class="section-summary">${escapeHtml(group.intro)}</p>
            </div>
            <div class="section-stat">
              <strong>${escapeHtml(String(slideTotal))}</strong>
              <span>${escapeHtml(String(items.length))} 个章节</span>
            </div>
          </div>
          <div class="section-stack">
            ${items.map((section) => createCaseSectionMarkup(section, { nested: true })).join("")}
          </div>
        </section>
      `;
    }).join("");
    return;
  }

  tocRoot.innerHTML = `
    <h3>第二部分目录 · PPT 模式</h3>
    <div class="toc-list">
      ${data.cases.sections
        .map((section) => {
          const meta = getCasePlaybookMeta(section.name);
          return `
            <a class="toc-link" href="#${escapeHtml(section.id)}" data-spy-link="${escapeHtml(section.id)}">
              <span class="toc-main">
                <span>${escapeHtml(section.name)}</span>
                ${createPlaybookTag(meta)}
              </span>
              <span>${escapeHtml(String(section.slideCount))} 页</span>
            </a>
          `;
        })
        .join("")}
    </div>
  `;

  sectionsRoot.innerHTML = data.cases.sections.map((section) => createCaseSectionMarkup(section)).join("");
}

function renderCaseShortcuts(data) {
  const shortcutRoot = document.querySelector("#cases-shortcuts");
  const bucketRoot = document.querySelector("#cases-buckets");
  const outlineRoot = document.querySelector("#cases-outline");
  const groupBarRoot = document.querySelector("#cases-group-bar");
  const hintRoot = document.querySelector("#case-view-hint");
  const grouped = getGroupedCaseSections(data);
  const mode = getCaseViewMode();
  const currentGroup = getCurrentCaseGroup();

  document.querySelectorAll("[data-case-view]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.caseView === mode);
  });

  if (hintRoot) {
    hintRoot.textContent =
      mode === "playbook"
        ? "当前内容区正在按五类清单展开，适合你先刷标准形、先看禁做和一定要做。"
        : "当前内容区正在按 PPT 章节顺序展开，适合你逐页对图、按课件逻辑复盘。";
  }

  shortcutRoot.innerHTML = PLAYBOOK_GROUPS.map((group) => {
    const items = grouped[group.kind] || [];
    const slideTotal = items.reduce((sum, item) => sum + item.slideCount, 0);
    const entryTarget = mode === "playbook" ? `cases-group-${group.kind}` : items[0]?.id || "cases-playbook";
    return `
      <article class="shortcut-card">
        ${createPlaybookTag({ label: group.longLabel, kind: group.kind })}
        <h3>${escapeHtml(group.label)}</h3>
        <p>${escapeHtml(group.intro)}</p>
        <div class="shortcut-stats">
          <span>${escapeHtml(String(items.length))} 个章节</span>
          <span>${escapeHtml(String(slideTotal))} 页图例</span>
        </div>
        <div class="shortcut-links">
          <a class="mini-link" href="#${escapeHtml(entryTarget)}">${mode === "playbook" ? "进入本清单" : "进入本类首章"}</a>
          ${items.slice(0, 6).map((section) => `<a class="mini-link" href="#${escapeHtml(section.id)}">${escapeHtml(section.name)}</a>`).join("")}
        </div>
      </article>
    `;
  }).join("");

  groupBarRoot.innerHTML = `
    <div class="desk-jump-head">
      <span class="kicker">交易台快捷键</span>
      <p>当前：<strong id="current-group-label">${escapeHtml(PLAYBOOK_GROUPS.find((item) => item.kind === currentGroup)?.label || "一定要做")}</strong></p>
    </div>
    ${PLAYBOOK_GROUPS.map((group, index) => {
      return `
        <button
          type="button"
          class="group-jump-chip group-jump-${escapeHtml(group.kind)} ${currentGroup === group.kind && mode === "playbook" ? "is-current" : ""}"
          data-action="jump-group"
          data-group="${escapeHtml(group.kind)}"
          data-hotkey="${escapeHtml(String(index + 1))}"
          aria-label="${escapeHtml(`快捷键 ${index + 1}，跳到${group.label}`)}"
        >
          <span class="group-hotkey">${escapeHtml(String(index + 1).padStart(2, "0"))}</span>
          <span class="group-copy">${escapeHtml(group.label)}</span>
        </button>
      `;
    }).join("")}
  `;

  bucketRoot.innerHTML = PLAYBOOK_GROUPS.map((group) => {
    const items = grouped[group.kind] || [];
    const entryTarget = mode === "playbook" ? `cases-group-${group.kind}` : items[0]?.id || "cases-playbook";
    return `
      <article class="bucket-card bucket-${escapeHtml(group.kind)}" id="cases-${escapeHtml(group.kind)}">
        <div class="bucket-head">
          ${createPlaybookTag({ label: group.longLabel, kind: group.kind })}
          <p>${escapeHtml(group.intro)}</p>
        </div>
        <div class="bucket-links">
          <a class="bucket-link" href="#${escapeHtml(entryTarget)}">${mode === "playbook" ? "进入本区" : "进入首章"}</a>
          ${items.map((section) => `<a class="bucket-link" href="#${escapeHtml(section.id)}">${escapeHtml(section.name)}</a>`).join("")}
        </div>
      </article>
    `;
  }).join("");

  outlineRoot.innerHTML = data.cases.sections.map((section) => createCaseOutlineCard(section)).join("");
}

function renderAnnotationSummary(data) {
  const root = document.querySelector("#annotation-summary");
  const stats = getProgressStats(data);
  root.innerHTML = `
    <article class="annotation-stat">
      <strong>${escapeHtml(String(stats.reviewedCount))}</strong>
      <span>已复盘</span>
    </article>
    <article class="annotation-stat">
      <strong>${escapeHtml(String(stats.notedCount))}</strong>
      <span>有备注</span>
    </article>
    <article class="annotation-stat">
      <strong>${escapeHtml(String(stats.taggedCount))}</strong>
      <span>有标签</span>
    </article>
    <article class="annotation-stat">
      <strong>${escapeHtml(String(stats.totalCards))}</strong>
      <span>总卡片</span>
    </article>
  `;
}

function findReviewTemplateTargets(data) {
  const targets = [];
  data.basics.chapters.forEach((chapter) => {
    chapter.slides.forEach((slide) => {
      if (String(slide.eyebrow || "").startsWith("REVIEW TEMPLATE")) {
        targets.push(`basics-${chapter.id}-${slide.number}`);
      }
    });
  });
  return targets;
}

function updateCardDataset(card) {
  const cardId = card.dataset.cardId;
  const state = getCardState(cardId);
  const baseHaystack = card.dataset.baseHaystack || "";

  card.dataset.reviewed = state.reviewed ? "1" : "0";
  card.dataset.noted = hasStateNotes(state) ? "1" : "0";
  card.dataset.tagged = getAllTags(state).length ? "1" : "0";
  card.dataset.haystack = buildHaystack([
    baseHaystack,
    state.decision,
    state.decisionReason,
    state.note,
    state.miniReview,
    state.customTags,
    ...(state.presetTags || []),
  ]);

  const badges = card.querySelector('[data-role="state-badges"]');
  if (badges) {
    badges.innerHTML = buildStateBadgeMarkup(state);
  }

  const preview = card.querySelector('[data-role="tag-preview"]');
  if (preview) {
    preview.innerHTML = getCustomTags(state).map((tag) => `<span class="state-chip">${escapeHtml(tag)}</span>`).join("");
  }

  card.querySelectorAll('[data-action="toggle-tag"]').forEach((button) => {
    const active = (state.presetTags || []).includes(button.dataset.tag || "");
    button.classList.toggle("is-active", active);
  });

  card.querySelectorAll('[data-action="set-decision"]').forEach((button) => {
    const active = state.decision === (button.dataset.value || "");
    button.classList.toggle("is-active", active);
  });

  card.querySelectorAll('[data-action="apply-workflow"]').forEach((button) => {
    const field = button.dataset.field || "";
    const template = button.dataset.template || "";
    const active = String(state[field] || "").includes(template);
    button.classList.toggle("is-active", active);
  });
}

function updateProgressWidgets() {
  if (!currentData) {
    return;
  }
  renderMetrics(currentData);
  renderHeroActions(currentData);
  renderWorkspaceSummary(currentData);
  renderHeroSupport(currentData);
  renderAnnotationSummary(currentData);
}

function jumpToFirstVisibleCard() {
  const firstVisibleCard = document.querySelector(".filter-card:not(.hidden)");
  if (!firstVisibleCard) {
    return false;
  }

  document.querySelectorAll(".jump-target").forEach((node) => node.classList.remove("jump-target"));
  firstVisibleCard.classList.add("jump-target");
  firstVisibleCard.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => firstVisibleCard.classList.remove("jump-target"), 1800);
  return true;
}

function applyFilters({ jump = false } = {}) {
  const query = document.querySelector("#search-input").value.trim().toLowerCase();
  const activeScope = document.querySelector('[data-filter="scope"].is-active')?.dataset.value || "all";
  const activeBucket = document.querySelector('[data-filter="bucket"].is-active')?.dataset.value || "all";
  const activeAnnotation = document.querySelector('[data-filter="annotation"].is-active')?.dataset.value || "all";
  const activeTheme = document.querySelector("#theme-filter").value || "all";
  const activePattern = document.querySelector("#pattern-filter").value || "all";

  let visibleCards = 0;
  const groups = Array.from(document.querySelectorAll(".filter-group"));

  document.querySelectorAll(".filter-card").forEach((card) => {
    const matchesScope = activeScope === "all" || card.dataset.kind === activeScope;
    const matchesBucket = activeBucket === "all" || card.dataset.bucket === activeBucket;
    const matchesTheme = activeTheme === "all" || card.dataset.theme === activeTheme;
    const cardPatterns = (card.dataset.patterns || "").split("|").filter(Boolean);
    const matchesPattern = activePattern === "all" || cardPatterns.includes(activePattern);
    const matchesQuery = !query || (card.dataset.haystack || "").includes(query);
    const matchesAnnotation =
      activeAnnotation === "all" ||
      (activeAnnotation === "reviewed" && card.dataset.reviewed === "1") ||
      (activeAnnotation === "pending" && card.dataset.reviewed !== "1") ||
      (activeAnnotation === "noted" && card.dataset.noted === "1") ||
      (activeAnnotation === "tagged" && card.dataset.tagged === "1");

    const matched = matchesScope && matchesBucket && matchesTheme && matchesPattern && matchesQuery && matchesAnnotation;
    card.classList.toggle("hidden", !matched);
    if (matched) {
      visibleCards += 1;
    }
  });

  groups.forEach((group) => {
    const visibleInGroup = group.querySelector(".filter-card:not(.hidden)");
    group.classList.toggle("hidden", !visibleInGroup);
  });

  const count = document.querySelector("#result-count");
  if (query || activeScope !== "all" || activeBucket !== "all" || activeTheme !== "all" || activePattern !== "all" || activeAnnotation !== "all") {
    const jumped = jump ? jumpToFirstVisibleCard() : false;
    count.textContent = jumped
      ? `当前命中 ${visibleCards} 张卡片，已跳到首个结果。`
      : `当前命中 ${visibleCards} 张卡片，可以继续组合筛选。`;
  } else {
    count.textContent = "支持关键词 + 清单标签 + 题材 / 板块 + 形态关键词 + 批注状态组合筛选。";
  }
}

function wireFilterEvents() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.filter;
      document.querySelectorAll(`[data-filter="${type}"]`).forEach((node) => node.classList.remove("is-active"));
      button.classList.add("is-active");
      applyFilters();
    });
  });

  document.querySelector("#theme-filter").addEventListener("change", () => applyFilters());
  document.querySelector("#pattern-filter").addEventListener("change", () => applyFilters());

  const input = document.querySelector("#search-input");
  input.addEventListener("input", () => applyFilters());
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      applyFilters({ jump: true });
    }
  });

  document.querySelector("#jump-first").addEventListener("click", () => applyFilters({ jump: true }));
  document.querySelector("#filter-reset").addEventListener("click", () => {
    input.value = "";
    document.querySelector("#theme-filter").value = "all";
    document.querySelector("#pattern-filter").value = "all";
    document.querySelectorAll("[data-filter]").forEach((node) => node.classList.remove("is-active"));
    document.querySelector('[data-filter="scope"][data-value="all"]').classList.add("is-active");
    document.querySelector('[data-filter="bucket"][data-value="all"]').classList.add("is-active");
    document.querySelector('[data-filter="annotation"][data-value="all"]').classList.add("is-active");
    applyFilters();
  });

  document.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector("#theme-filter").value = button.dataset.topic || "all";
      applyFilters({ jump: true });
    });
  });
}

function syncTodayThemeToFilters({ jump = true } = {}) {
  if (!currentData) {
    return;
  }
  const todayTheme = getTodayTheme(currentData);
  const themeSelect = document.querySelector("#theme-filter");
  if (themeSelect) {
    themeSelect.value = todayTheme || "all";
  }
  applyFilters({ jump });
}

function wireWorkbenchEvents() {
  document.addEventListener("click", (event) => {
    const todayThemeButton = event.target.closest('[data-action="set-today-theme"]');
    if (todayThemeButton && currentData) {
      setTodayTheme(todayThemeButton.dataset.theme || "");
      renderWorkspaceSummary(currentData);
      renderHeroSupport(currentData);
      return;
    }

    const applyTodayThemeButton = event.target.closest('[data-action="apply-today-theme"]');
    if (applyTodayThemeButton && currentData) {
      syncTodayThemeToFilters({ jump: true });
    }
  });
}

function wireAnnotationEvents() {
  document.addEventListener("click", (event) => {
    const tagButton = event.target.closest('[data-action="toggle-tag"]');
    if (tagButton) {
      const cardId = tagButton.dataset.cardId;
      const tag = tagButton.dataset.tag || "";
      const state = getCardState(cardId);
      const current = new Set(state.presetTags || []);
      if (current.has(tag)) {
        current.delete(tag);
      } else {
        current.add(tag);
      }
      updateCardState(cardId, { presetTags: [...current] });
      const card = document.querySelector(`[data-card-id="${CSS.escape(cardId)}"]`);
      if (card) {
        updateCardDataset(card);
      }
      updateProgressWidgets();
      applyFilters();
      return;
    }

    const workflowButton = event.target.closest('[data-action="apply-workflow"]');
    if (workflowButton) {
      const cardId = workflowButton.dataset.cardId || "";
      const field = workflowButton.dataset.field || "";
      const template = workflowButton.dataset.template || "";
      const state = getCardState(cardId);
      const nextValue = appendUniqueLine(state[field], template);

      updateCardState(cardId, { [field]: nextValue });

      const input = document.querySelector(
        `[data-card-id="${CSS.escape(cardId)}"][data-card-field="${CSS.escape(field)}"]`
      );
      if (input) {
        input.value = nextValue;
      }

      const card = document.querySelector(`[data-card-id="${CSS.escape(cardId)}"]`);
      if (card) {
        updateCardDataset(card);
      }
      updateProgressWidgets();
      applyFilters();
      return;
    }

    const decisionButton = event.target.closest('[data-action="set-decision"]');
    if (!decisionButton) {
      return;
    }

    const cardId = decisionButton.dataset.cardId;
    const value = decisionButton.dataset.value || "";
    const state = getCardState(cardId);
    updateCardState(cardId, {
      decision: state.decision === value ? "" : value,
    });
    const card = document.querySelector(`[data-card-id="${CSS.escape(cardId)}"]`);
    if (card) {
      updateCardDataset(card);
    }
    updateProgressWidgets();
    applyFilters();
  });

  document.addEventListener("input", (event) => {
    const field = event.target.dataset.cardField;
    const cardId = event.target.dataset.cardId;
    if (!field || !cardId) {
      return;
    }

    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    updateCardState(cardId, { [field]: value });
    const card = document.querySelector(`[data-card-id="${CSS.escape(cardId)}"]`);
    if (card) {
      updateCardDataset(card);
    }
    updateProgressWidgets();
    applyFilters();
  });
}

function wireLightbox() {
  const dialog = document.querySelector("#lightbox");
  const image = document.querySelector("#lightbox-image");
  const title = document.querySelector("#lightbox-title");
  const caption = document.querySelector("#lightbox-caption");
  const closeButton = document.querySelector("#lightbox-close");

  document.addEventListener("click", (event) => {
    const target = event.target.closest(".thumb-button");
    if (!target) {
      return;
    }
    image.src = target.dataset.image || "";
    title.textContent = target.dataset.title || "";
    caption.textContent = target.dataset.caption || "";
    dialog.showModal();
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const inside =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (!inside) {
      dialog.close();
    }
  });
}

function wireTopbar() {
  const toggleButton = document.querySelector("#topbar-fold-toggle");
  const topbar = document.querySelector("#topbar");

  const syncTopbarState = () => {
    const collapsed = getMobileTopbarCollapsed();
    document.body.classList.toggle("topbar-collapsed", collapsed);
    toggleButton.textContent = collapsed ? "展开顶部" : "收起顶部";
    toggleButton.setAttribute("aria-expanded", String(!collapsed));
    topbar.classList.toggle("is-collapsed", collapsed);
  };

  const applyResponsiveTopbar = () => {
    if (!isMobileViewport()) {
      document.body.classList.remove("topbar-collapsed");
      topbar.classList.remove("is-collapsed");
      toggleButton.textContent = "收起顶部";
      toggleButton.setAttribute("aria-expanded", "true");
      return;
    }
    syncTopbarState();
  };

  toggleButton.addEventListener("click", () => {
    const nextState = !getMobileTopbarCollapsed();
    setMobileTopbarCollapsed(nextState);
    syncTopbarState();
  });

  document.querySelectorAll(".topbar-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (isMobileViewport()) {
        setMobileTopbarCollapsed(true);
        syncTopbarState();
      }
    });
  });

  window.addEventListener("resize", applyResponsiveTopbar);
  applyResponsiveTopbar();
}

function wireSidebar() {
  const menuButton = document.querySelector("#menu-toggle");
  const backdrop = document.querySelector("#sidebar-backdrop");
  const sidebar = document.querySelector("#sidebar");
  const closeButton = document.querySelector("#sidebar-close");
  const mobileFilterButton = document.querySelector("#mobile-filter-toggle");

  const openSidebar = () => {
    document.body.classList.add("sidebar-open");
    menuButton.setAttribute("aria-expanded", "true");
  };

  const closeSidebar = () => {
    document.body.classList.remove("sidebar-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton.addEventListener("click", () => {
    const nextOpen = !document.body.classList.contains("sidebar-open");
    if (nextOpen) {
      openSidebar();
      return;
    }
    closeSidebar();
  });

  backdrop.addEventListener("click", closeSidebar);
  closeButton.addEventListener("click", closeSidebar);
  mobileFilterButton.addEventListener("click", openSidebar);
  sidebar.addEventListener("click", (event) => {
    const target = event.target.closest("a, button[data-topic]");
    if (target && window.matchMedia("(max-width: 1024px)").matches) {
      closeSidebar();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("sidebar-open")) {
      closeSidebar();
    }
  });
}

function wireSectionSpy() {
  if (sectionSpyObserver) {
    sectionSpyObserver.disconnect();
  }

  const links = Array.from(document.querySelectorAll("[data-spy-link]"));
  const byId = new Map();
  links.forEach((link) => {
    const id = link.dataset.spyLink;
    if (!byId.has(id)) {
      byId.set(id, []);
    }
    byId.get(id).push(link);
  });

  sectionSpyObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting && byId.has(entry.target.id))
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];

      entries.forEach((entry) => {
        const id = entry.target.id;
        if (!byId.has(id)) {
          return;
        }
        byId.get(id).forEach((link) => link.classList.toggle("is-active", entry.isIntersecting));
      });

      if (visible) {
        rememberLastAnchor(visible.target.id);
      }
    },
    {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    }
  );

  document.querySelectorAll("[id]").forEach((node) => {
    if (byId.has(node.id)) {
      sectionSpyObserver.observe(node);
    }
  });
}

function renderCaseWorkspace(data) {
  renderCaseShortcuts(data);
  renderCases(data);
  wireSectionSpy();
  wireCaseGroupSpy();
  updateGroupBarState();
}

function pulseGroupJumpChip(group) {
  const button = document.querySelector(`.group-jump-chip[data-group="${CSS.escape(group)}"]`);
  if (!button) {
    return;
  }
  button.classList.add("is-live");
  window.setTimeout(() => button.classList.remove("is-live"), 900);
}

function updateGroupBarState() {
  const currentGroup = getCurrentCaseGroup();
  const mode = getCaseViewMode();
  const currentLabel = document.querySelector("#current-group-label");
  const currentMeta = PLAYBOOK_GROUPS.find((item) => item.kind === currentGroup);

  if (currentLabel) {
    currentLabel.textContent = mode === "playbook" ? currentMeta?.label || "一定要做" : "PPT 模式";
  }

  document.querySelectorAll(".group-jump-chip").forEach((button) => {
    const isCurrent = mode === "playbook" && button.dataset.group === currentGroup;
    button.classList.toggle("is-current", isCurrent);
  });
}

function wireCaseGroupSpy() {
  if (caseGroupSpyObserver) {
    caseGroupSpyObserver.disconnect();
  }

  if (getCaseViewMode() !== "playbook") {
    return;
  }

  const sections = Array.from(document.querySelectorAll('.bucket-section[id^="cases-group-"]'));
  if (!sections.length) {
    return;
  }

  caseGroupSpyObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      const nextGroup = visible.target.id.replace("cases-group-", "");
      if (nextGroup && nextGroup !== getCurrentCaseGroup()) {
        setCurrentCaseGroup(nextGroup);
        updateGroupBarState();
      }
    },
    {
      rootMargin: "-15% 0px -68% 0px",
      threshold: [0.2, 0.45, 0.7],
    }
  );

  sections.forEach((section) => caseGroupSpyObserver.observe(section));
}

function jumpToCaseGroup(group) {
  if (!currentData) {
    return;
  }

  if (getCaseViewMode() !== "playbook") {
    setCaseViewMode("playbook");
    renderCaseWorkspace(currentData);
    applyFilters();
  }

  setCurrentCaseGroup(group);
  updateGroupBarState();
  pulseGroupJumpChip(group);
  rememberLastAnchor(`cases-group-${group}`);
  document.querySelector(`#cases-group-${CSS.escape(group)}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function wireCaseViewEvents() {
  document.addEventListener("click", (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (anchor instanceof HTMLAnchorElement) {
      const anchorId = decodeURIComponent((anchor.getAttribute("href") || "").slice(1));
      if (anchorId) {
        window.setTimeout(() => rememberLastAnchor(anchorId), 0);
      }
    }

    const toggle = event.target.closest("[data-case-view]");
    if (toggle && currentData) {
      const nextMode = toggle.dataset.caseView || "playbook";
      if (nextMode === getCaseViewMode()) {
        return;
      }

      setCaseViewMode(nextMode);
      renderCaseWorkspace(currentData);
      applyFilters();
      document.querySelector("#cases-playbook")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const groupJump = event.target.closest('[data-action="jump-group"]');
    if (!groupJump || !currentData) {
      return;
    }

    jumpToCaseGroup(groupJump.dataset.group || "");
  });

  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const typingTarget = event.target.closest("input, textarea, select, [contenteditable='true']");
    if (typingTarget) {
      return;
    }

    const hotkeyIndex = Number(event.key);
    if (!Number.isInteger(hotkeyIndex) || hotkeyIndex < 1 || hotkeyIndex > PLAYBOOK_GROUPS.length) {
      return;
    }

    event.preventDefault();
    jumpToCaseGroup(PLAYBOOK_GROUPS[hotkeyIndex - 1].kind);
  });
}

function init() {
  const data = window.courseData;
  if (!data) {
    return;
  }

  currentData = data;

  renderMetrics(data);
  renderHeroActions(data);
  renderWorkspaceSummary(data);
  renderDailyEntry(data);
  renderHeroSupport(data);
  renderMantras();
  renderDetailCards();
  renderSellFlow();
  renderGlossary();
  renderTopicCloud(data);
  renderFilterControls(data);
  renderBasics(data);
  renderCaseWorkspace(data);
  renderAnnotationSummary(data);

  wireLightbox();
  wireTopbar();
  wireSidebar();
  wireFilterEvents();
  wireWorkbenchEvents();
  wireAnnotationEvents();
  wireCaseViewEvents();

  applyFilters();
  syncResumeLinks();
  restoreSavedAnchor();
}

init();

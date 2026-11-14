/* ============================================================
   菜单数据 —— 取自截图「绘制」页
   ============================================================ */

const GROUPS_A = [
  {
    title: "玩家绘制",
    on: true,
    items: [
      { t: "tg", label: "方框", on: false },
      { t: "tg", label: "碰撞箱", on: false },
      { t: "tg", label: "射线", on: false },
      { t: "tg", label: "距离", on: true },
      { t: "tg", label: "状态", on: true },
      { t: "sl", label: "绘制距离", min: 0, max: 1000, val: 500 },
      { t: "sl", label: "最大绘制距离", min: 0, max: 2000, val: 1000 },
      { t: "tg", label: "预警提示", on: false },
      { t: "sl", label: "提示颜色", min: 0, max: 255, val: 46 },
      { t: "sl", label: "预警距离", min: 0, max: 100, val: 20 },
      { t: "tg", label: "人物骨骼", on: true },
      { t: "sl", label: "骨骼颜色", min: 0, max: 255, val: 0 },
      { t: "tg", label: "人物手持", on: true },
      { t: "tg", label: "SAN 值文字", on: true },
      { t: "tg", label: "SAN 值长条", on: true },
      { t: "sl", label: "SAN 值动画速度", min: 0, max: 5, val: 1, dec: 2 },
      { t: "tg", label: "名称", on: true },
      { t: "tg", label: "绘制胶囊", on: true },
      { t: "tg", label: "绘制雷达", on: true }
    ]
  }
];

const GROUPS_B = [
  {
    title: "物品绘制",
    on: false,
    items: [
      { t: "tg", label: "方框", on: false },
      { t: "tg", label: "碰撞箱", on: false },
      { t: "tg", label: "射线", on: false },
      { t: "tg", label: "距离", on: true },
      { t: "sl", label: "绘制距离", min: 0, max: 1000, val: 285 },
      { t: "sl", label: "最大绘制距离", min: 0, max: 2000, val: 500 },
      { t: "tg", label: "预警提示", on: false },
      { t: "sl", label: "提示颜色", min: 0, max: 255, val: 0 },
      { t: "sl", label: "预警距离", min: 0, max: 100, val: 20 },
      { t: "tg", label: "名称", on: false },
      { t: "tg", label: "绘制雷达", on: false }
    ]
  },
  {
    title: "实体绘制",
    on: true,
    items: [
      { t: "tg", label: "方框", on: false },
      { t: "tg", label: "碰撞箱", on: false },
      { t: "tg", label: "射线", on: false },
      { t: "tg", label: "距离", on: true },
      { t: "sl", label: "绘制距离", min: 0, max: 1000, val: 285 },
      { t: "sl", label: "最大绘制距离", min: 0, max: 2000, val: 500 }
    ]
  }
];

/* ---------- Toast ---------- */
const toastEl = document.getElementById("toast");
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1900);
}

/* ---------- 渲染 ---------- */
function buildGroup(group) {
  const wrap = document.createElement("div");
  wrap.className = "group";

  const head = document.createElement("div");
  head.className = "ghead";
  head.textContent = group.title;
  head.addEventListener("click", () => {
    group.on = !group.on;
    head.classList.toggle("off", !group.on);
    toast(group.title + (group.on ? " 已开启" : " 已关闭"));
  });
  if (!group.on) head.classList.add("off");

  const body = document.createElement("div");
  body.className = "gbody";

  group.items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "row" + (item.t === "tg" && item.on ? " on" : "");

    const lab = document.createElement("span");
    lab.className = "lab";
    lab.textContent = item.label;
    row.appendChild(lab);

    if (item.t === "tg") {
      const tg = document.createElement("div");
      tg.className = "tg" + (item.on ? " on" : "");
      tg.setAttribute("role", "switch");
      tg.setAttribute("tabindex", "0");
      tg.setAttribute("aria-checked", item.on ? "true" : "false");
      tg.innerHTML = "<i></i>";

      const flip = () => {
        item.on = !item.on;
        tg.classList.toggle("on", item.on);
        tg.setAttribute("aria-checked", item.on ? "true" : "false");
        row.classList.toggle("on", item.on);
      };
      tg.addEventListener("click", flip);
      tg.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
      });
      row.appendChild(tg);
    } else if (item.t === "sl") {
      const sl = document.createElement("div");
      sl.className = "sl";

      const trk = document.createElement("div");
      trk.className = "trk";

      const fill = document.createElement("div");
      fill.className = "fill";

      const knob = document.createElement("span");
      knob.className = "knob";

      const input = document.createElement("input");
      input.type = "range";
      input.min = item.min;
      input.max = item.max;
      input.step = item.dec ? 0.01 : 1;
      input.value = item.val;
      input.setAttribute("aria-label", item.label);

      const val = document.createElement("span");
      val.className = "val" + (item.dec ? " dec" : "");

      const paint = () => {
        const v = Number(input.value);
        const pct = ((v - item.min) / (item.max - item.min)) * 100;
        fill.style.width = pct + "%";
        knob.style.left = pct + "%";
        val.textContent = item.dec ? Number(v).toFixed(item.dec) : String(v);
      };
      input.addEventListener("input", paint);
      paint();

      trk.appendChild(fill);
      trk.appendChild(knob);
      trk.appendChild(input);
      sl.appendChild(trk);
      sl.appendChild(val);
      row.appendChild(sl);
    }

    body.appendChild(row);
  });

  wrap.appendChild(head);
  wrap.appendChild(body);
  return wrap;
}

const colA = document.getElementById("colA");
const colB = document.getElementById("colB");
GROUPS_A.forEach((g) => colA.appendChild(buildGroup(g)));
GROUPS_B.forEach((g) => colB.appendChild(buildGroup(g)));

/* ---------- 导航（演示仅含「绘制」页） ---------- */
function bindNav(sel, activeText) {
  document.querySelectorAll(sel).forEach((el) => {
    el.addEventListener("click", () => {
      if (el.textContent.trim() === activeText) return;
      toast("这个演示只做了「" + activeText + "」页");
    });
  });
}
bindNav("#nav1 .n1", "功能");
bindNav("#nav2 .n2", "绘制");

document.getElementById("reinject").addEventListener("click", () => {
  toast("演示环境不会真的注入");
});

/* ---------- 舞台等比缩放 ---------- */
const stage = document.getElementById("stage");
const stageSlot = document.getElementById("stageSlot");
const stageWrap = document.getElementById("stageWrap");
const BASE_W = 1028;
const BASE_H = 724;

function fitStage() {
  // 页面可滚动后，按容器宽度缩放。注意 clientWidth 含 padding，必须减掉，
  // 否则窄屏下舞台会比内容区宽，右侧溢出
  let avail = window.innerWidth - 48;
  if (stageWrap) {
    const cs = getComputedStyle(stageWrap);
    avail = stageWrap.clientWidth
      - parseFloat(cs.paddingLeft || 0)
      - parseFloat(cs.paddingRight || 0);
  }
  const s = Math.max(0.28, Math.min(avail / BASE_W, 1));
  stage.style.transform = "scale(" + s + ")";
  // transform 不影响布局，必须同步 slot 的占位尺寸，否则会被裁切
  stageSlot.style.width = BASE_W * s + "px";
  stageSlot.style.height = BASE_H * s + "px";
}
window.addEventListener("resize", fitStage, { passive: true });
fitStage();

/* ============================================================
   播放器
   ============================================================ */

const SONGS = [
  { name: "Duvet", artist: "Bôa", url: "Boa - Duvet.mp3" },
  { name: "Shootout", artist: "Izzamuzzic · Julien Marchal", url: "Izzamuzzic - Julien Marchal - Shootout.mp3" },
  { name: "Wait a Minute!", artist: "WILLOW", url: "WILLOW - Wait a Minute!.mp3" },
  { name: "Call Me (Slowed)", artist: "plenka", url: "plenka - Call Me (Slowed).mp3" }
];

const player = document.getElementById("player");
const pFab = document.getElementById("pFab");
const pPanel = document.getElementById("pPanel");
const pClose = document.getElementById("pClose");
const pTitle = document.getElementById("pTitle");
const pSub = document.getElementById("pSub");
const pCover = document.getElementById("pCover");
const pPlay = document.getElementById("pPlay");
const pIconPlay = document.getElementById("pIconPlay");
const pIconPause = document.getElementById("pIconPause");
const pPrev = document.getElementById("pPrev");
const pNext = document.getElementById("pNext");
const pNow = document.getElementById("pNow");
const pTotal = document.getElementById("pTotal");
const pFill = document.getElementById("pFill");
const pDot = document.getElementById("pDot");
const pRange = document.getElementById("pRange");
const pVol = document.getElementById("pVol");
const pList = document.getElementById("pList");

const audio = new Audio();
/* auto：一开始就预取数据。用 metadata 的话，无 Xing 头的 mp3 要等整首下完才能算出时长，
   表现就是进度条一直 0:00 / 0:00 */
audio.preload = "auto";

/* 音量：滑块 → 听觉曲线。上限压到 62%，低段更轻，避免一上来太大声 */
const VOL_MAX = 0.62;
function volFromSlider(v) {
  const t = Math.max(0, Math.min(100, Number(v))) / 100;
  return Math.pow(t, 1.7) * VOL_MAX;
}
function applyVolume() { audio.volume = volFromSlider(pVol.value); }

pVol.value = 32;
applyVolume();
pVol.addEventListener("input", applyVolume);

let current = 0;
let dragging = false;
let started = false;
const coverCache = new Map();

function fmt(sec) {
  if (!Number.isFinite(sec)) return "0:00";
  return Math.floor(sec / 60) + ":" + String(Math.floor(sec % 60)).padStart(2, "0");
}

/* ---------- 从 mp3 的 ID3v2 取 APIC 封面 ---------- */
function syncsafe(n) {
  return ((n & 0x7f000000) >> 3) | ((n & 0x7f0000) >> 2) | ((n & 0x7f00) >> 1) | (n & 0x7f);
}

function parseApic(buf) {
  const dv = new DataView(buf);
  if (buf.byteLength < 10) return null;
  if (dv.getUint8(0) !== 0x49 || dv.getUint8(1) !== 0x44 || dv.getUint8(2) !== 0x33) return null;

  const ver = dv.getUint8(3);
  const flags = dv.getUint8(5);
  const tagSize = syncsafe(dv.getUint32(6));
  let off = 10;

  if (flags & 0x40) {
    const extSize = ver === 4 ? syncsafe(dv.getUint32(off)) : dv.getUint32(off) + 4;
    off += extSize;
  }

  const end = Math.min(10 + tagSize, buf.byteLength);
  while (off + 10 <= end) {
    const id = String.fromCharCode(
      dv.getUint8(off), dv.getUint8(off + 1), dv.getUint8(off + 2), dv.getUint8(off + 3)
    );
    if (!/^[A-Z0-9]{4}$/.test(id)) break;

    const size = ver === 4 ? syncsafe(dv.getUint32(off + 4)) : dv.getUint32(off + 4);
    if (size <= 0 || off + 10 + size > buf.byteLength) break;

    if (id === "APIC") {
      const data = new Uint8Array(buf, off + 10, size);
      let p = 0;
      const enc = data[p++];

      let mime = "";
      while (p < data.length && data[p] !== 0) mime += String.fromCharCode(data[p++]);
      p++;   // mime 终止符
      p++;   // picture type

      if (enc === 1 || enc === 2) {
        while (p + 1 < data.length && !(data[p] === 0 && data[p + 1] === 0)) p += 2;
        p += 2;
      } else {
        while (p < data.length && data[p] !== 0) p++;
        p++;
      }
      if (p >= data.length) return null;

      return new Blob([data.slice(p)], { type: mime || "image/jpeg" });
    }

    off += 10 + size;
  }
  return null;
}

/* 只读取文件开头一段就够解析 ID3 了。
   ID3 标签（含封面）现在只有 3–20KB，128KB 足够，不必拉 1MB */
const HEAD_BYTES = 128 * 1024;

async function fetchHead(url, limit) {
  const res = await fetch(url, { headers: { Range: "bytes=0-" + (limit - 1) } });
  if (!res.ok && res.status !== 206) throw new Error("http " + res.status);

  // 服务端支持 Range 时直接拿半截
  if (res.status === 206) return await res.arrayBuffer();

  // 否则流式读，凑够上限就掐断
  if (!res.body || !res.body.getReader) return await res.arrayBuffer();

  const reader = res.body.getReader();
  const chunks = [];
  let total = 0;
  while (total < limit) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    total += value.byteLength;
  }
  reader.cancel().catch(() => {});

  const out = new Uint8Array(Math.min(total, limit));
  let off = 0;
  for (const c of chunks) {
    if (off >= out.length) break;
    const take = Math.min(c.byteLength, out.length - off);
    out.set(c.subarray(0, take), off);
    off += take;
  }
  return out.buffer;
}

async function getCoverUrl(song) {
  if (coverCache.has(song.url)) return coverCache.get(song.url);
  try {
    const buf = await fetchHead(song.url, HEAD_BYTES);
    const blob = parseApic(buf);
    if (!blob) { coverCache.set(song.url, null); return null; }
    const url = URL.createObjectURL(blob);
    coverCache.set(song.url, url);
    return url;
  } catch {
    coverCache.set(song.url, null);
    return null;
  }
}

async function paintCover(song, token) {
  pCover.style.backgroundImage = "";
  pCover.textContent = "♪";
  const url = await getCoverUrl(song);
  if (!url || token !== current) return;   // 已切歌就丢弃
  pCover.style.backgroundImage = 'url("' + url + '")';
  pCover.textContent = "";
}

function renderList() {
  pList.innerHTML = "";
  SONGS.forEach((song, i) => {
    const li = document.createElement("li");
    li.className = i === current ? "active" : "";
    li.innerHTML =
      '<span class="p-idx">' + String(i + 1).padStart(2, "0") + "</span>" +
      '<span class="p-name"></span>' +
      '<span class="p-eq"><i></i><i></i><i></i></span>';
    li.querySelector(".p-name").textContent = song.name;
    li.addEventListener("click", () => select(i, true));
    pList.appendChild(li);
  });
}

function select(i, autoplay) {
  current = (i + SONGS.length) % SONGS.length;
  const song = SONGS[current];

  audio.src = song.url;
  pTitle.textContent = song.name;
  pSub.textContent = song.artist;

  [...pList.children].forEach((li, idx) => li.classList.toggle("active", idx === current));

  pFill.style.width = "0%";
  pDot.style.left = "0%";
  pRange.value = 0;
  pNow.textContent = "0:00";
  pTotal.textContent = "0:00";

  paintCover(song, current);
  if (autoplay) play();
}

/* 播放被浏览器拦截时先挂起，等 canplay（数据够了）再自动重试一次，
   否则用户会看到按钮变暂停但声音一直不出来 */
let pendingPlay = false;

function play() {
  applyVolume();
  pendingPlay = true;
  audio.play().then(() => {
    pendingPlay = false;
    onPlaying();
  }).catch(() => {
    // 可能是自动播放被拦，也可能是还没缓冲完 —— 都留给 canplay 再试
    pSub.textContent = "缓冲中…";
  });
}

function onPlaying() {
  pIconPlay.style.display = "none";
  pIconPause.style.display = "block";
  player.classList.add("playing");
  started = true;
  if (SONGS[current]) pSub.textContent = SONGS[current].artist;
}

audio.addEventListener("canplay", () => {
  if (pendingPlay && audio.paused) {
    audio.play().then(() => { pendingPlay = false; onPlaying(); }).catch(() => {});
  }
});

/* 缓冲期间给个反馈，别让人以为卡死 */
audio.addEventListener("waiting", () => {
  pSub.textContent = "缓冲中…";
});
audio.addEventListener("playing", onPlaying);

function pause() {
  audio.pause();
  pIconPlay.style.display = "block";
  pIconPause.style.display = "none";
  player.classList.remove("playing");
}

function toggle() { audio.paused ? play() : pause(); }

pFab.addEventListener("click", () => {
  const open = pPanel.hidden;
  pPanel.hidden = !open;
  pFab.setAttribute("aria-expanded", String(open));
});
pClose.addEventListener("click", () => {
  pPanel.hidden = true;
  pFab.setAttribute("aria-expanded", "false");
});
pPlay.addEventListener("click", toggle);
pPrev.addEventListener("click", () => select(current - 1, true));
pNext.addEventListener("click", () => select(current + 1, true));

audio.addEventListener("loadedmetadata", () => {
  // 没有 Xing 头的老 mp3，duration 可能是 Infinity/NaN，先显示占位
  pTotal.textContent = Number.isFinite(audio.duration) ? fmt(audio.duration) : "--:--";
});
audio.addEventListener("durationchange", () => {
  if (Number.isFinite(audio.duration)) pTotal.textContent = fmt(audio.duration);
});
audio.addEventListener("timeupdate", () => {
  if (!Number.isFinite(audio.duration) || dragging) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  pFill.style.width = pct + "%";
  pDot.style.left = pct + "%";
  pRange.value = Math.round(pct * 10);
  pNow.textContent = fmt(audio.currentTime);
});
audio.addEventListener("ended", () => select(current + 1, true));
audio.addEventListener("pause", () => {
  pIconPlay.style.display = "block";
  pIconPause.style.display = "none";
  player.classList.remove("playing");
});

pRange.addEventListener("pointerdown", () => { dragging = true; });
pRange.addEventListener("pointerup", () => { dragging = false; });
pRange.addEventListener("input", () => {
  const pct = Number(pRange.value) / 10;
  pFill.style.width = pct + "%";
  pDot.style.left = pct + "%";
  pNow.textContent = fmt((pct / 100) * (audio.duration || 0));
});
pRange.addEventListener("change", () => {
  dragging = false;
  if (!audio.duration) return;
  audio.currentTime = (Number(pRange.value) / 1000) * audio.duration;
});

/* ---------- 自动播放 ---------- */
renderList();
select(0, false);

function tryAutoplay() {
  if (started) return;
  play();   // 统一走 play()：拦截/缓冲都交给 canplay 重试
}

window.addEventListener("load", tryAutoplay);

/* 浏览器拦截自动播放时，交给第一次交互 */
["pointerdown", "keydown", "touchstart"].forEach((ev) => {
  window.addEventListener(ev, () => { if (!started) tryAutoplay(); }, { passive: true });
});

/* 点空白处收起面板 */
document.addEventListener("click", (e) => {
  if (pPanel.hidden) return;
  if (!player.contains(e.target)) {
    pPanel.hidden = true;
    pFab.setAttribute("aria-expanded", "false");
  }
});

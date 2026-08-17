(function () {
  "use strict";

  var STAR_KEY = "childgame-stars";
  var SOUND_KEY = "childgame-sound";
  var FRUITS = ["🍎", "🍊", "🍋", "🍇", "🍓", "🍑", "🍒", "🍌", "🍉", "🥝", "⭐", "🍐"];
  var ANIMALS = ["🐶", "🐱", "🐰", "🐻", "🐼", "🐸", "🐵", "🐥", "🐧", "🦊"];
  var PRAISE = ["好棒！", "答對了！"];

  var TRACE = {
    1: {
      viewBox: "0 0 240 280",
      d: "M 86 58 L 128 32 L 128 242",
      dots: [
        [86, 58],
        [128, 32],
        [128, 102],
        [128, 172],
        [128, 242],
      ],
    },
    2: {
      viewBox: "0 0 240 280",
      d: "M 48 92 C 52 28 188 22 192 92 C 194 140 70 168 50 242 L 198 242",
      dots: [
        [62, 58],
        [150, 36],
        [188, 100],
        [108, 168],
        [50, 242],
        [198, 242],
      ],
    },
    3: {
      viewBox: "0 0 240 280",
      d: "M 52 58 C 196 12 204 128 112 140 C 208 150 200 268 50 236",
      dots: [
        [58, 52],
        [168, 42],
        [140, 108],
        [112, 140],
        [176, 200],
        [50, 236],
      ],
    },
    4: {
      viewBox: "0 0 240 280",
      d: "M 158 32 L 42 168 L 208 168 M 158 32 L 158 248",
      dots: [
        [158, 32],
        [100, 100],
        [42, 168],
        [208, 168],
        [158, 208],
        [158, 248],
      ],
    },
    5: {
      viewBox: "0 0 240 280",
      d: "M 188 38 L 58 38 L 50 128 C 58 108 198 100 196 186 C 194 258 52 268 52 228",
      dots: [
        [188, 38],
        [58, 38],
        [50, 128],
        [150, 128],
        [196, 186],
        [52, 228],
      ],
    },
    6: {
      viewBox: "0 0 240 280",
      d: "M 168 42 C 48 58 32 250 128 252 C 214 254 220 148 118 144",
      dots: [
        [168, 42],
        [78, 88],
        [44, 168],
        [128, 252],
        [196, 196],
        [118, 144],
      ],
    },
    7: {
      viewBox: "0 0 240 280",
      d: "M 42 42 L 200 42 L 88 248",
      dots: [
        [42, 42],
        [200, 42],
        [156, 122],
        [88, 248],
      ],
    },
    8: {
      viewBox: "0 0 240 280",
      d: "M 120 32 C 198 32 202 132 120 140 C 38 148 36 32 120 32 M 120 140 C 210 148 208 258 120 258 C 32 258 30 148 120 140",
      dots: [
        [120, 32],
        [186, 80],
        [120, 140],
        [48, 198],
        [120, 258],
        [192, 198],
      ],
    },
    9: {
      viewBox: "0 0 240 280",
      d: "M 128 34 C 210 34 214 146 128 146 C 42 146 40 34 128 34 M 196 92 L 158 248",
      dots: [
        [128, 34],
        [48, 88],
        [128, 146],
        [196, 92],
        [180, 168],
        [158, 248],
      ],
    },
    10: {
      viewBox: "0 0 340 280",
      d: "M 58 58 L 92 32 L 92 242 M 220 40 C 300 40 304 240 220 240 C 136 240 132 40 220 40",
      dots: [
        [58, 58],
        [92, 32],
        [92, 242],
        [220, 40],
        [292, 140],
        [220, 240],
      ],
    },
  };

  var LEVELS = [
    { id: "count", name: "數一數", hint: "數一數有幾個", emoji: "🍎", cls: "c1" },
    { id: "match", name: "連連看", hint: "畫線連起來", emoji: "🔢", cls: "c2" },
    { id: "next", name: "下一個是誰", hint: "3 4 5 ？", emoji: "➡️", cls: "c3" },
    { id: "trace", name: "描一描", hint: "跟著點 1～10", emoji: "✏️", cls: "c4" },
    { id: "more", name: "誰比較多", hint: "哪一邊比較多", emoji: "🍉", cls: "c5" },
    { id: "ord", name: "第幾個", hint: "從左邊數第幾個", emoji: "5️⃣", cls: "c6" },
    { id: "missing", name: "缺了誰", hint: "少了哪個數字", emoji: "❓", cls: "c7" },
    { id: "bond", name: "湊一湊", hint: "再拿幾個才滿", emoji: "🍇", cls: "c8" },
  ];

  var audioCtx = null;
  var state = {
    screen: "home",
    levelId: null,
    qIndex: 0,
    questions: [],
    starsTotal: loadStars(),
    starsRun: 0,
    soundOn: loadSound(),
    foxMsg: "選一關開始吧！",
    foxMood: "idle",
    feedback: null,
    locked: false,
    traceNext: 0,
    choiceMark: null,
    matchDone: {},
  };

  var matchDraw = {
    active: false,
    pointerId: null,
    startSide: null,
    startPair: -1,
    points: [],
  };

  var app = document.getElementById("app");

  function loadStars() {
    try {
      var n = parseInt(localStorage.getItem(STAR_KEY) || "0", 10);
      return isFinite(n) && n > 0 ? n : 0;
    } catch (e) {
      return 0;
    }
  }

  function saveStars(n) {
    state.starsTotal = n;
    try {
      localStorage.setItem(STAR_KEY, String(n));
    } catch (e) {}
  }

  function loadSound() {
    try {
      return localStorage.getItem(SOUND_KEY) !== "off";
    } catch (e) {
      return true;
    }
  }

  function saveSound(on) {
    state.soundOn = on;
    try {
      localStorage.setItem(SOUND_KEY, on ? "on" : "off");
    } catch (e) {}
  }

  function randInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function pick(list) {
    return list[randInt(0, list.length - 1)];
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function makeChoices(correct, min, max, extraForbid) {
    var forbid = {};
    forbid[correct] = true;
    if (extraForbid) {
      extraForbid.forEach(function (n) {
        forbid[n] = true;
      });
    }
    var pool = [];
    var far = [];
    for (var n = min; n <= max; n++) {
      if (forbid[n]) continue;
      pool.push(n);
      if (Math.abs(n - correct) >= 2) far.push(n);
    }
    var use = far.length >= 2 ? far : pool;
    var wrongs = shuffle(use).slice(0, 2);
    while (wrongs.length < 2) {
      var w = randInt(min, max);
      if (w !== correct && wrongs.indexOf(w) === -1) wrongs.push(w);
    }
    return shuffle([correct].concat(wrongs));
  }

  function gridShape(count) {
    if (count <= 5) return { cols: count, rows: 1 };
    if (count <= 8) return { cols: Math.ceil(count / 2), rows: 2 };
    if (count === 9) return { cols: 3, rows: 3 };
    return { cols: 5, rows: 2 };
  }

  function groupShape(count) {
    if (count <= 2) return { cols: count, rows: 1 };
    if (count <= 4) return { cols: 2, rows: 2 };
    if (count <= 6) return { cols: 3, rows: 2 };
    if (count <= 9) return { cols: 3, rows: 3 };
    return { cols: 5, rows: 2 };
  }

  function makeCountQuestions() {
    var qs = [];
    var prev = 0;
    for (var i = 0; i < 8; i++) {
      var max = i < 3 ? 5 : 10;
      var n;
      do {
        n = randInt(1, max);
      } while (n === prev && max > 1);
      prev = n;
      qs.push({
        count: n,
        fruit: pick(FRUITS),
        choices: makeChoices(n, 1, max),
      });
    }
    return qs;
  }

  function rowsSharePair(left, right) {
    for (var i = 0; i < left.length; i++) {
      if (left[i].pair === right[i].pair) return true;
    }
    return false;
  }

  function derangeRight(rightSrc, left) {
    var right = rightSrc;
    var tries = 0;
    do {
      right = shuffle(rightSrc);
      tries += 1;
    } while (tries < 24 && rowsSharePair(left, right));
    return right;
  }

  function makeMatchQuestions() {
    var qs = [];
    for (var i = 0; i < 8; i++) {
      var pairCount = i < 4 ? 2 : 3;
      var nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, pairCount);
      var animals = shuffle(ANIMALS).slice(0, pairCount);
      var left = [];
      var rightSrc = [];
      for (var p = 0; p < pairCount; p++) {
        left.push({ pair: p, n: nums[p] });
        rightSrc.push({ pair: p, count: nums[p], animal: animals[p] });
      }
      left = shuffle(left);
      qs.push({ left: left, right: derangeRight(rightSrc, left) });
    }
    return qs;
  }

  function makeNextQuestions() {
    var three = shuffle([1, 2, 3, 4, 5, 6, 7]).slice(0, 7).map(function (s) {
      return { shown: [s, s + 1, s + 2], answer: s + 3 };
    });
    var two = { shown: [8, 9], answer: 10 };
    return shuffle(three.concat([two])).map(function (q) {
      q.choices = makeChoices(q.answer, 1, 10, q.shown);
      return q;
    });
  }

  function makeTraceQuestions() {
    var qs = [];
    for (var n = 1; n <= 10; n++) qs.push({ n: n });
    return qs;
  }

  function makeMoreQuestions() {
    var qs = [];
    var equalAt = [randInt(0, 3), randInt(4, 7)];
    var prevKey = "";
    for (var i = 0; i < 8; i++) {
      var isEqual = equalAt.indexOf(i) !== -1;
      var left = 1;
      var right = 1;
      var tries = 0;
      do {
        if (isEqual) {
          left = right = randInt(1, 10);
        } else {
          var lo = randInt(1, 10);
          var diff = randInt(1, 3);
          var hi = lo + diff;
          if (hi > 10) {
            hi = lo;
            lo = hi - diff;
            if (lo < 1) {
              lo = 1;
              hi = Math.min(10, lo + diff);
            }
          }
          if (lo === hi && hi < 10) hi += 1;
          if (lo === hi && lo > 1) lo -= 1;
          if (Math.random() < 0.5) {
            left = lo;
            right = hi;
          } else {
            left = hi;
            right = lo;
          }
        }
        tries += 1;
      } while (left + ":" + right === prevKey && tries < 10);
      prevKey = left + ":" + right;
      qs.push({
        left: left,
        right: right,
        equal: left === right,
        answer: left === right ? "same" : left > right ? "left" : "right",
        icon: pick(FRUITS.concat(ANIMALS)),
      });
    }
    return qs;
  }

  function makeOrdQuestions() {
    var qs = [];
    var prev = 0;
    for (var i = 0; i < 8; i++) {
      var len = i < 5 ? randInt(5, 6) : randInt(6, 7);
      var maxOrd = i < 5 ? Math.min(5, len) : len;
      var target;
      do {
        target = randInt(1, maxOrd);
      } while (target === prev && maxOrd > 1);
      prev = target;
      qs.push({
        animals: shuffle(ANIMALS).slice(0, len),
        target: target,
      });
    }
    return qs;
  }

  function makeMissingQuestions() {
    var combos = [];
    for (var s = 1; s <= 7; s++) {
      for (var h = 0; h < 4; h++) {
        combos.push({ start: s, hole: h });
      }
    }
    return shuffle(combos)
      .slice(0, 8)
      .map(function (c) {
        var tiles = [];
        var answer = 0;
        for (var i = 0; i < 4; i++) {
          var n = c.start + i;
          if (i === c.hole) {
            tiles.push(null);
            answer = n;
          } else {
            tiles.push(n);
          }
        }
        return {
          tiles: tiles,
          answer: answer,
          choices: makeChoices(answer, 1, 10),
        };
      });
  }

  function makeBondQuestions() {
    var qs = [];
    var prev = 0;
    for (var i = 0; i < 8; i++) {
      var target = i < 4 ? 5 : 10;
      var minN = i < 4 ? 1 : 3;
      var maxN = i < 4 ? 4 : 7;
      var n;
      do {
        n = randInt(minN, maxN);
      } while (n === prev);
      prev = n;
      var more = target - n;
      qs.push({
        shown: n,
        target: target,
        more: more,
        fruit: pick(FRUITS),
        choices: makeChoices(more, 1, target - 1),
      });
    }
    return qs;
  }

  function foxPrompt() {
    var q = state.questions[state.qIndex];
    if (state.levelId === "count") return "數一數，有幾個？";
    if (state.levelId === "match") return "把一樣多的連起來";
    if (state.levelId === "next") return "下一個數字是誰？";
    if (state.levelId === "trace") return "照著順序點一點";
    if (state.levelId === "more") {
      return q && q.equal ? "一樣多還是有一邊比較多？" : "哪一邊比較多？";
    }
    if (state.levelId === "ord") return "從左邊數，第幾個？";
    if (state.levelId === "missing") return "少了哪個數字？";
    if (state.levelId === "bond") return "還要幾個才滿？";
    return "選一關開始吧！";
  }

  function isLevelId(id) {
    for (var i = 0; i < LEVELS.length; i++) {
      if (LEVELS[i].id === id) return true;
    }
    return false;
  }

  function ensureAudio() {
    if (!state.soundOn) return null;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function beep(freq, dur, type, gain) {
    var ctx = ensureAudio();
    if (!ctx) return;
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.type = type || "sine";
    o.frequency.value = freq;
    g.gain.setValueAtTime(gain || 0.07, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + dur);
  }

  function playTap() {
    beep(520, 0.06, "sine", 0.04);
  }

  function playCorrect() {
    beep(523, 0.1, "sine", 0.07);
    setTimeout(function () {
      beep(659, 0.1, "sine", 0.07);
    }, 90);
    setTimeout(function () {
      beep(784, 0.16, "sine", 0.08);
    }, 180);
  }

  function playWrong() {
    beep(196, 0.16, "triangle", 0.045);
  }

  function playStar() {
    beep(784, 0.1, "sine", 0.07);
    setTimeout(function () {
      beep(1046, 0.2, "sine", 0.08);
    }, 110);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function foxImg() {
    return '<img class="fox ' + state.foxMood + '" src="./fox.svg" alt="小狐狸老師" width="108" height="108">';
  }

  function topTools(extraLeft) {
    return (
      '<div class="topbar">' +
      (extraLeft || '<span></span>') +
      '<div class="home-tools">' +
      '<button class="icon-btn" type="button" data-action="sound" aria-label="' +
      (state.soundOn ? "關閉聲音" : "打開聲音") +
      '">' +
      (state.soundOn ? "🔊" : "🔇") +
      "</button>" +
      '<button class="icon-btn" type="button" data-action="fullscreen" aria-label="全螢幕">⛶</button>' +
      "</div></div>"
    );
  }

  function renderHome() {
    var cards = LEVELS.map(function (lv) {
      return (
        '<button class="level-card ' +
        lv.cls +
        '" type="button" data-action="start" data-level="' +
        lv.id +
        '">' +
        '<span class="emoji">' +
        lv.emoji +
        "</span>" +
        '<span class="name">' +
        lv.name +
        "</span>" +
        '<span class="hint">' +
        lv.hint +
        "</span></button>"
      );
    }).join("");

    return (
      '<div class="shell is-home">' +
      topTools('<h1 class="title">數字小探險</h1>') +
      '<div class="fox-row">' +
      foxImg() +
      '<p class="speech" aria-live="polite">' +
      escapeHtml(state.foxMsg) +
      "</p></div>" +
      '<div class="level-grid">' +
      cards +
      "</div>" +
      '<div class="home-foot">' +
      '<div class="star-chip" aria-label="星星總數">⭐ ' +
      state.starsTotal +
      "</div>" +
      "<span></span></div></div>"
    );
  }

  function progressLabel() {
    if (state.levelId === "trace") {
      var n = state.questions[state.qIndex] && state.questions[state.qIndex].n;
      return "數字 " + n;
    }
    return state.qIndex + 1 + " / 8";
  }

  function playChrome() {
    return (
      '<div class="topbar">' +
      '<button class="home-btn" type="button" data-action="home" aria-label="回家">🏠</button>' +
      '<div class="progress-chip">' +
      progressLabel() +
      "</div>" +
      '<div class="star-chip">⭐ ' +
      state.starsTotal +
      "</div></div>" +
      '<div class="fox-row">' +
      foxImg() +
      '<p class="speech" aria-live="polite">' +
      escapeHtml(state.foxMsg) +
      "</p></div>"
    );
  }

  function renderCount(q) {
    var shape = gridShape(q.count);
    var cells = "";
    for (var i = 0; i < q.count; i++) {
      cells += '<span class="count-cell">' + q.fruit + "</span>";
    }
    var buttons = q.choices
      .map(function (n) {
        var mark = state.choiceMark && state.choiceMark.value === n ? " " + state.choiceMark.cls : "";
        return (
          '<button class="choice' +
          mark +
          '" type="button" data-action="answer" data-value="' +
          n +
          '">' +
          n +
          "</button>"
        );
      })
      .join("");
    return (
      '<div class="play-col">' +
      '<div class="prompt">有幾個呢？</div>' +
      '<div class="count-stage"><div class="count-grid" style="--cols:' +
      shape.cols +
      ";--rows:" +
      shape.rows +
      '">' +
      cells +
      "</div></div>" +
      '<div class="choices">' +
      buttons +
      "</div></div>"
    );
  }

  function renderMatch(q) {
    var left = q.left
      .map(function (item) {
        var done = state.matchDone[item.pair] ? " done" : "";
        return (
          '<div class="match-num' +
          done +
          '" data-match-side="left" data-match-pair="' +
          item.pair +
          '" role="button" aria-label="數字 ' +
          item.n +
          '">' +
          item.n +
          "</div>"
        );
      })
      .join("");
    var right = q.right
      .map(function (item) {
        var shape = groupShape(item.count);
        var cells = "";
        for (var i = 0; i < item.count; i++) {
          cells += '<span class="group-cell">' + item.animal + "</span>";
        }
        var done = state.matchDone[item.pair] ? " done" : "";
        return (
          '<div class="match-group' +
          done +
          '" data-match-side="right" data-match-pair="' +
          item.pair +
          '" role="button" aria-label="這一群有 ' +
          item.count +
          ' 個">' +
          '<div class="group-grid" style="--cols:' +
          shape.cols +
          ";--rows:" +
          shape.rows +
          '">' +
          cells +
          "</div></div>"
        );
      })
      .join("");
    return (
      '<div class="play-col">' +
      '<div class="prompt">畫線連連看</div>' +
      '<div class="match-stage">' +
      '<div class="match-board" style="--pairs:' +
      q.left.length +
      '">' +
      '<div class="match-col match-left">' +
      left +
      "</div>" +
      '<div class="match-col match-right">' +
      right +
      "</div></div>" +
      '<svg class="match-lines" aria-hidden="true"></svg>' +
      "</div></div>"
    );
  }

  function renderNext(q) {
    var tiles = q.shown
      .map(function (n) {
        return '<div class="seq-tile">' + n + "</div>";
      })
      .join("");
    tiles += '<div class="seq-tile ask">？</div>';
    var buttons = q.choices
      .map(function (n) {
        var mark = state.choiceMark && state.choiceMark.value === n ? " " + state.choiceMark.cls : "";
        return (
          '<button class="choice' +
          mark +
          '" type="button" data-action="answer" data-value="' +
          n +
          '">' +
          n +
          "</button>"
        );
      })
      .join("");
    return (
      '<div class="play-col">' +
      '<div class="prompt">下一個數字是誰？</div>' +
      '<div class="next-stage"><div class="seq">' +
      tiles +
      "</div></div>" +
      '<div class="choices">' +
      buttons +
      "</div></div>"
    );
  }

  function renderTrace(q) {
    var spec = TRACE[q.n];
    var dots = spec.dots
      .map(function (pt, i) {
        var cls = i < state.traceNext ? "done" : i === state.traceNext ? "next" : "wait";
        var labelFill = cls === "wait" ? "#1b2a4a" : "#1b2a4a";
        if (cls === "next") labelFill = "#fff";
        return (
          '<g data-action="dot" data-value="' +
          i +
          '">' +
          '<circle class="dot-hit" cx="' +
          pt[0] +
          '" cy="' +
          pt[1] +
          '" r="28"></circle>' +
          '<circle class="dot-face ' +
          cls +
          '" cx="' +
          pt[0] +
          '" cy="' +
          pt[1] +
          '" r="16"></circle>' +
          '<text class="dot-label" x="' +
          pt[0] +
          '" y="' +
          pt[1] +
          '" fill="' +
          labelFill +
          '">' +
          (i + 1) +
          "</text></g>"
        );
      })
      .join("");
    return (
      '<div class="play-col">' +
      '<div class="prompt">照順序點一點</div>' +
      '<div class="trace-stage"><svg viewBox="' +
      spec.viewBox +
      '" role="img" aria-label="數字 ' +
      q.n +
      '">' +
      '<path class="numeral" d="' +
      spec.d +
      '"></path>' +
      dots +
      "</svg></div></div>"
    );
  }

  function renderMoreGroup(count, icon, side) {
    var shape = groupShape(count);
    var cells = "";
    for (var i = 0; i < count; i++) {
      cells += '<span class="group-cell">' + icon + "</span>";
    }
    var mark = state.choiceMark && state.choiceMark.value === side ? " " + state.choiceMark.cls : "";
    return (
      '<button class="group' +
      mark +
      '" type="button" data-action="answer" data-value="' +
      side +
      '" aria-label="這一邊有 ' +
      count +
      ' 個">' +
      '<div class="group-grid" style="--cols:' +
      shape.cols +
      ";--rows:" +
      shape.rows +
      '">' +
      cells +
      "</div></button>"
    );
  }

  function renderMore(q) {
    var sameMark = state.choiceMark && state.choiceMark.value === "same" ? " " + state.choiceMark.cls : "";
    return (
      '<div class="play-col">' +
      '<div class="prompt">' +
      (q.equal ? "一樣多還是有一邊比較多？" : "哪一邊比較多？") +
      "</div>" +
      '<div class="more-stage"><div class="more-wrap">' +
      '<div class="more-groups">' +
      renderMoreGroup(q.left, q.icon, "left") +
      renderMoreGroup(q.right, q.icon, "right") +
      "</div>" +
      '<button class="same-btn' +
      sameMark +
      '" type="button" data-action="answer" data-value="same">一樣多</button>' +
      "</div></div></div>"
    );
  }

  function renderOrd(q) {
    var items = q.animals
      .map(function (em, idx) {
        var mark = state.choiceMark && state.choiceMark.value === idx ? " " + state.choiceMark.cls : "";
        return (
          '<button class="ord-item' +
          mark +
          '" type="button" data-action="answer" data-value="' +
          idx +
          '" aria-label="第 ' +
          (idx + 1) +
          ' 個">' +
          em +
          "</button>"
        );
      })
      .join("");
    return (
      '<div class="play-col">' +
      '<div class="prompt">點第 <span class="prompt-num">' +
      q.target +
      "</span> 個</div>" +
      '<div class="ord-stage"><div class="ord-row">' +
      items +
      "</div></div></div>"
    );
  }

  function renderMissing(q) {
    var tiles = q.tiles
      .map(function (n) {
        if (n == null) return '<div class="seq-tile ask">？</div>';
        return '<div class="seq-tile">' + n + "</div>";
      })
      .join("");
    var buttons = q.choices
      .map(function (n) {
        var mark = state.choiceMark && state.choiceMark.value === n ? " " + state.choiceMark.cls : "";
        return (
          '<button class="choice' +
          mark +
          '" type="button" data-action="answer" data-value="' +
          n +
          '">' +
          n +
          "</button>"
        );
      })
      .join("");
    return (
      '<div class="play-col">' +
      '<div class="prompt">少了哪個數字？</div>' +
      '<div class="missing-stage"><div class="seq">' +
      tiles +
      "</div></div>" +
      '<div class="choices">' +
      buttons +
      "</div></div>"
    );
  }

  function renderBond(q) {
    var shape = gridShape(q.target);
    var cells = "";
    var i;
    for (i = 0; i < q.shown; i++) {
      cells += '<span class="count-cell">' + q.fruit + "</span>";
    }
    for (i = q.shown; i < q.target; i++) {
      cells += '<span class="count-cell"><span class="bond-slot" aria-hidden="true"></span></span>';
    }
    var buttons = q.choices
      .map(function (n) {
        var mark = state.choiceMark && state.choiceMark.value === n ? " " + state.choiceMark.cls : "";
        return (
          '<button class="choice' +
          mark +
          '" type="button" data-action="answer" data-value="' +
          n +
          '">' +
          n +
          "</button>"
        );
      })
      .join("");
    return (
      '<div class="play-col">' +
      '<div class="prompt">再拿幾個變成 <span class="prompt-num">' +
      q.target +
      "</span>？</div>" +
      '<div class="bond-stage"><div class="count-grid" style="--cols:' +
      shape.cols +
      ";--rows:" +
      shape.rows +
      '">' +
      cells +
      "</div></div>" +
      '<div class="choices">' +
      buttons +
      "</div></div>"
    );
  }

  function renderPlay() {
    var q = state.questions[state.qIndex];
    var body = "";
    if (state.levelId === "count") body = renderCount(q);
    if (state.levelId === "match") body = renderMatch(q);
    if (state.levelId === "next") body = renderNext(q);
    if (state.levelId === "trace") body = renderTrace(q);
    if (state.levelId === "more") body = renderMore(q);
    if (state.levelId === "ord") body = renderOrd(q);
    if (state.levelId === "missing") body = renderMissing(q);
    if (state.levelId === "bond") body = renderBond(q);
    return '<div class="shell">' + playChrome() + body + "</div>";
  }

  function renderClear() {
    return (
      '<div class="shell">' +
      topTools("<span></span>") +
      '<div class="clear">' +
      foxImg() +
      "<h2>你好棒！</h2>" +
      '<p class="star-burst">⭐ × ' +
      state.starsRun +
      "</p>" +
      "<p>這次得到 " +
      state.starsRun +
      " 顆星</p>" +
      "<p>總共 ⭐ " +
      state.starsTotal +
      "</p>" +
      '<button class="again" type="button" data-action="home">再玩一次</button>' +
      "</div></div>"
    );
  }

  function render() {
    if (state.screen === "home") app.innerHTML = renderHome();
    else if (state.screen === "clear") app.innerHTML = renderClear();
    else app.innerHTML = renderPlay();
    if (state.screen === "play" && state.levelId === "match") {
      requestAnimationFrame(drawDoneLines);
    }
  }

  function resetMatchDraw() {
    matchDraw.active = false;
    matchDraw.pointerId = null;
    matchDraw.startSide = null;
    matchDraw.startPair = -1;
    matchDraw.points = [];
  }

  function matchStage() {
    return app.querySelector(".match-stage");
  }

  function stagePoint(e) {
    var stage = matchStage();
    if (!stage) return { x: 0, y: 0 };
    var r = stage.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function nodeCenter(el) {
    var stage = matchStage();
    if (!stage || !el) return { x: 0, y: 0 };
    var sr = stage.getBoundingClientRect();
    var r = el.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - sr.left,
      y: r.top + r.height / 2 - sr.top,
    };
  }

  function pathFromPoints(pts) {
    if (!pts.length) return "";
    var d = "M " + pts[0].x + " " + pts[0].y;
    for (var i = 1; i < pts.length; i++) {
      d += " L " + pts[i].x + " " + pts[i].y;
    }
    return d;
  }

  function setFox(msg, mood) {
    state.foxMsg = msg;
    if (mood) state.foxMood = mood;
    var speech = app.querySelector(".speech");
    var fox = app.querySelector(".fox");
    if (speech) speech.textContent = msg;
    if (fox && mood) fox.className = "fox " + mood;
  }

  function matchNodeFromPoint(x, y) {
    var el = document.elementFromPoint(x, y);
    return el ? el.closest("[data-match-pair]") : null;
  }

  function clearMatchAim() {
    var nodes = app.querySelectorAll("[data-match-pair].aim");
    for (var i = 0; i < nodes.length; i++) nodes[i].classList.remove("aim");
  }

  function syncMatchSvg() {
    var stage = matchStage();
    var svg = stage && stage.querySelector(".match-lines");
    if (!stage || !svg) return null;
    var r = stage.getBoundingClientRect();
    svg.setAttribute("viewBox", "0 0 " + Math.max(1, r.width) + " " + Math.max(1, r.height));
    return svg;
  }

  function drawDoneLines() {
    var svg = syncMatchSvg();
    if (!svg || !state.questions[state.qIndex]) return;
    var q = state.questions[state.qIndex];
    var html = "";
    q.left.forEach(function (item) {
      if (!state.matchDone[item.pair]) return;
      var a = app.querySelector('[data-match-side="left"][data-match-pair="' + item.pair + '"]');
      var b = app.querySelector('[data-match-side="right"][data-match-pair="' + item.pair + '"]');
      if (!a || !b) return;
      var p1 = nodeCenter(a);
      var p2 = nodeCenter(b);
      html +=
        '<path class="match-stroke done" d="M ' +
        p1.x +
        " " +
        p1.y +
        " L " +
        p2.x +
        " " +
        p2.y +
        '"></path>';
    });
    svg.innerHTML = html;
    if (matchDraw.active && matchDraw.points.length) {
      var live = document.createElementNS("http://www.w3.org/2000/svg", "path");
      live.setAttribute("class", "match-stroke live");
      live.setAttribute("d", pathFromPoints(matchDraw.points));
      svg.appendChild(live);
    }
  }

  function updateLiveStroke() {
    var svg = syncMatchSvg();
    if (!svg) return;
    var live = svg.querySelector(".match-stroke.live");
    if (!live) {
      live = document.createElementNS("http://www.w3.org/2000/svg", "path");
      live.setAttribute("class", "match-stroke live");
      svg.appendChild(live);
    }
    live.setAttribute("d", pathFromPoints(matchDraw.points));
  }

  function fadeLiveStroke() {
    var svg = app.querySelector(".match-lines");
    var live = svg && svg.querySelector(".match-stroke.live");
    resetMatchDraw();
    clearMatchAim();
    var hold = app.querySelector("[data-match-pair].hold");
    if (hold) hold.classList.remove("hold");
    if (!live) return;
    live.classList.add("fade");
    setTimeout(function () {
      if (live.parentNode) live.parentNode.removeChild(live);
    }, 420);
  }

  function matchCorrectPair(pair) {
    state.matchDone[pair] = true;
    playCorrect();
    resetMatchDraw();
    clearMatchAim();
    var nodes = app.querySelectorAll('[data-match-pair="' + pair + '"]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].classList.add("done");
      nodes[i].classList.remove("hold");
    }
    drawDoneLines();
    var q = state.questions[state.qIndex];
    var all = true;
    for (var p = 0; p < q.left.length; p++) {
      if (!state.matchDone[q.left[p].pair]) all = false;
    }
    if (all) {
      state.locked = true;
      setFox(pick(PRAISE), "happy");
      setTimeout(nextQuestion, 900);
    } else {
      setFox(pick(PRAISE), "happy");
      setTimeout(function () {
        if (state.levelId === "match" && state.screen === "play" && !state.locked) {
          setFox("把一樣多的連起來", "idle");
        }
      }, 700);
    }
  }

  function matchWrongPair() {
    playWrong();
    setFox("再看一次", "think");
    fadeLiveStroke();
    setTimeout(function () {
      if (state.levelId === "match" && state.screen === "play" && state.foxMood === "think") {
        setFox(state.foxMsg, "idle");
      }
    }, 850);
  }

  function onMatchPointerDown(e) {
    if (state.locked || state.screen !== "play" || state.levelId !== "match") return;
    if (matchDraw.active) return;
    var node = e.target.closest("[data-match-pair]");
    if (!node || node.classList.contains("done")) return;
    e.preventDefault();
    try {
      node.setPointerCapture(e.pointerId);
    } catch (err) {}
    matchDraw.active = true;
    matchDraw.pointerId = e.pointerId;
    matchDraw.startSide = node.getAttribute("data-match-side");
    matchDraw.startPair = parseInt(node.getAttribute("data-match-pair"), 10);
    matchDraw.points = [nodeCenter(node), stagePoint(e)];
    node.classList.add("hold");
    updateLiveStroke();
  }

  function onMatchPointerMove(e) {
    if (!matchDraw.active || matchDraw.pointerId !== e.pointerId) return;
    e.preventDefault();
    var pt = stagePoint(e);
    var last = matchDraw.points[matchDraw.points.length - 1];
    if (!last || Math.abs(pt.x - last.x) + Math.abs(pt.y - last.y) >= 2) {
      matchDraw.points.push(pt);
    }
    updateLiveStroke();
    clearMatchAim();
    var over = matchNodeFromPoint(e.clientX, e.clientY);
    if (
      over &&
      !over.classList.contains("done") &&
      over.getAttribute("data-match-side") !== matchDraw.startSide
    ) {
      over.classList.add("aim");
    }
  }

  function onMatchPointerUp(e) {
    if (!matchDraw.active || matchDraw.pointerId !== e.pointerId) return;
    e.preventDefault();
    var over = matchNodeFromPoint(e.clientX, e.clientY);
    var startPair = matchDraw.startPair;
    var startSide = matchDraw.startSide;
    var hold = app.querySelector("[data-match-pair].hold");
    if (hold) hold.classList.remove("hold");
    if (
      over &&
      !over.classList.contains("done") &&
      over.getAttribute("data-match-side") &&
      over.getAttribute("data-match-side") !== startSide
    ) {
      var endPair = parseInt(over.getAttribute("data-match-pair"), 10);
      if (endPair === startPair) matchCorrectPair(startPair);
      else matchWrongPair();
      return;
    }
    fadeLiveStroke();
  }

  function startLevel(id) {
    if (location.hash !== "#" + id) {
      try {
        history.replaceState(null, "", "#" + id);
      } catch (e) {}
    }
    state.levelId = id;
    state.qIndex = 0;
    state.starsRun = 0;
    state.feedback = null;
    state.locked = false;
    state.choiceMark = null;
    state.traceNext = 0;
    state.matchDone = {};
    resetMatchDraw();
    state.foxMood = "idle";
    if (id === "count") state.questions = makeCountQuestions();
    else if (id === "match") state.questions = makeMatchQuestions();
    else if (id === "next") state.questions = makeNextQuestions();
    else if (id === "trace") state.questions = makeTraceQuestions();
    else if (id === "more") state.questions = makeMoreQuestions();
    else if (id === "ord") state.questions = makeOrdQuestions();
    else if (id === "missing") state.questions = makeMissingQuestions();
    else if (id === "bond") state.questions = makeBondQuestions();
    else return;
    state.foxMsg = foxPrompt();
    state.screen = "play";
    render();
  }

  function goHome() {
    if (location.hash) {
      try {
        history.replaceState(null, "", location.pathname + location.search);
      } catch (e) {}
    }
    state.screen = "home";
    state.levelId = null;
    state.foxMsg = "選一關開始吧！";
    state.foxMood = "idle";
    state.locked = false;
    state.choiceMark = null;
    state.matchDone = {};
    resetMatchDraw();
    render();
  }

  function finishLevel() {
    state.starsRun = 1;
    saveStars(state.starsTotal + 1);
    state.screen = "clear";
    state.foxMsg = "你好棒！";
    state.foxMood = "happy";
    playStar();
    render();
  }

  function nextQuestion() {
    state.choiceMark = null;
    state.traceNext = 0;
    state.matchDone = {};
    resetMatchDraw();
    state.locked = false;
    state.foxMood = "idle";
    if (state.qIndex + 1 >= state.questions.length) {
      finishLevel();
      return;
    }
    state.qIndex += 1;
    state.foxMsg = foxPrompt();
    render();
  }

  function markCorrect(value) {
    state.locked = true;
    state.choiceMark = { value: value, cls: "ok" };
    state.foxMsg = pick(PRAISE);
    state.foxMood = "happy";
    playCorrect();
    render();
    setTimeout(nextQuestion, 900);
  }

  function markRetry(value, msg) {
    state.locked = true;
    state.choiceMark = value == null ? null : { value: value, cls: "bad" };
    state.foxMsg = msg || "再看一次";
    state.foxMood = "think";
    playWrong();
    render();
    setTimeout(function () {
      state.locked = false;
      state.choiceMark = null;
      state.foxMood = "idle";
      render();
    }, 850);
  }

  function handleAnswer(raw) {
    if (state.locked || state.screen !== "play") return;
    var q = state.questions[state.qIndex];
    if (state.levelId === "count") {
      var n = parseInt(raw, 10);
      if (n === q.count) markCorrect(n);
      else markRetry(n, "再看一次");
      return;
    }
    if (state.levelId === "next") {
      var ans = parseInt(raw, 10);
      if (ans === q.answer) markCorrect(ans);
      else markRetry(ans, "再看一次");
      return;
    }
    if (state.levelId === "more") {
      if (raw === q.answer) markCorrect(raw);
      else markRetry(raw, "再看一次");
      return;
    }
    if (state.levelId === "ord") {
      var ord = parseInt(raw, 10);
      if (ord === q.target - 1) markCorrect(ord);
      else markRetry(ord, "再看一次");
      return;
    }
    if (state.levelId === "missing") {
      var miss = parseInt(raw, 10);
      if (miss === q.answer) markCorrect(miss);
      else markRetry(miss, "再看一次");
      return;
    }
    if (state.levelId === "bond") {
      var need = parseInt(raw, 10);
      if (need === q.more) markCorrect(need);
      else markRetry(need, "再看一次");
    }
  }

  function handleDot(raw) {
    if (state.locked || state.screen !== "play" || state.levelId !== "trace") return;
    var i = parseInt(raw, 10);
    var q = state.questions[state.qIndex];
    var spec = TRACE[q.n];
    if (i !== state.traceNext) {
      markRetry(null, "再看一次，依序點喔");
      return;
    }
    playTap();
    state.traceNext += 1;
    if (state.traceNext >= spec.dots.length) {
      state.locked = true;
      state.foxMsg = pick(PRAISE);
      state.foxMood = "happy";
      playCorrect();
      render();
      setTimeout(nextQuestion, 900);
      return;
    }
    state.foxMsg = "接著點 " + (state.traceNext + 1);
    render();
  }

  function toggleSound() {
    saveSound(!state.soundOn);
    if (state.soundOn) {
      ensureAudio();
      playTap();
    }
    render();
  }

  function toggleFullscreen() {
    var el = document.documentElement;
    var req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    var exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (exit) exit.call(document);
      } else if (req) {
        req.call(el);
      }
    } catch (e) {}
  }

  app.addEventListener("pointerdown", onMatchPointerDown);
  app.addEventListener("pointermove", onMatchPointerMove);
  app.addEventListener("pointerup", onMatchPointerUp);
  app.addEventListener("pointercancel", onMatchPointerUp);
  document.addEventListener(
    "touchmove",
    function (e) {
      if (matchDraw.active) e.preventDefault();
    },
    { passive: false }
  );
  window.addEventListener("resize", function () {
    if (state.levelId === "match" && state.screen === "play") drawDoneLines();
  });

  app.addEventListener("click", function (e) {
    var t = e.target.closest("[data-action]");
    if (!t) return;
    var action = t.getAttribute("data-action");
    if (action === "start") {
      playTap();
      startLevel(t.getAttribute("data-level"));
    } else if (action === "home") {
      playTap();
      goHome();
    } else if (action === "sound") {
      toggleSound();
    } else if (action === "fullscreen") {
      playTap();
      toggleFullscreen();
    } else if (action === "answer") {
      handleAnswer(t.getAttribute("data-value"));
    } else if (action === "dot") {
      handleDot(t.getAttribute("data-value"));
    }
  });

  function bootFromHash() {
    var id = (location.hash || "").replace("#", "");
    if (isLevelId(id)) startLevel(id);
    else if (state.screen !== "home") goHome();
  }

  window.addEventListener("hashchange", bootFromHash);

  render();
  bootFromHash();
})();

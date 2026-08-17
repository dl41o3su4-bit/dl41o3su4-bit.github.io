(function () {
  "use strict";

  var STAR_KEY = "childgame-stars";
  var SOUND_KEY = "childgame-sound";
  var FRUITS = ["🍎", "🍊", "🍋", "🍇", "🍓", "🍑", "🍒", "🍌", "🍉", "🥝", "⭐", "🍐", "🍍", "🥭", "🍈"];
  var ANIMALS = ["🐶", "🐱", "🐰", "🐻", "🐼", "🐸", "🐵", "🐥", "🐧", "🦊", "🦁", "🐯", "🐷", "🐮", "🐨"];
  var PRAISE = ["好棒！", "答對了！"];

  var TRACE = {
    1: {
      viewBox: "0 0 240 280",
      strokes: ["M 86 62 L 128 34 L 128 246"],
    },
    2: {
      viewBox: "0 0 240 280",
      strokes: ["M 52 96 C 56 30 186 24 188 96 C 190 138 86 168 58 238 L 192 238"],
    },
    3: {
      viewBox: "0 0 240 280",
      strokes: ["M 56 56 C 188 16 204 118 116 140 C 208 152 202 262 54 230"],
    },
    4: {
      viewBox: "0 0 240 280",
      strokes: ["M 162 34 L 46 170 L 204 170", "M 162 34 L 162 248"],
    },
    5: {
      viewBox: "0 0 240 280",
      strokes: ["M 186 40 L 60 40 L 52 126", "M 52 126 C 72 104 198 108 196 184 C 194 250 58 260 56 218"],
    },
    6: {
      viewBox: "0 0 240 280",
      strokes: ["M 170 44 C 50 62 34 236 124 250 C 212 260 216 152 116 148"],
    },
    7: {
      viewBox: "0 0 240 280",
      strokes: ["M 46 44 L 198 44 L 90 248"],
    },
    8: {
      viewBox: "0 0 240 280",
      strokes: [
        "M 120 34 C 196 34 200 132 120 140 C 44 148 42 34 120 34",
        "M 120 140 C 208 148 206 256 120 256 C 34 256 32 148 120 140",
      ],
    },
    9: {
      viewBox: "0 0 240 280",
      strokes: ["M 128 36 C 208 36 212 146 128 146 C 46 146 44 36 128 36", "M 196 94 L 158 248"],
    },
    10: {
      viewBox: "0 0 340 280",
      strokes: ["M 60 60 L 94 34 L 94 246", "M 220 40 C 300 40 304 240 220 240 C 136 240 132 40 220 40"],
    },
  };

  var OLD_MATH_LEVELS = [
    { id: "count", name: "數一數", hint: "數一數有幾個", emoji: "🍎", cls: "c1" },
    { id: "match", name: "連連看", hint: "找到一樣多的", emoji: "🔢", cls: "c2" },
    { id: "next", name: "下一個是誰", hint: "3 4 5 ？", emoji: "➡️", cls: "c3" },
    { id: "trace", name: "描一描", hint: "用手指描 1～10", emoji: "✏️", cls: "c4" },
  ];

  var NEW_MATH_LEVELS = [
    { id: "more", name: "誰比較多", hint: "哪一邊比較多", emoji: "🍉", cls: "c5" },
    { id: "ord", name: "第幾個", hint: "從左邊數第幾個", emoji: "5️⃣", cls: "c6" },
    { id: "missing", name: "缺了誰", hint: "少了哪個數字", emoji: "❓", cls: "c7" },
    { id: "bond", name: "湊一湊", hint: "再拿幾個才滿", emoji: "🍇", cls: "c8" },
    { id: "match-draw", name: "畫線連連看", hint: "畫線連起來", emoji: "🖍️", cls: "c9" },
  ];

  var WORD_LEVELS = [
    { id: "bpm-trace", name: "描注音", hint: "用手指描聲符", emoji: "ㄅ", cls: "w1" },
    { id: "bpm-pic", name: "圖配注音", hint: "看字選聲符", emoji: "🥟", cls: "w2" },
    { id: "bpm-draw", name: "注音連連看", hint: "看字連聲符", emoji: "🔗", cls: "w3" },
    { id: "hanzi", name: "看圖認字", hint: "圖配哪個字", emoji: "山", cls: "w4" },
  ];

  var LEVELS = OLD_MATH_LEVELS.concat(NEW_MATH_LEVELS, WORD_LEVELS);

  var BPM_ORDER = [
    "ㄅ",
    "ㄆ",
    "ㄇ",
    "ㄈ",
    "ㄉ",
    "ㄊ",
    "ㄋ",
    "ㄌ",
    "ㄍ",
    "ㄎ",
    "ㄏ",
    "ㄐ",
    "ㄑ",
    "ㄒ",
    "ㄓ",
    "ㄔ",
    "ㄕ",
    "ㄖ",
    "ㄗ",
    "ㄘ",
    "ㄙ",
  ];

  var BPM_TRACE = {
    ㄅ: {
      viewBox: "0 0 240 280",
      strokes: ["M 84 40 L 70 248", "M 84 40 L 172 46 C 216 70 214 152 148 184"],
    },
    ㄆ: {
      viewBox: "0 0 240 280",
      strokes: ["M 46 30 L 126 84", "M 88 70 L 88 248", "M 88 102 L 182 102 C 220 124 216 188 154 216"],
    },
    ㄇ: {
      viewBox: "0 0 240 280",
      strokes: ["M 58 44 L 58 246", "M 58 44 L 184 44 L 184 246"],
    },
    ㄈ: {
      viewBox: "0 0 240 280",
      strokes: ["M 56 46 L 188 46", "M 56 46 L 56 236 L 188 236"],
    },
    ㄉ: {
      viewBox: "0 0 240 280",
      strokes: ["M 62 42 L 152 98", "M 180 62 C 222 108 208 204 58 242"],
    },
    ㄊ: {
      viewBox: "0 0 240 280",
      strokes: ["M 44 48 L 196 48", "M 128 48 L 58 140 L 184 140", "M 166 140 L 166 248"],
    },
    ㄋ: {
      viewBox: "0 0 240 280",
      strokes: ["M 64 48 L 172 48 C 214 72 204 128 158 148 L 60 248"],
    },
    ㄌ: {
      viewBox: "0 0 240 280",
      strokes: ["M 70 46 L 176 46 C 216 78 202 164 68 214", "M 152 74 L 86 248"],
    },
    ㄍ: {
      viewBox: "0 0 240 280",
      strokes: ["M 108 40 L 48 140 L 112 248", "M 184 40 L 124 140 L 188 248"],
    },
    ㄎ: {
      viewBox: "0 0 240 280",
      strokes: ["M 46 48 L 196 48", "M 152 48 L 76 152 L 190 244"],
    },
    ㄏ: {
      viewBox: "0 0 240 280",
      strokes: ["M 52 46 L 198 46", "M 52 46 L 46 248"],
    },
    ㄐ: {
      viewBox: "0 0 240 280",
      strokes: ["M 86 40 L 86 198 C 86 244 172 248 178 196", "M 86 108 L 192 42"],
    },
    ㄑ: {
      viewBox: "0 0 240 280",
      strokes: ["M 190 46 C 42 72 38 210 190 244"],
    },
    ㄒ: {
      viewBox: "0 0 240 280",
      strokes: ["M 44 48 L 196 48", "M 120 48 L 120 248"],
    },
    ㄓ: {
      viewBox: "0 0 240 280",
      strokes: ["M 132 40 L 188 56", "M 50 92 L 188 92 L 80 168", "M 80 168 L 178 248"],
    },
    ㄔ: {
      viewBox: "0 0 240 280",
      strokes: ["M 64 40 L 162 90", "M 90 94 L 90 248", "M 90 152 L 188 114"],
    },
    ㄕ: {
      viewBox: "0 0 240 280",
      strokes: ["M 72 44 L 186 44", "M 72 44 L 72 118 L 186 118", "M 72 44 L 72 248"],
    },
    ㄖ: {
      viewBox: "0 0 240 280",
      strokes: ["M 70 48 L 70 236", "M 70 48 L 174 48 L 174 236 L 70 236", "M 70 142 L 174 142"],
    },
    ㄗ: {
      viewBox: "0 0 240 280",
      strokes: ["M 56 48 L 182 48 L 82 140 L 176 140", "M 128 140 L 128 248"],
    },
    ㄘ: {
      viewBox: "0 0 240 280",
      strokes: ["M 50 48 L 190 48", "M 78 48 L 78 248", "M 78 142 L 186 142"],
    },
    ㄙ: {
      viewBox: "0 0 240 280",
      strokes: ["M 120 44 L 48 236", "M 120 44 L 192 236 L 48 236"],
    },
  };

  var BPM_WORDS = [
    { bpm: "ㄅ", word: "包子", emoji: "🥟" },
    { bpm: "ㄅ", word: "冰", emoji: "❄️" },
    { bpm: "ㄅ", word: "冰淇淋", emoji: "🍦" },
    { bpm: "ㄆ", word: "葡萄", emoji: "🍇" },
    { bpm: "ㄆ", word: "蘋果", emoji: "🍎" },
    { bpm: "ㄇ", word: "貓", emoji: "🐱" },
    { bpm: "ㄇ", word: "帽子", emoji: "🧢" },
    { bpm: "ㄈ", word: "飛機", emoji: "✈️" },
    { bpm: "ㄉ", word: "蛋", emoji: "🥚" },
    { bpm: "ㄉ", word: "大象", emoji: "🐘" },
    { bpm: "ㄊ", word: "太陽", emoji: "☀️" },
    { bpm: "ㄊ", word: "兔子", emoji: "🐰" },
    { bpm: "ㄋ", word: "牛奶", emoji: "🥛" },
    { bpm: "ㄋ", word: "鳥", emoji: "🐦" },
    { bpm: "ㄌ", word: "老虎", emoji: "🐯" },
    { bpm: "ㄍ", word: "狗", emoji: "🐶" },
    { bpm: "ㄎ", word: "恐龍", emoji: "🦖" },
    { bpm: "ㄏ", word: "花朵", emoji: "🌸" },
    { bpm: "ㄏ", word: "猴子", emoji: "🐵" },
    { bpm: "ㄐ", word: "雞", emoji: "🐔" },
    { bpm: "ㄑ", word: "球", emoji: "⚽" },
    { bpm: "ㄑ", word: "青蛙", emoji: "🐸" },
    { bpm: "ㄒ", word: "蝦", emoji: "🦐" },
    { bpm: "ㄒ", word: "西瓜", emoji: "🍉" },
    { bpm: "ㄓ", word: "豬", emoji: "🐷" },
    { bpm: "ㄔ", word: "車", emoji: "🚗" },
    { bpm: "ㄕ", word: "書", emoji: "📖" },
    { bpm: "ㄘ", word: "草", emoji: "🌿" },
  ];

  var HANZI_WORDS = [
    { ch: "山", emoji: "⛰️" },
    { ch: "水", emoji: "💧" },
    { ch: "火", emoji: "🔥" },
    { ch: "人", emoji: "🧑" },
    { ch: "口", emoji: "👄" },
    { ch: "手", emoji: "✋" },
    { ch: "大", emoji: "🐘" },
    { ch: "小", emoji: "🐭" },
    { ch: "上", emoji: "⬆️" },
    { ch: "下", emoji: "⬇️" },
    { ch: "日", emoji: "☀️" },
    { ch: "月", emoji: "🌙" },
    { ch: "木", emoji: "🌳" },
    { ch: "田", emoji: "🌾" },
    { ch: "天", emoji: "🌤️" },
    { ch: "地", emoji: "🌍" },
    { ch: "門", emoji: "🚪" },
    { ch: "車", emoji: "🚗" },
    { ch: "魚", emoji: "🐟" },
    { ch: "鳥", emoji: "🐦" },
    { ch: "羊", emoji: "🐑" },
    { ch: "草", emoji: "🌿" },
    { ch: "雨", emoji: "🌧️" },
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

  var writeDraw = {
    active: false,
    pointerId: null,
    points: [],
  };

  var measurePath = document.createElementNS("http://www.w3.org/2000/svg", "path");

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
    var prev = 0;
    for (var i = 0; i < 8; i++) {
      var n;
      do {
        n = randInt(1, 10);
      } while (n === prev);
      prev = n;
      var wrongs = makeChoices(n, 1, 10).filter(function (x) {
        return x !== n;
      });
      var groups = shuffle([
        { count: n, ok: true },
        { count: wrongs[0], ok: false },
        { count: wrongs[1], ok: false },
      ]);
      qs.push({ n: n, animal: pick(ANIMALS), groups: groups });
    }
    return qs;
  }

  function makeMatchDrawQuestions() {
    var qs = [];
    for (var i = 0; i < 10; i++) {
      var pairCount = i < 5 ? 2 : 3;
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
    var equalAt = [randInt(0, 3), randInt(4, 6), randInt(7, 9)];
    var prevKey = "";
    for (var i = 0; i < 10; i++) {
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
    for (var i = 0; i < 10; i++) {
      var len = i < 6 ? randInt(5, 6) : randInt(6, 7);
      var maxOrd = i < 6 ? Math.min(5, len) : len;
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
      .slice(0, 10)
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
    for (var i = 0; i < 10; i++) {
      var target = i < 5 ? 5 : 10;
      var minN = i < 5 ? 1 : 3;
      var maxN = i < 5 ? 4 : 7;
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

  function makeSymbolChoices(correct, pool) {
    var others = pool.filter(function (x) {
      return x !== correct;
    });
    return shuffle([correct].concat(shuffle(others).slice(0, 2)));
  }

  function makePairConnect(items, leftKey, rightKey) {
    var left = [];
    var rightSrc = [];
    for (var p = 0; p < items.length; p++) {
      left.push({
        pair: p,
        text: items[p][leftKey],
        emoji: leftKey === "emoji" ? items[p].emoji : "",
        word: leftKey === "emoji" ? items[p].word || "" : "",
      });
      rightSrc.push({
        pair: p,
        text: items[p][rightKey],
        emoji: rightKey === "emoji" ? items[p].emoji : "",
        word: rightKey === "emoji" ? items[p].word || "" : "",
      });
    }
    if (leftKey !== "emoji") {
      left.forEach(function (item) {
        item.emoji = "";
      });
    }
    if (rightKey !== "emoji") {
      rightSrc.forEach(function (item) {
        item.emoji = "";
      });
    }
    left = shuffle(left);
    return { left: left, right: derangeRight(rightSrc, left) };
  }

  function makeBpmTraceQuestions() {
    return BPM_ORDER.map(function (sym) {
      return { sym: sym };
    });
  }

  function uniqueBpmPool() {
    var pool = [];
    BPM_WORDS.forEach(function (w) {
      if (pool.indexOf(w.bpm) === -1) pool.push(w.bpm);
    });
    return pool;
  }

  function uniqueBpmWords(n) {
    var map = {};
    BPM_WORDS.forEach(function (w) {
      if (!map[w.bpm]) map[w.bpm] = [];
      map[w.bpm].push(w);
    });
    return shuffle(Object.keys(map))
      .slice(0, n)
      .map(function (k) {
        return pick(map[k]);
      });
  }

  function makeBpmPicQuestions() {
    var pool = uniqueBpmPool();
    return shuffle(BPM_WORDS)
      .slice(0, 10)
      .map(function (w) {
        var choices = makeSymbolChoices(w.bpm, pool);
        if (choices.indexOf(w.bpm) === -1) choices[0] = w.bpm;
        return {
          emoji: w.emoji,
          word: w.word,
          answer: w.bpm,
          choices: choices,
        };
      });
  }

  function makeBpmDrawQuestions() {
    var qs = [];
    for (var i = 0; i < 10; i++) {
      var pairCount = i < 5 ? 2 : 3;
      var items = uniqueBpmWords(pairCount);
      var board = makePairConnect(items, "bpm", "emoji");
      board.prompt = "看圖上的字，連到第一個音";
      qs.push(board);
    }
    return qs;
  }

  function makeHanziQuestions() {
    var qs = [];
    var pool = HANZI_WORDS.map(function (h) {
      return h.ch;
    });
    var picks = shuffle(HANZI_WORDS).slice(0, 6);
    for (var i = 0; i < picks.length; i++) {
      qs.push({
        mode: "pick",
        emoji: picks[i].emoji,
        answer: picks[i].ch,
        choices: makeSymbolChoices(picks[i].ch, pool),
      });
    }
    for (var j = 0; j < 4; j++) {
      var pairCount = j < 2 ? 2 : 3;
      var items = shuffle(HANZI_WORDS).slice(0, pairCount);
      var board = makePairConnect(items, "emoji", "ch");
      board.mode = "draw";
      board.prompt = "把圖和字連起來";
      qs.push(board);
    }
    return qs;
  }

  function foxPrompt() {
    var q = state.questions[state.qIndex];
    if (state.levelId === "count") return "數一數，有幾個？";
    if (state.levelId === "match") return "哪一群跟上面的數字一樣多？";
    if (state.levelId === "match-draw") return "把一樣多的連起來";
    if (state.levelId === "next") return "下一個數字是誰？";
    if (state.levelId === "trace") return "從亮點開始，描一描";
    if (state.levelId === "more") {
      return q && q.equal ? "一樣多還是有一邊比較多？" : "哪一邊比較多？";
    }
    if (state.levelId === "ord") return "從左邊數，第幾個？";
    if (state.levelId === "missing") return "少了哪個數字？";
    if (state.levelId === "bond") return "還要幾個才滿？";
    if (state.levelId === "bpm-trace") return "從亮點開始，描一描";
    if (state.levelId === "bpm-pic") {
      return (q && q.word ? q.word : "這個字") + "的第一個音是誰？";
    }
    if (state.levelId === "bpm-draw") return "看圖上的字，連到第一個音";
    if (state.levelId === "hanzi") {
      return q && q.mode === "draw" ? "把圖和字連起來" : "這是哪個字？";
    }
    return "選一關開始吧！";
  }

  function isConnectLevel() {
    if (state.levelId === "match-draw" || state.levelId === "bpm-draw") return true;
    if (state.levelId === "hanzi") {
      var q = state.questions[state.qIndex];
      return !!(q && q.mode === "draw");
    }
    return false;
  }

  function isTraceLevel() {
    return state.levelId === "trace" || state.levelId === "bpm-trace";
  }

  function currentTraceSpec() {
    var q = state.questions[state.qIndex];
    if (state.levelId === "bpm-trace") return BPM_TRACE[q.sym];
    return TRACE[q.n];
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
    return (
      '<span class="fox-frame">' +
      '<img class="fox ' +
      state.foxMood +
      '" src="./fox.svg" alt="小狐狸老師" width="108" height="108">' +
      "</span>"
    );
  }

  function starChip(n, extraClass) {
    return (
      '<div class="star-chip' +
      (extraClass ? " " + extraClass : "") +
      '" aria-label="星星總數">星星 : ' +
      n +
      "</div>"
    );
  }

  function levelPreview(id) {
    if (id === "count") {
      return '<span class="preview-art preview-count" aria-hidden="true"><span>🍒</span><span>🍒</span><span>🍒</span></span>';
    }
    if (id === "match") {
      return '<span class="preview-art preview-match" aria-hidden="true"><b>3</b><span>⭐⭐⭐</span></span>';
    }
    if (id === "next") {
      return '<span class="preview-art preview-next" aria-hidden="true"><i>3</i><i>4</i><i>5</i><em>?</em></span>';
    }
    if (id === "trace") {
      return (
        '<span class="preview-art preview-trace" aria-hidden="true">' +
        '<svg viewBox="0 0 80 90"><path d="M 16 18 C 64 6 70 40 38 46 C 72 50 70 84 16 74"></path></svg></span>'
      );
    }
    if (id === "more") {
      return '<span class="preview-art preview-more" aria-hidden="true"><span>🍉🍉🍉</span><span class="vs">:</span><span>🍉🍉</span></span>';
    }
    if (id === "ord") {
      return '<span class="preview-art preview-ord" aria-hidden="true">🐶🐱🐰<b>5</b></span>';
    }
    if (id === "missing") {
      return '<span class="preview-art preview-next" aria-hidden="true"><i>3</i><i>4</i><em>?</em><i>6</i></span>';
    }
    if (id === "bond") {
      return '<span class="preview-art preview-count" aria-hidden="true"><span>🍇</span><span>🍇</span><span class="slot">+</span></span>';
    }
    if (id === "match-draw") {
      return '<span class="preview-art preview-match" aria-hidden="true"><b>2</b><span class="draw-line"></span><span>⭐⭐</span></span>';
    }
    if (id === "bpm-trace") {
      return (
        '<span class="preview-art preview-trace" aria-hidden="true">' +
        '<svg viewBox="0 0 80 90"><path d="M 24 12 L 24 78"></path><path d="M 24 12 L 58 12 C 74 22 74 48 52 58"></path></svg></span>'
      );
    }
    if (id === "bpm-pic") {
      return '<span class="preview-art preview-match" aria-hidden="true"><span>🥟</span><b>ㄅ</b></span>';
    }
    if (id === "bpm-draw") {
      return '<span class="preview-art preview-match" aria-hidden="true"><b>ㄅ</b><span class="draw-line"></span><span>🥟</span></span>';
    }
    if (id === "hanzi") {
      return '<span class="preview-art preview-match" aria-hidden="true"><span>⛰️</span><b>山</b></span>';
    }
    return "";
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

  function renderLevelCards(list) {
    return list
      .map(function (lv) {
        return (
          '<button class="level-card ' +
          lv.cls +
          '" type="button" data-action="start" data-level="' +
          lv.id +
          '">' +
          levelPreview(lv.id) +
          '<span class="name">' +
          lv.name +
          "</span>" +
          '<span class="hint">' +
          lv.hint +
          "</span></button>"
        );
      })
      .join("");
  }

  function renderHome() {
    return (
      '<div class="shell is-home">' +
      '<div class="sun" aria-hidden="true"></div>' +
      topTools("<span></span>") +
      '<div class="home-hero">' +
      '<p class="kicker">小狐狸老師的數字課</p>' +
      '<h1 class="title">數字小探險</h1></div>' +
      '<div class="fox-row">' +
      foxImg() +
      '<p class="speech" aria-live="polite">' +
      escapeHtml(state.foxMsg) +
      "</p></div>" +
      '<div class="home-scroll">' +
      '<h2 class="section-title">數字（舊）</h2>' +
      '<div class="level-grid">' +
      renderLevelCards(OLD_MATH_LEVELS) +
      "</div>" +
      '<h2 class="section-title">數字（新）</h2>' +
      '<div class="level-grid">' +
      renderLevelCards(NEW_MATH_LEVELS) +
      "</div>" +
      '<h2 class="section-title">注音國字</h2>' +
      '<div class="level-grid">' +
      renderLevelCards(WORD_LEVELS) +
      "</div></div>" +
      '<div class="home-foot">' +
      starChip(state.starsTotal) +
      "<span></span></div></div>"
    );
  }

  function progressLabel() {
    var q = state.questions[state.qIndex];
    if (state.levelId === "trace") {
      return "數字 " + (q && q.n);
    }
    if (state.levelId === "bpm-trace") {
      return q && q.sym ? q.sym : "";
    }
    var total = state.questions.length;
    return state.qIndex + 1 + " / " + total;
  }

  function playChrome() {
    return (
      '<div class="topbar">' +
      '<button class="home-btn" type="button" data-action="home" aria-label="回家">🏠</button>' +
      '<div class="progress-chip">' +
      progressLabel() +
      "</div>" +
      starChip(state.starsTotal) +
      "</div>" +
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
    var groups = q.groups
      .map(function (g, idx) {
        var shape = groupShape(g.count);
        var cells = "";
        for (var i = 0; i < g.count; i++) {
          cells += '<span class="group-cell">' + q.animal + "</span>";
        }
        var mark = state.choiceMark && state.choiceMark.value === idx ? " " + state.choiceMark.cls : "";
        return (
          '<button class="group' +
          mark +
          '" type="button" data-action="answer" data-value="' +
          idx +
          '" aria-label="這一群有 ' +
          g.count +
          ' 個">' +
          '<div class="group-grid" style="--cols:' +
          shape.cols +
          ";--rows:" +
          shape.rows +
          '">' +
          cells +
          "</div></button>"
        );
      })
      .join("");
    return (
      '<div class="play-col">' +
      '<div class="prompt">哪一群一樣多？</div>' +
      '<div class="match-stage"><div class="match-wrap">' +
      '<div class="big-num">' +
      q.n +
      "</div>" +
      '<div class="groups">' +
      groups +
      "</div></div></div></div>"
    );
  }

  function renderMatchDraw(q) {
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
      '<div class="match-stage is-draw">' +
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

  function pathLength(d) {
    measurePath.setAttribute("d", d);
    try {
      return measurePath.getTotalLength();
    } catch (e) {
      return 0;
    }
  }

  function pathPoint(d, t) {
    measurePath.setAttribute("d", d);
    var len = 0;
    try {
      len = measurePath.getTotalLength();
      var p = measurePath.getPointAtLength(Math.max(0, Math.min(len, t * len)));
      return { x: p.x, y: p.y };
    } catch (e) {
      return { x: 0, y: 0 };
    }
  }

  function sampleStroke(d) {
    var len = pathLength(d);
    var n = Math.max(8, Math.round(len / 16));
    var pts = [];
    for (var i = 0; i <= n; i++) pts.push(pathPoint(d, i / n));
    return pts;
  }

  function renderTrace(q) {
    var spec = currentTraceSpec();
    var label = state.levelId === "bpm-trace" ? q.sym : q.n;
    var paths = "";
    var i;
    for (i = 0; i < spec.strokes.length; i++) {
      var cls = i < state.traceNext ? "glyph-done" : i === state.traceNext ? "glyph-now" : "glyph-wait";
      paths += '<path class="' + cls + '" d="' + spec.strokes[i] + '"></path>';
    }
    var guide = "";
    if (state.traceNext < spec.strokes.length) {
      var d = spec.strokes[state.traceNext];
      var start = pathPoint(d, 0);
      if (state.traceNext === 0) {
        var a0 = pathPoint(d, 0.04);
        var a1 = pathPoint(d, 0.16);
        var ang = (Math.atan2(a1.y - a0.y, a1.x - a0.x) * 180) / Math.PI;
        guide +=
          '<g class="trace-arrow" transform="translate(' +
          a1.x +
          " " +
          a1.y +
          ") rotate(" +
          ang +
          ')"><path d="M -10 -8 L 12 0 L -10 8 Z"></path></g>';
      }
      guide += '<circle class="start-dot" cx="' + start.x + '" cy="' + start.y + '" r="11"></circle>';
    }
    return (
      '<div class="play-col">' +
      '<div class="prompt">用手指描一描</div>' +
      '<div class="trace-stage is-write"><svg class="trace-svg" viewBox="' +
      spec.viewBox +
      '" role="img" aria-label="' +
      (state.levelId === "bpm-trace" ? "注音 " : "數字 ") +
      label +
      '">' +
      paths +
      guide +
      '<path class="crayon-live" d=""></path>' +
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

  function renderPicChoice(q, prompt) {
    var buttons = q.choices
      .map(function (s) {
        var mark = state.choiceMark && state.choiceMark.value === s ? " " + state.choiceMark.cls : "";
        return (
          '<button class="choice glyph' +
          mark +
          '" type="button" data-action="answer" data-value="' +
          s +
          '">' +
          s +
          "</button>"
        );
      })
      .join("");
    return (
      '<div class="play-col">' +
      '<div class="prompt">' +
      prompt +
      "</div>" +
      '<div class="pic-stage"><div class="pic-card">' +
      '<span class="pic-emoji">' +
      q.emoji +
      "</span>" +
      '<span class="pic-word">' +
      escapeHtml(q.word || "") +
      "</span>" +
      "</div></div>" +
      '<div class="choices">' +
      buttons +
      "</div></div>"
    );
  }

  function renderConnectNode(item, side) {
    var done = state.matchDone[item.pair] ? " done" : "";
    var isPic = !!item.emoji;
    var cls = isPic ? "match-group match-pic" : "match-num";
    var inner = isPic
      ? '<span class="pic-emoji">' +
        item.emoji +
        "</span>" +
        (item.word
          ? '<span class="pic-word">' + escapeHtml(item.word) + "</span>"
          : "")
      : item.text;
    var aria = isPic ? item.word || "圖" : String(item.text);
    return (
      '<div class="' +
      cls +
      done +
      '" data-match-side="' +
      side +
      '" data-match-pair="' +
      item.pair +
      '" role="button" aria-label="' +
      aria +
      '">' +
      inner +
      "</div>"
    );
  }

  function renderPicConnect(q) {
    var left = q.left
      .map(function (item) {
        return renderConnectNode(item, "left");
      })
      .join("");
    var right = q.right
      .map(function (item) {
        return renderConnectNode(item, "right");
      })
      .join("");
    return (
      '<div class="play-col">' +
      '<div class="prompt">' +
      (q.prompt || "畫線連連看") +
      "</div>" +
      '<div class="match-stage is-draw">' +
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

  function renderPlay() {
    var q = state.questions[state.qIndex];
    var body = "";
    if (state.levelId === "count") body = renderCount(q);
    if (state.levelId === "match") body = renderMatch(q);
    if (state.levelId === "match-draw") body = renderMatchDraw(q);
    if (state.levelId === "next") body = renderNext(q);
    if (state.levelId === "trace") body = renderTrace(q);
    if (state.levelId === "more") body = renderMore(q);
    if (state.levelId === "ord") body = renderOrd(q);
    if (state.levelId === "missing") body = renderMissing(q);
    if (state.levelId === "bond") body = renderBond(q);
    if (state.levelId === "bpm-trace") body = renderTrace(q);
    if (state.levelId === "bpm-pic") {
      body = renderPicChoice(q, (q.word || "這個字") + "的第一個音是誰？");
    }
    if (state.levelId === "bpm-draw") body = renderPicConnect(q);
    if (state.levelId === "hanzi") {
      body = q.mode === "draw" ? renderPicConnect(q) : renderPicChoice(q, "這是哪個字？");
    }
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
    if (state.screen === "play" && isConnectLevel()) {
      requestAnimationFrame(drawDoneLines);
    }
  }

  function resetWriteDraw() {
    writeDraw.active = false;
    writeDraw.pointerId = null;
    writeDraw.points = [];
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
        if (isConnectLevel() && state.screen === "play" && !state.locked) {
          setFox(foxPrompt(), "idle");
        }
      }, 700);
    }
  }

  function matchWrongPair() {
    playWrong();
    setFox("再看一次", "think");
    fadeLiveStroke();
    setTimeout(function () {
      if (isConnectLevel() && state.screen === "play" && state.foxMood === "think") {
        setFox(state.foxMsg, "idle");
      }
    }, 850);
  }

  function onMatchPointerDown(e) {
    if (state.locked || state.screen !== "play" || !isConnectLevel()) return;
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
    resetWriteDraw();
    state.foxMood = "idle";
    if (id === "count") state.questions = makeCountQuestions();
    else if (id === "match") state.questions = makeMatchQuestions();
    else if (id === "match-draw") state.questions = makeMatchDrawQuestions();
    else if (id === "next") state.questions = makeNextQuestions();
    else if (id === "trace") state.questions = makeTraceQuestions();
    else if (id === "more") state.questions = makeMoreQuestions();
    else if (id === "ord") state.questions = makeOrdQuestions();
    else if (id === "missing") state.questions = makeMissingQuestions();
    else if (id === "bond") state.questions = makeBondQuestions();
    else if (id === "bpm-trace") state.questions = makeBpmTraceQuestions();
    else if (id === "bpm-pic") state.questions = makeBpmPicQuestions();
    else if (id === "bpm-draw") state.questions = makeBpmDrawQuestions();
    else if (id === "hanzi") state.questions = makeHanziQuestions();
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
    resetWriteDraw();
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
    resetWriteDraw();
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
    if (state.levelId === "match") {
      var idx = parseInt(raw, 10);
      if (q.groups[idx] && q.groups[idx].ok) markCorrect(idx);
      else markRetry(idx, "再看一次");
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
      return;
    }
    if (state.levelId === "bpm-pic" || (state.levelId === "hanzi" && q.mode !== "draw")) {
      if (raw === q.answer) markCorrect(raw);
      else markRetry(raw, "再看一次");
    }
  }

  function traceSvg() {
    return app.querySelector(".trace-svg");
  }

  function writePoint(e) {
    var svg = traceSvg();
    if (!svg) return { x: 0, y: 0 };
    var pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    var ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    var p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }

  function writeRadius(svg) {
    var ctm = svg && svg.getScreenCTM();
    var scale = ctm ? (Math.abs(ctm.a) + Math.abs(ctm.d)) / 2 : 1;
    if (scale < 0.15) scale = 0.15;
    return 32 / scale;
  }

  function dist2(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return dx * dx + dy * dy;
  }

  function polylineLen(pts) {
    var n = 0;
    for (var i = 1; i < pts.length; i++) {
      n += Math.sqrt(dist2(pts[i - 1], pts[i]));
    }
    return n;
  }

  function coverRatio(drawn, samples, radius) {
    var r2 = radius * radius;
    var di = 0;
    var hit = 0;
    for (var s = 0; s < samples.length; s++) {
      var found = false;
      for (var i = di; i < drawn.length; i++) {
        if (dist2(drawn[i], samples[s]) <= r2) {
          found = true;
          di = i;
          hit += 1;
          break;
        }
      }
    }
    return samples.length ? hit / samples.length : 0;
  }

  function scribbleFar(drawn, samples, radius) {
    var r2 = radius * radius * 2.4;
    var far = 0;
    for (var i = 0; i < drawn.length; i++) {
      var near = false;
      for (var s = 0; s < samples.length; s++) {
        if (dist2(drawn[i], samples[s]) <= r2) {
          near = true;
          break;
        }
      }
      if (!near) far += 1;
    }
    return drawn.length ? far / drawn.length > 0.42 : false;
  }

  function updateWriteStroke() {
    var live = app.querySelector(".crayon-live");
    if (live) live.setAttribute("d", pathFromPoints(writeDraw.points));
  }

  function fadeWriteStroke() {
    var svg = traceSvg();
    var live = svg && svg.querySelector(".crayon-live");
    resetWriteDraw();
    if (!live || !live.getAttribute("d")) return;
    live.setAttribute("class", "crayon-live fade");
    setTimeout(function () {
      if (!live.parentNode) return;
      live.setAttribute("d", "");
      live.setAttribute("class", "crayon-live");
    }, 380);
  }

  function finishWriteStroke() {
    var spec = currentTraceSpec();
    playTap();
    state.traceNext += 1;
    resetWriteDraw();
    if (state.traceNext >= spec.strokes.length) {
      state.locked = true;
      state.foxMsg = pick(PRAISE);
      state.foxMood = "happy";
      playCorrect();
      render();
      setTimeout(nextQuestion, 900);
      return;
    }
    setFox("下一筆，從亮點開始", "idle");
    render();
  }

  function rejectWrite() {
    playWrong();
    setFox("再看一次", "think");
    fadeWriteStroke();
    setTimeout(function () {
      if (isTraceLevel() && state.screen === "play" && state.foxMood === "think") {
        setFox(foxPrompt(), "idle");
      }
    }, 850);
  }

  function onWritePointerDown(e) {
    if (state.locked || state.screen !== "play" || !isTraceLevel()) return;
    if (writeDraw.active) return;
    var stage = e.target.closest(".trace-stage");
    if (!stage) return;
    e.preventDefault();
    try {
      stage.setPointerCapture(e.pointerId);
    } catch (err) {}
    writeDraw.active = true;
    writeDraw.pointerId = e.pointerId;
    writeDraw.points = [writePoint(e)];
    updateWriteStroke();
  }

  function onWritePointerMove(e) {
    if (!writeDraw.active || writeDraw.pointerId !== e.pointerId) return;
    e.preventDefault();
    var pt = writePoint(e);
    var last = writeDraw.points[writeDraw.points.length - 1];
    if (!last || Math.abs(pt.x - last.x) + Math.abs(pt.y - last.y) >= 1.4) {
      writeDraw.points.push(pt);
    }
    updateWriteStroke();
  }

  function onWritePointerUp(e) {
    if (!writeDraw.active || writeDraw.pointerId !== e.pointerId) return;
    e.preventDefault();
    var spec = currentTraceSpec();
    var svg = traceSvg();
    if (!spec || !svg || state.traceNext >= spec.strokes.length) {
      resetWriteDraw();
      return;
    }
    var d = spec.strokes[state.traceNext];
    var samples = sampleStroke(d);
    var radius = writeRadius(svg);
    var drawn = writeDraw.points;
    var start = samples[0];
    var tooShort = polylineLen(drawn) < Math.max(28, pathLength(d) * 0.32);
    var startFar = !drawn.length || dist2(drawn[0], start) > radius * radius * 1.6;
    var covered = coverRatio(drawn, samples, radius);
    if (tooShort || startFar || covered < 0.7 || scribbleFar(drawn, samples, radius)) {
      rejectWrite();
      return;
    }
    finishWriteStroke();
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

  app.addEventListener("pointerdown", function (e) {
    onMatchPointerDown(e);
    onWritePointerDown(e);
  });
  app.addEventListener("pointermove", function (e) {
    onMatchPointerMove(e);
    onWritePointerMove(e);
  });
  app.addEventListener("pointerup", function (e) {
    onMatchPointerUp(e);
    onWritePointerUp(e);
  });
  app.addEventListener("pointercancel", function (e) {
    onMatchPointerUp(e);
    onWritePointerUp(e);
  });
  document.addEventListener(
    "touchmove",
    function (e) {
      if (matchDraw.active || writeDraw.active) e.preventDefault();
    },
    { passive: false }
  );
  window.addEventListener("resize", function () {
    if (isConnectLevel()) drawDoneLines();
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

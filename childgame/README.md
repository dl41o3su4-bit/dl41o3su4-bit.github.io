# 數字小探險

給臺灣大班（5–6 歲）的靜態小遊戲。小狐狸老師帶小朋友玩數字，也玩注音和國字。

打開：<https://dl41o3su4-bit.github.io/childgame/>

## 數字

1. 數一數 `#count`
2. 連連看 `#match`（畫線把數字和一樣多的那一群連起來）
3. 下一個是誰 `#next`
4. 描一描 `#trace`
5. 誰比較多 `#more`
6. 第幾個 `#ord`
7. 缺了誰 `#missing`
8. 湊一湊 `#bond`

## 注音國字

1. 描注音 `#bpm-trace`（跟著點 ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎ）
2. 圖配注音 `#bpm-pic`
3. 注音連連看 `#bpm-draw`（畫線把注音和圖連起來）
4. 看圖認字 `#hanzi`（山水分火等生活國字；後面幾題也可畫線連）

答錯只說「再看一次」，同一題留下。過關加一顆星，存在 `localStorage` 的 `childgame-stars`。

本資料夾是完成的 HTML／CSS／JS／SVG，不必 npm 建置。相對路徑請用 `./app.js` 這種寫法，才能在 GitHub Pages 子路徑運作。

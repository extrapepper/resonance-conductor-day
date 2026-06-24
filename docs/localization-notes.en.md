# English Localization Notes

Reference source: official bilingual story sheets `Ep1.xlsx` through `Ep5.xlsx`.

## Canon Names And Terms

- 列车长 / 我: `Conductor` in address, `Me` as the player speaker.
- 莉薇娅: `Livia`.
- 遥: `Haruka`.
- 弗兰: `Fran`.
- 艾略特: `Eliot`.
- 波克士: `BOX`.
- 静流: `Shizuru`.
- 妮蔻拉: `Nicola`.
- 卡洛琳: `Caroline`.
- 无垠号: `The Eternal`.
- 铁盟: `BCRL`.
- 桦树生物: `Chaos Remain`.
- 形态场: `Morphic Field`.
- 阿妮塔: `Anita`.
- 七号自由港: `Freeport VII`.
- 修格里: `Shoggolith`.

## Voice Direction

- Livia stays gentle and formal, but becomes firm when the Conductor's safety is involved. Her English should use careful wording, direct concern, and restrained emotional pressure.
- Haruka is sparse and concrete. She speaks more about the train than about people, so her English lines should be short, technical, and slightly oblique.
- Fran is practical and clipped, especially toward Eliot. She is not cold; she simply moves the conversation back to duty.
- Eliot complains, jokes, and tries to avoid work, but still acts when it matters. Her English should be casual and energetic, often undercutting tension without erasing it.
- BOX uses official-sounding diagnostics, self-important titles, and sharp commentary. Official sheets write the name as `BOX`; keep that capitalization.

## Implementation Notes

- `data/story.zh-CN.js` exposes `window.GAME_CONTENT_ZH`.
- `data/story.en-US.js` clones the Chinese gameplay data, then overrides all visible story/UI content while preserving choice ids, numerical effects, requirements, and asset paths.
- `app.js` chooses Chinese when `navigator.languages` includes a `zh` locale; otherwise it defaults to English. Manual selection is stored in `localStorage`.

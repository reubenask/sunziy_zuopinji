# Delgadina Sun Portfolio

个人作品集网站，为视觉设计师 / AI 设计师 / 品牌设计师 Delgadina Sun（孙梓怡）搭建。

## Project Goal

用 React + Vite 做一个具备梦核气质、影像感和克制科技感的个人作品集网站。网站重点不是模板式简历，而是通过大图、动效、项目卡片和整屏收尾页建立清晰的个人视觉气质。

## Current Sections

- Hero / 全屏首页
- About / 我是谁
- Selected Work / 精选项目
- Capabilities / 能力模块
- Method / 工作流程
- Contact Finale / 整屏联系收尾页

## Design Direction

关键词：

- Dreamcore / 梦核
- Cinematic light / 电影感光线
- Controlled technology / 克制科技感
- Editorial portfolio / 杂志式作品集
- Soft signals / 柔软信号

## Tech Stack

- React
- Vite
- CSS
- WebGL canvas interaction for the capabilities gallery

## Main Files

```text
src/main.jsx                  Main page structure
src/style.css                 Global layout and section styling
src/MagicBento.jsx            Selected work grid
src/magic-bento.css           Selected work card effects
src/TiltedCard.jsx            About portrait card interaction
src/tilted-card.css           TiltedCard styling
src/SkillsCircularGallery.jsx Capabilities WebGL gallery
public/images/                Image assets
docs/HANDOFF.md               Full project handoff
docs/CONVERSATION_LOG.md      Conversation and build log
work/build-offline.mjs        Single-file offline HTML generator
```

## Run Locally

```bash
npm install
npm run dev
```

If using the bundled Codex runtime used during development:

```bash
export PATH="/Users/dina/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
./node_modules/.bin/vite build
node work/build-offline.mjs
```

## Build

```bash
npm run build
```

The project also includes a custom offline builder:

```bash
node work/build-offline.mjs
```

This generates:

```text
outputs/Delgadina-Sun-作品集-离线版.html
```

The `outputs/` folder is intentionally ignored by Git because it contains generated files.

## Documentation

- [Handoff](docs/HANDOFF.md)
- [Conversation Log](docs/CONVERSATION_LOG.md)

## Important Notes

- `node_modules/`, `dist/`, and `outputs/` are ignored and should be regenerated locally.
- The shareable single-file HTML is large because all images are embedded as base64.
- The capabilities module currently uses a no-dependency WebGL implementation inspired by React Bits CircularGallery. If the project later allows installing `ogl`, it can be replaced by the original React Bits component.


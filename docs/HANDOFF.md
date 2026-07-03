# Delgadina Sun Portfolio — Handoff 文档

更新时间：2026-06-26  
项目路径：`/Users/dina/Documents/Codex/2026-06-20/ai-1-hero-2-3-4-3`

## 1. 项目目标

为 Delgadina Sun / 孙梓怡 搭建一个适合 PC 端展示的个人作品集网站，用于视觉设计师、AI 设计师、品牌设计师身份展示。

整体方向：

- 梦核、影像感、带一点克制科技感。
- 不做模板站，不做普通简历页。
- 先完成可运行、可预览、可分享的基础版本，后续再补充真实项目详情、案例叙事和更多内容。
- 页面版心约 1700px，适合桌面端大屏展示。

当前阶段重点是“设计完成度”和“视觉氛围”，内容深度后续再补。

## 2. 当前已完成内容

### 2.1 首页 Hero

位置：`src/main.jsx` 的 `section.hero`  
主要样式：`src/style.css`

已完成：

- 全屏首页。
- 使用 `public/images/hero-underwater.png` 作为首屏背景图。
- 顶部导航：ABOUT / SELECTED WORK / CAPABILITIES / LET'S TALK。
- 大标题：`DESIGNING soft signals for real worlds.`
- 背景叠加暗色遮罩和 grain 颗粒层。
- 保持梦核、暗色、光感、克制科技感。

### 2.2 About / 我是谁

位置：`src/main.jsx` 的 `section.about`  
动效组件：`src/TiltedCard.jsx`、`src/tilted-card.css`

已完成：

- 使用 `public/images/about-portrait.png` 作为个人介绍图。
- 接入 TiltedCard 风格交互：
  - 鼠标移动时卡片随光标倾斜。
  - 悬停时放大。
  - tooltip 显示 `DELGADINA SUN / 2026`。
- 文案包含身份、经验、联系方式和项目数据：
  - 4+ YEARS OF MAKING
  - 5M SINGLE-POST REACH
  - 20+ GLOBAL COLLABS

### 2.3 Selected Work / 精选项目

位置：`src/MagicBento.jsx`  
样式：`src/magic-bento.css`

已完成：

- 目前保留 9 个精选项目卡片。
- 使用 Magic Bento 风格卡片：
  - 鼠标移动时有倾斜。
  - 光标附近有发光描边和光斑。
  - 图片 hover 轻微放大。
- 目前项目数据：
  1. SMOKE SIGNAL
  2. SURFACE TENSION
  3. THE LONG ROAD
  4. GOLDEN HOUR
  5. QUIET VILLAGE
  6. AFTER THE RAIN
  7. LOOKING UP
  8. A QUIET VISITOR
  9. CATCHING LIGHT

注意：

- `public/images/module3-01.jpg` 到 `module3-04.jpg` 是之前误替换模块 3 时留下的文件，目前页面没有引用它们。
- 不要把当前精选项目误替换成这 4 张，除非用户明确再次要求。

### 2.4 Capabilities / 能力模块

位置：`src/main.jsx` 的 `section.capabilities`  
组件：`src/SkillsCircularGallery.jsx`

已完成：

- 四个能力标题保留：
  - Brand world
  - Image making
  - AI native
  - Digital touchpoints
- 四张能力图：
  - `public/images/skill-brand-world.jpg`
  - `public/images/skill-image-making.jpg`
  - `public/images/skill-ai-native.jpg`
  - `public/images/skill-digital-touchpoints.jpg`
- 当前实现是一个无外部依赖的 WebGL 版 CircularGallery：
  - 横向循环画廊。
  - 支持鼠标拖拽。
  - 支持滚轮移动。
  - 拖动时根据速度产生卡片交互形变。
  - 静止时图片保持平整，不做波浪扭曲。
  - 标题为黑色：`#1d2426`。
  - 弯曲幅度降低到 `bend={0.95}`，避免过度弯曲。

重要背景：

- 用户多次强调想要 React Bits `CircularGallery` 的效果。
- 原组件依赖 `ogl`，当前项目没有安装 `ogl`，且当前环境网络受限，不能直接安装。
- 目前组件是根据 React Bits 的交互逻辑复刻的无依赖版本，不是逐字复制的 `ogl` 原组件。
- 如果后续能安装依赖，建议替换为官方 React Bits + `ogl` 原版。

### 2.5 Footer / 联系收尾页

位置：`src/main.jsx` 的 `footer.contact-finale`  
主要样式：`src/style.css`

已完成：

- 使用 `public/images/footer-portrait-light.png` 做整屏 footer 背景。
- 人物和光感偏右，文字内容放在左侧暗部。
- 保留联系信息：
  - Email: `Miacheno401@gmail.com`
  - WeChat / phone: `15564110401`
  - Hangzhou / China
- 标题更新为：
  - `Let the next signal find us.`
- 去除了之前 footer 中的白色横线装饰层 `.footer-lightline`。

## 3. 设计规范

### 3.1 视觉关键词

- Dreamcore / 梦核
- Soft signal / 柔软信号
- Controlled technology / 克制科技感
- Editorial portfolio / 杂志式作品集
- Cinematic light / 电影感光线
- Dark green, fog, glow / 暗绿、雾感、微光

### 3.2 色彩

核心变量在 `src/style.css` 顶部：

```css
:root {
  --ink: #1d2426;
  --fog: #edf0e9;
  --lime: #d6e547;
  --line: rgba(29,36,38,.22);
}
```

建议继续遵守：

- 主背景：雾白 / 灰绿系。
- 深色区域：近黑绿、墨绿。
- 强调色：谨慎使用荧光黄绿，不要大面积铺满。
- 图像发光色：偏暖金 + 暗绿 + 青绿色，不要纯蓝科技风。

### 3.3 字体与排版

当前使用：

- `DM Sans`
- `DM Mono`
- `Playfair Display`

注意：

- 本地分享版会移除 Google Fonts 外部引用，因此朋友打开时可能回退到系统字体。
- 如果正式部署到线上，可以恢复字体加载，或者把字体文件本地化。

版式规范：

- `.wrap` 宽度：`min(1700px, calc(100% - 120px))`
- 大标题使用极大字号和紧凑行高。
- 小标题 / 编号 / meta 使用 `DM Mono` 风格。
- 留白要大，不要把页面塞满。

### 3.4 动效规范

整体动效应该是：

- 慢。
- 有呼吸感。
- 不要跳。
- 不要过度游戏化。
- 不能破坏作品图片本身。

当前动效：

- About：TiltedCard 倾斜 + 放大。
- Selected Work：Magic Bento hover 发光 + 轻微倾斜。
- Capabilities：WebGL CircularGallery 拖拽 / 滚轮 / 速度形变。
- Footer：静态电影感背景图，无额外横线。

特别注意：

- 用户不喜欢能力模块图片在静止状态被波浪扭曲。
- 能力模块只允许拖拽/移动时有速度反馈，静止时图片必须平整。

## 4. 技术结构

### 4.1 技术栈

- React
- Vite
- 原生 CSS
- WebGL canvas（能力模块）
- 无后端
- 无路由

### 4.2 关键文件

```text
src/main.jsx                 页面主结构
src/style.css                全局样式、Hero/About/Capabilities/Footer 样式
src/MagicBento.jsx           精选项目卡片结构
src/magic-bento.css          精选项目动效样式
src/TiltedCard.jsx           About 图片卡片动效
src/tilted-card.css          TiltedCard 样式
src/SkillsCircularGallery.jsx 能力模块 WebGL 画廊
work/build-offline.mjs       生成单文件离线 HTML
public/images/               所有图片资源
outputs/                     生成输出
outputs/share/               分享版输出
```

### 4.3 常用命令

在项目根目录执行：

```bash
export PATH="/Users/dina/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
./node_modules/.bin/vite build
node work/build-offline.mjs
```

生成结果：

```text
outputs/Delgadina-Sun-作品集-离线版.html
```

分享版需要再复制：

```bash
mkdir -p outputs/share
cp "outputs/Delgadina-Sun-作品集-离线版.html" "outputs/share/Delgadina-Sun-Portfolio-Fixed.html"
cd outputs/share
zip -q -9 "Delgadina-Sun-Portfolio-Fixed.zip" "Delgadina-Sun-Portfolio-Fixed.html"
```

### 4.4 当前分享文件

最新版推荐使用：

```text
outputs/share/Delgadina-Sun-Portfolio-Fixed.html
outputs/share/Delgadina-Sun-Portfolio-Fixed.zip
```

旧版文件：

```text
outputs/share/Delgadina-Sun-Portfolio.html
outputs/share/Delgadina-Sun-Portfolio-share.zip
```

旧版可能出现空白，因为之前使用了 `type="module"` 的脚本格式。最新版 `Fixed` 文件已经改成普通 `<script>`，更适合直接发给朋友打开。

## 5. 当前已知问题 / 注意事项

1. 当前浏览器里打开的可能是旧分享版：
   - 用户当前 URL 显示为 `outputs/share/Delgadina-Sun-Portfolio.html`。
   - 建议改为打开 `outputs/share/Delgadina-Sun-Portfolio-Fixed.html`。

2. 朋友打开方式：
   - 推荐发送 `Delgadina-Sun-Portfolio-Fixed.zip`。
   - 对方解压后双击 `Delgadina-Sun-Portfolio-Fixed.html`。
   - 不要直接发送 `file:///Users/...` 这种路径，这只在本机有效。

3. 文件较大：
   - 单 HTML 约 28MB。
   - ZIP 约 21MB。
   - 原因是所有图片都被内嵌成 base64，保证朋友不用额外文件也能打开。

4. 本地预览服务不稳定：
   - 此环境里 localhost / Vite 预览曾多次受权限限制。
   - 当前更稳的方式是使用离线 HTML。

5. 字体：
   - 单文件分享版已移除外部 Google Fonts。
   - 视觉可能与在线字体略有差异。
   - 正式部署时建议恢复字体或本地化字体文件。

6. 能力模块不是官方 `ogl` 原件：
   - 目前是无依赖 WebGL 复刻。
   - 如果用户继续要求“一模一样”，最佳方案是在线部署/允许安装 `ogl` 后接入 React Bits 原版组件。

## 6. 下一步任务建议

### 6.1 先完成设计层面的优化

优先级高：

1. 检查所有 section 之间的节奏：
   - Hero → About → Selected Work → Capabilities → Footer 的过渡是否自然。
   - 大标题与图片比例是否一致。

2. 统一图片色调：
   - Hero、项目图、能力图、Footer 的冷暖关系还可以再统一。
   - 建议统一偏暗绿、柔金、低饱和。

3. 清理 CSS：
   - `src/style.css` 目前包含一些旧的 `.skills-grid article.skill-card` 和 `.circular-skill-card` 样式，部分已不再用于当前 WebGL 画廊。
   - 后续可以删掉无用样式，降低维护成本。

4. 进一步调优 Capabilities 画廊：
   - 继续贴近 React Bits 原版。
   - 若可以安装依赖，直接使用 `ogl` 原版。
   - 当前重点保持图片清晰，不要牺牲作品可读性。

### 6.2 再补充内容层

等设计定稿后再做：

1. 增加项目详情展开层：
   - 项目背景
   - 我的角色
   - 设计目标
   - 输出物
   - 使用工具
   - 结果 / 亮点

2. 增加项目分类筛选：
   - Brand
   - AI Visual
   - Campaign
   - Photography
   - Digital

3. 增加个人方法论模块：
   - Sense / 捕捉情绪
   - Structure / 建立视觉系统
   - Generate / AI 与影像实验
   - Refine / 商业落地与传播

4. 增加简历下载按钮：
   - Footer 或 About 区域可加入 Download CV。

### 6.3 正式分享 / 发布

如果想让朋友通过网址访问，而不是发 HTML：

1. 准备部署版：
   - 使用 `dist/` 或重新整理一个线上部署包。
   - 不建议把 28MB 单文件作为最终线上版本。

2. 推荐部署平台：
   - Netlify
   - Vercel
   - GitHub Pages

3. 线上版可优化：
   - 图片不再 base64 内嵌，改成正常静态资源。
   - 字体恢复在线加载或本地字体。
   - 添加 favicon / meta description / Open Graph 分享图。

## 7. 交接结论

当前网站已经完成一个具备强视觉风格的个人作品集基础版本，核心设计方向成立：

- 首页有记忆点。
- About 有人物感。
- 精选项目有作品墙氛围。
- 能力模块有高级交互。
- Footer 已从单调收尾升级为电影感整屏收尾页。

下一阶段建议不要急着堆内容，先把视觉节奏和交互稳定性打磨到满意，再进入项目详情和案例内容填充。

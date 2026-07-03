# GitHub 上传说明

本项目已经整理成适合上传 GitHub 的结构。

## 推荐上传内容

上传以下文件/文件夹：

```text
README.md
.gitignore
package.json
index.html
src/
public/
work/build-offline.mjs
docs/
```

## 不建议上传内容

以下内容已经通过 `.gitignore` 排除：

```text
node_modules/
dist/
outputs/
.DS_Store
work/pdf/
*.log
```

原因：

- `node_modules` 可通过 `npm install` 重新生成。
- `dist` 与 `outputs` 是构建结果，不是源文件。
- 单文件离线 HTML 体积较大，不适合放入 Git 仓库。
- `.DS_Store` 和日志文件是本地临时文件。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 生成离线单文件 HTML

```bash
node work/build-offline.mjs
```

输出：

```text
outputs/Delgadina-Sun-作品集-离线版.html
```

## 隐私提醒

仓库中包含：

- 个人邮箱
- 微信 / 手机联系方式
- 个人照片和视觉素材
- 简历 PDF
- 建站对话整理记录

建议先创建 GitHub 私有仓库。确认素材和联系方式都可以公开后，再改成公开仓库。


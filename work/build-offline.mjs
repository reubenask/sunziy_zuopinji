import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const assets = path.join(dist, 'assets')
const jsFile = fs.readdirSync(assets).find(name => name.endsWith('.js'))
const cssFile = fs.readdirSync(assets).find(name => name.endsWith('.css'))

let js = fs.readFileSync(path.join(assets, jsFile), 'utf8')
let css = fs.readFileSync(path.join(assets, cssFile), 'utf8')

const imagePattern = /\/images\/([A-Za-z0-9._-]+)/g
const referenced = new Set([...js.matchAll(imagePattern)].map(match => match[1]))

for (const fileName of referenced) {
  const filePath = path.join(root, 'public', 'images', fileName)
  if (!fs.existsSync(filePath)) continue
  const ext = path.extname(fileName).slice(1).toLowerCase()
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'webp' ? 'image/webp' : 'image/png'
  const data = `data:${mime};base64,${fs.readFileSync(filePath).toString('base64')}`
  js = js.split(`/images/${fileName}`).join(data)
}

css = css.replace(/@import(?:\s+url\([^;]+?\)|\s*["'][^"']+["'])[^;]*;/g, '')
const html = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Delgadina Sun — Portfolio</title><style>${css}</style></head><body><div id="root"></div><script>${js}</script></body></html>`

fs.writeFileSync(path.join(root, 'outputs', 'Delgadina-Sun-作品集-离线版.html'), html)

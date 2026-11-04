// Construit une version « page unique » du site (CSS + JS intégrés) pour un hébergement
// en bac à sable (artifact claude.ai). Images et CV sont publiés à côté, en chemins relatifs.
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const out = 'dist-artifact'
execSync(`npx vite build --outDir ${out} --emptyOutDir`, { stdio: 'inherit', env: { ...process.env, VITE_SANDBOX: '1' } })

const html = readFileSync(join(out, 'index.html'), 'utf8')
const assets = readdirSync(join(out, 'assets'))
const css = assets.filter((f) => f.endsWith('.css')).map((f) => readFileSync(join(out, 'assets', f), 'utf8')).join('\n')
const js = assets.filter((f) => f.endsWith('.js')).map((f) => readFileSync(join(out, 'assets', f), 'utf8')).join('\n')

const head = html.match(/<head>([\s\S]*?)<\/head>/)[1]
const keep = head
  .split('\n')
  .filter((l) => !/charset|name="viewport"|rel="icon"|assets\/|modulepreload/.test(l))
  .join('\n')
  .replace('href="/favicon.svg"', 'href="favicon.svg"')

const page = `${keep.trim().replace(/<title>.*<\/title>/, '<title>Stanley Jomie Portfolio</title>')}
<style>:root{color-scheme:dark;background:#02040A}</style>
<style>${css}</style>
<div id="root"></div>
<script type="module">${js.replace(/<\/script/gi, '<\\/script')}</script>
`
mkdirSync('artifact', { recursive: true })
writeFileSync('artifact/index.html', page)
cpSync(join(out, 'images'), 'artifact/images', { recursive: true })
cpSync(join(out, 'cv'), 'artifact/cv', { recursive: true })
cpSync(join(out, 'demos'), 'artifact/demos', { recursive: true })
console.log('artifact/index.html', (page.length / 1024).toFixed(0), 'KB')

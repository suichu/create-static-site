#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const src = path.join(__dirname, 'src')
const dst = process.argv[2]

fs.mkdirSync(dst, {recursive: true})

const es = fs.readdirSync(src)
for (const e of es.filter(e => e != 'package.json')) {
  cp(path.join(src, e), dst)
}

const package = require(path.join(src, 'package.json'))
package.name = path.basename(dst)
fs.writeFileSync(path.join(dst, 'package.json'), JSON.stringify(package, null, 2))

function cp(f, t) {
  const s = fs.statSync(f)
  if (s.isDirectory()) {
    fs.mkdirSync(path.join(t, path.basename(f)), {recursive: true})
    for (const e of fs.readdirSync(f)) {
      cp(path.join(f, e), path.join(t, path.basename(f)))
    }
  } else {
    fs.copyFileSync(f, path.join(t, path.basename(f)))
  }
}

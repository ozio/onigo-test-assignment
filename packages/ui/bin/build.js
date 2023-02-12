import fs from 'node:fs/promises'

const kebabToPascal = str => str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')

const list = await fs.readdir('../assets/icons')

let imports = ``
let exports = []

list.filter(item => item.endsWith('.gif')).map((filename) => {
  const name = filename.split('.')[0]
  const pascal = kebabToPascal(name)

  imports += `import ${pascal} from './assets/icons/${filename}'\n`
  exports.push(pascal)
})

let contents = `${imports}\nexport { ${exports.join(', ')} }`

await fs.writeFile('./icons.js', contents, 'utf-8')

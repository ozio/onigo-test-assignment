import fs from 'node:fs/promises'

const kebabToPascal = str => str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')

const list = await fs.readdir('./assets/icons')
const exports = []

let imports = ``

list.filter(item => item.endsWith('.gif')).map((filename) => {
  const name = filename.split('.')[0]
  const pascal = kebabToPascal(name)

  imports += `import ${pascal} from './assets/icons/${filename}'\n`
  exports.push(pascal)
})

const contents = `${imports}
type IconName = 
  '${exports.join('\'\n  | \'')}' 

export { IconName, ${exports.join(', ')} }`

await fs.writeFile('./icons.ts', contents, 'utf-8')

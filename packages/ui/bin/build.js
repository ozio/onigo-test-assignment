const fs = require('node:fs/promises')

const kebabToPascal = str => str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')

const build = async () => {
  const list = await fs.readdir('./assets/icons')
  const exports = []

  let imports = ``

  list.filter(item => item.endsWith('.gif')).map((filename) => {
    const [name] = filename.split('.')
    const pascal = kebabToPascal(name)

    imports += `import ${pascal} from './assets/icons/${filename}'\n`
    exports.push(pascal)
  })

  const contents = `${imports}
export type IconName = '${exports.join('\' | \'')}'
export const icons = { ${exports.join(', ')} }
`

  await fs.writeFile('./icons.ts', contents, 'utf-8')
}

build()

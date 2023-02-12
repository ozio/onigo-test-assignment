const escape = (rawString) => {
  return rawString

  // Only partial escaping support implemented,
  // but not released. RIP

  let string = rawString

  string = string.replace(/[*_]/g, '\\$&')

  if (/^(- |\d+. |#{1,6} )/.test(string)) {
    string = `\\${string}`
  }

  return string
}

export const ast2md = (ast) => {
  let md = ''

  const processNode = (node, depth = 1) => {
    if (node.type === 'Text') {
      md += escape(node.value)
    } else if (node.type === 'Bold') {
      md += '**'
      node.children.forEach(child => processNode(child, depth))
      md += '**'
    } else if (node.type === 'Italic') {
      md += '_'
      node.children.forEach(child => processNode(child, depth))
      md += '_'
    } else if (node.type.startsWith('Heading-')) {
      const level = parseInt(node.type.slice(-1))
      md += `\n${'#'.repeat(level)} `
      node.children.forEach(child => processNode(child, depth))
      md += '\n'
    } else if (node.type === 'Paragraph') {
      md += '\n'
      node.children.forEach(child => processNode(child, depth))
      md += '\n'
    } else if (node.type === 'HorizontalLine') {
      md += '***\n'
    } else if (node.type === 'UnorderedList') {
      md += '\n'
      node.children.forEach((item) => {
        md += `${'  '.repeat(depth - 1)}- `
        processNode(item, depth + 1)
        md += '\n'
      })
    } else if (node.type === 'OrderedList') {
      md += '\n'
      node.children.forEach((item, idx) => {
        md += `${'  '.repeat(depth - 1)}${idx + 1}. `
        processNode(item, depth + 1)
        md += '\n'
      })
    } else if (node.type === 'ListItem') {
      node.children.forEach(child => processNode(child, depth))
    } else if (node.type === 'LineBreak') {
      md += '\n'
    }
  }

  ast.children.forEach(node => processNode(node))

  return md.trim().replace(/\n{3,}/g, '\n\n').replaceAll('&nbsp;', ' ')
}

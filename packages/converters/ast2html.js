const tagByType = {
  'Heading-1': 'h1',
  'Heading-2': 'h2',
  'Heading-3': 'h3',
  'Heading-4': 'h4',
  'Heading-5': 'h5',
  'Heading-6': 'h6',
  'Paragraph': 'p',
  'Bold': 'b',
  'Italic': 'i',
  'OrderedList': 'ol',
  'UnorderedList': 'ul',
  'ListItem': 'li',
  'HorizontalLine': 'hr',
  'LineBreak': 'br',
}

export const ast2html = (node) => {
  if (node.type === 'Text') {
    return node.value.replace(/ {2}/g, '&nbsp;&nbsp;')
  }

  if (node.type === 'Root') {
    let html = ''

    node.children.forEach(child => {
      html += ast2html(child)
    })

    return html
  }

  let tag = tagByType[node.type]

  let html = `<${tag}>`

  if (node.children) {
    node.children.forEach(child => {
      html += ast2html(child)
    })
    html += `</${tag}>`
  }

  return html
}

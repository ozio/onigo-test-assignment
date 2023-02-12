const deepRemoveAttribute = (obj, attribute) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === attribute) {
        delete obj[key]
      } else if (typeof obj[key] === 'object') {
        deepRemoveAttribute(obj[key], attribute)
      }
    }
  }

  return obj
}

const typeByTag = {
  'h1': 'Heading-1',
  'h2': 'Heading-2',
  'h3': 'Heading-3',
  'h4': 'Heading-4',
  'h5': 'Heading-5',
  'h6': 'Heading-6',
  'p': 'Paragraph',
  'i': 'Italic',
  'b': 'Bold',
  'ol': 'OrderedList',
  'ul': 'UnorderedList',
  'li': 'ListItem',
  'hr': 'HorizontalLine',
  'br': 'LineBreak',
}

const selfClosingTags = ['hr', 'br']

export const html2ast = (rawHTML) => {
  const html = rawHTML.replace(/(\r\n|\n|\r|\t|\s{2,})/gm, '')

  const root = {
    type: 'Root',
    children: [],
  }

  let currentNode = root
  let buffer = ''

  for (let i = 0; i < html.length; i++) {
    const char = html[i]

    if (char === '<') {
      if (buffer) {
        currentNode.children.push({
          type: 'Text',
          value: buffer,
        })
        buffer = ''
      }

      let j = i + 1
      while (html[j] !== '>') j++

      const tag = html.slice(i + 1, j)

      if (tag[0] === '/') {
        currentNode = currentNode.parent
      } else {
        const newNode = {
          type: typeByTag[tag],
          children: [],
          parent: currentNode,
        }
        currentNode.children.push(newNode)

        if (!selfClosingTags.includes(tag)) {
          currentNode = newNode
        } else {
          delete newNode.children
        }
      }

      i = j

      continue
    }

    buffer += char
  }

  if (buffer) {
    currentNode.children.push({ type: 'Text', value: buffer })
  }

  return deepRemoveAttribute(root, 'parent')
}

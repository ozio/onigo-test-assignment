import { AST, ASTNode } from './types'

type TextToken = {
  type: 'Text'
  value?: string
}

type BlockToken = {
  type: 'Bold' | 'Italic' | 'BoldItalic'
  state?: 'open' | 'close'
  children?: Token[]
}

type Token = TextToken | BlockToken

const inline2tokens = (input: string): Token[] => {
  const tokens: Token[] = []
  const stack = []
  let currentIndex = 0
  let buffer = ''

  const pushToken = (type, offset) => {
    if (buffer) {
      tokens.push({ type: 'Text', value: buffer })
      buffer = ''
    }

    let state
    if (stack[stack.length - 1] === type) {
      state = 'close'
      stack.pop()
    } else {
      state = 'open'
      stack.push(type)
    }
    tokens.push({ type, state })
    currentIndex += offset
  }

  while (currentIndex < input.length) {
    const char = input[currentIndex]

    if (char === '*' || char === '_') {
      const nextChar = input[currentIndex + 1]
      if (nextChar === char) {
        const afterNextChar = input[currentIndex + 2]
        if (afterNextChar === char) {
          pushToken('BoldItalic', 3)
        } else {
          pushToken('Bold', 2)
        }
      } else {
        pushToken('Italic', 1)
      }
    } else {
      buffer += char
      currentIndex += 1
    }
  }

  if (buffer) {
    tokens.push({ type: 'Text', value: buffer })
  }

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    if (token.type === 'BoldItalic') {
      const state = token.state

      if (state === 'open') {
        tokens.splice(i, 1, { type: 'Bold', state }, { type: 'Italic', state })
      } else {
        tokens.splice(i, 1, { type: 'Italic', state }, { type: 'Bold', state })
      }

      i++
    }
  }

  return tokens
}

const tokens2ast = (tokens: Token[]) => {
  const stack = []

  let root: AST = { type: 'Root', children: [] }
  stack.push(root)

  for (const token of tokens) {
    const currentNode = stack[stack.length - 1]
    if ((token as BlockToken).state === 'open') {
      const newNode: Token = { type: token.type, children: [] }
      currentNode.children.push(newNode)
      stack.push(newNode)
    } else if ((token as BlockToken).state === 'close') {
      stack.pop()
    } else {
      currentNode.children.push(token)
    }
  }

  return root
}

const inline = (string) => tokens2ast(inline2tokens(string)).children

const LISTS_REGEX = /^( *)(([*\-+] (?<unordered>.*))|(\d+. (?<ordered>.*)))/
const INLINE_HEADING_REGEX = /^(#{1,6}) (.*)/

export const md2ast = (markdown = ''): AST => {
  const ast: AST = { type: 'Root', children: [] }

  let newBlock = true
  let inList = false

  const addNode = (node) => {
    ast.children.push(node)

    newBlock = true
    inList = false
  }

  const addToLastNode = (children: ASTNode[]) => {
    const nodes = ast.children
    const idx = nodes.length - 1

    nodes[idx].children = [...nodes[idx].children, ...children]
  }

  const lines = markdown.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const nextLine = lines[i + 1]

    let match

    if (/^=+$/.test(nextLine)) {
      addNode({ type: 'Heading-1', children: inline(line) })
      i++
    } else if (/^-+$/.test(nextLine)) {
      addNode({ type: 'Heading-2', children: inline(line) })
      i++
    } else if (match = INLINE_HEADING_REGEX.exec(line)) {
      addNode({ type: 'Heading-' + match[1].length, children: inline(match[2]) })
    } else if (line === '***') {
      addNode({ type: 'HorizontalLine' })
    } else if (match = LISTS_REGEX.exec(line)) {
      const type = match.groups.ordered ? 'OrderedList' : 'UnorderedList'
      const string = match.groups.unordered || match.groups.ordered
      const level = match[1].length

      if (level > 0) {
        const last = ast.children[ast.children.length - 1]
        if (last.type !== type) continue

        let nodes = last.children[last.children.length - 1].children

        for (let i = 0; i < level - 1; i++) {
          const node = nodes[nodes.length - 1]
          if (node.type !== type) break

          nodes = node.children
        }

        nodes.push({
          type: 'ListItem',
          children: inline(string),
        })

        inList = true

        continue
      }

      if (!inList) addNode({ type, children: [] })

      addToLastNode([{ type: 'ListItem', children: inline(string) }])

      inList = true
    } else if (line === '') {
      newBlock = true
      inList = false
    } else {
      if (newBlock) {
        addNode({ type: 'Paragraph', children: inline(line) })
      } else {
        addToLastNode([{ type: 'LineBreak' }, ...inline(line)])
      }

      newBlock = false
    }
  }

  return ast
}

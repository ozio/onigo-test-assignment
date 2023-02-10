export const title = 'Not Really Rich Text Editor'

export const welcomeMessage = `# Welcome to ${title}

We're happy to introduce you our poor programmed and outdated looking markdown (ha-ha) editor!

It can:
1. Do lists (ordered and unordered).
2. Do simple markup, like *this*, __that__ and even ***both of them***.

It cannot:
- Escape markdown special characters.
- Provide nested lists.
- Deal with broken Markdown.

_Yours sincerely, Nikolay_
_i@mr-ozio.ru_
`

export const layout = [
  {
    type: 'button',
    icon: 'bold',
    action: 'bold',
    label: null,
  },
  {
    type: 'button',
    icon: 'italic',
    action: 'italic',
    label: null,
  },
  {
    type: 'separator',
    icon: null,
    action: null,
    label: null,
  },
  {
    type: 'button',
    icon: 'paragraph',
    action: 'paragraph',
    label: null,
  },
  {
    type: 'button',
    icon: null,
    action: 'h1',
    label: 'H1',
  },
  {
    type: 'button',
    icon: null,
    action: 'h2',
    label: 'H2',
  },
  {
    type: 'button',
    icon: null,
    action: 'h3',
    label: 'H3',
  },
  {
    type: 'button',
    icon: null,
    action: 'h4',
    label: 'H4',
  },
  {
    type: 'separator',
    icon: null,
    action: null,
    label: null,
  },
  {
    type: 'button',
    icon: 'ul',
    action: 'ul',
    label: null,
  },
  {
    type: 'button',
    icon: 'ol',
    action: 'ol',
    label: null,
  },
  {
    type: 'separator',
    icon: null,
    action: null,
    label: null,
  },
]

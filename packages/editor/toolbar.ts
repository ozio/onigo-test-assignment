import { EditorToolbarElement } from './types'

const layout: EditorToolbarElement[] = [
  {
    type: 'button',
    icon: 'Bold',
    action: 'bold',
    label: null,
  },
  {
    type: 'button',
    icon: 'Italic',
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
    icon: 'Paragraph',
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
    type: 'separator',
    icon: null,
    action: null,
    label: null,
  },
  {
    type: 'button',
    icon: 'UnorderedList',
    action: 'ul',
    label: null,
  },
  {
    type: 'button',
    icon: 'OrderedList',
    action: 'ol',
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
    icon: 'Copy',
    action: 'copy',
    label: null,
  },
]

export default layout

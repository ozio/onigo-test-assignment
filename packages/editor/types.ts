import { IconName } from 'ui/icons'

export type EditorAction = 'bold' | 'italic' | 'paragraph' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'ol' | 'ul' | 'copy'

export type EditorToolbarElement = {
  type: 'button'
  icon: IconName | null
  action: EditorAction | null
  label: string | null
} | {
  type: 'separator'
  icon: null
  action: null
  label: null
}

export type MessageToEditor = {
  type: 'setHTML'
  value: string
} | {
  type: 'action'
  value: EditorAction
}

export type MessageFromEditor = {
  type: 'input' | 'paste'
  value: string
} | {
  type: 'ready'
}

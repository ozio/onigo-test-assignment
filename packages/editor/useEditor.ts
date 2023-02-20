import { EditorAction, MessageFromEditor, MessageToEditor } from './types'
import { ast2html, ast2md, html2ast, md2ast } from 'converters'

interface UseEditorProps {
  setMarkdown: (md: string) => void
  editor: () => { postMessage: (message: string) => void }
  initialMarkdown?: string
}

interface UseEditorReturns {
  sendMarkdown: (text: string) => void
  sendAction: (name: EditorAction) => void
  onReceiveMessage: (rawEvent: string) => void
}

export const useEditor = ({ setMarkdown, editor, initialMarkdown = '' }: UseEditorProps): UseEditorReturns => {
  const onReceiveMessage = (rawEvent: string) => {
    let data: MessageFromEditor

    try {
      data = JSON.parse(rawEvent) as MessageFromEditor
    } catch (e) {
      return
    }

    switch (data.type) {
      case 'input':
      case 'paste':
        const ast = html2ast(data.value)
        const md = ast2md(ast)

        setMarkdown(md)
        break

      case 'ready':
        sendMarkdown(initialMarkdown)
        break
    }
  }

  const sendMarkdown = (text: string) => {
    setMarkdown(text)

    const ast = md2ast(text)
    const html = ast2html(ast)

    editor()?.postMessage(JSON.stringify({ type: 'setHTML', value: html } as MessageToEditor))
  }

  const sendAction = (name: EditorAction) => {
    editor()?.postMessage(JSON.stringify({ type: 'action', value: name } as MessageToEditor))
  }

  return {
    onReceiveMessage,
    sendMarkdown,
    sendAction,
  }
}

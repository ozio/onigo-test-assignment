import { html2ast } from 'converters/html2ast'
import { ast2md } from 'converters/ast2md'
import { md2ast } from 'converters/md2ast'
import { ast2html } from 'converters/ast2html'
import { sanitize } from './sanitize'

const noop = () => {}

export default class RichEditor {
  #ui = {}
  #data = {}
  #callbacks = {}

  constructor(options) {
    this.#ui.root = options.container || document.body
    this.#data.html = options.html || ''
    this.#data.markdown = options.markdown || ''
    this.#callbacks.onChange = options.onChange || noop
    this.#callbacks.onHTMLChange = options.onHTMLChange || noop
    this.#callbacks.onMarkdownChange = options.onMarkdownChange || noop

    this.#render()
    this.#mount()
  }

  #render() {
    const template = document.createElement('template')

    template.innerHTML = `
      <div class="editor">
        <div class="editor__rich" contenteditable="true">
          <p><br/></p>
        </div>
        <textarea class="editor__markdown"></textarea>
      </div>
    `

    const container = template.content.querySelector('.editor')
    const richEditor = container.querySelector('.editor__rich')
    const markdownEditor = container.querySelector('.editor__markdown')

    this.#ui = {
      ...this.#ui,
      container,
      richEditor,
      markdownEditor,
    }
  }

  setHTML(string) {
    this.#ui.richEditor.innerHTML = string
    this.#processHTML()
  }

  setMarkdown(string) {
    this.#ui.markdownEditor.value = string
    this.#processMarkdown()
  }

  #triggerCallbacks(updatedHTML, updatedMarkdown) {
    const htmlHasChanged = updatedHTML !== this.#data.html
    const mdHasChanged = updatedMarkdown !== this.#data.markdown

    if (htmlHasChanged || mdHasChanged) {
      this.#callbacks.onChange({ ...this.#data })

      if (htmlHasChanged) this.#callbacks.onHTMLChange(this.#data.html)
      if (mdHasChanged) this.#callbacks.onMarkdownChange(this.#data.markdown)
    }
  }

  #processHTML = () => {
    sanitize(this.#ui.richEditor)

    const updatedHTML = this.#ui.richEditor.innerHTML

    console.log(html2ast(updatedHTML))
    const updatedMarkdown = ast2md(html2ast(updatedHTML))

    this.#triggerCallbacks(updatedHTML, updatedMarkdown)

    this.#data.html = updatedHTML
    this.#data.markdown = updatedMarkdown
    this.#ui.markdownEditor.value = this.#data.markdown
  }

  #processMarkdown = () => {
    const updatedMarkdown = this.#ui.markdownEditor.value
    const updatedHTML = ast2html(md2ast(updatedMarkdown))

    this.#triggerCallbacks(updatedHTML, updatedMarkdown)

    this.#data.markdown = updatedMarkdown
    this.#data.html = updatedHTML
    this.#ui.richEditor.innerHTML = this.#data.html
  }

  #addListeners() {
    this.#ui.richEditor.addEventListener('input', this.#processHTML)
    this.#ui.richEditor.addEventListener('paste', this.#processHTML)
    this.#ui.markdownEditor.addEventListener('input', this.#processMarkdown)
    this.#ui.markdownEditor.addEventListener('paste', this.#processMarkdown)
  }

  #removeListeners() {
    this.#ui.richEditor.removeEventListener('input', this.#processHTML)
    this.#ui.richEditor.removeEventListener('paste', this.#processHTML)
    this.#ui.markdownEditor.removeEventListener('input', this.#processMarkdown)
    this.#ui.markdownEditor.removeEventListener('paste', this.#processMarkdown)
  }

  #mount() {
    if (this.#data.html) this.setHTML(this.#data.html)
    if (this.#data.markdown) this.setMarkdown(this.#data.markdown)

    this.#ui.root.appendChild(this.#ui.container)
    this.#addListeners()
  }

  destroy() {
    this.#removeListeners()
    this.#ui.root.removeChild(this.#ui.container)
  }

  emit(action) {
    switch (action) {
      case 'bold':
        document.execCommand('bold')
        break

      case 'italic':
        document.execCommand('italic')
        break

      case 'h1':
        document.execCommand('formatBlock', false, '<h1>')
        break

      case 'h2':
        document.execCommand('formatBlock', false, '<h2>')
        break

      case 'h3':
        document.execCommand('formatBlock', false, '<h3>')
        break

      case 'h4':
        document.execCommand('formatBlock', false, '<h4>')
        break

      case 'h5':
        document.execCommand('formatBlock', false, '<h5>')
        break

      case 'h6':
        document.execCommand('formatBlock', false, '<h6>')
        break

      case 'paragraph':
        document.execCommand('formatBlock', false, '<p>')
        break

      case 'ol':
        document.execCommand('insertOrderedList')
        break

      case 'ul':
        document.execCommand('insertUnorderedList')
        break

      case 'hr':
        document.execCommand('insertHorizontalRule')
        break
    }
  }
}

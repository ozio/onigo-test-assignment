<script>
  import { onDestroy, onMount } from 'svelte'
  import { welcomeMessage, layout, title } from 'editor/config'
  import { ast2html, ast2md, html2ast, md2ast } from 'converters'
  import Button from './components/Button.svelte'
  import Toolbar from './components/Toolbar.svelte'
  import Window from './components/Window.svelte'
  import Separator from './components/Separator.svelte'
  import EditorContainer from './components/EditorContainer.svelte'
  import Icon from './components/Icon.svelte'
  import contenteditable from 'editor/contenteditable.html?raw'

  let iframe
  let markdown = welcomeMessage

  const emit = (name) => {
    if (name === 'copy') {
      navigator.clipboard.writeText(markdown)
      return
    }

    iframe.contentWindow.postMessage(JSON.stringify({ type: 'action', value: name }))
  }

  const handleReceivedMessage = (event) => {
    let message

    try {
      message = JSON.parse(event.data)
    } catch (e) {
      return
    }

    switch (message.type) {
      case 'input':
      case 'paste':
        const ast = html2ast(message.value)
        const md = ast2md(ast)

        markdown = md
        break

      case 'ready':
        convertAndSend(markdown)
        break
    }
  }

  const convertAndSend = (text) => {
    markdown = text

    const ast = md2ast(text)
    const html = ast2html(ast)

    iframe.contentWindow.postMessage(JSON.stringify({ type: 'setHTML', value: html }))
  }

  const onChangeMarkdown = (event) => {
    markdown = event.target.value
    convertAndSend(markdown)
  }

  onMount(() => {
    window.addEventListener('message', handleReceivedMessage)
    convertAndSend(markdown)
  })

  onDestroy(() => {
    window.removeEventListener('message', handleReceivedMessage)
  })
</script>

<Window title={title}>
  <Toolbar>
    {#each layout as { type, icon, label, action }, idx}
      {#if type === 'separator'}
        <Separator />
      {:else if type === 'button'}
        <Button on:click={() => emit(action)}>
          {#if icon}
            <Icon name={icon} />
          {:else}
            {label}
          {/if}
        </Button>
      {/if}
    {/each}
  </Toolbar>

  <div class="columns">
    <EditorContainer>
      <iframe
        bind:this={iframe}
        title={title}
        srcdoc={contenteditable}
      ></iframe>
    </EditorContainer>
    <EditorContainer>
      <textarea on:input={onChangeMarkdown}>{markdown}</textarea>
    </EditorContainer>
  </div>
</Window>

<style>
  .columns {
    display: flex;
    gap: 2px;
    align-items: stretch;
    height: var(--window-height);
    max-height: var(--window-max-height);
  }

  textarea {
    padding: 10px;
  }
</style>

<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { useEditor, toolbar, type EditorAction } from 'editor'
  import { APP_NAME, WELCOME_MESSAGE } from 'editor/globals'
  import Button from './components/Button.svelte'
  import Toolbar from './components/Toolbar.svelte'
  import Window from './components/Window.svelte'
  import Separator from './components/Separator.svelte'
  import EditorContainer from './components/EditorContainer.svelte'
  import Icon from './components/Icon.svelte'
  import contenteditable from 'editor/contenteditable.html?raw'
  import type { KeyboardEventHandler } from 'svelte/elements'

  let iframe
  let markdown = WELCOME_MESSAGE

  const {
    onReceiveMessage,
    sendMarkdown,
    sendAction,
  } = useEditor({
    editor: () => iframe.contentWindow,
    initialMarkdown: WELCOME_MESSAGE,
    setMarkdown: (val) => markdown = val,
  })

  const emit = (name: EditorAction) => {
    if (name === 'copy') {
      navigator.clipboard.writeText(markdown)
      return
    }

    sendAction(name)
  }

  const handleReceivedMessage = (event) => {
    onReceiveMessage(event.data)
  }

  const handleChangeMarkdown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    markdown = event.currentTarget.value
    sendMarkdown(markdown)
  }

  onMount(() => {
    window.addEventListener('message', handleReceivedMessage)
  })

  onDestroy(() => {
    window.removeEventListener('message', handleReceivedMessage)
  })
</script>

<Window title={APP_NAME}>
  <Toolbar>
    {#each toolbar as { type, icon, label, action }, idx}
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
        title={APP_NAME}
        srcdoc={contenteditable}
      ></iframe>
    </EditorContainer>
    <EditorContainer>
      <textarea on:input={handleChangeMarkdown}>{markdown}</textarea>
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

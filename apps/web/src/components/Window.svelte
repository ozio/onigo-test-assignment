<script>
  import Icon from './Icon.svelte'

  export let title
</script>

<div class="window">
  <div class="window__header">
    <Icon name="app" size="16" />
    {title}
  </div>
  <div class="window__body">
    <slot></slot>
  </div>
</div>

<style>
  .window {
    display: flex;
    flex-direction: column;
    border-style: solid;
    border-width: 2px;
    border-color: var(--light-border-color) var(--shadow-border-color) var(--shadow-border-color) var(--light-border-color);
    background-color: var(--window-background);
    position: absolute;
    width: var(--window-width);
    max-width: var(--window-max-width);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 2px;
  }

  .window__header {
    background-color: var(--header-background);
    color: var(--header-font-color);
    padding: 1px 3px;
    line-height: 20px;
    flex-shrink: 0;
  }

  .window__body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
</style>

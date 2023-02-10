<button on:click>
  <span>
    <slot></slot>
  </span>
</button>

<style>
  button {
    background-color: var(--window-background);
    border: 2px solid;
    border-color: var(--light-border-color) var(--shadow-border-color) var(--shadow-border-color) var(--light-border-color);
    min-width: 28px;
    height: 28px;
    font-weight: 600;
    padding: 0;
  }

  button:active {
    border-color: var(--shadow-border-color) var(--light-border-color) var(--light-border-color) var(--shadow-border-color);
  }

  span {
    font-size: 11px;
    height: 100%;
    position: relative;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:active span {
    left: 1px;
    top: 1px;
  }
</style>

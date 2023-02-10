<div>
  <slot></slot>
</div>

<style>
  div {
    flex: 1;
    display: flex;
    border: 2px solid;
    border-color: var(--shadow-border-color) var(--light-border-color) var(--light-border-color)
    var(--shadow-border-color);
    background-color: white;
    position: relative;
  }
</style>

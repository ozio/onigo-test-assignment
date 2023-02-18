<script lang="ts">
  import * as icons from 'ui/icons'

  export let name: icons.IconName
  export let size = 25
</script>

<img src={icons[name]} alt="" width={size}>

<style>
  img {
    image-rendering: pixelated;
    display: inline-block;
    vertical-align: -2px;
  }
</style>

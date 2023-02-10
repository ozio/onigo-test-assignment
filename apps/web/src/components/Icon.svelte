<script>
  import AppIcon from 'icons/app.gif'
  import BoldIcon from 'icons/bold.gif'
  import ItalicIcon from 'icons/italic.gif'
  import HRIcon from 'icons/hr.gif'
  import OLIcon from 'icons/orderedlist.gif'
  import ULIcon from 'icons/unorderedlist.gif'
  import CopyIcon from 'icons/copy.gif'
  import ParagraphIcon from 'icons/paragraph.gif'

  const icons = {
    app: AppIcon,
    bold: BoldIcon,
    italic: ItalicIcon,
    hr: HRIcon,
    ol: OLIcon,
    ul: ULIcon,
    copy: CopyIcon,
    paragraph: ParagraphIcon,
  }

  export let name
  export let size = 25
</script>

<img src={icons[name]} alt="" width={size}>

<style>
  img {
    image-rendering: pixelated;
    display: inline-block;
    vertical-align: -2px;
  }

  div {
    display: inline-block;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>

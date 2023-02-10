import { Image } from 'react-native'

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

export const Icon = ({ name, size = 25 }) => {
  return (
    <Image source={icons[name]} width={size} height={size} resizeMode="stretch" />
  )
}

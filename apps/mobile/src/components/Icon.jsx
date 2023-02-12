import { Image } from 'react-native'
import * as icons from 'ui/icons'

export const Icon = ({ name, size = 25 }) => {
  return (
    <Image source={icons[name]} width={size} height={size} resizeMode="stretch" />
  )
}

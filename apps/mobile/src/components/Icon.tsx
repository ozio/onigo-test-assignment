import { Image, ImageStyle, StyleProp } from 'react-native'
import * as icons from 'ui/icons'

export interface IconProps {
  name: icons.IconName
  size?: number
  style?: StyleProp<ImageStyle>
}

export const Icon = ({ name, style, size = 25 }: IconProps) => {
  return (
    <Image
      source={icons[name]}
      resizeMode="stretch"
      style={[{ width: size, height: size }, style]}
    />
  )
}

import { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { colors } from 'ui/theme'

interface EditorContainerProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

export const EditorContainer = ({ children, style }: EditorContainerProps) => {
  return (
    <View
      style={[
        styles.container,
        style,
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderLeftColor: colors.borderDark,
    borderTopColor: colors.borderDark,
    borderRightColor: colors.borderLight,
    borderBottomColor: colors.borderLight,
  },
})

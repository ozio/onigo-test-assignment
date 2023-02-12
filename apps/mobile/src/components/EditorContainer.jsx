import { StyleSheet, View } from 'react-native'
import { colors } from 'ui/theme'

export const EditorContainer = ({ children, style = {} }) => {
  return (
    <View
      style={{
        ...styles.container,
        ...style,
      }}
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

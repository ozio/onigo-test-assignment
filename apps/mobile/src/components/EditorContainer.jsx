import { StyleSheet, View } from 'react-native'
import { LIGHT_BORDER_COLOR, SHADOW_BORDER_COLOR } from 'theme'

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
    borderLeftColor: SHADOW_BORDER_COLOR,
    borderTopColor: SHADOW_BORDER_COLOR,
    borderRightColor: LIGHT_BORDER_COLOR,
    borderBottomColor: LIGHT_BORDER_COLOR,
  },
})

import { Text, Pressable, StyleSheet } from 'react-native'
import { FONT_COLOR, LIGHT_BORDER_COLOR, SHADOW_BORDER_COLOR, WINDOW_BACKGROUND } from 'theme'

export const Button = ({ title, onPress, children }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      {children ? children : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: ({ pressed }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WINDOW_BACKGROUND,
    height: 35,
    width: 35,
    borderWidth: 2,
    borderLeftColor: pressed ? SHADOW_BORDER_COLOR : LIGHT_BORDER_COLOR,
    borderTopColor: pressed ? SHADOW_BORDER_COLOR : LIGHT_BORDER_COLOR,
    borderRightColor: pressed ? LIGHT_BORDER_COLOR : SHADOW_BORDER_COLOR,
    borderBottomColor: pressed ? LIGHT_BORDER_COLOR : SHADOW_BORDER_COLOR,
    paddingTop: pressed ? 2 : 0,
    paddingLeft: pressed ? 2 : 0,
  }),
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: FONT_COLOR,
  },
})

import { Text, Pressable, StyleSheet } from 'react-native'
import { colors } from 'ui/theme'

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
    backgroundColor: colors.windowBg,
    height: 35,
    width: 35,
    borderWidth: 2,
    borderLeftColor: pressed ? colors.borderDark : colors.borderLight,
    borderTopColor: pressed ? colors.borderDark : colors.borderLight,
    borderRightColor: pressed ? colors.borderLight : colors.borderDark,
    borderBottomColor: pressed ? colors.borderLight : colors.borderDark,
    paddingTop: pressed ? 2 : 0,
    paddingLeft: pressed ? 2 : 0,
  }),
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: colors.font,
  },
})

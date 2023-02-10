import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import {
  WINDOW_BACKGROUND,
  LIGHT_BORDER_COLOR,
  SHADOW_BORDER_COLOR,
  HEADER_BACKGROUND,
  HEADER_FONT_COLOR,
} from 'theme'
import { Icon } from './Icon'

export const Window = ({ title, children, style = {} }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ ...styles.window, ...style }}>
        <View style={styles.heading}>
          <Icon style={styles.icon} name="app" size={16} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.body}>
          {children}
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  window: {
    borderWidth: 2,
    padding: 2,
    backgroundColor: WINDOW_BACKGROUND,
    borderLeftColor: LIGHT_BORDER_COLOR,
    borderTopColor: LIGHT_BORDER_COLOR,
    borderRightColor: SHADOW_BORDER_COLOR,
    borderBottomColor: SHADOW_BORDER_COLOR,
  },
  heading: {
    padding: 1,
    height: 20,
    backgroundColor: HEADER_BACKGROUND,
    marginBottom: 2,
    flexDirection: 'row',
  },
  icon: {},
  title: {
    color: HEADER_FONT_COLOR,
    lineHeight: 19,
    marginLeft: 2,
  },
  body: {
    flex: 1,
  },
})

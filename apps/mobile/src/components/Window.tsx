import { KeyboardAvoidingView, Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { colors } from 'ui/theme'
import { Icon } from './Icon'
import { ReactNode } from 'react'

interface WindowProps {
  title: string
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

export const Window = ({ title, children, style }: WindowProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.window, style]}>
        <View style={styles.heading}>
          <Icon style={styles.icon} name="App" size={16} />
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
    backgroundColor: colors.windowBg,
    borderLeftColor: colors.borderLight,
    borderTopColor: colors.borderLight,
    borderRightColor: colors.borderDark,
    borderBottomColor: colors.borderDark,
  },
  heading: {
    padding: 1,
    height: 20,
    backgroundColor: colors.headerBg,
    marginBottom: 2,
    flexDirection: 'row',
  },
  icon: {},
  title: {
    color: colors.headerFont,
    lineHeight: 19,
    marginLeft: 2,
  },
  body: {
    flex: 1,
  },
})

import { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

interface ToolbarProps {
  children: ReactNode
}

export const Toolbar = ({ children }: ToolbarProps) => {
  return (
    <View style={styles.toolbar}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    paddingTop: 2,
    paddingBottom: 2,
  },
})

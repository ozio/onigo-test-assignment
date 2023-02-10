import { View, StyleSheet } from 'react-native'

export const Toolbar = ({ children, style = {} }) => {
  return (
    <View
      style={{
        ...styles.toolbar,
        ...style,
      }}
    >
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

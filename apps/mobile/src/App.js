import { ImageBackground, StyleSheet } from 'react-native'
import { useKeepAwake } from 'expo-keep-awake'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { colors } from 'ui/theme'
import { welcomeMessage } from 'editor/config'
import { Editor } from './components/Editor'
import Image from '../assets/clouds.png'

export default function App() {
  useKeepAwake()

  return (
    <SafeAreaProvider>
      <ImageBackground source={Image} style={styles.container}>
        <SafeAreaView style={styles.safeView}>
          <Editor welcomeMessage={welcomeMessage} />
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBg,
  },
  safeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

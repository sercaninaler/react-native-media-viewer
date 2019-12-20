/* eslint-disable */
import React, {useEffect, useState} from 'react'
import App from './src/App'
import * as Font from 'expo-font'
import { Platform } from 'react-native'

if (Platform.OS === 'web') {
  window.oncontextmenu = (event) => {
    event.preventDefault()
    event.stopPropagation()
    return false
  }
}

const AppContainer = () => {
  const [isLoading, setIsLoading] = useState(true)

  const loadAssetsAsync = async () => {
    await Font.loadAsync({
      'Ubuntu Mono': require('./assets/fonts/UbuntuMono-R.ttf'),
    });

    setIsLoading(false)
  }

  useEffect( () => {
    loadAssetsAsync()
  }, [])

  return(
    !isLoading && <App />
  )
}

export default AppContainer
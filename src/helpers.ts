import { Platform } from 'react-native'
import { AsyncStorage } from 'react-native';

const storage = localStorage
//const storage = Platform.OS === 'web' ? localStorage : AsyncStorage

import { TAGS, SETTINGS } from './constants'

export const setData = async (key: string, value: string): Promise<void> => {
  try {
    await storage.setItem(key, value)
  } catch (e) {
    // throw error
  }
}

export const getData = async (key: string): Promise<string | null | undefined> => {
  try {
    return await storage.getItem(key)
  } catch(e) {
    // throw error
  }
}

export const initLocalStorage = (): void => {
  getData('pictures').then(result => {
    if (result === null) {
      setData('pictures', JSON.stringify({})).then()
    }
  })

  getData('tags').then(result => {
    if (result === null) {
      setData('tags', JSON.stringify(TAGS)).then()
    }
  })

  getData('settings').then(result => {
    if (result === null) {
      setData('settings', JSON.stringify(SETTINGS)).then()
    }
  })
}

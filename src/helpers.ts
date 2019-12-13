import AsyncStorageFactory from '@react-native-community/async-storage';
import WebStorage from '@react-native-community/async-storage-backend-web';
//import LegacyStorage from '@react-native-community/async-storage-backend-legacy';

import { TAGS, SETTINGS } from './constants'

const webStorage = new WebStorage();
//const legacyStorage = new LegacyStorage();
const storage = AsyncStorageFactory.create(webStorage, {});

export const setData = async (key: string, value: string): Promise<void> => {
  try {
    await storage.set(key, value)
  } catch (e) {
    // throw error
  }
}

export const getData = async (key: string): Promise<void> => {
  try {
    const value = await storage.get(key)
    if (value !== null) {
      return value
    }
  } catch(e) {
    // throw error
  }
}

export const initLocalStorage = (): void => {
  getData('pictures').then(result => {
    if (!result) {
      setData('pictures', JSON.stringify({}))
    }
  })

  getData('tags').then(result => {
    if (!result) {
      setData('tags', JSON.stringify(TAGS))
    }
  })

  getData('settings').then(result => {
    if (!result) {
      setData('settings', JSON.stringify(SETTINGS))
    }
  })
}

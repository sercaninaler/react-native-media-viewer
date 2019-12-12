import AsyncStorage from '@react-native-community/async-storage'

export const storeData = async () => {
  try {
    await AsyncStorage.setItem('@storage_Key', 'stored value')
  } catch (e) {
    // saving error
  }
}

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      // value previously stored
    }
  } catch(e) {
    // error reading value
  }
}

const tags = ['animals', 'fruits', 'planets']
const settings = { imageWidth: 640, theme: 'light' }

export const initLocalStorage = (): void => {
  if (!localStorage.getItem('pictures')) {
    localStorage.setItem('pictures', JSON.stringify({}))
  }
  if (!localStorage.getItem('tags')) {
    localStorage.setItem('tags', JSON.stringify(tags))
  }
  if (!localStorage.getItem('settings')) {
    localStorage.setItem('settings', JSON.stringify(settings))
  }
}

export const localStorageTags = localStorage.getItem('tags') ? JSON.parse(localStorage.getItem('tags') || '') : tags
export const localStorageSettings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings') || '') : settings

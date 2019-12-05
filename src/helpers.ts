const tags = ['animals', 'fruits', 'planets']
const settings = { imageWidth: 640, theme: 'light' }

export const initLocalStorage = (): void => {
  if (!JSON.parse(localStorage.getItem('pictures') || '')) {
    localStorage.setItem('pictures', JSON.stringify({}))
  }
  if (!JSON.parse(localStorage.getItem('tags') || '')) {
    localStorage.setItem('tags', JSON.stringify(tags))
  }
  if (!JSON.parse(localStorage.getItem('settings') || '')) {
    localStorage.setItem('settings', JSON.stringify(settings))
  }
}

export const localStorageTags = JSON.parse(localStorage.getItem('tags') || '') || tags
export const localStorageSettings = JSON.parse(localStorage.getItem('settings') || '') || settings

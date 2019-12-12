import React, { FC, useState } from 'react'
import { View, Text, TextInput, TouchableHighlight, Image, ActivityIndicator } from 'react-native'
//import Constants from 'expo-constants';
import axios from 'axios'
import { pixabayApi } from './constants'
import { initLocalStorage, localStorageTags, localStorageSettings } from './helpers'

import importedStyles from './styles'

type ApiResults = {
  webformatURL: string;
  tags: string;
}

type Settings = {
  theme: string;
  imageWidth: number;
}

type Pictures = {
  isDeleted: boolean;
  showInfo: boolean;
  image: string;
  tags: string;
}

const App: FC = () => {
  initLocalStorage()

  const [pictures, setPictures] = useState<Pictures[]>([])
  /* const [sounds, setSounds] = useState([]) */
  const [query, setQuery] = useState<string>('')
  const [tags, setTags] = useState<string[]>(localStorageTags)
  const [settingsCounter, setSettingsCounter] = useState<number>(0)
  const [settings, setSettings] = useState<Settings>(localStorageSettings )
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>(10)

  let styles = importedStyles
  const { theme } = settings

  if (theme === 'light') {
    styles = {
      ...importedStyles,
      app: { ...importedStyles.app, backgroundColor: '#FFFFFF' },
    }
  }

  const insertTag = (tag: string): void => {
    if (tag !== '' && tags.indexOf(tag) === -1) {
      tags.unshift(tag)
      setTags(tags)
      localStorage.setItem('tags', JSON.stringify(tags))
    }
  }

  const getPictures = async (keyword: string): Promise<void> => {
    const pictureQuery = keyword.trim()
    setMessage(null)
    setLimit(10)
    const localData = JSON.parse(localStorage.getItem('pictures') || '')

    if ((!Array.isArray(localData[pictureQuery]) ||
        !localData[pictureQuery].length) ||
        Math.round(new Date().getTime() / 1000) - localData[`${pictureQuery}_lastUpdate`] > 12 * 60 * 60
    ) {
      setIsLoading(true)
      const response = await axios.get(pixabayApi(pictureQuery))
      const data = response.data.hits

      if (data.length) {
        const newPictures: Pictures[] = []

        data.forEach((item: ApiResults) => {
          newPictures.push({
            image: item.webformatURL,
            tags: item.tags,
            isDeleted: false,
            showInfo: false,
          })
        })

        localData[pictureQuery] = newPictures
        localData[`${pictureQuery}_lastUpdate`] = Math.round(new Date().getTime() / 1000)
        localStorage.setItem('pictures', JSON.stringify(localData))
        setPictures(newPictures)

        insertTag(pictureQuery)
      } else {
        setTimeout(() => {
          setMessage('Couldn\'t find any results ')
        }, 500)
        setPictures([])
      }
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    } else {
      setPictures(localData[pictureQuery])

      if (tags.indexOf(pictureQuery) === -1) {
        insertTag(pictureQuery)
      }
    }
  }

  /* const getSounds = async (query) => {
    const response = await axios.get(freesoundApi(query))
    const sounds = response.data.results
    // console.log(sounds)
    setSounds(sounds)
    playAudio(sounds[0].previews['preview-lq-mp3'])
  } */

  /* const playAudio = (fileName) => {
    if (sound) {
      sound.pause()
    }
    sound = new Audio(fileName)
    sound.play()
  } */

  const togglePicture = (index: number): void => {
    const newPictures = [...pictures]
    newPictures[index].showInfo = !newPictures[index].showInfo

    setPictures(newPictures)
  }

  const deletePicture = (index: number, tag: string): void => {
    const newPictures = [...pictures]
    newPictures[index].isDeleted = true
    setPictures(newPictures)

    const localData = JSON.parse(localStorage.getItem('pictures') || '')
    localData[tag] = newPictures
    localData[`${tag}_lastUpdate`] = Math.round(new Date().getTime() / 1000)
    localStorage.setItem('pictures', JSON.stringify(localData))
  }

  const onSubmit = (): void => {
    getPictures(query)
  }

  /* const onChange = (event: React.SyntheticEvent): void => {
    setQuery(event.target.value.toLowerCase())
  }*/

  const onChangeText = (text: string): void => {
    setQuery(text.toLowerCase())
  }

  const showSettings = (): void => {
    setSettingsCounter(settingsCounter + 1)
  }

  const updateSettings = (key: string, value: string): void => {
    const newSettings = {
      ...settings,
      [key]: value,
    }
    setSettings(newSettings)
    localStorage.setItem('settings', JSON.stringify(newSettings))
  }

  const renderTags = (text: string): object => {
    const pictureTags = text.split(',')
    return pictureTags.map((tag) => (
      <TouchableHighlight
        key={tag}
        style={{...styles.button, marginLeft: 2, marginRight: 2}}
        underlayColor="#cccccc"
        onPress={(): void => {
           setQuery(tag)
           getPictures(tag)
        }}
      >
        <Text>{tag}</Text>
      </TouchableHighlight>
    ))
  }

  const filteredPictures = pictures.filter(picture => !picture.isDeleted).slice(0, limit)

  //console.log(Constants)

  return (
    <View style={styles.app}>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={(text: string): void => onChangeText(text)}
          onSubmitEditing={onSubmit}
          placeholder="cats, planets, fruits,..."
          selectTextOnFocus
        />
      </View>
      <View style={styles.tags}>
        {tags.map((tag) => (
          <TouchableHighlight
              key={tag}
              style={styles.button}
              onPress={(): void => {
                setQuery(tag)
                getPictures(tag)
              }}
          >
            <Text>{tag}</Text>
          </TouchableHighlight>
        ))}
      </View>

      {message && <Text style={styles.message}>{message}</Text>}

      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {!isLoading && pictures.length !== 0 && (
      <View style={styles.pictureHolder}>
        {filteredPictures.map((picture, index) => (
          <TouchableHighlight
            key={picture.image}
            underlayColor="#cccccc"
            onPress={(): void => togglePicture(index)}
          >
            <View style={styles.pictureHolder} >
              <Image
                style={styles.picture}
                resizeMode={'cover'}
                source={{uri: picture.image}}
              />

              {picture.showInfo ? (
                <View style={styles.pictureInfo}>
                  <TouchableHighlight
                    underlayColor="#cccccc"
                    style={{...styles.button, marginLeft: 2, marginRight: 2}}
                    onPress={(): void => deletePicture(index, query) }
                  >
                    <Text>x</Text>
                  </TouchableHighlight>
                  {renderTags(picture.tags)}
                </View>
              ) : null}
            </View>
          </TouchableHighlight>
        ))}

        <TouchableHighlight
          style={{...styles.button, marginBottom: 50, marginLeft: 'auto', marginRight: 'auto'}}
          underlayColor="#cccccc"
          onPress={(): void => setLimit(limit + 10) }
        >
          <Text>Load More</Text>
        </TouchableHighlight>
      </View>
      )}

      <View style={styles.footer}>
        {settingsCounter < 4 && (
          <>
            <TouchableHighlight
                style={styles.footerLink}
                underlayColor="#ccc"
                onPress={(): void => { showSettings() }}
            >
              <Text>Media Viewer</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={{...styles.footerLink, borderLeftWidth: 1}}
                underlayColor="#ccc"
                onPress={(): void => { updateSettings('theme', theme === 'dark' ? 'light' : 'dark') }}
            >
              <Text>{theme === 'dark' ? 'Light' : 'Dark'} Mode</Text>
            </TouchableHighlight>
          </>
        )}
        {settingsCounter > 20 && <TouchableHighlight
            style={styles.footerLink}
            onPress={(): void => showSettings()}
            underlayColor="#ccc"
        >
          <Text>Language (English)</Text>
        </TouchableHighlight>}

        {settingsCounter === 4 && <TouchableHighlight
            style={styles.footerLink}
            onPress={(): void => showSettings()}
            underlayColor="#ccc"
        >
          <Text>Settings</Text>
        </TouchableHighlight>}

        {settingsCounter > 4 && <TouchableHighlight
            style={styles.footerLink}
            onPress={(): void => setSettingsCounter(0)}
            underlayColor="#ccc"
        >
          <Text>Back</Text>
        </TouchableHighlight>}

        {settingsCounter > 4 && <TouchableHighlight
            style={{...styles.footerLink, borderLeftWidth: 1}}
            underlayColor="#ccc"
            onPress={(): void => {
              localStorage.setItem('tags', JSON.stringify([]))
              setTags([])
            }}
        >
          <Text>Clear tags</Text>
        </TouchableHighlight>}

        {settingsCounter > 4 && <TouchableHighlight
            style={{...styles.footerLink, borderLeftWidth: 1}}
            underlayColor="#ccc"
            onPress={(): void => {
            setPictures([])
            localStorage.setItem('pictures', JSON.stringify({}))
            }}
        >
          <Text>Clear cache</Text>
        </TouchableHighlight>}
      </View>
    </View>
  )
}

export default App

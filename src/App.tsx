import React, { FC, useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { Resizable } from 're-resizable'
import { pixabayApi } from './constants'
import { initLocalStorage, localStorageTags, localStorageSettings } from './helpers'

import importedStyles from './styles'
import './index.css'

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

  let styles = importedStyles
  const { theme, imageWidth } = settings

  if (theme === 'light') {
    styles = {
      ...importedStyles,
      app: { ...importedStyles.app, backgroundColor: '#FFFFFF' },
    }
  }

  styles = StyleSheet.create(styles)

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

    const localData = JSON.parse(localStorage.getItem('pictures') || '')

    if ((!Array.isArray(localData[pictureQuery]) || !localData[pictureQuery].length) || Math.round(new Date().getTime() / 1000) - localData[`${pictureQuery}_lastUpdate`] > 12 * 60 * 60) {
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

  const renderTags = (text: string) => {
    const pictureTags = text.split(',')
    return pictureTags.map((tag) => (
      <button
        type="button"
        key={tag}
        onClick={(): void => {
          setQuery(tag)
          getPictures(tag)
        }}
      >
        {tag}
      </button>
    ))
  }

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
              style={styles.tag}
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
        <div className="loader">
          <Loader
            type="BallTriangle"
            color="#FFF"
            height={100}
            width={100}
            timeout={500000}
          />
        </div>
      )}

      <div className="App-picture-items-holder">
        {!isLoading && pictures.length !== 0 && (
        <div className="App-picture-items">
          <Resizable
            size={{width: imageWidth, height: ''}}
            className="App-picture-resizable"
            enable={{
              top: false,
              right: window.innerWidth > imageWidth,
              bottom: false,
              left: window.innerWidth > imageWidth,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
            onResizeStop={(e, d, x, size): void => { updateSettings('imageWidth', (imageWidth + size.width).toString()) }}
          >
            {pictures.map((picture, index) => (
              !picture.isDeleted && (
                <div className="App-picture-item" key={picture.image}>
                  <img
                    src={picture.image}
                    alt={picture.tags}
                    className="App-picture-item-image"
                    onClick={(): void => togglePicture(index)}
                  />

                  {picture.showInfo ? (
                    <div className="App-picture-item-info">
                      <div className="App-picture-item-tags">
                        <button
                          type="button"
                          style={{ color: 'red' }}
                          onClick={(): void => {
                            deletePicture(index, query)
                          }}
                        >
                          x
                        </button>
                        {renderTags(picture.tags)}
                      </div>
                    </div>
                  ) : null}
                </div>
              )))}
          </Resizable>
        </div>
        )}
      </div>

      <div className={theme === 'dark' ? 'App-footer dark' : 'App-footer'}>
        {settingsCounter <= 4 && (
          <>
            <button type="button" className="App-footer-label" onClick={(): void => showSettings()}>Media Viewer</button>
            <button type="button" className="App-footer-item" onClick={(): void => updateSettings('theme', theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </>
        )}
        {settingsCounter > 20 && <button type="button" className="App-footer-item" onClick={(): void => showSettings()}>Language (English)</button>}

        {settingsCounter === 4 && <button type="button" className="App-footer-item" onClick={(): void => showSettings()}>Settings</button>}
        {settingsCounter > 4 && <button type="button" className="App-footer-item" onClick={(): void => setSettingsCounter(0)}>Back</button>}
        {settingsCounter > 4 && (
        <button
          type="button"
          className="App-footer-item"
          onClick={(): void => {
            localStorage.setItem('tags', JSON.stringify([]))
            setTags([])
          }}
        >
          Clear tags
        </button>
        )}
        {settingsCounter > 4 && (
        <button
          type="button"
          className="App-footer-item"
          onClick={(): void => {
            setPictures([])
            localStorage.setItem('pictures', JSON.stringify({}))
          }}
        >
          Clear cache
        </button>
        )}
      </div>
    </View>
  )
}

export default App

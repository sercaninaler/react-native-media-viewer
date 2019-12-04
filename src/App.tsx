import React, { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { Resizable } from 're-resizable'
import { pixabayApi } from './constants'
import { initLocalStorage, localStorageTags, localStorageSettings } from './helpers'

import importedStyles from './styles'
import './index.css'

const App = () => {
  initLocalStorage()

  const [pictures, setPictures] = useState([])
  /* const [sounds, setSounds] = useState([]) */
  const [query, setQuery] = useState('')
  const [tags, setTags] = useState(localStorageTags)
  const [settingsCounter, setSettingsCounter] = useState(0)
  const [settings, setSettings] = useState(localStorageSettings)
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  let newStyles = importedStyles
  const { theme, imageWidth } = settings

  if (theme === 'light') {
    newStyles = {
      ...importedStyles,
      app: { ...importedStyles.app, backgroundColor: '#FFFFFF' },
    }
  }

  const styles = StyleSheet.create(newStyles)

  const insertTag = (tag) => {
    if (tag !== '' && tags.indexOf(tag) === -1) {
      tags.unshift(tag)
      setTags(tags)
      localStorage.setItem('tags', JSON.stringify(tags))
    }
  }

  const getPictures = async (keyword) => {
    const pictureQuery = keyword.trim()
    setMessage(null)

    const localData = JSON.parse(localStorage.getItem('pictures'))

    if ((!Array.isArray(localData[pictureQuery]) || !localData[pictureQuery].length) || Math.round(new Date().getTime() / 1000) - localData[`${pictureQuery}_lastUpdate`] > 24 * 60 * 60) {
      setIsLoading(true)
      const response = await axios.get(pixabayApi(pictureQuery))
      const data = response.data.hits

      if (data.length) {
        const newPictures = []
        data.forEach((item) => {
          newPictures.push({
            image: item.webformatURL,
            tags: item.tags,
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

  const togglePicture = (index) => {
    const newPictures = [...pictures]
    if (newPictures[index].showInfo === undefined) {
      newPictures[index].showInfo = 0
    } else {
      newPictures[index].showInfo += 1
    }

    setPictures(newPictures)
  }

  const deletePicture = (index, tag) => {
    const newPictures = [...pictures]
    newPictures[index].isDeleted = true
    setPictures(newPictures)

    const localData = JSON.parse(localStorage.getItem('pictures'))
    localData[tag] = newPictures
    localData[`${tag}_lastUpdate`] = Math.round(new Date().getTime() / 1000)
    localStorage.setItem('pictures', JSON.stringify(localData))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    getPictures(query)
  }

  const onChange = (event) => {
    setQuery(event.target.value.toLowerCase())
  }

  const onChangeText = (event) => {
    setQuery(event.toLowerCase())
  }

  const showSettings = () => {
    setSettingsCounter(settingsCounter + 1)
  }

  const updateSettings = (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value,
    }
    setSettings(newSettings)
    localStorage.setItem('settings', JSON.stringify(newSettings))
  }

  const renderTags = (text) => {
    const pictureTags = text.split(',')
    return pictureTags.map((tag) => (
      <button
        type="button"
        key={tag}
        onClick={() => {
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
          onChangeText={(text) => onChangeText(text)}
          onSubmitEditing={onSubmit}
          placeholder="cats, planets, fruits,..."
          selectTextOnFocus
        />
      </View>
      <div className="App-tags">
        {tags.map((tag) => (
          <button
            type="button"
            className={`App-tags-item ${tag === query && 'selected'}`}
            key={tag}
            onClick={() => {
              setQuery(tag)
              getPictures(tag)
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {message && <div className="App-message">{message}</div>}

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
            size={{width: imageWidth}}
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
            onResizeStop={(e, d, x, size) => { updateSettings('imageWidth', imageWidth + size.width) }}
          >
            {pictures.map((picture, index) => (
              !picture.isDeleted && (
                <div className="App-picture-item" key={picture.image}>
                  <img
                    src={picture.image}
                    alt={picture.tags}
                    className="App-picture-item-image"
                    onClick={() => togglePicture(index)}
                  />

                  {picture.showInfo % 2 === 0 && (
                    <div className="App-picture-item-info">
                      <div className="App-picture-item-tags">
                        <button
                          type="button"
                          style={{ color: 'red' }}
                          onClick={() => {
                            deletePicture(index, query)
                          }}
                        >
                          x
                        </button>
                        {renderTags(picture.tags)}
                      </div>
                    </div>
                  )}
                </div>
              )))}
          </Resizable>
        </div>
        )}
      </div>
      <div className={theme === 'dark' ? 'App-footer dark' : 'App-footer'}>
        {settingsCounter <= 4 && (
          <>
            <button type="button" className="App-footer-label" onClick={() => showSettings()}>Media Viewer</button>
            <button type="button" className="App-footer-item" onClick={() => updateSettings('theme', theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </>
        )}
        {1 === 2 && <button type="button" className="App-footer-item" onClick={() => showSettings()}>Language (English)</button>}

        {settingsCounter === 4 && <button type="button" className="App-footer-item" onClick={() => showSettings()}>Settings</button>}
        {settingsCounter > 4 && <button type="button" className="App-footer-item" onClick={() => setSettingsCounter(0)}>Back</button>}
        {settingsCounter > 4 && (
        <button
          type="button"
          className="App-footer-item"
          onClick={() => {
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
          onClick={() => {
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

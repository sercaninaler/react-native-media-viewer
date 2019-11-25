import React, { useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { Resizable } from 're-resizable'
import { pixabayApi } from './constants'

import styles from './styles'
import './index.css'
import './App.css'

import SearchSvg from '../assets/search.svg'

const App = () => {
  const searchQueryRef = useRef(null)

  if (!JSON.parse(localStorage.getItem('pictures'))) {
    localStorage.setItem('pictures', JSON.stringify({}))
  }
  if (!JSON.parse(localStorage.getItem('tags'))) {
    localStorage.setItem('tags', JSON.stringify(['animals', 'fruits', 'planets']))
  }

  const localStorageTags = JSON.parse(localStorage.getItem('tags'))

  const [pictures, setPictures] = useState([])
  /* const [sounds, setSounds] = useState([]) */
  const [query, setQuery] = useState('')
  const [tags, setTags] = useState(localStorageTags)
  const [settingsCounter, setSettingsCounter] = useState(0)
  const [theme, setTheme] = useState('light')
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  let newStyles = styles
  if (theme === 'light') {
    newStyles = { ...styles, app: { ...styles.app, backgroundColor: '#FFFFFF' } }
  }

  const style = StyleSheet.create(newStyles)

  const insertTag = (tag) => {
    if (tag !== '' && tags.indexOf(tag) === -1) {
      tags.unshift(tag)
      setTags(tags)
      localStorage.setItem('tags', JSON.stringify(tags))
    }
  }

  const getPictures = async (pictureQuery) => {
    setMessage(null)
    const localData = JSON.parse(localStorage.getItem('pictures'))

    if ((!Array.isArray(localData[pictureQuery]) || !localData[pictureQuery].length) || Math.round(new Date().getTime() / 1000) - localData[`${pictureQuery}_lastUpdate`] > 24 * 60 * 60) {
      setIsLoading(true)
      const response = await axios.get(pixabayApi(pictureQuery))
      const data = response.data.hits

      if (data.length) {
        const newData = []
        data.forEach((item) => {
          newData.push({
            image: item.webformatURL,
            tags: item.tags,
          })
        })

        localData[pictureQuery] = newData
        localData[`${pictureQuery}_lastUpdate`] = Math.round(new Date().getTime() / 1000)
        localStorage.setItem('pictures', JSON.stringify(localData))
        setPictures(newData)

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

  const togglePicture = (id) => {
    const newPictures = [...pictures]
    newPictures[id].showImage = !newPictures[id].showImage
    setPictures(newPictures)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    getPictures(query)
  }

  const onChange = (event) => {
    setQuery(event.target.value.toLowerCase())
  }

  const showSettings = () => {
    setSettingsCounter(settingsCounter + 1)
  }

  return (
    <View style={style.app}>
      <form onSubmit={onSubmit} className="Search-form">
        <input
          ref={searchQueryRef}
          name="searchQuery"
          type="text"
          className="Search-input"
          placeholder="Search for pictures"
          autoComplete="off"
          onChange={onChange}
          onFocus={(event) => event.target.select()}
          value={query}
        />
        <button className="Search-button" type="submit">
          <img src={SearchSvg} alt="Homepage" />
        </button>
      </form>
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
          color="#333"
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
            defaultSize={{ minWidth: 640 }}
            enable={{
              top: false,
              right: window.innerWidth > 640,
              bottom: false,
              left: window.innerWidth > 640,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
            className="App-picture-resizable"
          >
            {pictures.map((picture, index) => (
              <div className="App-picture-item" key={picture.image}>
                <img
                  src={picture.image}
                  alt={picture.tags}
                  className="App-picture-item-image"
                />

                <div className="App-picture-item-info">
                  <h2 className="App-picture-item-title">{picture.tags}</h2>
                </div>

                {picture.showImage && (
                <div>
                  <button
                    name={index}
                    type="submit"
                    className="Search-button"
                    onClick={() => togglePicture(index)}
                  >
                    {picture.showImage ? 'Hide' : 'Show' }
                    {' '}
                    Image
                  </button>
                </div>
                )}
              </div>
            ))}
          </Resizable>
        </div>
        )}
      </div>
      <div className="App-footer">
        {settingsCounter <= 4 && (
          <>
            <button type="button" className="App-footer-label" onClick={() => showSettings()}>Media Viewer</button>
            <button type="button" className="App-footer-item" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? 'Light' : 'Dark'}
              {' '}
              Mode
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

import React, { useState, useEffect, useRef } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import styles from './styles'

import './index.css'
import './App.css'
import { PIXABAY_API_URL, PIXABAY_API_KEY, FREESOUND_API_URL, FREESOUND_API_KEY } from '../config'

import HomeSvg from '../assets/home.svg'
import SearchSvg from '../assets/search.svg'

export const pixabayApi = query => `${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal`
export const freesoundApi = query =>`${FREESOUND_API_URL}?query=${query}&token=${FREESOUND_API_KEY}
&normalized=true&fields=previews,description&sort=downloads_desc&filter=duration:[1 TO 5]`

const App = () => {
  const searchQueryRef = useRef(null)

  if (!JSON.parse(localStorage.getItem('pictures'))) {
    localStorage.setItem('pictures', JSON.stringify({}))
  }
  if (!JSON.parse(localStorage.getItem('tags'))) {
    localStorage.setItem('tags', JSON.stringify(['animals','fruits','planets']))
  }

  const localStorageTags = JSON.parse(localStorage.getItem('tags'))

  const [ pictures, setPictures ] = useState([])
  const [ sounds, setSounds ] = useState([])
  const [ query, setQuery ] = useState('')
  const [ tags, setTags ] = useState(localStorageTags)
  const [ settingsCounter, setSettingsCounter ] = useState(0)
  const [ theme, setTheme ] = useState('light')
  const [ message, setMessage ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)

  let sound = null

  let newStyles = styles
  if (theme === 'light') {
    newStyles = Object.assign({}, styles, {
      app: {...styles.app, backgroundColor:'#FFFFFF'}
    })
  }

  const style = StyleSheet.create(newStyles)

  const getPictures = async (query) => {
    setMessage(null)
    const localData = JSON.parse(localStorage.getItem('pictures'))

    if ((!Array.isArray(localData[query]) || !localData[query].length) || Math.round(new Date().getTime() / 1000) - localData[query + '_lastUpdate'] > 24 * 60 * 60) {
      setIsLoading(true)
      const response = await axios.get(pixabayApi(query))
      const data = response.data.hits

      if (data.length) {
        const newData = []
        data.forEach((item) => {
          newData.push({
            image: item.webformatURL,
            tags: item.tags,
          })
        })

        localData[query] = newData
        localData[query + '_lastUpdate'] = Math.round(new Date().getTime() / 1000)
        localStorage.setItem('pictures', JSON.stringify(localData))
        setPictures(newData)

        insertTag(query)
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
      setPictures(localData[query])

      if (tags.indexOf(query) === -1) {
        insertTag(query)
      }
    }
  }

  const insertTag = tag => {
    if (tag !== '' && tags.indexOf(tag) === -1) {
      tags.unshift(tag)
      setTags(tags)
      localStorage.setItem('tags', JSON.stringify(tags))
    }
  }

  const getSounds = async (query) => {
    const response = await axios.get(freesoundApi(query))
    const sounds = response.data.results
    //console.log(sounds)
    setSounds(sounds)
    playAudio(sounds[0].previews['preview-lq-mp3'])
  }

  const togglePicture = id => {
    const newPictures = [...pictures]
    newPictures[id].showImage = !newPictures[id].showImage
    setPictures(newPictures)
  }

  const playAudio = fileName => {
    if (sound) {
      sound.pause()
    }
    sound = new Audio(fileName)
    sound.play()
  }

  const onSubmit = event => {
    event.preventDefault()
    getPictures(query)
  }

  const onChange = event => {
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
          onFocus={event => event.target.select()}
          value={query}
        />
        <button className="Search-button">
          <img src={SearchSvg} alt="Homepage" />
        </button>
      </form>
      <div className="App-tags">
        {1 === 2 && tags.length !== 0 && <div className="App-tags-item App-tags-label" onClick={() => {
          setQuery('')
          setPictures([])
          searchQueryRef.current.focus()
        }}>
          <img src={HomeSvg} alt="Homepage" />
        </div>}
        {tags.map((tag) => (
          <div className={`App-tags-item ${tag === query && "selected"}`} key={tag} onClick={() => {
            setQuery(tag)
            getPictures(tag)
          }}>
            {tag}
          </div>
        ))}
      </div>

      {message && <div className="App-message">{message}</div>}

      {isLoading && <div className="loader">
        <Loader
          type="BallTriangle"
          color="#333"
          height={100}
          width={100}
          timeout={5000}
        />
      </div>}

      <div className="App-picture-items-holder">
        {!isLoading && pictures.length !== 0 && <div className="App-picture-items">
          {pictures.map((picture, index) => (
            <div className="App-picture-item" key={picture.image} /*onClick={() => { getSounds(query) }}*/>
              {!picture.showImage && <img
                src={picture.image}
                alt={picture.tags}
                className="App-picture-item-image"
              />}

              {picture.showImage && <h2 className="App-picture-item-title">{picture.tags}</h2>}

              {picture.showImage && <div>
                <button
                  name={index}
                  type="submit"
                  className="Search-button"
                  onClick={() => togglePicture(index)}
                >
                  {picture.showImage ? 'Hide' : 'Show' } Image
                </button>
              </div>}
            </div>
          ))}
        </div>}
      </div>
      <div className="App-footer">
        {settingsCounter <= 4 && <>
          <div className="App-footer-label" onClick={() => showSettings()}>Media Player for Kids</div>
          <span className="App-footer-item" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
        </>}
        {1 === 2 && <span className="App-footer-item" onClick={() => showSettings()}>Language (English)</span>}

        {settingsCounter === 4 && <span className="App-footer-item" onClick={() => showSettings()}>Settings</span>}
        {settingsCounter > 4 && <span className="App-footer-item" onClick={() => setSettingsCounter(0)}>Back</span>}
        {settingsCounter > 4 && <span className="App-footer-item" onClick={() => {
          localStorage.setItem('tags', JSON.stringify([]))
          setTags([])
        }}>Clear tags</span>}
        {settingsCounter > 4 && <span className="App-footer-item" onClick={() => {
          setPictures([])
          localStorage.setItem('pictures', JSON.stringify({}))
        }}>Clear cache</span>}
      </div>
    </View>
  )
}

export default App
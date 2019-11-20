import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import './App.css'
import { PIXABAY_API_URL, PIXABAY_API_KEY, FREESOUND_API_URL, FREESOUND_API_KEY } from '../config'

export const pixabayApi = query => `${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal`
export const freesoundApi = query =>`${FREESOUND_API_URL}?query=${query}&token=${FREESOUND_API_KEY}
&normalized=true&fields=previews,description&sort=downloads_desc&filter=duration:[1 TO 5]`

const App = () => {
  if (!JSON.parse(localStorage.getItem('pictures'))) {
    localStorage.setItem('pictures', JSON.stringify({}))
  }
  if (!JSON.parse(localStorage.getItem('tags'))) {
    localStorage.setItem('tags', JSON.stringify(['fruits','animals','planets']))
  }

  const localStorageTags = JSON.parse(localStorage.getItem('tags'))

  const [ pictures, setPictures ] = useState([])
  const [ sounds, setSounds ] = useState([])
  const [ query, setQuery ] = useState('')
  const [ tags, setTags ] = useState(localStorageTags)
  const [ settingsCounter, setSettingsCounter ] = useState(0)
  const [ message, setMessage ] = useState(null)

  let sound = null

  const getPictures = async (query) => {
    setMessage(null)
    const localData = JSON.parse(localStorage.getItem('pictures'))

    if ((!Array.isArray(localData[query]) || !localData[query].length) || Math.round(new Date().getTime() / 1000) - localData.lastUpdate > 24 * 60 * 60) {
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
        localData.lastUpdate = Math.round(new Date().getTime()/1000)
        localStorage.setItem('pictures', JSON.stringify(localData))
        setPictures(newData)

        insertTag(query)
      } else {
        setMessage('Couldn\'t find any results ')
        setPictures([])
      }

    } else {
      setPictures(localData[query])

      if (tags.indexOf(query) === -1) {
        insertTag(query)
      }
    }
  }

  const insertTag = tag => {
    const newTags = arrayRemove(tags, tag)
    newTags.unshift(tag)
    setTags(newTags)
    localStorage.setItem('tags', JSON.stringify(newTags))
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

  const arrayRemove = (arr, value) => {
    return arr.filter(el => {
      return el !== value
    })
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
    <div className="App">
      <form onSubmit={onSubmit} className="Search-form">
        <input
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
          Search
        </button>
      </form>
      <div className="App-tags">
        {tags.length !== 0 && <div className="App-tags-label">Tags</div>}
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

      <div className="App-picture-items-holder">
      {pictures.length !== 0 && <div className="App-picture-items">
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
        {settingsCounter <= 4 && <div className="App-footer-label" onClick={() => showSettings()}>Copyright 2019 &copy; Kids Learn</div>}
        {settingsCounter === 4 && <span className="App-footer-item" onClick={() => showSettings()}>Settings</span>}
        {settingsCounter > 4 && <span className="App-footer-item" onClick={() => setSettingsCounter(0)}>Back</span>}
        {settingsCounter > 4 && <span className="App-footer-item" onClick={() => {
          localStorage.setItem('tags', JSON.stringify([]))
          setTags([])
        }}>Clear tags</span>}
        {settingsCounter > 4 && <span className="App-footer-item" onClick={() => {
          setPictures([]);
          localStorage.setItem('pictures', JSON.stringify({}))
        }}>Clear cache</span>}
      </div>
    </div>
  )
}

export default App
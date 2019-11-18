import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import './App.css'
import { PIXABAY_API_URL, PIXABAY_API_KEY, FREESOUND_API_URL, FREESOUND_API_KEY } from '../config'

export const pixabayApi = query => `${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal`
export const freesoundApi = query =>`${FREESOUND_API_URL}?query=${query}&token=${FREESOUND_API_KEY}
&normalized=true&fields=previews,description&sort=downloads_desc&filter=duration:[1 TO 5]`

const App = () => {
  const [ pictures, setPictures ] = useState([])
  const [ sounds, setSounds ] = useState([])
  const [ query, setQuery ] = useState('cats')
  const [ tags, setTags ] = useState(['fruits','animals','planets'])
  const [ settingsCounter, setSettingsCounter ] = useState(0)

  if (!JSON.parse(localStorage.getItem('pictures'))) {
    localStorage.setItem('pictures', JSON.stringify({}))
  }
  if (!JSON.parse(localStorage.getItem('tags'))) {
    localStorage.setItem('tags', JSON.stringify(['fruits','animals','planets']))
  }

  let sound = null

  const getPictures = async (query) => {
    const localData = JSON.parse(localStorage.getItem('pictures'))

    if (!Array.isArray(localData[query]) || !localData[query].length) {
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
        localStorage.setItem('pictures', JSON.stringify(localData))
        setPictures(newData)
      }

    } else {
      setPictures(localData[query])
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
    if(sound) {
      sound.pause()
    }
    sound = new Audio(fileName)
    sound.play()
  }

  const arrayRemove = (arr, value) => {
    return arr.filter(function(ele){
      return ele !== value;
    });
  }

  const onSubmit = event => {
    event.preventDefault()
    const newTags = arrayRemove(tags, query)
    newTags.unshift(query)
    setTags(newTags)
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
          onFocus={(event) => event.target.select()}
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
            { tag }
          </div>
        ))}
      </div>
      <div className="App-picture-items-holder">
      {pictures.length !== 0 && <div className="App-picture-items">
          {pictures.map((picture, index) => (
            <div className="App-picture-item" key={picture.image} /*onClick={() => { getSounds(query) }}*/>
              {picture.showImage && <img
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
        {settingsCounter <= 4 && <div className="App-footer-label no-select" onClick={() => showSettings()}>Copyright 2019 &copy; Kids Learn</div>}
        {settingsCounter === 4 && <a href="#" className="App-footer-item" onClick={() => showSettings()}>Settings</a>}
        {settingsCounter > 4 && <a href="#" className="App-footer-item" onClick={() => setSettingsCounter(0)}>Back</a>}
        {settingsCounter > 4 && <a href="#" className="App-footer-item" onClick={() => {
          localStorage.setItem('tags', JSON.stringify([]))
          setTags([])
        }}>Clear tags</a>}
        {settingsCounter > 4 && <a href="#" className="App-footer-item" onClick={() => {
          setPictures([]);
          localStorage.setItem('pictures', JSON.stringify({}))
        }}>Clear cache</a>}
      </div>
    </div>
  )
}

export default App
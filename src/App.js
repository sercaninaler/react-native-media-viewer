import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import './App.css'
import { PIXABAY_API_URL, PIXABAY_API_KEY, FREESOUND_API_URL, FREESOUND_API_KEY } from '../config'

export const pixabayApi = query => `${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo`
export const freesoundApi = query =>`${FREESOUND_API_URL}?query=${query}&token=${FREESOUND_API_KEY}
&normalized=true&fields=previews,description&sort=downloads_desc&filter=duration:[1 TO 5]`

const App = () => {
  const [ pictures, setPictures ] = useState([])
  const [ sounds, setSounds ] = useState([])
  const [ query, setQuery ] = useState('cats')
  let sound = null

  const getPictures = async (pictureQuery) => {
    const response = await axios.get(pixabayApi(pictureQuery))
    const pictures = response.data.hits
    //console.log(pictures)
    setPictures(pictures)
  }

  const getSounds = async (soundQuery) => {
    const response = await axios.get(freesoundApi(soundQuery))
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

  const onSubmit = event => {
    event.preventDefault()
    getPictures(query)
  }

  const onChange = event => {
    //console.log(event.target.value)
    setQuery(event.target.value)
  }
//
  return (
    <div className="App">
      <div className="App-picture-items-holder">
        <form onSubmit={onSubmit}>
          <input
            name="searchQuery"
            type="text"
            className="Search-input"
            placeholder="Search for pictures"
            autoComplete="off"
            onChange={onChange}
            value={query}
          />
          <button className="Search-button">
            Search
          </button>
        </form>

        {pictures && pictures.length !== 0 && <div className="App-picture-items">
          {pictures.map((picture, index) => (
            <div className="App-picture-item" key={picture.id} data-testid="row" onClick={() => { getSounds(query) }}>
              {!picture.showImage && <img
                src={picture.webformatURL}
                alt={picture.tags}
                className="App-picture-item-image"
              />}

              <h2 className="App-picture-item-title">{picture.tags}</h2>

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
    </div>
  );
}

export default App
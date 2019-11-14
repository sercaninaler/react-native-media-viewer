import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import './App.css'
import { PIXABAY_API_URL, PIXABAY_API_KEY, FREESOUND_API_URL, FREESOUND_API_KEY } from '../config'

let query = 'dog'

export const pixabayApi = `${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo`
export const freesoundApi = `${FREESOUND_API_URL}?query=${query}&token=${FREESOUND_API_KEY}
&normalized=true&fields=previews&sort=downloads_desc&filter=duration:[1 TO 5]`

const App = () => {
  const [ pictures, setPictures ] = useState([])
  const [ sounds, setSounds ] = useState([])
  let sound = null

  const getPictures = async () => {
    const response = await axios.get(pixabayApi)
    const pictures = response.data.hits
    //console.log(pictures)
    setPictures(pictures)
  }

  const getSounds = async () => {
    const response = await axios.get(freesoundApi)
    const sounds = response.data.results
    console.log(sounds)
    setSounds(sounds)
  }

  useEffect(() => {
    getPictures()
    getSounds()
  }, [])

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

  return (
    <div className="App">
      <div className="App-picture-items-holder">
        {pictures && pictures.length !== 0 ? <div className="App-picture-items">
          {pictures.map((picture, index) => (
            <div className="App-picture-item" key={picture.id} data-testid="row">

              {!picture.showImage && <img
                src={picture.webformatURL}
                alt={picture.tags}
                className="App-picture-item-image"
                onClick={() => { playAudio(sounds[index].previews['preview-lq-mp3']) }}
              />}

              <h2 className="App-picture-item-title">{picture.tags}</h2>

              {picture.showImage && <div>
                <button
                  name={index}
                  type="submit"
                  className="App-picture-item-button"
                  onClick={() => togglePicture(index)}
                >
                  {picture.showImage ? 'Hide' : 'Show' } Image
                </button>
              </div>}
            </div>
          ))}
        </div> : <div>
          <button onClick={getPictures} className="App-picture-item-button">
            Load awesome animal pictures
          </button>
        </div>}
      </div>
    </div>
  );
}

export default App
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import './App.css'
import { API_URL, API_KEY } from '../config'

export const pixabayApi = `${API_URL}?key=${API_KEY}&q=animals&image_type=photo`

const App = () => {
  const [ pictures, setPictures ] = useState([])

  const getPictures = async () => {
    const response = await axios.get(pixabayApi)
    const pictures = response.data.hits
    console.log(pictures)
    setPictures(pictures)
  }

  useEffect(() => {
    getPictures()
  }, [])

  const togglePicture = id => {
    const newPictures = [...pictures]
    newPictures[id].showImage = !newPictures[id].showImage
    setPictures(newPictures)
  }

  return (
    <div className="App">
      <div className="App-picture-items-holder">
        {pictures && pictures.length !== 0 ? <div className="App-picture-items">
          {pictures.map((picture, index) => (
            <div className="App-picture-item" key={picture.id} data-testid="row">
              <h2 className="App-picture-item-title">{picture.tags}</h2>

              {!picture.showImage && <img src={picture.webformatURL} alt={picture.tags} className="App-picture-item-image" />}
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
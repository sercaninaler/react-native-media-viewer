import React, { FC, useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Dimensions,
} from 'react-native'
//import Constants from 'expo-constants';
import axios from 'axios'
import { pixabayApi, SETTINGS } from './constants'
import { initLocalStorage, getData, setData } from './helpers'
import { Button } from './components'
import { ApiResults, Pictures, Settings } from './types'
import Image from 'react-native-scalable-image'

import importedStyles from './styles'

const App: FC = () => {
  initLocalStorage()

  const [pictures, setPictures] = useState<Pictures[]>([])
  /* const [sounds, setSounds] = useState([]) */
  const [query, setQuery] = useState<string>('')
  const [settingsCounter, setSettingsCounter] = useState<number>(0)
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>(10)
  const [settings, setSettings] = useState<Settings>(SETTINGS)
  const [tags, setTags] = useState<string[]>([])

  useEffect( () => {
    getData('settings').then((settings) => {
      setSettings(JSON.parse(settings))
    })
    getData('tags').then((tags) => {
      setTags(JSON.parse(tags))
    })
    getData('pictures').then((pictures) => {
      setPictures(JSON.parse(pictures))
    })

    /*
    Dimensions.addEventListener("change", (e) => {
      console.log(e.window);
    });
    */
  }, [])

  let styles = importedStyles
  const { theme } = settings

  if (theme === 'light') {
    styles = {
      ...importedStyles,
      app: { ...importedStyles.app, backgroundColor: '#FFFFFF' },
    }
  }

  const getPictures = async (tag: string): Promise<void> => {
    const keyword = tag.trim()
    setMessage(null)
    setLimit(10)
    setIsLoading(true)

    if ((!Array.isArray(pictures[keyword]) ||
        !pictures[keyword].length) ||
        Math.round(new Date().getTime() / 1000) - pictures[`${keyword}_lastUpdate`] > 12 * 60 * 60
    ) {
      const response = await axios.get(pixabayApi(keyword))
      const data = response.data.hits

      if (data.length) {
        insertTag(keyword)

        const newPictures: Pictures[] = []

        data.forEach((item: ApiResults) => {
          newPictures.push({
            image: item.webformatURL,
            tags: item.tags,
            isDeleted: false,
          })
        })

        pictures[keyword] = newPictures
        pictures[`${keyword}_lastUpdate`] = Math.round(new Date().getTime() / 1000)
        setData('pictures', JSON.stringify(pictures))
        setPictures({...pictures})
      } else {
        setTimeout(() => {
          setMessage('Couldn\'t find any results ')
        }, 500)
      }
    } else {
      if (tags.indexOf(keyword) === -1) {
        insertTag(keyword)
      }
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  }

  const insertTag = (tag: string): void => {
    if (tag !== '' && tags.indexOf(tag) === -1) {
      tags.unshift(tag)
      setTags(tags)
      setData('tags', JSON.stringify(tags))
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

  let lastTap = null;

  const handleToggleInfo = (index: number): void => {
    pictures[query][index].showInfo = !pictures[query][index].showInfo
    setPictures({...pictures})
  }

  const handleDoubleTap = (index: number) => {
    const now = Date.now();
    if (lastTap && (now - lastTap) < 300) {
      handleToggleInfo(index);
    } else {
      lastTap = now;
    }
  }

  const deletePicture = (index: number): void => {
    pictures[query][index].isDeleted = true
    pictures[`${query}_lastUpdate`] = Math.round(new Date().getTime() / 1000)
    setData('pictures', JSON.stringify(pictures))
    setPictures({...pictures})
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
    setData('settings', JSON.stringify(newSettings))
  }

  const renderPictureTags = (text: string): object => {
    const pictureTags = text.split(',')
    return pictureTags.map((tag) => (
      <TouchableHighlight
        key={tag}
        style={{...styles.button, marginLeft: 2, marginRight: 2}}
        underlayColor="#cccccc"
        onPress={(): void => {
           setQuery(tag.trim())
           getPictures(tag)
        }}
      >
        <Text>{tag}</Text>
      </TouchableHighlight>
    ))
  }

  const filteredPictures = pictures[query] ? pictures[query].filter(picture => !picture.isDeleted).slice(0, limit) : []

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
              underlayColor="#cccccc"
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

      {!isLoading && filteredPictures.length !== 0 && (
      <View style={styles.pictureHolder}>
        {filteredPictures.map((picture, index) => (
          <TouchableWithoutFeedback
            key={picture.image}
            onLongPress={(): void => handleToggleInfo(index)}
            onPress={(): void => handleDoubleTap(index)}
          >
            <View style={styles.pictureHolder} >
              <Image
                style={styles.picture}
                source={{uri: picture.image}}
                width={Dimensions.get('window').width}
              />

              {picture.showInfo && (
                <View style={styles.pictureInfo}>
                  <TouchableHighlight
                    underlayColor="#cccccc"
                    style={{...styles.button, marginLeft: 2, marginRight: 2}}
                    onPress={(): void => deletePicture(index, query) }
                  >
                    <Text>x</Text>
                  </TouchableHighlight>
                  {renderPictureTags(picture.tags)}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        ))}

        <Button
          onPress={(): void => setLimit(limit + 10) }
          text="Load More"
          addStyles={{marginBottom: 70, marginLeft: 'auto', marginRight: 'auto'}}
        />
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
              setQuery('')
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

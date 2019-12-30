import React, { FC, useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Dimensions,
} from 'react-native'
import axios from 'axios'
import { pixabayApi, SETTINGS } from './constants'
import { initLocalStorage, getData, setData } from './helpers'
import { Button } from './components'
import { ApiResults, PictureType, Settings } from './types'
import Image from 'react-native-scalable-image'

import { getStyles } from './styles'

export const ThemeContext = React.createContext('light');

const App: FC = () => {
  initLocalStorage()

  const [pictures, setPictures] = useState<PictureType[]>([])
  /* const [sounds, setSounds] = useState([]) */
  const [query, setQuery] = useState<string>('')
  const [settingsCounter, setSettingsCounter] = useState<number>(0)
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>(10)
  const [settings, setSettings] = useState<Settings>(SETTINGS)
  const [tags, setTags] = useState<string[]>([])

  const width = Dimensions.get('window').width
  const { theme, language, suggestions, resolution } = settings
  const styles = getStyles(theme)

  useEffect( () => {
    getData('settings').then((settings) => {
      if (settings) {
        setSettings(JSON.parse(settings))
      }
    })
    getData('tags').then((tags) => {
      if (tags) {
        setTags(JSON.parse(tags))
      }
    })
    getData('pictures').then((pictures) => {
      if (pictures) {
        setPictures(JSON.parse(pictures))
      }
    })

    /*
    Dimensions.addEventListener("change", (e) => {
      console.log(e.window);
    });
    */
  }, [])

  const updateSettings = (key: string, value: string): void => {
    const newSettings = {
      ...settings,
      [key]: value,
    }
    setSettings(newSettings)
    setData('settings', JSON.stringify(newSettings))
  }

  const insertTag = (tag: string): void => {
    if (tag !== '' && tags.indexOf(tag) === -1) {
      tags.unshift(tag)
      setTags(tags)
      setData('tags', JSON.stringify(tags))
    }
  }

  const getPictures = async (tag: string): Promise<void> => {
    const keyword = tag.trim()
    setMessage(null)
    setLimit(10)
    setIsLoading(true)
    updateSettings('suggestions', false)

    if ((!Array.isArray(pictures[keyword]) ||
        !pictures[keyword].length) ||
        Math.round(new Date().getTime() / 1000) - pictures[`${keyword}_lastUpdate`] > 12 * 60 * 60
    ) {
      const response = await axios.get(pixabayApi(keyword, language))
      const data = response.data.hits

      if (data.length) {
        insertTag(keyword)

        const newPictures: PictureType[] = []

        data.forEach((item: ApiResults) => {
          newPictures.push({
            image: item.webformatURL,
            imageBig: item.largeImageURL,
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

  let lastTap: number | null = null;

  const handleToggleInfo = (index: number): void => {
    pictures[query][index].showInfo = !pictures[query][index].showInfo
    setPictures({...pictures})
  }

  const handleDoubleTap = (index: number): void => {
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

  const renderPictureTags = (text: string): object => {
    const pictureTags = text.split(',')

    return pictureTags.map((tag) => (
      <Button
        onPress={(): void => {
          setQuery(tag.trim())
          getPictures(tag)
        }}
        text={tag}
        key={tag}
      />
    ))
  }

  const filteredPictures = pictures[query] ? pictures[query].filter((picture: PictureType) => !picture.isDeleted).slice(0, limit) : []

  const recommendedTags: string[] = []

  filteredPictures.forEach((picture: PictureType) => {
    if (picture.tags) {
      const tags = picture.tags.split(',')
      tags.forEach((tag) => {
        tag = tag.trim()
        if (recommendedTags.indexOf(tag) === -1) {
          recommendedTags.push(tag)
        }
      })
    }
  })

  return (
    <ThemeContext.Provider value={theme}>
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
          <Button
            text="x"
            onPress={(): void => {
              setQuery('')
            }}
          />
          {tags.map((tag) => (
            <Button
              key={tag}
              text={tag}
              onPress={(): void => {
                setQuery(tag)
                getPictures(tag)
              }}
            />
          ))}
        </View>

        {message && <Text style={styles.message}>{message}</Text>}

        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={theme === 'light' ? '#0000ff' : '#FFFFFF'} />
          </View>
        )}

        {!isLoading && filteredPictures.length !== 0 && (
        <ScrollView style={styles.pictureHolder}>
          {filteredPictures.map((picture: PictureType, index: number) => (
            <TouchableWithoutFeedback
              key={picture.image}
              //onLongPress={(): void => handleToggleInfo(index)}
              onPress={(): void => handleDoubleTap(index)}
            >
              <View style={styles.pictureHolder} >
                <Image
                  style={styles.picture}
                  source={{uri: resolution === 640 ? picture.image : picture.imageBig}}
                  width={width > resolution ? resolution : width}
                />

                {picture.showInfo && (
                  <View style={styles.pictureInfo}>
                    <Button
                      onPress={(): void => deletePicture(index)}
                      text="x"
                      addStyles={{marginLeft: 2, marginRight: 2}}
                    />

                    {renderPictureTags(picture.tags)}
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          ))}

          <View style={[styles.tags, {marginTop: '-3%', marginBottom: 60}]}>
            <Button
              onPress={(): void => setLimit(limit + 10) }
              text="more pictures"
            />
            <Button
              onPress={(): void => updateSettings('suggestions', !suggestions) }
              text="more tags"
            />
          </View>

          {suggestions && <View style={styles.tags}>
            {recommendedTags.map((tag) => (
              <Button
                key={tag}
                text={tag}
                onPress={(): void => {
                  setQuery(tag)
                  getPictures(tag)
                }}
              />
            ))}
          </View>}
        </ScrollView>
        )}

        {settingsCounter > 4 && <View style={[styles.footer, {bottom: 46}]}>
          <Button
            onPress={(): void => setSettingsCounter(0)}
            text="close"
            addStyles={styles.footerLink}
          />

          <Button
            onPress={(): void => {
              setData('tags', JSON.stringify([]))
              setTags([])
              setQuery('')
            }}
            text="clear tags"
            addStyles={{...styles.footerLink, borderLeftWidth: 1}}
          />

          <Button
            onPress={(): void => {
              setPictures([])
              setData('pictures', JSON.stringify({}))
            }}
            text="clear cache"
            addStyles={{...styles.footerLink, borderLeftWidth: 1}}
          />
        </View>}

        <View style={styles.footer}>
          <Button
            onPress={(): void => { showSettings() }}
            text="mediaViewer"
            addStyles={styles.footerLink}
          />
          <Button
            onPress={(): void => updateSettings('language', language === 'en' ? 'tr' : 'en')}
            text={language === 'en' ? 'english' : 'turkish'}
            addStyles={{...styles.footerLink, borderLeftWidth: 1}}
          />
          <Button
            onPress={(): void => updateSettings('resolution', resolution === 640 ? 1280 : 640)}
            text={resolution === 640 ? '640p' : '1280p'}
            addStyles={{...styles.footerLink, borderLeftWidth: 1}}
          />
          <Button
            onPress={(): void => { updateSettings('theme', theme === 'dark' ? 'light' : 'dark') }}
            text={theme === 'dark' ? 'dark' : 'light'}
            addStyles={{...styles.footerLink, borderLeftWidth: 1}}
          />
        </View>
      </View>
    </ThemeContext.Provider>
  )
}

export default App

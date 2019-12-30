import {
  PIXABAY_API_URL,
  PIXABAY_API_KEY,
  FREESOUND_API_URL,
  FREESOUND_API_KEY,
} from '../config'

export const pixabayApi = (query: string, lang: string): string => `${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}
&q=${query}&lang=${lang}&image_type=photo&safesearch=true&orientation=horizontal&per_page=50`
export const freesoundApi = (query: string): string => `${FREESOUND_API_URL}?query=${query}&token=${FREESOUND_API_KEY}
&normalized=true&fields=previews,description&sort=downloads_desc&filter=duration:[1 TO 5]`

export const TAGS = ['animals', 'fruits', 'planets']
export const SETTINGS = {
  language: 'en',
  suggestions: false,
  theme: 'light',
}
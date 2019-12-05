import {
  PIXABAY_API_URL,
  PIXABAY_API_KEY,
  FREESOUND_API_URL,
  FREESOUND_API_KEY,
} from '../config'

export const pixabayApi = (query: string): string => `${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal`
export const freesoundApi = (query: string): string => `${FREESOUND_API_URL}?query=${query}&token=${FREESOUND_API_KEY}
&normalized=true&fields=previews,description&sort=downloads_desc&filter=duration:[1 TO 5]`

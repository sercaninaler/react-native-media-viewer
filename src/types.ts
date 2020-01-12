export type ApiResultsType = {
  webformatURL: string;
  largeImageURL: string;
  tags: string;
}

export type SettingsType = {
  theme: string;
  language: string;
  suggestions: boolean;
  resolution: number;
}

export type PictureType = {
  isDeleted: boolean;
  showInfo?: number;
  image: string;
  imageBig: string;
  tags: string;
}

export type ButtonType = {
  text: string;
  addStyles?: object;
  onPress: () => void;
}
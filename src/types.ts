export type ApiResults = {
  webformatURL: string;
  tags: string;
}

export type Settings = {
  theme: string;
}

export type PictureType = {
  isDeleted: boolean;
  showInfo?: number;
  image: string;
  tags: string;
}

export type ButtonType = {
  text: string;
  addStyles?: object;
  onPress: () => void;
}
import {Text, TouchableHighlight} from 'react-native'
import React, { FC, useContext } from 'react'
import { getStyles } from './styles'
import { ThemeContext } from './App'
import { ButtonType } from './types'

export const Button: FC<ButtonType> = (props: ButtonType) => {
  const theme = useContext(ThemeContext)
  const styles = getStyles(theme)

  return (
    <TouchableHighlight
      style={{...styles.button, ...props.addStyles}}
      underlayColor={theme === 'dark' ? '#555' : '#ccc'}
      onPress={props.onPress}
    >
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableHighlight>
  )
}
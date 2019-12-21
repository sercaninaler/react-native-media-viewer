import {Text, TouchableHighlight} from 'react-native'
import React, { FC, useContext } from 'react'
import { getStyles } from './styles'
import { ThemeContext } from './App'

export const Button: FC = (props) => {
  const theme = useContext(ThemeContext)
  let styles = getStyles(theme)

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
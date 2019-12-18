import {Text, TouchableHighlight} from 'react-native'
import React, { FC } from 'react'
import styles from './styles'

export const Button: FC = (props) => (
  <TouchableHighlight
    style={{...styles.button, ...props.addStyles}}
    underlayColor="#cccccc"
    onPress={props.onPress}
  >
    <Text style={styles.buttonText}>{props.text}</Text>
  </TouchableHighlight>
)
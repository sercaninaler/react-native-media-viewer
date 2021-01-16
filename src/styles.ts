import {ViewStyle, ImageStyle, TextStyle} from 'react-native'

export const getStyles = (theme: string) => {
  let styles = {
    app: {
      paddingTop: 30,
      paddingBottom: 30,
      height: '100%',
      backgroundColor: '#FFF',
      overflow: 'hidden',
    } as ViewStyle,
    button: {
      backgroundColor: '#EEE',
      padding: 2,
      borderRadius: 5,
      borderColor: '#DDD',
      borderWidth: 1,
      margin: 3,
      justifyContent: 'center',
      minHeight: 32,
    } as ViewStyle,
    ':hover': {
      backgroundColor: '#000',
    } as ViewStyle,
    buttonText: {
      fontFamily: 'Ubuntu Mono',
      fontSize: 14,
      alignSelf: 'center',
      marginTop: 2,
      marginBottom: 2,
      marginLeft: 4,
      marginRight: 4,
    } as TextStyle,
    searchForm: {
      justifyContent: 'center',
      flexDirection: 'row',
      position: 'relative',
      width: 260,
      alignSelf: 'center',
    } as ViewStyle,
    searchButtonView: {
      height: 40,
      marginLeft: 12,
      marginTop: 3,
    },
    searchButton: {
      height: 48,
      padding: 4,
      fontSize: 18,
      borderRadius: 7,
    },
    searchInput: {
      fontSize: 18,
      padding: 8,
      paddingLeft: 10,
      backgroundColor: '#f8f8f8',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
      width: 300,
      height: 36,
      fontFamily: 'Ubuntu Mono',
      color: '#000',
      //outline: 'none',
    } as TextStyle,
    tags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 15,
      marginBottom: 40,
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 800,
      paddingLeft: 5,
      paddingRight: 5,
    } as ViewStyle,
    message: {
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 25,
      color: 'red',
      fontSize: 16,
      alignSelf: 'center',
    } as ViewStyle,
    loader: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      width: '100%',
      backgroundColor: '#FFF',
      height: '100%',
      opacity: 0.6,
      zIndex: 1,
      paddingBottom: 100,
    } as ViewStyle,
    footer: {
      backgroundColor: '#ececec',
      position: 'absolute',
      width: '100%',
      bottom: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    } as ViewStyle,
    footerLink: {
      borderWidth: 0,
      borderColor: '#CCC',
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 0,
      margin: 0,
    } as ViewStyle,
    pictureHolder: {
      flexDirection: 'column',
      position: 'relative',
      maxWidth: 1280,
      alignSelf: 'center',
    } as ViewStyle,
    picture: {
      marginTop: '3%',
      marginBottom: '3%',
    } as ImageStyle,
    pictureInfo: {
      position: 'absolute',
      bottom: '7%',
      flexDirection: 'row',
      alignSelf: 'center',
    } as ViewStyle,
    textHolder: {
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: '14%',
      maxWidth: 320,
      alignSelf: 'center'
    } as TextStyle,
    text: {
      color: '#666',
      fontSize: 14,
      fontFamily: 'Ubuntu Mono',
    } as TextStyle,
  }

  if (theme === 'dark') {
    styles = {
      ...styles,
      app: {
        ...styles.app,
        backgroundColor: '#000'
      },
      loader: {
        ...styles.loader,
        backgroundColor: '#000',
      },
      searchInput: {
        ...styles.searchInput,
        backgroundColor: '#333',
        borderColor: '#525252',
        color: '#DDD',
      },
      button: {
        ...styles.button,
        backgroundColor: '#333',
        borderColor: '#525252',
      },
      buttonText: {
        ...styles.buttonText,
        color: '#aaaaaa',
      },
      footer: {
        ...styles.footer,
        backgroundColor: '#333',
      },
      footerLink: {
        ...styles.footerLink,
        borderColor: '#5a5a5a',
      }
    }
  }

  return styles
}

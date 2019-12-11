import {ViewStyle, ImageStyle, Dimensions } from "react-native";

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

const styles = {
  app: {
    paddingTop: 15,
    paddingBottom: 30,
    height: '100%',
    backgroundColor: '#000000',
  },
  button: {
    backgroundColor: '#eee',
    paddingLeft: 11,
    paddingRight: 11,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    width: 'fit-content',
    margin: 5,
    padding: 5,
  } as ViewStyle,
  searchForm: {
    justifyContent: 'center',
    flexDirection: 'row',
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
    fontSize: 16,
    padding: 8,
    backgroundColor: '#eee',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    width: 260,
    height: 40,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 800,
  } as ViewStyle,
  tag: {
  },
  message: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 25,
    color: 'red',
    fontSize: 16,
    alignSelf: 'center',
  } as ViewStyle,
  loader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#000',
    height: '100%',
    opacity: 0.6,
    zIndex: 1,
    paddingBottom: 100,
  } as ViewStyle,
  footer: {
    backgroundColor: '#ececec',
    padding: '10 0',
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
    margin: '0 5',
    borderColor: '#999999',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  } as ViewStyle,
  pictureHolder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'relative',
    //overflow: 'hidden',
  } as ViewStyle,
  picture: {
    marginTop: '4%',
    marginBottom: '8%',
    width: imageWidth - 16,
    height: imageHeight,
  } as ImageStyle,
  pictureInfo: {
    position: 'absolute',
    bottom: '17%',
    flexDirection: 'row',
    alignSelf: 'center',
  } as ViewStyle,
}

export default styles

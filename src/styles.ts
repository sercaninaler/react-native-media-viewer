const styles = {
  app: {
    paddingTop: 15,
    paddingBottom: 30,
    height: '100%',
    backgroundColor: '#000000',
  },
  searchForm: {
    justifyContent: 'center' as 'center',
    flexDirection: 'row' as 'row',
  },
  searchButtonView: {
    height: '40px',
    marginLeft: '12px',
    marginTop: '3px',
  },
  searchButton: {
    height: '48px',
    padding: '4px',
    fontSize: 18,
    borderRadius: 7,
  },
  searchInput: {
    fontSize: 16,
    padding: '8px',
    backgroundColor: '#eee',
    borderTopColor: '#ccc',
    borderRightColor: '#ccc',
    borderBottomColor: '#ccc',
    borderLeftColor: '#ccc',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 5,
    width: '260px',
    height: '40px',
  },
  tags: {
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '15px',
    marginBottom: '15px',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '800px',
  },
  tag: {
    margin: '5px',
    backgroundColor: '#eee',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  }
}

export default styles

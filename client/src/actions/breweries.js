import axios from 'axios';

export const getBreweries = (callback) => {
  return(dispatch) => {
    axios.get('/api/all_breweries')
      .then( res => dispatch({ type: 'GET_BREWERIES', breweries: res.data.entries }))
      .then(callback())
  }
}
import axios from 'axios';

export const getBeers = (callback) => {
  return(dispatch) => {
    axios.get('/api/all_beers')
      .then( res => dispatch({ type: 'GET_BEERS', beers: res.data.entries }))
      .then(callback())
  }
}
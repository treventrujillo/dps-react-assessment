const breweries = (state = {}, action) => {
  switch(action.type) {
    case 'GET_BREWERIES':
      return action.breweries;
    default:
      return state;
  }
}

export default breweries;
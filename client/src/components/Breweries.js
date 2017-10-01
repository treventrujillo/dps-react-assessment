import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import {
  Grid,
  Image,
} from 'semantic-ui-react';

class Breweries extends React.Component {
  state = { breweries: [] }

  componentDidMount() {
    axios.get('/api/all_breweries')
      .then( res => {
        let { data } = res;
        this.setState({ breweries: data.entries })
      })
  }

  breweries = () => {
    const { breweries } = this.state;
    
    return breweries.map( brewery =>
      <Grid.Column
        key={brewery.id}
      >
        <h1>{brewery.name}</h1>
        <h3><a href={brewery.website}>{brewery.website}</a></h3>
        <Image src={brewery.images}/>
      </Grid.Column>
    )
  }

  render () {
    return (
      <Grid columns={3} divided>
        <Grid.Row>
          { this.breweries() }
        </Grid.Row>
      </Grid>
    )
  }
}

export default connect()(Breweries);
import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import {
  Grid,
  Image,
  Loader,
  Dimmer,
  Segment,
  Divider,
} from 'semantic-ui-react';

class Breweries extends React.Component {
  state = { breweries: [], loadState: false }

  componentDidMount() {
    axios.get('/api/all_breweries')
      .then( res => {
        let { data } = res;
        this.setState({ breweries: data.entries })
      })
      .then( this.loadState() );
  }

  loadState = () => {
    this.setState({ loadState: true })
  }

  render () {
    let { breweries } = this.state;
    if (this.state.loadState) {
      return (
        <Grid columns={3} divided>
          <Grid.Row>
            { breweries.map( brewery => 
              <Grid.Column
                key={brewery.id}
              >
                <Divider />
                <h1>{brewery.name}</h1>
                <h3><a href={brewery.website}>{brewery.website}</a></h3>
              </Grid.Column>
              )
            }
          </Grid.Row>
        </Grid>
      )
    } else {
      return (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Segment>
      )
    }
  }
}

export default connect()(Breweries);
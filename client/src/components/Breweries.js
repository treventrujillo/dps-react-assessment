import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import {
  Grid,
  Image,
  Loader,
  Dimmer,
  Segment,
  Divider,
} from 'semantic-ui-react';

class Breweries extends React.Component {
  state = {
     breweries: [], 
     loadState: false,
     totalPages: 0,
     page: 1 
    }

  componentDidMount() {
    this.getBreweries();
  }

  getBreweries = () => {
    axios.get('/api/all_breweries?page=20&per_page=5')
      .then( res => {
        let { data } = res;
        this.setState({
          breweries: data.entries,
          totalPages: data.total_pages
        })
      })
      .then(this.loadState())
  }

  loadState = () => {
    this.setState({ loadState: true })
  }

  loadMore = () => {
    let { breweries, page } = this.state;
    const nextPage = page + 1;
    axios.get(`/api/all_breweries?page=${nextPage}`)
      .then ( res => {
        let { data } = res;
        this.setState({
          breweries: [...breweries, ...data.entries], page: page + 1
        })
      })
  }

  render () {
    let { breweries, totalPages, page } = this.state;
    if (this.state.loadState) {
      return (
        <InfiniteScroll
            pageStart={page}
            loadMore={this.loadMore}
            hasMore={page < totalPages}
            loader={<Loader />}
            useWindow={true}
         >
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
        </InfiniteScroll>
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
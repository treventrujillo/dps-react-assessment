import React from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  Card,
  Container,
  Loader,
  Dimmer,
  Segment,
  Divider,
} from 'semantic-ui-react';
import axios from 'axios';

class Beers extends React.Component {
  state = {
     beers: [], 
     loadState: false, 
     totalPages: 0, 
     page: 1
    }

  componentDidMount() {
    this.getBeers();
  }

  getBeers = () => {
    axios.get('/api/all_beers?page=20&per_page=5')
      .then(res => {
        let { data } = res;
        this.setState({
          beers: data.entries,
          totalPages: data.total_pages,
        })
      })
      .then(this.loadState())
  }

  loadState = () => {
    this.setState({ loadState: true })
  }

  loadMore = () => {
    let { beers, page } = this.state;
    const nextPage = page + 1;
    axios.get(`/api/all_beers?page=${nextPage}`)
      .then( res => {
        let { data } = res;
        this.setState({
          beers: [...beers, ...data.entries], page: page + 1 
        })
      })
  }

  render() {
    let { beers, totalPages, page } = this.state;
    if (this.state.loadState) {
      return (
        <Container textAlign="center">
          <div>
            <InfiniteScroll
              pageStart={page}
              loadMore={this.loadMore}
              hasMore={page < totalPages}
              loader={<Loader />}
              useWindow={true}
            >
              <Card.Group stackable itemsPerRow={3} style={styles.cardGroup}>
                { beers.map( (beer) =>
                  <Card
                    key={beer.id}
                    centered
                    style={styles.card}
                  >
                    <Card.Header>
                      <h2>{beer.name}</h2>
                    </Card.Header>
                    <Card.Meta>
                      {/* This returned an error of undefined after adding pagination to api query */}
                      {/* <h4>{beer.style.category.name}</h4> */} 
                    </Card.Meta>
                    <Divider />
                    <Card.Description style={styles.description}>
                      <Card.Meta>
                        <h4>Description</h4>
                      </Card.Meta>
                      <p>{beer.description}</p>
                    </Card.Description>
                    <Card.Content extra>
                    </Card.Content>
                  </Card>
                )}
              </Card.Group>
            </InfiniteScroll>
          </div>
        </Container>
      )
    } else {
      return (
        <Segment basic>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Segment>
      )
    }
  }
}

const styles = {
  description: {
    overflow: 'auto',
    textOverflow: 'ellipsis',
  },
  card: {
    height: '40vh',
  },
  cardGroup: {
    padding: '10px'
  },
  scroller: {
    height: '60vh', overflow: 'auto'
  }
}

export default connect()(Beers);
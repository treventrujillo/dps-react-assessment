import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card,
  Container,
  Modal,
  Button,
  Loader,
  Dimmer,
  Segment,
  Divider,
} from 'semantic-ui-react';
import axios from 'axios';

class Beers extends React.Component {
  state = { beers: [], loadState: false }

  componentDidMount() {
    axios.get('/api/all_beers')
      .then( res => {
        let { data } = res;
        this.setState({ beers: data.entries })
      })
      .then( this.loadState() )
  }

  loadState = () => {
    this.setState({ loadState: true })
  }

  render() {
    let { beers } = this.state;
    if (this.state.loadState) {
      return (
        <Container textAlign="center">
          <Card.Group stackable itemsPerRow={4} style={styles.cardGroup}>
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
                  <h4>{beer.style.category.name}</h4>
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
    padding: '10px',
  },
}

export default connect()(Beers);
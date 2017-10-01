import React from 'react';
import {
   Card, 
   Container,
   Modal,
   Button,
   Divider,
   } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';

class Beers extends React.Component {
  state = { beers: [], beerGlass: [] }

  componentDidMount() {
    axios.get('/api/all_beers')
      .then( res => {
        let { data } = res;
        let { glass } = res.data.entries[0].glass;
        this.setState({ beers: data.entries, beerGlass: glass })
      })
  }

  render() {
    let { beers } = this.state;
    return (
      <Container textAlign="center">
        <Card.Group stackable itemsPerRow={4} style={styles.cardGroup}> 
          { beers.map( beer =>
            <Card
              key={beer.id}
              centered
              style={styles.card}
            >
            <Card.Header>
              <h2>{ beer.name }</h2>
            </Card.Header>
            <Card.Meta>
              <h4>{ beer.style.category.name }</h4>
            </Card.Meta>
            <Divider />
            <Card.Description style={styles.description}>
            <Card.Meta>
              <h4>Description</h4>
            </Card.Meta>
              <p>{ beer.description }</p>
            </Card.Description>
            <Card.Content extra>

            </Card.Content>
            </Card>
          )}
        </Card.Group>
      </Container>
    )
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
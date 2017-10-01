import React from 'react';
import { connect } from 'react-redux';
import { getBeers } from '../actions/beers';
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

class Beers extends React.Component {
  state = { loaded: false }

  componentDidMount() {
    this.props.dispatch(getBeers(this.setLoaded));
  }

  setLoaded = () => {
    this.setState({ loaded: true })
  }

  render() {
    if (this.state.loaded) {
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

const mapStateToProps = (state) => {
  const beers = state.beers;
  return { beers };
}

export default connect(mapStateToProps)(Beers);
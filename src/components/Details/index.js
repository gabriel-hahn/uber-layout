import React, { Component } from 'react';

import { 
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText
} from './styles';

import uberx from '../../assets/uberx.png';

class Details extends Component {
  render() {
    return (
      <Container>
        <TypeTitle>Economy</TypeTitle>
        <TypeDescription>Affordable, everyday rides</TypeDescription>

        <TypeImage source={uberx} />
        <TypeTitle>uberX</TypeTitle>
        <TypeDescription>R$ 320,00</TypeDescription>

        <RequestButton onPress={() => {}}>
          <RequestButtonText>Request Uberx</RequestButtonText>
        </RequestButton>
      </Container>
    );
  }
}

export default Details;

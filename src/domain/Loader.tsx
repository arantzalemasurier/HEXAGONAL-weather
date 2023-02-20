import { Component } from 'react';
import { Container, Ripple, RippleDelay } from '../styles/loader.style';

class Loader extends Component {
  render() {
    return (
      <Container className="lds-ripple">
        <Ripple />
        <RippleDelay />
      </Container>
    );
  }
}

export default Loader;

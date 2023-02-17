import { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 80px;
  height: 80px;
  overflow: hidden;
  pointer-events: none;
  z-index: 999;
`;

const Ripple = styled.div`
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
`;

const RippleDelay = styled(Ripple)`
  animation-delay: -0.5s;
`;

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

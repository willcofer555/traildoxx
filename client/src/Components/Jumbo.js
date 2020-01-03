import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Jumbo = (props) => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
        <p> {props.latitude}</p>
          {props.children}
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Jumbo;

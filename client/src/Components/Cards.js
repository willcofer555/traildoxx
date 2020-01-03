import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const Cards = (props) => {
  return (
    <div>
      <Card body outline color="secondary">
        <CardTitle>Special Title Treatment</CardTitle>
        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
        {props.children}
      </Card>
    </div>
  );
};

export default Cards;

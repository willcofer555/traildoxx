import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Row, Col, Button, Container } from 'reactstrap';
import { CardTitle, CardText } from 'reactstrap';
import classnames from 'classnames';
import Jumbo from './Jumbo';
import Cards from './Cards';
import Drop from './Dropdown';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,  } from 'reactstrap';



const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Nav tabs >
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Current
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Report
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Markers
          </NavLink>
        </NavItem>
        <NavItem >
        <NavLink>
        </NavLink>
        </NavItem>
      </Nav>
      <TabContent  activeTab={activeTab}>
        <TabPane style={{ backgroundColor: '', borderColor: '',height:'18rem' }}tabId="1">

          <Container>
            <Row>
              <Col  style={{padding: '1rem', }} lg="4" sm="8">
              <div>
                <Card body outline color="secondary" style={{ backgroundColor:'' , borderColor: '',height:'17rem' }}>
                <h3> Welcome to Traildocs </h3>
                <h6>Your memories, your places</h6>
                <p> </p>
                  <h6> <strong>Location</strong></h6>

                  <CardText>Latitude: {props.lat}</CardText>
                  <CardText>Longitude: {props.lng}</CardText>





                </Card>
              </div>
              </Col>
              <Col  style={{padding: '1rem', }} lg="4" sm="8">
              <div>
                <Card body outline color="secondary" style={{ /*backgroundColor: '#656256',*/ borderColor: '',height:'17rem' }}>
                  <h6> <strong> Weather Conditions in {props.namers} </strong></h6>
                  <p> Currently {props.description}</p>
                  <p> Temperature Range: ({props.mintemp} - {props.maxtemp} )</p>
                  <p> Actual Temperature: {props.temp} </p>
                  <p> Feels like {props.feelslike}°F </p>

                  <Button outline color="primary" onClick={props.clicked}> Get Info </Button>
                </Card>
              </div>
              </Col>
              <Col style={{ padding: '1rem',}} lg="4" sm="8">
              <div>
                <Card body outline color='secondary' style={{ /*backgroundColor: '#D3B88C',*/ borderColor: '',height:'17rem' }}>



                  <CardText> Wind Direction: {props.windchill}° </CardText>
                  <p> Windspeed: {props.windspeed}mph</p>
                  <p> Humidity: {props.humidity}%</p>

                </Card>
              </div>
              </Col>
            </Row>
            </Container>
        </TabPane>
        <TabPane tabId="2" style={props.style}>
          <Row>
            <Col sm="12">
              <Card body>
              {props.children}
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
        <Container>
          <Row>
            <Col style={{ padding: '3rem',}} lg="12" sm="12">





            {props.chillin}





            </Col>

          </Row>
          </Container>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Tabs;

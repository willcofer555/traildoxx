/* eslint-disable */ ;
import React, {Component} from 'react';
import Joi from 'joi';
import L from 'leaflet';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Tabs from './Components/Tabs';
import { Form, FormGroup, Label, Input, FormText, Button, Table } from 'reactstrap';
import { getMessages, getLocation, sendMessage } from './API';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';



const myIcon = L.icon({
  iconUrl: 'https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/66-512.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

var greenIcon = L.icon({
    iconUrl: 'https://img.icons8.com/ios-filled/50/000000/marker.png',
    iconSize:     [15, 21], // size of the icon
    iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
});

  const API_KEY = "835b97c0a67111ffa63d717ecabf34d1";



class App extends Component {
  state = {

      lat: 51.55,
      lng:-0.09,
      zoom:13,
      haveLocation: false,
      userMessage: {

        FirstName: '',
        LastName: '',
        Report: '',


      },
      weather: {
        MaxTemp: '',
        MinTemp: '',
        temp: '',
        description: '',
        humidity: '',
        WindSpeed: '',
        locality: '',
        FeelsLike: '',
        RainChance: ''

      },
      showMessageForm: false,
      sendingMessage: false,
      sentMessage: false,
      messages:[],
      zoom: 1

  }



  componentDidMount() {
    getMessages()
    .then(messages => {
      this.setState({
        messages
      });
    });

      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lat:position.coords.latitude,
          lng:position.coords.longitude,
          haveLocation: true,
          zoom: 19

        })



    });



  }

   getWeather = async (e) => {

    const Call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lng}&appid=${API_KEY}&units=Imperial`);
    const data = await Call.json();
    console.log(data);
    this.setState({
      weather:{
        MaxTemp: data.main.temp_max,
        MinTemp: data.main.temp_min,
        temp: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        WindChill: data.wind.deg,
        WindSpeed: data.wind.speed,
        locality: data.name,
        FeelsLike: data.main.feels_like,
        RainChance: data.rain
      }
    })
    console.log(this.state);
    }


  showMessageForm = () => {
    this.setState({
      showMessageForm: true
    });
    getLocation()
    .then(location => {
      this.setState({
        location,
        haveLocation: true,
        zoom: 13
      });
    });
  }

  cancelMessage = () => {
    this.setState({
      showMessageForm: false
    });
  }



  FormIsValid = () => {
    let { FirstName, LastName, Report } = this.state.userMessage;
    FirstName = FirstName.trim();
    LastName = LastName.trim();
    Report = Report.trim();

    const validMessage =
      FirstName.length > 0 && FirstName.length <= 20 &&
      LastName.length > 0 && LastName.length <= 20 &&
      Report.length > 0 && Report.length <= 500;

    return validMessage && this.state.haveLocation ? true : false;
  }

  formSubmitted = (event) => {
    event.preventDefault();

    if (this.FormIsValid()) {
      this.setState({
        sendingMessage: true
      });

      const message = {
        FirstName: this.state.userMessage.FirstName,
        LastName: this.state.userMessage.LastName,
        Report: this.state.userMessage.Report,
        latitude: this.state.lat,
        longitude: this.state.lng,
      };

      sendMessage(message)
        .then((result) => {
          setTimeout(() => {
            this.setState({
              sendingMessage: false,
              sentMessage: true
            });
          }, 4000);
        });
    }
  }

  setLocation = (event) => {
    this.setState({
      lat: event.target.latitude,
      lng: event.target.longitude,
    });
    console.log(this.state.lat,this.state.lng)
  }




  valueChanged = (event) => {
    const {name, value} = event.target;
    this.setState((prevState) =>  ({
      userMessage: {
        ...prevState.userMessage,
      [name]: value


      }

    }))
  }


   pushers = () => {
    var indents = [];
    if (messages.otherMessages){
      for (var i = 0; i < messages.otherMessages; i++) {
        indents.push(<p key={i}></p>);
      }
      return (
         <div>
          {indents}
          "Some text value"
         </div>
       );
     }
   }


  render() {
    const position = [this.state.lat, this.state.lng];
    const yellowstone = [44.4280, 110.5885]
    return (
        <div>

          <Map className="Map" center={position} zoom={this.state.zoom}>
          <div style={{background:"white"}}>

          </div>

            <TileLayer
              attribution='&amp;copy <a href="http://{s}osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
               this.state.haveLocation ?

              <Marker
              position={position}
              icon={greenIcon}
              >
              <Popup>
              <h6> Current Location </h6>
              <p>latitude: {this.state.lat}</p>
              <p>longitude: {this.state.lng}</p>
              </Popup>

              </Marker> : <h3>Finding your location...</h3>
            }
            {this.state.messages.map(message => (
              <Marker
              key={message._id}
              position={[message.latitude, message.longitude]}
              icon={myIcon}>
                <Popup>
                  <p>{message.LastName} {message.FirstName} {message.Report} </p>
                  { message.otherMessages ? message.otherMessages.map(message => <p key={message._id}><em>{message.LastName}:</em> {message.FirstName} {message.Report}</p>) : '' }
                </Popup>
              </Marker>
            ))}

          </Map>


      <Tabs
      lat={this.state.lat}
      lng={this.state.lng}
      getWeather={this.getWeather}
      description={this.state.weather.description}
      maxtemp={this.state.weather.MaxTemp}
      mintemp={this.state.weather.MinTemp}
      temp={this.state.weather.temp}
      humidity={this.state.weather.humidity}
      windchill={this.state.weather.WindChill}
      windspeed={this.state.weather.WindSpeed}
      heading={this.pushers}
      clicked={this.getWeather}
      namers={this.state.weather.locality}
      RainChance={this.state.weather.RainChance}
      subs={this.setLocation}
      feelslike={this.state.weather.FeelsLike}
      chillin={this.state.messages.map(message => (
          <ListGroupItem
          key={message._id}
          position={[message.latitude, message.longitude]}
          icon={myIcon}>

              <ListGroupItem> <ListGroupItemHeading><strong>{message.LastName}</strong>, {message.FirstName}</ListGroupItemHeading> <ListGroupItemText>, {message.latitude},{message.longitude} Report : {message.Report} </ListGroupItemText></ListGroupItem>
              { message.otherMessages ? message.otherMessages.map(message => <ListGroupItem key={message._id}> <ListGroupItemHeading><strong>{message.LastName}</strong>, {message.FirstName}</ListGroupItemHeading> <ListGroupItemText> {message.latitude},{message.longitude}  Report: {message.Report}</ListGroupItemText></ListGroupItem>) : '' }
          </ListGroupItem>
        ))}
  >
    {
      !this.state.sendingMessage ?

      <Form onSubmit={this.formSubmitted} style={{borderColor: '',height:'18rem', }}>
        <FormGroup>
          <Label for="FirstName">First Name</Label>
          <Input
          type="text"
          name="FirstName"
          id="FirstName"
          placeholder="John"
          onChange={this.valueChanged}


          />
        </FormGroup>
        <FormGroup>
          <Label for="LastName">Last Name</Label>
          <Input
          type="text"
          name="LastName"
          id="LastName"
          placeholder="Doe"
          onChange={this.valueChanged}

           />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Incident Code</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>1 - Wildlife</option>
            <option>2 - Path Blockages</option>
            <option>3 - Suspicious Human Activity</option>
            <option>4 - Lost/Found Possession </option>
            <option>5 - Other (detail in report summary)</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="Report">Report statement</Label>
          <Input
          type="textarea"
          name="Report"
          id="Report"
          onChange={this.valueChanged}

          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">upload image</Label>
          <Input
          type="file"
          name="file"
          id="exampleFile"
          onChange={this.valueChanged}

          />
          <FormText color="muted">
            testing phase v0.2
          </FormText>
        </FormGroup>
        <Button type="submit" disabled={!this.FormIsValid()} >Submit</Button>


      </Form> : <video autoPlay loop src="https://media.giphy.com/media/42KYAoPAaqIlG/giphy.mp4"> </video>
      }




      </Tabs>

      </div>
    );
  }


  }


export default App;

import React, { Component } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import { getPixelSize } from '../../utils/Platform';

import Search from '../Search';
import Directions from '../Directions';

import markerImage from '../../assets/marker.png';

import { 
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall
} from './styles';

Geocoder.init('AIzaSyDUcFUW16Rizs1N4fA2dFFCu5CbxWWRPe0');

class Map extends Component {
  state = {
    region: {
      latitude: -28.6978046,
      longitude: -49.4075402,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    },
    destination: null,
    duration: null,
    location: null,
  };

  componentDidMount() {
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(','));

        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          },
          location
        });
      },
      () => {},
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    )
  }

  handleLocationSelected = (data, { geometry }) => {
    const { location: { lat: latitude, lng: longitude } } = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      }
    })
  }

  render() {
    const { region, destination, duration, location } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          showsUserLocation
          loadingEnabled
          ref={el => (this.mapView = el)}
        >
          { destination && (
            <>
              <Directions 
                origin={region}
                destination={destination}
                onReady={result => {
                  this.setState({ duration: Math.floor(result.duration) })

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(50)
                    }
                  })
                }}
              />
              <Marker 
                coordinate={destination}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}
              >
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>

              <Marker 
                coordinate={region}
                anchor={{ x: 0, y: 0 }}
              >
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{location}</LocationText>
                </LocationBox>
              </Marker>
            </>
          ) }
        </MapView>
        <Search onLocationSelected={this.handleLocationSelected} />
      </View>
    );
  }
}

export default Map;

import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import Search from '../Search';
import Directions from '../Directions';

class Map extends Component {
  state = {
    region: {
      latitude: -28.6978046,
      longitude: -49.4075402,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    },
    destination: null,
  };

  componentDidMount() {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          },
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
    const { region, destination } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          showsUserLocation
          loadingEnabled
        >
          { destination && (
            <Directions 
              origin={region}
              destination={destination}
              onReady={() => {
                
              }}
            />
          ) }
        </MapView>
        <Search onLocationSelected={this.handleLocationSelected} />
      </View>
    );
  }
}

export default Map;

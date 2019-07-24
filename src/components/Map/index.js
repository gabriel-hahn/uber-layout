import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

class Map extends Component {
  state = {
    region: {
      latitude: -28.7069013,
      longitude: -49.416115,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134
    }
  };

  async componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          this.setState({
            region: {
              latitude,
              longitude,
              latitudeDelta: 0.0143,
              longitudeDelta: 0.0134
            }
          });
        },
        () => {},
        {
          timeout: 2000,
          enableHighAccuracy: true,
          maximumAge: 1000
        }
      );
    }
  }

  render() {
    const { region } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          showsUserLocation
          loadingEnabled
        />
      </View>
    );
  }
}

export default Map;

import React from 'react';
import MapView from 'react-native-maps';

import { View } from 'react-native';

const App = () => (
  <View style={{ flex: 1 }}>
    <MapView
      style={{ flex: 1 }}
      region={{ 
        latitude: 37.785834,
        longitude: -122.406417,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134
       }}
       showsUserLocation
       loadingEnabled
    />
  </View>
);

export default App;

import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections 
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey='AIzaSyDUcFUW16Rizs1N4fA2dFFCu5CbxWWRPe0'
    strokeWidth={3}
    strokeColor='#222'
  />
);

export default Directions;

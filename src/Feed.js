import React, { Component } from 'react';
import {StyleSheet, Dimensions, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS} from 'react-native-permissions';
import { Styles } from './functions/styles';
import Geocoder from 'react-native-geocoding';

const window = Dimensions.get('window');

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

    componentDidMount() {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      // …
        if (result === 'granted') {
            Geolocation.getCurrentPosition(
                (position) => {
                    Geocoder.init("AIzaSyD8LIhgvlYbX89FYSOLfM-z8MkuIwoUeYE");
                    console.log(position)
                    Geocoder.from({ latitude: position.coords.latitude, longitude: position.coords.longitude  })
                        .then(json => {
                            var addressComponent = json.results[0].address_components;
                            console.log(addressComponent);
                        })
                        .catch(error => console.warn(error));
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } else {
            PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        }
      console.log(result);
    });
  }

  render() {
    return (
      <View>

      </View>
    );
  }
}
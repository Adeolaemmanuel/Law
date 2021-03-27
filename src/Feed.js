/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS} from 'react-native-permissions';

import firestore from '@react-native-firebase/firestore';
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Pressable,
    Text,
    Image,
} from 'react-native';
import {
     Card,
     ListItem,
     Avatar,
     Divider,
     Button,
    } from 'react-native-elements';
import {Styles} from './functions/styles'
import Geocoder from 'react-native-geocoding';

export default class Feeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Feed: [],
    };
  }

    componentDidMount() {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
        if (result === 'granted') {
            Geolocation.getCurrentPosition(
                (position) => {
                    Geocoder.init('AIzaSyD8LIhgvlYbX89FYSOLfM-z8MkuIwoUeYE');
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
      this.initializeFeed();
    });
  }

  initializeFeed(){
    let Feed;
        firestore().collection('Jobs').doc('All').onSnapshot( j => {
            if (j.exists) {
                Feed = [...j.data().all];
                for (let x of Feed) {
                    firestore().collection('Users').doc(x.user).onSnapshot( u => {
                        x.profilePicture = u.data().profilePicture;
                        this.setState({ Feed });
                    });
                }
            }
        });
  }

  apply = () => {}

  render() {
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
          <View>
              {
                  this.state.Feed.map((item, i) => (
                      <Pressable key={`BtnDetails-${item.key}${i}`} onPress={() => this.props.navigation.navigate('Feed Details', { Details: item })}>
                          <Card>
                              <ListItem>
                                  <Avatar
                                      rounded
                                      source={{ uri: item.profilePicture}}
                                  />
                                  <ListItem.Content>
                                      <ListItem.Title>{item.title}</ListItem.Title>
                                      <ListItem.Subtitle>{item.location}</ListItem.Subtitle>
                                  </ListItem.Content>
                                  <ListItem.Chevron />
                              </ListItem>
                          </Card>
                      </Pressable>
                  ))
              }
          </View>
      </ScrollView>
  );
  }
}

export class FeedDetails extends Component {
  constructor(props){
      super(props);
      this.state = {
          Details: {},
      };
  }

  componentDidMount(){
      const { Details } = this.props.route.params;
      this.initializeDetails(Details);
  }

  initializeDetails(Details){
      this.setState({Details});
  }

  render(){
      return (
          <ScrollView style={[{backgroundColor: 'white'}]}>
              <View>
                  <View style={{margin: 20, padding: 10}}>
                      <Text style={{alignSelf: 'center', fontSize: 30}}>{this.state.Details.title}</Text>
                  </View>
                  <Divider />

                  <View style={[{padding: 30}, Styles.containerRow]}>
                      <View style={{ margin: 10 }}>
                          <Image source={require('./assets/img/company.png')} style={{ width: 30, height: 30 }} />
                      </View>
                      <View style={{ margin: 10 }}>
                          <Text style={{ fontSize: 20 }}>{this.state.Details.company}</Text>
                      </View>
                  </View>

                  <View style={[{padding: 30, paddingTop: 0}, Styles.containerRow]}>
                      <View style={{ margin: 10 }}>
                          <Image source={require('./assets/img/pin.png')} style={{ width: 30, height: 30 }} />
                      </View>
                      <View style={{ margin: 10 }}>
                          <Text style={{ fontSize: 20 }}>{this.state.Details.location}</Text>
                      </View>
                  </View>

                  <View style={[{padding: 30, paddingTop: 0}, Styles.containerRow]}>
                      <View style={{ margin: 10 }}>
                          <Image source={require('./assets/img/full-time-job.png')} style={{ width: 30, height: 30 }} />
                      </View>
                      <View style={{ margin: 10 }}>
                          <Text style={{ fontSize: 20 }}>{this.state.Details.type}</Text>
                      </View>
                  </View>
                  <View style={[{padding: 30, paddingTop: 0}, Styles.containerRow]}>
                      <View style={{ margin: 10 }}>
                          <Image source={require('./assets/img/increase.png')} style={{ width: 30, height: 30 }} />
                      </View>
                      <View style={{ margin: 10 }}>
                          <Text style={{ fontSize: 20 }}>{this.state.Details.experience} Years Experience</Text>
                      </View>
                  </View>
                  <View style={{ margin: 10, padding: 10 }}>
                      <Text style={{ fontSize: 20 }}>{this.state.Details.summary}</Text>
                  </View>
              </View>
              <Button
                  title="APPLY"
                  type="solid"
                  buttonStyle={{ height: 50, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }}
                  //onPress={()=> this.postJob('Vacancy', this.state.vacancy)}
              />
          </ScrollView>
      );
  }
}
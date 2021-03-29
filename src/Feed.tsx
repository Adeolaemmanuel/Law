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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Feeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Feed: [],
    };
  }

  ismounted = false;
  componentDidMount() {
    this.ismounted = true;
    this.initializeFeed();
  }

  componentWillUnmount(){
    this.ismounted = false;
  }

  initializeFeed(){
    if (this.ismounted) {
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
    
    
          } else {
              PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
              PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
              PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
          }
        this.initializeFeed();
      });
    }
  }

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
                                      <ListItem.Subtitle>{item.job}, {item.location}</ListItem.Subtitle>
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
  constructor(props: any){
      super(props);
      this.state = {
        Details: {},
      };
  }

  ismounted = false;
  componentDidMount(){
    this.ismounted = true;
    this.initializeDetails();
  }

  componentWillUnmount(){
    this.ismounted = false;
  }

initializeDetails(){
  const { Details } = this.props.route.params;
    if (this.ismounted) {
      this.setState({Details});
      AsyncStorage.getItem('user').then(user=>{
        this.setState({user});
      });
    }
}

  render(){
    const { Details } = this.props.route.params;
    if (Details.job === 'Vacancy') {
      return (<VacancyDetails details={this.state.Details} />);
    } else if (Details.job === 'Appeal') {
      return (<AppealDetails details={this.state.Details} />);
    }
  }

}

class VacancyDetails extends Component {
  constructor(props: any){
    super(props);
    this.state = {
        Details: {},
        user: '',
        disableBtn: '',
        btnText: 'APPLY',
    };
    this.apply = this.apply.bind(this);
  }

  ismounted = false;
  componentDidUpdate(){
    this.ismounted = true;
    this.initializeDetails(this.props.details);
  }

  componentWillUnmount(){
    this.ismounted = false;
}

  initializeDetails(Details){
      if (this.ismounted) {
        AsyncStorage.getItem('user').then(user=>{
          this.setState({user,Details});
        });
        this.applied();
      }
  }

  apply(){
    let apply = firestore().collection('Jobs');
    let jobs = {id: this.state.Details.id, appliedUser: this.state.user, jobOwner: this.state.Details.user, job: this.state.Details.job};
    let applied;
    apply.doc('Applied').get().then(e=>{
      if (e.exists) {
        if (jobs.jobOwner !== jobs.appliedUser) {
          console.log('yes');
          applied = [...e.data().applied];
          applied.push(jobs);
          apply.doc('Applied').update({applied: applied}).then(res=>{
            console.log(res);
            this.setState({btnText: 'APPLIED', disableBtn: true});
          });
        }
      } else {
        apply.doc('Applied').set({applied: [jobs]}).then((res)=>{
          console.log(res);
          this.setState({btnText: 'APPLIED', disableBtn: true});
        });
      }
    });
  }

  applied(){
    let jobs = firestore().collection('Jobs');
    jobs.doc('Applied').get().then(a=>{
      if (a.exists) {
        let applyed = [...a.data().applied];
        for (let x of applyed) {
          if (x.appliedUser === this.state.user) {
            this.setState({btnText: 'APPLIED', disableBtn: true});
          }
        }
      }
    });
  }

  render(){
    return (
      <ScrollView style={[{backgroundColor: 'white'}]}>
          <View>
              <View style={{margin: 20, padding: 10}}>
                  <Text style={{alignSelf: 'center', fontSize: 30}}>{this.state.Details.title}</Text>
              </View>

              <Divider style={{width: '80%', alignSelf: 'center', backgroundColor: 'black'}} />

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
              title={this.state.btnText}
              type="solid"
              disabled={this.state.disableBtn}
              buttonStyle={{ height: 50, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }}
              onPress={this.apply}
          />
      </ScrollView>
  );
  }
}

class AppealDetails extends Component {
  constructor(props: any){
    super(props);
    this.state = {
        Details: {},
        user: '',
        disableBtn: '',
        btnText: 'APPLY',
    };
    this.apply = this.apply.bind(this);
  }

  ismounted = false;
  componentDidUpdate(){
    this.ismounted = true;
    this.initializeDetails(this.props.details);
  }

  componentWillUnmount(){
    this.ismounted = false;
}

  initializeDetails(Details){
      if (this.ismounted) {
        AsyncStorage.getItem('user').then(user=>{
          this.setState({user,Details});
        });
        this.applied();
      }
  }

  apply(){
    let apply = firestore().collection('Jobs');
    let jobs = {id: this.state.Details.id, appliedUser: this.state.user, jobOwner: this.state.Details.user, job: this.state.Details.job};
    let applied;
    apply.doc('Applied').get().then(e=>{
      if (e.exists) {
        if (jobs.jobOwner !== jobs.appliedUser) {
          applied = [...e.data().applied];
          applied.push(jobs);
          apply.doc('Applied').update({applied: applied}).then(res=>{
            console.log(res);
            this.setState({btnText: 'APPLIED', disableBtn: true});
          });
        }
      } else {
        apply.doc('Applied').set({applied: [jobs]}).then((res)=>{
          console.log(res);
          this.setState({btnText: 'APPLIED', disableBtn: true});
        });
      }
    });
  }

  applied(){
    let jobs = firestore().collection('Jobs');
    jobs.doc('Applied').get().then(a=>{
      if (a.exists) {
        let applyed = [...a.data().applied];
        for (let x of applyed) {
          if (x.appliedUser === this.state.user) {
            this.setState({btnText: 'APPLIED', disableBtn: true});
          }
        }
      }
    });
  }

  render(){
    return (
      <ScrollView style={[{backgroundColor: 'white'}]}>
          <View>
              <View style={{margin: 20, padding: 10}}>
                  <Text style={{alignSelf: 'center', fontSize: 30}}>{this.state.Details.title}</Text>
              </View>

              <Divider style={{width: '80%', alignSelf: 'center', backgroundColor: 'black'}} />

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
              title={this.state.btnText}
              type="solid"
              disabled={this.state.disableBtn}
              buttonStyle={{ height: 50, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }}
              onPress={this.apply}
          />
      </ScrollView>
    );
  }
}
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */

import * as fn from './component/functions';
import React, { Component } from 'react';
import {Styles} from './component/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FeedProps, FeedState, FeedDetProps, FeedDetState, VacancyProps, VacancyState, AppliedProps, AppliedState } from './component/types';
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



export default class Feeds extends Component<FeedProps, FeedState> {
  constructor(props: any) {
    super(props);
    this.state = {
      Feed: [],
      addressComponent: 'null',
      result: 'null',
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
      fn.geoLocation(this.setHandlerState);
      if (this.state.result === 'granted') {
        fn.getFeeds(this.setHandlerState);
      }
    }
  }

  setHandlerState = (state: string, data: string) => {
    this.setState({[state]: data});
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
          <View>
              {
                  this.state.Feed.map((item: any, i: any) => (
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


export class FeedDetails extends Component<FeedDetProps, FeedDetState> {
  constructor(props: any){
      super(props);
      this.state = {
        Details: {},
        user: '',
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
    if (this.ismounted) {
      const { Details } = this.props.route.params;
        this.setState({Details});
        AsyncStorage.getItem('user').then((user: any)=>{
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



class VacancyDetails extends Component<VacancyProps, VacancyState> {
  constructor(props: any){
    super(props);
    this.state = {
        Details: {},
        user: '',
        disableBtn: false,
        btnText: 'APPLY',
    };
  }

  ismounted: boolean = false;
  applyData: any = {id: this.state.Details.id, appliedUser: this.state.user, jobOwner: this.state.Details.user, job: this.state.Details.job};
  componentDidUpdate(){
    this.ismounted = true;
    this.initializeDetails(this.props.details);
  }

  componentWillUnmount(){
    this.ismounted = false;
}

  initializeDetails(Details: any){
      if (this.ismounted) {
        AsyncStorage.getItem('user').then((user: any)=>{
          this.setState({user,Details});
        });
        fn.applied(this.setHandlerState, this.state.user);
      }
  }

  setHandlerState = (state: string, data: string) => {
    this.setState({[state]: data});
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
              onPress={()=> fn.apply(this.setHandlerState, this.applyData)}
          />
      </ScrollView>
  );
  }
}



class AppealDetails extends Component<AppliedProps, AppliedState> {
  constructor(props: any){
    super(props);
    this.state = {
        Details: {},
        user: '',
        disableBtn: false,
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

  initializeDetails(Details: any){
      if (this.ismounted) {
        AsyncStorage.getItem('user').then((user: any)=>{
          this.setState({user,Details});
        });
        this.applied();
      }
  }

  apply(){
    let apply = firestore().collection('Jobs');
    let jobs = {id: this.state.Details.id, appliedUser: this.state.user, jobOwner: this.state.Details.user, job: this.state.Details.job};
    let applied;
    apply.doc('Applied').get().then((e: any)=>{
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
    jobs.doc('Applied').get().then((a: any)=>{
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
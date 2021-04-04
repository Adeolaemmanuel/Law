/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */

import * as fn from './component/functions';
import React from 'react';
import { Component } from 'react';
import {Styles} from './component/styles';
import {FeedProps, FeedState } from './component/types';
import {
  View,
  ScrollView,
  Pressable,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {
  Card,
  ListItem,
  Avatar,
  Divider,
  Button,
  Overlay,
} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class Feeds extends Component<FeedProps, FeedState> {
  constructor(props: any) {
    super(props);
    this.state = {
      Feed: [],
      addressComponent: 'null',
      result: 'null',
      overlay: false,
      disableBtn: false,
      btnText: 'APPLY',
      me: '',
      Details: 0,
    };
  }

  ismounted = false;

  componentDidMount() {
    this.ismounted = true;
    this.initializeFeed();
  }

  componentDidUpdate(){
    if ( this.state.Feed.length === 0) {
      this.initializeFeed();
    }
    console.log('====================================');
    console.log(this.state.Feed);
    console.log('====================================');
  }

  componentWillUnmount(){
    this.ismounted = false;
  }

  initializeFeed(){
    if (this.ismounted) {
      fn.geoLocation(this.setHandlerState);
      if (this.state.result === 'granted') {
        fn.getFeeds(this.setHandlerState);
        fn.applied(this.setHandlerState, this.state.me);
        AsyncStorage.getItem('user').then((me: any)=>{
          this.setState({me});
        });
      }
    }
  }

  overlay = () => {
    if (this.state.overlay) {
      let { type, title, id, company, job, location, experience, summary, user} = this.state.Feed[this.state.Details];
      return (
        <Overlay
          isVisible={this.state.overlay}
          onBackdropPress={()=> this.setState({overlay: false})}
          overlayStyle={{width: Dimensions.get('screen').width - 50, height: Dimensions.get('screen').height - 200 }}
        >
          <ScrollView>
            <View>
              <View style={{margin: 20, padding: 10}}>
                <Text style={{alignSelf: 'center', fontSize: 30}}>{title}</Text>
              </View>

              <Divider style={{width: '80%', alignSelf: 'center', backgroundColor: 'black'}} />

              {
                (()=>{
                  if (job === 'Vacancy') {
                    return (
                      <View style={[{padding: 30}, Styles.containerRow]}>
                        <View style={{ margin: 10 }}>
                            <Image source={require('./assets/img/company.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 20 }}>{company}</Text>
                        </View>
                      </View>
                    );
                  }
                })()
              }

              {
                (()=>{
                  if (job === 'Vacancy') {
                    return (
                      <View style={[{padding: 30, paddingTop: 0}, Styles.containerRow]}>
                        <View style={{ margin: 10 }}>
                            <Image source={require('./assets/img/full-time-job.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 20 }}>{type}</Text>
                        </View>
                      </View>
                    );
                  }
                })()
              }

              {
                (()=>{
                  if (job === 'Vacancy') {
                    return (
                      <View style={[{padding: 30, paddingTop: 0}, Styles.containerRow]}>
                        <View style={{ margin: 10 }}>
                            <Image source={require('./assets/img/increase.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 20 }}>{experience} Years Experience</Text>
                        </View>
                      </View>
                    );
                  }
                })()
              }

              {
                (()=>{
                  if (job === 'Vacancy') {
                    return (
                      <View style={[{padding: 30, paddingTop: 0}, Styles.containerRow]}>
                        <View style={{ margin: 10 }}>
                            <Image source={require('./assets/img/pin.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 20 }}>{location}</Text>
                        </View>
                      </View>
                    );
                  }
                })()
              }

              {
                (()=>{
                  if (job === 'Vacancy') {
                    return (
                      <View style={{ margin: 10, padding: 10 }}>
                        <Text style={{ fontSize: 20 }}>{summary}</Text>
                      </View>
                    );
                  }
                })()
              }

            {
              (()=>{
                if (user !== this.state.me) {
                 return (
                  <Button
                    title={this.state.btnText}
                    disabled={this.state.disableBtn}
                    type="solid"
                    buttonStyle={{ height: 50, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }}
                    onPress={()=> {
                        fn.apply(this.setHandlerState, {id: id, appliedUser: this.state.me, jobOwner: user, job: job});
                      }
                    }
                  />
                 );
                }
              })()
            }
            </View>
          </ScrollView>
        </Overlay>
      );
    }
  }

  setHandlerState = (state: string, data: string) => {
    this.setState({[state]: data});
  }



  render() {
    return (
      <>
        {
          this.overlay()
        }
        <ScrollView style={{backgroundColor: 'white'}}>
          <View>
              {
                  this.state.Feed.map((item: any, i: any) => (
                      <Pressable key={`BtnDetails-${item.key}${i}`} onPress={()=> this.setState({overlay: true, Details: i})}>
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
      </>
    );
  }
}


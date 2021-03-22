import React, { Component } from 'react';
import {
    View,
    Stylesheet,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    ToastAndroid,
} from 'react-native';
import { NavigationAction } from '@react-navigation/native';
import { Badge } from 'react-native-elements';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Button } from 'react-native-elements';
import { Styles } from './functions/styles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        step1D: { firstname: null, lastname: null, email: null, password: null, repassword: null },
        step2D: { dob: null, gender: null, address: null, country: null, state: null },
        step3D: { education: null, degree: null, start: null, end: null, certificate: null },
        step1: true,
        step2: false,
        step3: false,
        step4: false,
        stepColor: ['success', 'error', 'primary', 'warning'],
        StepIndex : 0,
    };
  }

  componentDidMount() {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
          // â€
          if (result === 'granted') {
              Geolocation.getCurrentPosition(
                  (position) => {
                      Geocoder.init('AIzaSyD8LIhgvlYbX89FYSOLfM-z8MkuIwoUeY')
                      Geocoder.from({ latitude: position.coords.latitude, longitude: position.coords.longitude }).then(d => console.log(d))
                      //console.log(position);
                  },
                  (error) => {
                      // See error code charts below.
                      console.log(error.code, error.message);
                  },
                  { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
              );
          }
          console.log(result);
      });
  }

  formDData(data,prev,next,type){
          if (type === 'next') {
              for (let d in data) {
                  if (data[d] !== null) {
                      data.gender.substr(0, 1).toUpperCase();
                      this.setState({ [prev]: false });
                      this.setState({ [next]: true });
                  }
              }
          } else if (type === 'prev') {
              this.setState({ [prev]: false });
              this.setState({ [next]: true });
          }
      }

  badge = () => {
        if (this.state.step1) {
            return (
                <Badge containerStyle={Styles.badge} status="primary" />
            )
        } else if (this.state.step2) {
            return (
                <Badge containerStyle={Styles.badge} status="error" />
            )
        } else if (this.state.step3) {
            return (
                <Badge containerStyle={Styles.badge} status="success" />
            )
        } else if (this.state.step4) {
            return (
                <Badge containerStyle={Styles.badge} status="warning" />
            )
        }
    }

    step() {
        if (this.state.step1) {
            return (
                <>
                    <View style={Styles.container}>
                        <View>
                            <TextInput placeholder="First Name:" value={this.state.step1D.firstname} onChangeText={text => {
                                let data = { ...this.state.step1D };
                                data.firstname = text;
                                this.setState({ step1D: data });
                            }} style={Styles.input} />
                        </View>
                        <View>
                            <TextInput placeholder="Last Name:" value={this.state.step1D.lastname} onChangeText={text => {
                                let data = { ...this.state.step1D };
                                data.lastname = text;
                                this.setState({ step1D: data });
                            }} style={Styles.input} />
                        </View>
                        <View>
                            <TextInput placeholder="Email:" style={Styles.input} value={this.state.step1D.email} onChangeText={text => {
                                let data = { ...this.state.step1D };
                                data.email = text;
                                this.setState({ step1D: data });
                            }} keyboardType="email-address" />
                        </View>
                        <View>
                            <TextInput placeholder="Password:" style={Styles.input} value={this.state.step1D.password} onChangeText={text => {
                                let data = { ...this.state.step1D };
                                data.password = text;
                                this.setState({ step1D: data });
                            }} secureTextEntry={true} />
                        </View>
                        <View>
                            <TextInput placeholder="Retype Password:" style={Styles.input} value={this.state.step1D.repassword} onChangeText={text => {
                                let data = { ...this.state.step1D };
                                data.repassword = text;
                                this.setState({ step1D: data });
                            }} secureTextEntry={true} />
                        </View>
                        <Button title="Next" type="solid" buttonStyle={{ height: 70, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 30, width: 180, alignSelf: 'center' }} onPress={() => this.formDData(this.state.step1D, 'step1', 'step2', 'next')} />
                    </View>
                </>
            );
        }
        else if (this.state.step2) {
            return (
                <View style={Styles.container}>
                    <View>
                        <TextInput placeholder="DOB:" style={Styles.input} onChangeText={text => {
                            let data = { ...this.state.step2D };
                            data.dob = text;
                            this.setState({ step2D: data });
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder="Gender:" style={Styles.input} onChangeText={text => {
                            let data = { ...this.state.step2D };
                            data.gender = text;
                            this.setState({ step2D: data });
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder="Address:" style={Styles.input} onChangeText={text => {
                            let data = { ...this.state.step2D };
                            data.address = text;
                            this.setState({ step2D: data });
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder="Country:" style={Styles.input} onChangeText={text => {
                            let data = { ...this.state.step2D };
                            data.country = text;
                            this.setState({ step2D: data });
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder="State:" style={Styles.input} onChangeText={text => {
                            let data = { ...this.state.step2D };
                            data.state = text;
                            this.setState({ step2D: data });
                        }} />
                    </View>
                    <View style={Styles.btnFlex} >
                        <Button title="Previous" type="solid" buttonStyle={{ width: 100, height: 70, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 30, }} onPress={() => this.formDData(this.state.step2D, 'step2', 'step1', 'prev')} />
                        <Button title="Next" type="solid" buttonStyle={{ width: 100, height: 70, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 30, }} onPress={() => this.Register({ ...this.state.step1D, ...this.state.step2D, ...this.state.step3D })} />
                    </View>
                </View>
            );
        }
        else if (this.state.step3) {
            return (
                <View style={Styles.container}>
                    <View>
                        <TextInput placeholder="Education:" style={Styles.input} onChangeText={text => {
                            let data = { ...this.state.step3D };
                            data.education = text;
                            this.setState({ step3D: data });
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder="Degree:" style={Styles.input} onChangeText={text => {
                            let data = { ...this.state.step3D };
                            data.degree = text;
                            this.setState({ step3D: data });
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder="Start Year:" style={Styles.input} onChangeText={text => {
                            let data = { ...this.state.step3D };
                            data.start = text;
                            this.setState({ step3D: data });
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder="End Year:" style={Styles.input} onChangeText={text => {
                            let data = { ...this.state.step3D };
                            data.end = text;
                            this.setState({ step3D: data });
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder="Certificate:" style={Styles.input} onChangeText={text => {
                            let data = { ...this.state.step3D };
                            data.certificate = text;
                            this.setState({ step3D: data });
                        }} />
                    </View>
                    <View style={Styles.btnFlex} >
                        <Button title="Previous" type="solid" buttonStyle={{ width: 100, height: 70, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 30, }} onPress={() => this.formDData(this.state.step3D, 'step2', 'step3', 'prev')} />
                        <Button title="Next" type="solid" onPress={() => this.formDData(this.state.step3D, 'step3', 'step4', 'next')} buttonStyle={{ width: 100, height: 70, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 30, }} />
                    </View>
                </View>
            );
        }

    }

    clearAll = async () => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            // clear error
        }
    }

    Admin = firestore().collection('Admin')
    Users = firestore().collection('Users')
    Register = (data) => {
        console.log(data)
        this.Admin.doc('Users').get().then(e => {
            let users = [];
            if (e.exists) {
                users = [...e.data().email];
                if (users.indexOf(data.email) === -1) {
                    users.push(data.email)
                    this.Admin.doc('Users').update({
                        email: users
                    }).then(() => {
                        this.Users.doc(data.email).set(data).then(() => {
                            AsyncStorage.setItem('user', data.email).then(e => {
                                if (e) console.log(e)
                                this.props.navigation.push('Drawer')
                            })
                        })
                    })
                } else {
                    ToastAndroid.show("User already exist !", ToastAndroid.TOP);
                }
            } else {
                users.push(data.email)
                this.Admin.doc('Users').set({
                    email: users
                }).then(() => {
                    this.Users.doc(data.email).set(data).then(() => {
                        this.Users.doc(data.email).set(data).then(() => {
                            AsyncStorage.setItem('user', data.email).then(e => {
                                if (e) console.log(e)
                                this.props.navigation.push('Drawer')
                            })
                        })
                    })
                })
            }
        })
    }

  render() {
    return (
      <ScrollView>
        <View>
          <KeyboardAvoidingView>
            <Text style={Styles.headerText}>Register</Text>
            {
                this.badge()
            }
            {
              this.step()
            }
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}


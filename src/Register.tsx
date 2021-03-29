/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    ToastAndroid,
    Picker,
} from 'react-native';
import { Badge } from 'react-native-elements';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Button } from 'react-native-elements';
import { Styles } from './component/styles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';



interface RegisterProps {
    navigation: any
}

interface RegisterState {
    step1D: any
    step2D: any
    step3D: any
    step1: boolean
    step2: boolean
    step3: boolean
    step4: boolean
    stepColor: string[]
}


export default class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: any) {
    super(props);
    this.state = {
        step1D: { firstname: null, lastname: null, email: null, password: null, number: null },
        step2D: { dob: null, gender: 'Male', address: null, country: null, state: null },
        step3D: { education: null, degree: null, start: null, end: null, certificate: null },
        step1: true,
        step2: false,
        step3: false,
        step4: false,
        stepColor: ['success', 'error', 'primary', 'warning'],
    };
  }

    ismounted = false;

    componentDidMount() {
        this.ismounted = true;
        this.initializeReg();
    }

    initializeReg(){
        if (this.ismounted) {
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {

                if (result === 'granted') {
                    Geolocation.getCurrentPosition(
                        (position) => {
                            Geocoder.init('AIzaSyD8LIhgvlYbX89FYSOLfM-z8MkuIwoUeYE');
                            Geocoder.from({ latitude: position.coords.latitude, longitude: position.coords.longitude })
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
            });
        }
    }


    componentWillUnmount(){
        this.ismounted = false;
    }

    formData(data: any,prev: any,next: any,type: any){
        if (type === 'next') {
            for (let d in data) {
                if (data[d] !== null) {
                    this.setState({ [prev]: false });
                    this.setState({ [next]: true });
                }
            }
        } else if (type === 'prev') {
            this.setState({ [prev]: false });
            this.setState({ [next]: true });
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

    Register = (data: any) => {
        data.gender.substr(0, 1).toUpperCase();
        data.firstname.substr(0, 1).toUpperCase();
        data.lastname.substr(0, 1).toUpperCase();
        this.Admin.doc('Users').get().then(e => {
            let users = [];
            if (e.exists) {
                users = [...e.data().email];
                if (users.indexOf(data.email) === -1) {
                    users.push(data.email);
                    this.Admin.doc('Users').update({
                        email: users,
                    }).then(() => {
                        this.Users.doc(data.email).set(data).then(() => {
                            AsyncStorage.setItem('user', data.email).then( e => {
                                if (e) {console.log(e);}
                                this.props.navigation.push('Drawer');
                            });
                        });
                    });
                } else {
                    ToastAndroid.show('User already exist !', ToastAndroid.TOP);
                }
            } else {
                users.push(data.email);
                this.Admin.doc('Users').set({
                    email: users,
                }).then(() => {
                    this.Users.doc(data.email).set(data).then(() => {
                        this.Users.doc(data.email).set(data).then(() => {
                            AsyncStorage.setItem('user', data.email).then(e => {
                                if (e) {console.log(e);}
                                this.props.navigation.push('Drawer');
                            });
                        });
                    });
                });
            }
        });
    }

    badge = () => {
        if (this.state.step1) {
            return (
                <Badge containerStyle={Styles.badge} status="primary" />
            );
        } else if (this.state.step2) {
            return (
                <Badge containerStyle={Styles.badge} status="error" />
            );
        } else if (this.state.step3) {
            return (
                <Badge containerStyle={Styles.badge} status="success" />
            );
        } else if (this.state.step4) {
            return (
                <Badge containerStyle={Styles.badge} status="warning" />
            );
        }
    }

    StepComponent() {
        if (this.state.step1) {
            return (
                <>
                    <View style={Styles.container}>
                        <View>
                            <TextInput
                                placeholder="First Name:"
                                value={this.state.step1D.firstname}
                                onChangeText={text => {
                                let data = { ...this.state.step1D };
                                data.firstname = text.charAt(0).toUpperCase() + text.slice(1);
                                this.setState({ step1D: data });
                                }}
                                style={Styles.input}
                            />
                        </View>
                        <View>
                            <TextInput
                                placeholder="Last Name:"
                                value={this.state.step1D.lastname}
                                onChangeText={text => {
                                let data = { ...this.state.step1D };
                                data.lastname = text.charAt(0).toUpperCase() + text.slice(1);
                                this.setState({ step1D: data });
                                }}
                                style={Styles.input}
                            />
                        </View>
                        <View>
                            <TextInput
                                placeholder="Email:"
                                style={Styles.input}
                                value={this.state.step1D.email}
                                onChangeText={text => {
                                let data = { ...this.state.step1D };
                                data.email = text;
                                this.setState({ step1D: data });
                                }}
                                keyboardType="email-address"
                            />
                        </View>
                        <View>
                            <TextInput
                                placeholder="Phone Number:"
                                style={Styles.input}
                                value={this.state.step1D.password}
                                onChangeText={text => {
                                let data = { ...this.state.step1D };
                                data.number = text;
                                this.setState({ step1D: data });
                                }}
                            />
                        </View>
                        <View>
                            <TextInput
                                placeholder="Password:"
                                style={Styles.input}
                                value={this.state.step1D.repassword}
                                secureTextEntry={true}
                                onChangeText={text => {
                                let data = { ...this.state.step1D };
                                data.repassword = text;
                                this.setState({ step1D: data });
                                }}
                            />
                        </View>
                        <Button
                            title="Next"
                            type="solid"
                            buttonStyle={{ height: 70, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 30, width: 180, alignSelf: 'center' }}
                            onPress={() => this.formData(this.state.step1D, 'step1', 'step2', 'next')}
                        />
                    </View>
                </>
            );
        }
        else if (this.state.step2) {
            return (
                <View style={Styles.container}>
                    <View>
                        <TextInput
                            placeholder="DOB:"
                            style={Styles.input}
                            value={this.state.step2D.dob}
                            onChangeText={text => {
                            let data = { ...this.state.step2D };
                            data.dob = text;
                            this.setState({ step2D: data });
                        }} />
                    </View>
                    <View style={Styles.input}>
                        <Picker
                            selectedValue={this.state.step2D.gender}
                            mode="dropdown"
                            style={{ width: '100%', padding: 10 }}
                            onValueChange={text => {
                                let data = { ...this.state.step2D };
                                data.gender = text;
                                this.setState({ step2D: data });
                            }}
                        >
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>
                    </View>
                    <View>
                        <TextInput
                            placeholder="Address:"
                            style={Styles.input}
                            value={this.state.step2D.address}
                            onChangeText={text => {
                            let data = { ...this.state.step2D };
                            data.address = text.charAt(0).toUpperCase() + text.slice(1);
                            this.setState({ step2D: data });
                            }}
                        />
                    </View>
                    <View>
                        <TextInput
                            placeholder="Country:"
                            value={this.state.step2D.country}
                            style={Styles.input}
                            onChangeText={text => {
                            let data = { ...this.state.step2D };
                            data.country = text.charAt(0).toUpperCase() + text.slice(1);
                            this.setState({ step2D: data });
                            }}
                        />
                    </View>
                    <View>
                        <TextInput
                            placeholder="State:"
                            value={this.state.step2D.state}
                            style={Styles.input}
                            onChangeText={text => {
                            let data = { ...this.state.step2D };
                            data.state = text.charAt(0).toUpperCase() + text.slice(1);
                            this.setState({ step2D: data });
                            }}
                        />
                    </View>
                    <View style={Styles.btnFlex} >
                        <Button
                            title="Previous"
                            type="solid"
                            buttonStyle={{ width: 100, height: 70, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 30 }}
                            onPress={() => this.formData(this.state.step2D, 'step2', 'step1', 'prev')}
                        />
                        <Button
                            title="Next"
                            type="solid"
                            buttonStyle={{ width: 100, height: 70, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 30 }}
                            onPress={() => this.formData(this.state.step2D, 'step2', 'step3', 'next')}
                        />
                    </View>
                </View>
            );
        }
        else if (this.state.step3) {
            return (
                <View style={Styles.container}>
                    <View>
                        <TextInput
                            placeholder="Education:"
                            style={Styles.input}
                            onChangeText={text => {
                            let data = { ...this.state.step3D };
                            data.education = text.charAt(0).toUpperCase() + text.slice(1);
                            this.setState({ step3D: data });
                            }}
                        />
                    </View>
                    <View>
                        <TextInput
                            placeholder="Degree:"
                            style={Styles.input}
                            onChangeText={text => {
                            let data = { ...this.state.step3D };
                            data.degree = text.charAt(0).toUpperCase() + text.slice(1);
                            this.setState({ step3D: data });
                            }}
                        />
                    </View>
                    <View>
                        <TextInput
                            placeholder="Start Year:"
                            style={Styles.input}
                            onChangeText={text => {
                            let data = { ...this.state.step3D };
                            data.start = text.charAt(0).toUpperCase() + text.slice(1);
                            this.setState({ step3D: data });
                            }}
                        />
                    </View>
                    <View>
                        <TextInput
                            placeholder="End Year:"
                            style={Styles.input}
                            onChangeText={text => {
                            let data = { ...this.state.step3D };
                            data.end = text.charAt(0).toUpperCase() + text.slice(1);
                            this.setState({ step3D: data });
                            }}
                        />
                    </View>
                    <View>
                        <TextInput
                            placeholder="Certificate:"
                            style={Styles.input}
                            onChangeText={text => {
                            let data = { ...this.state.step3D };
                            data.certificate = text.charAt(0).toUpperCase() + text.slice(1);
                            this.setState({ step3D: data });
                            }}
                        />
                    </View>
                    <View style={Styles.btnFlex} >
                        <Button
                            title="Previous"
                            type="solid"
                            buttonStyle={{ width: 100, height: 70, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 30 }}
                            onPress={() => this.formData(this.state.step3D, 'step2', 'step3', 'prev')}
                        />
                        <Button
                            title="Login"
                            type="solid"
                            onPress={() => this.Register({ ...this.state.step1D, ...this.state.step2D, ...this.state.step3D })}
                            buttonStyle={{ width: 100, height: 70, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 30 }}
                        />
                    </View>
                </View>
            );
        }

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
              this.StepComponent()
            }
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}


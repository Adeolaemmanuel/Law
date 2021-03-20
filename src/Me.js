import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, BackHandler, Image, ScrollView, ToastAndroid, } from 'react-native';
import { NavigationAction } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from './functions/styles';
import CameraRoll from "@react-native-community/cameraroll";
import { request, PERMISSIONS } from 'react-native-permissions';

export default class Me extends Component {
  constructor(props) {
    super(props);
      this.state = {
          me: {
              firstname: null, country: null,lastname: null, email: null,
              state: null, university: null, start: null, number: null,
              end: null, experience: null, degree: null, certificate: null,
              licenceNo: null, company: null, workStart: null, workEnd: null
          },
          home: true,
          edit: false,
      };
  }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => { return true });

        AsyncStorage.getItem('user').then(res => {
            let user = firestore().collection('Users');
            user.doc(res).onSnapshot(user => {
                if (user.exists) {
                    let me = { ...this.state.me }
                    me.firstname = user.data().firstname
                    me.lastname = user.data().lastname
                    me.country = user.data().country
                    me.state = user.data().state
                    me.university = user.data().education
                    me.start = user.data().start
                    me.end = user.data().end
                    me.degree = user.data().degree
                    me.certificate = user.data().certificate
                    me.experience = user.data().experience
                    me.number = user.data().number
                    me.licenceNo = user.data().licenceNo
                    me.company = user.data().company
                    me.email = user.data().email

                    for (let x in me) {
                        if (me[x] === undefined) {
                            me[x] = 'none'
                        }
                    }
                    this.setState({ me })
                }
            })
        })

        
    }

    switch = () => {
        if (this.state.home === true) {
            let edit = true;
            let home = false
            this.setState({ edit, home })
        } else {
            let edit = false;
            let home = true;
            this.setState({ edit, home })
        }
    }

    update = () => {
        let user = firestore().collection('Users');
        AsyncStorage.getItem('user').then(res => {
            user.doc(res).update(this.state.me).then(() => {
                ToastAndroid.show('Profile Updated', ToastAndroid.TOP)
            })
        })
    }

    upload = () => {
        request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(e => {
            if (e === 'granted') {
                CameraRoll.getPhotos({
                    first: 6,
                    assetType: 'Photos',

                }).then(img => {
                    console.log(img.edges)
                })
            }
        })
    }

    home = () => {
        if (this.state.home) {
            return (
                <>
                    <View style={Styles.containerRow}>
                        <View style={Styles.profileIamge}>
                            <Text>Image</Text>
                        </View>

                        <View style={Styles.container}>
                            <TouchableOpacity
                                style={[{ width: '90%', height: 60, backgroundColor: 'black', margin: 10, borderRadius: 5 }]}
                                onPress={this.switch}
                            >
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 25, margin: 10 }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[{ width: '90%', height: 60, backgroundColor: 'black', margin: 10, borderRadius: 5 }]}
                                onPress={this.upload}
                            >
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 25, padding: 10 }}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[Styles.container]}>
                        <Text style={Styles.heading}>ABOUT</Text>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/user2.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{`${this.state.me.firstname} ${this.state.me.lastname}`}</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/at.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.email}</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/smartphone.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.number}</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/world.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.country}</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/pin.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.state}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[Styles.container]}>
                        <Text style={Styles.heading}>EDUCATION</Text>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/university.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.university}</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/calendar.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{`${this.state.me.start} - ${this.state.me.end}`}</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/diploma.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.degree}</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/document.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.certificate}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[Styles.container]}>
                        <Text style={Styles.heading}>WORK</Text>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/increase.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.experience} Years Experience</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/calendar.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.email}</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/diploma.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.country}</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/document.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.state}</Text>
                            </View>
                        </View>
                    </View>
                </>
            )
        }
    }

    edit = () => {
        if (this.state.edit) {
            return (
                <View style={Styles.container}>
                    <View>
                        <TouchableOpacity
                            style={[{ width: '95%', height: 60, backgroundColor: 'black', margin: 10, borderRadius: 5 }]}
                            onPress={this.switch}
                        >
                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 25, margin: 10 }}>Close</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={[{ alignSelf: 'center' }, Styles.heading]}>ABOUT</Text>

                    <View style={Styles.containerRow}>
                        <TextInput
                            placeholder='Firstname:'
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.firstname}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.firstname = text
                                this.setState({me})
                            }}
                        />
                        <TextInput
                            placeholder='Lastname:'
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.lastname}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.lastname = text
                                this.setState({ me })
                            }}
                        />
                    </View>
                    <View style={Styles.containerRow}>
                        <TextInput
                            placeholder='Country:'
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.country}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.country = text
                                this.setState({ me })
                            }}
                        />
                        <TextInput
                            placeholder='State:'
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.state}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.state = text
                                this.setState({ me })
                            }}
                        />
                    </View>
                    <View style={Styles.container}>
                        <TextInput
                            placeholder='Phone Number:'
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.number}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.number = text
                                this.setState({ me })
                            }}
                        />
                    </View>

                    <Text style={[{ alignSelf: 'center' }, Styles.heading]}>Education</Text>

                    <View style={Styles.container}>
                        <TextInput
                            placeholder='University:'
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.university}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.university = text
                                this.setState({ me })
                            }}
                        />
                    </View>
                    <View style={Styles.container}>
                        <TextInput
                            placeholder='Degree:'
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.degree}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.degree = text
                                this.setState({ me })
                            }}
                        />
                    </View>
                    <View style={Styles.containerRow}>
                        <TextInput
                            placeholder='Start:'
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.start}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.start = text
                                this.setState({ me })
                            }}
                        />
                        <TextInput
                            placeholder='End:'
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.end}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.end = text
                                this.setState({ me })
                            }}
                        />
                    </View>
                    <View style={Styles.container}>
                        <TextInput
                            placeholder='Certificate:'
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.certificate}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.certificate = text
                                this.setState({ me })
                            }}
                        />
                    </View>
                    <TextInput
                        placeholder='Lincence No:'
                        style={[{ flex: 1 }, Styles.input]}
                        value={this.state.me.licenceNo}
                        onChangeText={text => {
                            let me = { ...this.state.me };
                            me.licenceNo = text
                            this.setState({ me })
                        }}
                    />

                    <Text style={[{ alignSelf: 'center' }, Styles.heading]}>Work</Text>

                    <View style={Styles.containerRow}>
                        <TextInput
                            placeholder='Experience:'
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.experience}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.experience = text
                                this.setState({ me })
                            }}
                        />
                    </View>
                    <View style={Styles.containerRow}>
                        <TextInput
                            placeholder='Company:'
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.company}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.company = text
                                this.setState({ me })
                            }}
                        />
                    </View>
                    <View style={Styles.containerRow}>
                        <TextInput
                            placeholder='Start:'
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.workStart}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.workStart = text
                                this.setState({ me })
                            }}
                        />
                        <TextInput
                            placeholder='End:'
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.workEnd}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.workEnd = text
                                this.setState({ me })
                            }}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[{ width: '95%', height: 60, backgroundColor: 'black', margin: 10, borderRadius: 5 }]}
                            onPress={this.update}
                        >
                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 25, margin: 10 }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView>
                    {
                        this.home()
                    }
                    {
                        this.edit()
                    }
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import * as fn from './functions/component';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from './functions/styles';


import { Button } from 'react-native-elements';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    BackHandler,
    Image,
    ScrollView,
    ToastAndroid,
} from 'react-native';



interface ProfileProps {
    navigation: any
    route: any
}

interface ProifleState {
    me: any
    profilePic: string
    followBtnText: string
}

export default class Profile extends Component<ProfileProps, ProifleState> {
    constructor(props: any) {
        super(props);
        this.state = {
            me: {
                firstname: ' ', country: ' ', lastname: ' ', email: ' ',
                state: ' ', university: ' ', start: ' ', number: ' ',
                end: ' ', experience: ' ', degree: ' ', certificate: ' ',
                licenceNo: ' ', company: ' ', workStart: ' ', workEnd: ' ', gender: ' ',
            },
            profilePic: 'null',
            followBtnText: 'Follow',
        };
    }


    ismounted = false;
    componentDidMount() {
        this.ismounted = true;
        this.initializeProfile();
    }

    initializeProfile(){
        if (this.ismounted) {
            BackHandler.addEventListener('hardwareBackPress', () => { return true;});
            const { email } = this.props.route.params;
            let user = firestore().collection('Users');
            fn.sentRequest(this.friends,email, this.setHandlerState);
            fn.confirmedRequest(this.friends,email, this.setHandlerState);
            user.doc(email).onSnapshot( users => {
                if (users.exists) {
                    let me = { ...this.state.me };
                    me.firstname = users.data().firstname;
                    me.lastname = users.data().lastname;
                    me.country = users.data().country;
                    me.state = users.data().state;
                    me.university = users.data().education;
                    me.start = users.data().start;
                    me.end = users.data().end;
                    me.degree = users.data().degree;
                    me.certificate = users.data().certificate;
                    me.experience = users.data().experience;
                    me.number = users.data().number;
                    me.licenceNo = users.data().licenceNo;
                    me.company = users.data().company;
                    me.email = users.data().email;
                    me.gender = users.data().gender;
                    me.workStart = users.data().workStart;
                    me.workEnd = users.data().workEnd;

                    let profilePic = users.data().profilePicture;
                    if (me.gender === 'Male' && profilePic === undefined) {
                        profilePic = require('./assets/img/profileM.png')
                        this.setState({ profilePic });
                    } else if (me.gender === 'Female' && profilePic === undefined) {
                        profilePic = require('./assets/img/profileW.png')
                        this.setState({ profilePic });
                    } else {
                        this.setState({ profilePic });
                    }

                    for (let x in me) {
                        if (me[x] === undefined) {
                            me[x] = 'none';
                        }
                    }
                    this.setState({ me });
                }
            });
        }
    }

    componentWillUnmount(){
        this.ismounted = false;
    }

    user = firestore().collection('Users')
    friends = firestore().collection('Friends')

    setHandlerState = (state: any,data: any) => {
        this.setState({[state]: data});
    }


    render() {
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <View  style={[Styles.containerRow]}>
                    <View style={Styles.profileIamge}>
                        <Image
                            source={typeof this.state.profilePic === 'number' ? this.state.profilePic : { uri: this.state.profilePic }}
                            style={{ width: 150, height: 150, margin: 10 }} />
                    </View>

                    <View style={Styles.container}>
                        <TouchableOpacity
                            style={[{ width: '90%', height: 60, backgroundColor: 'black', margin: 10, borderRadius: 5 }]}
                            onPress={()=> fn.profileButtonHandlerModule(this.state.followBtnText,this.state.me.email, this.setHandlerState)}
                        >
                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 25, margin: 10 }}>{this.state.followBtnText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[{ width: '90%', height: 60, backgroundColor: 'black', margin: 10, borderRadius: 5 }]}
                            //onPress={this.upload}
                        >
                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 25, padding: 10 }}>Message</Text>
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
                                <Image source={require('./assets/img/company.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.company}</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/calendar.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 20 }}>{`${this.state.me.workStart} - ${this.state.me.workEnd}`}</Text>
                            </View>
                        </View>
                    </View>

            </ScrollView>
        );
    }
}


interface MeProps {
    navigation: any
}

interface MeState {
    me: any
    profilePic: string
    followers: number
    following: number
}
export class Me extends Component<MeProps, MeState> {
  constructor(props: any) {
    super(props);
      this.state = {
          me: {
              firstname: ' ', country: ' ',lastname: ' ', email: ' ',
              state: ' ', university: ' ', start: ' ', number: ' ',
              end: ' ', experience: ' ', degree: ' ', certificate: ' ',
              licenceNo: ' ', company: ' ', workStart: ' ', workEnd: ' ',
          },
          profilePic: 'null',
          followers: 0,
          following: 0,
      };
  }

  ismounted: boolean = false;
    componentDidMount() {
        this.ismounted = true;
        this.initializeMe();
    }

    initializeMe(){
        if (this.ismounted) {
            BackHandler.addEventListener('hardwareBackPress', () => { return true;});
            AsyncStorage.getItem('user').then((res: any) => {
                fn.recievedRequest(this.friends, res ,this.setHandlerState);
                let user = firestore().collection('Users');
                // eslint-disable-next-line no-shadow
                user.doc(res).onSnapshot( (user: any) => {
                    if (user.exists) {
                        let me = { ...this.state.me }
                        me.firstname = user.data().firstname;
                        me.lastname = user.data().lastname;
                        me.country = user.data().country;
                        me.state = user.data().state;
                        me.university = user.data().education;
                        me.start = user.data().start;
                        me.end = user.data().end;
                        me.degree = user.data().degree;
                        me.certificate = user.data().certificate;
                        me.experience = user.data().experience;
                        me.number = user.data().number;
                        me.licenceNo = user.data().licenceNo;
                        me.company = user.data().company;
                        me.email = user.data().email;
                        me.gender = user.data().gender;
                        me.workStart = user.data().workStart;
                        me.workEnd = user.data().workEnd;

                        let profilePic = user.data().profilePicture;
                        if (me.gender.substr(0,1) === 'M' && profilePic === undefined) {
                            profilePic = require('./assets/img/profileM.png')
                            this.setState({ profilePic });
                        } else if (me.gender.substr(0, 1) === 'F' && profilePic === undefined) {
                            profilePic = require('./assets/img/profileW.png');
                            this.setState({ profilePic });
                        } else {
                            this.setState({ profilePic });
                        }

                        for (let x in me) {
                            if (me[x] === undefined) {
                                me[x] = 'none';
                            }
                        }
                        this.setState({ me });
                    }
                });
            });
        }
    }

    componentWillUnmount(){
        this.ismounted = false;
    }

    user: any = firestore().collection('Users')
    friends: any = firestore().collection('Friends')

    setHandlerState = (state: string, data: string) => {
        this.setState({[state]: data});
    }

    render() {
        return (
            <ScrollView  style={[{backgroundColor: 'white'}, Styles.container]}>
                <View style={Styles.containerRow}>
                    <View style={Styles.profileIamge}>
                        <Image
                            source={typeof this.state.profilePic === 'number' ? this.state.profilePic : { uri: this.state.profilePic }}
                            style={{ width: 150, height: 150, margin: 10 }}
                        />
                    </View>
                    <View style={Styles.container}>
                        <TouchableOpacity
                            style={[{ width: '90%', height: 60, backgroundColor: 'black', margin: 10, borderRadius: 5 }]}
                            onPress={()=>this.props.navigation.navigate('Profile Edit')}
                        >
                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 25, margin: 10 }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[{ width: '90%', height: 60, backgroundColor: 'black', margin: 10, borderRadius: 5 }]}
                            onPress={()=> fn.upload(this.setHandlerState)}
                        >
                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 25, padding: 10 }}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[{ margin: 10, padding: 10 }, Styles.containerRow]}>
                    <View style={{ flex: 1, height: 50, padding: 10, margin: 10 }}>
                        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Followers</Text>
                        <Text style={{ fontSize: 20, alignSelf: 'center' }}>{this.state.followers}</Text>
                    </View>
                    <View style={{ flex: 1, height: 50, padding: 10, margin: 10 }}>
                        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Following</Text>
                        <Text style={{ fontSize: 20, alignSelf: 'center' }}>{this.state.following}</Text>
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
                            <Image source={require('./assets/img/company.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 20 }}>{this.state.me.company}</Text>
                        </View>
                    </View>
                    <View style={Styles.containerRow}>
                        <View style={{ margin: 10 }}>
                            <Image source={require('./assets/img/calendar.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 20 }}>{`${this.state.me.workStart} - ${this.state.me.workEnd}`}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}



interface EditProps {
    navigation: any
}

interface EditState {
    me: any
}

export class Edit extends Component<EditProps, EditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            me: {
                firstname: ' ', country: ' ',lastname: ' ', email: ' ',
                state: ' ', university: ' ', start: ' ', number: ' ',
                end: ' ', experience: ' ', degree: ' ', certificate: ' ',
                licenceNo: ' ', company: ' ', workStart: ' ', workEnd: ' ',
                followers: 0, following: 0,
            },
        };
    }


    ismounted = false;
    componentDidMount() {
        this.ismounted = true;
        this.initiazileEdit();
    }

    initiazileEdit(){
        if (this.ismounted) {
            BackHandler.addEventListener('hardwareBackPress', () => { return true;});

            AsyncStorage.getItem('user').then((res: any) => {
                let user = firestore().collection('Users');
                user.doc(res).onSnapshot( (user: any) => {
                    if (user.exists) {
                        let me = { ...this.state.me }
                        me.firstname = user.data().firstname;
                        me.lastname = user.data().lastname;
                        me.country = user.data().country;
                        me.state = user.data().state;
                        me.university = user.data().education;
                        me.start = user.data().start;
                        me.end = user.data().end;
                        me.degree = user.data().degree;
                        me.certificate = user.data().certificate;
                        me.experience = user.data().experience;
                        me.number = user.data().number;
                        me.licenceNo = user.data().licenceNo;
                        me.company = user.data().company;
                        me.email = user.data().email;
                        me.gender = user.data().gender;
                        me.following = user.data().following;
                        me.followers = user.data().followers;
                        me.workStart = user.data().workStart;
                        me.workEnd = user.data().workEnd;

                        for (let x in me) {
                            if (me[x] === undefined) {
                                me[x] = 'none';
                            }
                        }
                        this.setState({ me });
                    }
                });
            });
        }
    }

    componentWillUnmount(){
        this.ismounted = false;
    }

    update = () => {
        let user = firestore().collection('Users');
        AsyncStorage.getItem('user').then((res: any) => {
            user.doc(res).update(this.state.me).then(() => {
                ToastAndroid.show('Profile Updated', ToastAndroid.TOP);
            });
        });
    }

    render(){
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <KeyboardAvoidingView>
                    <View style={Styles.container}>

                    <Text style={[{ alignSelf: 'center' }, Styles.heading]}>ABOUT</Text>

                    <View style={Styles.containerRow}>
                        <TextInput
                            placeholder="Firstname:"
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.firstname}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.firstname = text.charAt(0).toUpperCase() + text.slice(1);
                                this.setState({me});
                            }}
                        />
                        <TextInput
                            placeholder="Lastname:"
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.lastname}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.lastname = text.charAt(0).toUpperCase() + text.slice(1);
                                this.setState({ me });
                            }}
                        />
                    </View>
                    <View style={Styles.containerRow}>
                        <TextInput
                            placeholder="Country:"
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.country}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.country = text.charAt(0).toUpperCase() + text.slice(1);
                                this.setState({ me });
                            }}
                        />
                        <TextInput
                            placeholder="State:"
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.state}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.state = text.charAt(0).toUpperCase() + text.slice(1);
                                this.setState({ me });
                            }}
                        />
                    </View>
                    <View style={Styles.container}>
                        <TextInput
                            placeholder="Phone Number:"
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.number}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.number = text;
                                this.setState({ me });
                            }}
                        />
                    </View>

                    <Text style={[{ alignSelf: 'center' }, Styles.heading]}>Education</Text>

                    <View style={Styles.container}>
                        <TextInput
                            placeholder="University:"
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.university}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.university = text.charAt(0).toUpperCase() + text.slice(1);
                                this.setState({ me });
                            }}
                        />
                    </View>
                    <View style={Styles.container}>
                        <TextInput
                            placeholder="Degree:"
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.degree}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.degree = text.charAt(0).toUpperCase() + text.slice(1);
                                this.setState({ me });
                            }}
                        />
                    </View>
                    <View style={Styles.containerRow}>
                        <TextInput
                            placeholder="Start:"
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.start}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.start = text;
                                this.setState({ me });
                            }}
                        />
                        <TextInput
                            placeholder="End:"
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.end}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.end = text;
                                this.setState({ me });
                            }}
                        />
                    </View>
                    <View style={Styles.container}>
                        <TextInput
                            placeholder="Certificate:"
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.certificate}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.certificate = text;
                                this.setState({ me });
                            }}
                        />
                    </View>
                    <TextInput
                        placeholder="Lincence No:"
                        style={[{ flex: 1 }, Styles.input]}
                        value={this.state.me.licenceNo}
                        onChangeText={text => {
                            let me = { ...this.state.me };
                            me.licenceNo = text;
                            this.setState({ me });
                        }}
                    />

                    <Text style={[{ alignSelf: 'center' }, Styles.heading]}>Work</Text>

                    <View style={Styles.containerRow}>
                        <TextInput
                            placeholder="Experience:"
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.experience}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.experience = text;
                                this.setState({ me });
                            }}
                        />
                    </View>
                    <View style={Styles.containerRow}>
                        <TextInput
                            placeholder="Company:"
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.company}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.company = text.charAt(0).toUpperCase() + text.slice(1);
                                this.setState({ me });
                            }}
                        />
                    </View>
                    <View style={Styles.containerRow}>
                        <TextInput
                            placeholder="Start:"
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.workStart}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.workStart = text;
                                this.setState({ me });
                            }}
                        />
                        <TextInput
                            placeholder="End:"
                            style={[{ flex: 1 }, Styles.input]}
                            value={this.state.me.workEnd}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.workEnd = text;
                                this.setState({ me });
                            }}
                        />
                    </View>
                    <Button
                            title="Update"
                            type="solid"
                            buttonStyle={{ height: 70, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }}
                            onPress={this.update}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}



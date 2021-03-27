/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    BackHandler,
    Image,
    ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from './functions/styles';



export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            me: {
                firstname: ' ', country: ' ', lastname: ' ', email: ' ',
                state: ' ', university: ' ', start: ' ', number: ' ',
                end: ' ', experience: ' ', degree: ' ', certificate: ' ',
                licenceNo: ' ', company: ' ', workStart: ' ', workEnd: ' ', gender: ' ',
            },
            profilePic: null,
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => { return true;});
        const { email } = this.props.route.params;
        let user = firestore().collection('Users');
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

    user = firestore().collection('Users')
    follow = firestore().collection('Follows')

    profileButtonHandler = (type, data) => {

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
                            onPress={this.switch}
                        >
                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 25, margin: 10 }}>Follow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[{ width: '90%', height: 60, backgroundColor: 'black', margin: 10, borderRadius: 5 }]}
                            onPress={this.upload}
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
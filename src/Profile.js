import React, { Component } from 'react';
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
    Pressable,
} from 'react-native';
import { NavigationAction } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from './functions/styles';



export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            me: {
                firstname: " ", country: " ", lastname: " ", email: " ",
                state: " ", university: " ", start: " ", number: " ",
                end: " ", experience: " ", degree: " ", certificate: " ",
                licenceNo: " ", company: " ", workStart: " ", workEnd: " "
            },
            home: true,
            edit: false,
            Images: [],
            visible: false,
            profilePic: null
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => { return true });
        const { email } = this.props.route.params;
        let user = firestore().collection('Users');
        user.doc(email).onSnapshot(user => {
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
                me.gender = user.data().gender

                let profilePic = user.data().profilePicture
                if (me.gender === 'Male' && profilePic === undefined) {
                    profilePic = require('./assets/img/profileM.png')
                    this.setState({ profilePic })
                } else if (me.gender === 'Female' && profilePic === undefined) {
                    profilePic = require('./assets/img/profileW.png')
                    this.setState({ profilePic })
                } else {
                    this.setState({ profilePic })
                }

                for (let x in me) {
                    if (me[x] === undefined) {
                        me[x] = 'none'
                    }
                }
                this.setState({ me })
                let checl = typeof profilePic
                console.log(this.state.profilePic)
            }
        })


    }

    render() {
        return (
            <ScrollView>
                <View style={Styles.containerRow}>
                    <View style={Styles.profileIamge}>
                        <Image
                            source={typeof this.state.profilePic == 'number' ? this.state.profilePic : { uri: this.state.profilePic }}
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
            </ScrollView>
        )
    }
}
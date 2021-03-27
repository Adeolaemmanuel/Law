/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
    Pressable,
    ScrollView,
    View,
} from 'react-native';
import { Avatar, Card, ListItem } from 'react-native-elements';
import { Styles } from './functions/styles';
import firestore from '@react-native-firebase/firestore';
import { SearchCenterHeaderModule } from './functions/component';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Law extends Component {
    render() {
        return (
            <View>
                
            </View>
        );
    }
}


export class Lawyers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lawyers: [],
            search: '',
        };
    }

    componentDidMount() {
        this.getLawyers();
    }

    componentWillUnmount(){
        this.componentDidMount();
    }

    search = (search) => {
        this.setState({ search });
        this.state.lawyers.filter(lawyers => {
            if (lawyers.name.match(search)) {
                if (search.length > 1) {
                    this.setState({ lawyers: [lawyers] })
                } else {
                    this.getLawyers();
                }
            }
        });
    }

    Admin = firestore().collection('Admin')
    user = firestore().collection('Users')
    getLawyers() {
        this.Admin.doc('Users').onSnapshot(email => {
            let emails = [];
            if (email.exists) {
                emails = [...email._data.email];
                let lawyers = [];
                AsyncStorage.getItem('user').then(e=>{
                    for (let x of emails) {
                        if ( x !== e) {
                            this.user.doc(x).get().then(lawyer => {
                                if (lawyer.exists) {

                                    let profilePic = lawyer.data().profilePicture;
                                    if (lawyer.gender === 'Male' && profilePic === undefined) {
                                        profilePic = require('./assets/img/profileM.png');
                                    } else if (lawyer.gender === 'Female' && profilePic === undefined) {
                                        profilePic = require('./assets/img/profileW.png');
                                    }

                                    lawyers.push({
                                        name: `${lawyer.data().firstname} ${lawyer.data().lastname}`,
                                        key: `${Math.ceil(Math.random() * 19)}${Math.ceil(Math.random() * 19)}${Math.ceil(Math.random() * 19)}${Math.ceil(Math.random() * 19)}${Math.ceil(Math.random() * 19)}`,
                                        profilePicture: profilePic,
                                        email: lawyer.data().email,
                                        location: `${lawyer.data().country}, ${lawyer.data().state}`,
                                    });
                                    this.setState({ lawyers });
                                }
                            });
                        }
                    }
                });
            }
        });
    }

    render() {
        return (
            <View style={[{backgroundColor: 'white', height: Dimensions.get('screen').height}, Styles.container]}>
                <View style={[{height: 65}]}>
                    <SearchCenterHeaderModule navigation={this.props.navigation} valueChange={this.search} />
                </View>
                <ScrollView>
                    <View>
                        {
                            this.state.lawyers.map((item, i) => (
                                <Pressable key={`Btn-${item.key}`} onPress={() => this.props.navigation.navigate('Profile', { email: item.email })}>
                                    <Card key={`Card-${item.key}`}>
                                        <ListItem key={`List-${item.key}`}>
                                            <Avatar
                                                rounded
                                                source={{
                                                    uri: item.profilePicture,
                                                } || item.profilePicture}
                                            />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.name}</ListItem.Title>
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
            </View>
        );
    }
}

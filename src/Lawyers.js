import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar, Card, ListItem } from 'react-native-elements';
import { Styles } from './functions/styles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Law from './Law';


export default class Lawyers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lawyers: [],
        }
    }

    componentDidMount() {
        this.getLawyers()
    }

    Admin = firestore().collection('Admin')
    user = firestore().collection('Users')
    getLawyers() {
        this.Admin.doc('Users').onSnapshot(email => {
            let emails = [];
            if (email.exists) {
                emails = [...email._data.email]

                for (let x of emails) {
                    this.user.doc(x).get().then(lawyer => {
                        if (lawyer.exists) {
                            let lawyers = [];
                            lawyers.push({
                                name: `${lawyer.data().firstname} ${lawyer.data().lastname}`,
                                key: `${Math.ceil(Math.random() * 19)}${Math.ceil(Math.random() * 19)}${Math.ceil(Math.random() * 19)}${Math.ceil(Math.random() * 19)}${Math.ceil(Math.random() * 19)}`,
                                profilePicture: lawyer.data().profilePicture
                            })
                            this.setState({ lawyers })
                        }
                    })
                }
            }
        })
    }

    render() {
        return (
            <ScrollView>
                <View>
                    {
                        this.state.lawyers.map((item, i) => (
                            <Card>
                                <ListItem key={item.key}>
                                    <Avatar
                                        rounded
                                        source={{
                                            uri: item.profilePicture
                                        }}
                                    />
                                    <ListItem.Content>
                                        <ListItem.Title>{item.name}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            </Card>
                        ))
                    }
                </View>
            </ScrollView>
        );
    }
}

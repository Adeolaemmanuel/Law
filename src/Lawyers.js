import React, { Component } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Avatar, Card, ListItem } from 'react-native-elements';
import { Styles } from './functions/styles';
import firestore from '@react-native-firebase/firestore';
import Law from './Law';
import { SearchCenterHeaderModule } from './functions/component';


export default class Lawyers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lawyers: [],
            search: '',
        }
    }

    componentDidMount() {
        this.getLawyers()
    }

    search = (search) => {
        this.setState({ search })
        console.log(this.state.search)
        this.state.lawyers.filter(lawyers => {
            if (lawyers.name.match(search)) {
                if (search.length > 1) {
                    this.setState({ lawyers: [...lawyers] })
                } else {
                    this.getLawyers()
                }
            }
        })
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
                                profilePicture: lawyer.data().profilePicture,
                                email: lawyer.data().email,
                                location: `${lawyer.data().country}, ${lawyer.data().state}`
                            })
                            this.setState({ lawyers })
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
                <SearchCenterHeaderModule navigation={this.props.navigation} valueChange={this.search} />
                <View>
                    {
                        this.state.lawyers.map((item, i) => (
                            <Pressable key={`Btn-${item.key}`} onPress={() => this.props.navigation.navigate('Profile', { email: item.email })}>
                                <Card key={`Card-${item.key}`}>
                                    <ListItem key={`List-${item.key}`}>
                                        <Avatar
                                            rounded
                                            source={{
                                                uri: item.profilePicture
                                            }}
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
        );
    }
}

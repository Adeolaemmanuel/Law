/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Pressable,
    Text,
    Image,
} from 'react-native';
import {
     Card,
     ListItem,
     Avatar,
     Divider,
    } from 'react-native-elements';
import {Styles} from './functions/styles';

export default class Jobs extends Component {
    constructor(props){
        super(props);
        this.state = {
            Jobs: [],
        };
    }

    componentDidMount(){
        let Job;
        firestore().collection('Jobs').doc('All').onSnapshot( j => {
            if (j.exists) {
                Job = [...j.data().all];
                AsyncStorage.getItem('user').then( u =>{
                    for (let x of Job) {
                        if (x.user === u) {
                            // eslint-disable-next-line no-shadow
                            firestore().collection('Users').doc(x.user).onSnapshot( u => {
                                x.profilePicture = u.data().profilePicture;
                                this.setState({Jobs: Job});
                            });
                        }
                    }
                });
            }
        });
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <View>
                    {
                        this.state.Jobs.map((item, i) => (
                            <Pressable key={`BtnJobsDetails-${item.key}${i}`} onPress={() => this.props.navigation.navigate('Job Details', { Details: item })}>
                                <Card>
                                    <ListItem>
                                        <Avatar
                                            rounded
                                            source={{ uri: item.profilePicture}}
                                        />
                                        <ListItem.Content>
                                            <ListItem.Title>{item.title}</ListItem.Title>
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

export class JobDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            Details: {},
        };
    }

    componentDidMount(){
        const { Details } = this.props.route.params;
        this.initializeDetails(Details);
    }

    initializeDetails(Details){
        this.setState({Details});
    }

    render(){
        return (
            <ScrollView style={[{backgroundColor: 'white'}]}>
                <View>
                    <View style={{margin: 20, padding: 10}}>
                        <Text style={{alignSelf: 'center', fontSize: 30}}>{this.state.Details.title}</Text>
                    </View>
                    <Divider />

                    <View style={[{padding: 30}, Styles.containerRow]}>
                        <View style={{ margin: 10 }}>
                            <Image source={require('./assets/img/company.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 20 }}>{this.state.Details.company}</Text>
                        </View>
                    </View>

                    <View style={[{padding: 30, paddingTop: 0}, Styles.containerRow]}>
                        <View style={{ margin: 10 }}>
                            <Image source={require('./assets/img/pin.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 20 }}>{this.state.Details.location}</Text>
                        </View>
                    </View>

                    <View style={[{padding: 30, paddingTop: 0}, Styles.containerRow]}>
                        <View style={{ margin: 10 }}>
                            <Image source={require('./assets/img/full-time-job.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 20 }}>{this.state.Details.type}</Text>
                        </View>
                    </View>
                    <View style={[{padding: 30, paddingTop: 0}, Styles.containerRow]}>
                        <View style={{ margin: 10 }}>
                            <Image source={require('./assets/img/increase.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 20 }}>{this.state.Details.experience} Years Experience</Text>
                        </View>
                    </View>
                    <View style={{ margin: 10, padding: 10 }}>
                        <Text style={{ fontSize: 20 }}>{this.state.Details.summary}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

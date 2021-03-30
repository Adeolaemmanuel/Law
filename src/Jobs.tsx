/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {JobProps, JobState, JobDetProps, JobDetState, JobAppProps, JobAppState} from './component/types';
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Pressable,
    Text,
    Image,
    BackHandler,
} from 'react-native';
import {
     Card,
     ListItem,
     Avatar,
     Divider,
     Button,
    } from 'react-native-elements';
import {Styles} from './component/styles';

export default class Jobs extends Component<JobProps, JobState> {
    constructor(props: any){
        super(props);
        this.state = {
            Jobs: [],
        };
    }

    ismounted: boolean = false;
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', ()=> {return true});
        this.ismounted = true;
        this.initializeJobs();
    }

    initializeJobs(){
        if (this.ismounted) {
            let Job: any;
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
    }

    componentWillUnmount(){
        this.ismounted = false;
    }

    render() {
        if (this.state.Jobs.length === 0) {
            return (
                <View style={[{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}, Styles.container]}>
                    <Text style={{ fontSize: 20}}>No Jobs Posted Yet</Text>
                    <Pressable onPress={()=> this.props.navigation.navigate('Post')}>
                        <Text style={{color: 'blue', margin: 5}}>Post Job</Text>
                    </Pressable>
                </View>
            );
        } else {
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
}


export class JobDetails extends Component<JobDetProps, JobDetState> {
    constructor(props: any){
        super(props);
        this.state = {
            Details: {},
        };
    }

    ismounted = false
    componentDidMount(){
        this.ismounted = true;
        this.initializeDetails();
    }

    componentWillUnmount(){
        this.ismounted = false;
    }

    initializeDetails(){
        const { Details } = this.props.route.params;
        if (this.ismounted) {
            this.setState({Details});
        }
    }

    render(){
        return (
            <ScrollView style={[{backgroundColor: 'white'}]}>
                <View>
                    <View style={{margin: 20, padding: 10}}>
                        <Text style={{alignSelf: 'center', fontSize: 30}}>{this.state.Details.title}</Text>
                    </View>

                    <Divider style={{width: '80%', alignSelf: 'center', backgroundColor: 'black'}} />

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

                    <Button
                        title="View Applied Users"
                        type="solid"
                        buttonStyle={{ height: 50, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }}
                        onPress={()=> this.props.navigation.navigate('Applied', {id: this.state.Details.id})}
                    />
                </View>
            </ScrollView>
        );
    }
}


export class Applied extends Component<JobAppProps, JobAppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            applied: [],
        };
    }

    ismounted: boolean = false;
    componentDidMount(){
        this.ismounted = true;
        this.initailizeApplied();
    }

    componentWillUnmount(){
        this.ismounted = false;
    }

    initailizeApplied(){
        const { id } = this.props.route.params;
        if (this.ismounted) {
            let apply = firestore().collection('Jobs');
            let applied;
            apply.doc('Applied').onSnapshot((a: any)=>{
                if (a.exists) {
                    applied = [...a.data().applied];
                    for (let x of applied) {
                        if (id === x.id) {
                            firestore().collection('Users').doc(x.appliedUser).get()
                            .then((u: any)=>{
                                if (u.exists) {
                                    x.profilePicture = u.data().profilePicture;
                                    x.name = `${u.data().firstname} ${u.data().lastname}`;
                                    x.country = u.data().country;
                                    x.state = u.data().state;
                                }
                                this.setState({applied: [x]});
                            });
                        }
                    }
                }
            });
        }
    }

    render(){
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <View>
                    {
                        this.state.applied.map((item,i)=>{
                            return (
                                <Pressable key={`BtnDetails-${i}`} onPress={() => this.props.navigation.navigate('Profile', { email: item.appliedUser })}>
                                    <Card>
                                        <ListItem>
                                            <Avatar
                                                rounded
                                                source={{ uri: item.profilePicture}}
                                            />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.name}</ListItem.Title>
                                                <ListItem.Subtitle>{item.country}, {item.state}</ListItem.Subtitle>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    </Card>
                                </Pressable>
                            );
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}

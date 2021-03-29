/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from './styles';
import { Image } from 'react-native-elements';
import {
    View,
    TextInput,
    Pressable,
} from 'react-native';

interface SearchProps {
    valueChange: any
    navigation: any
}

class SearchCenterHeaderModule extends Component<SearchProps> {

    constructor(props: any) {
        super(props);
    }

    changeText = (text: string) => {
        this.props.valueChange(text);
    }

    render() {
        return (
            <View style={[{ backgroundColor: 'white', elevation: 5, shadowColor: 'black', shadowOffset: { width: 15, height: 15 }, shadowOpacity: 1, }, Styles.containerRow]}>
                <Pressable onPress={() => this.props.navigation.goBack()}>
                    <Image style={{ flex: 1, width: 20, height: 20, padding: 10, margin: 10, marginTop: 23 }} source={require('../assets/img/left-arrow.png')} />
                </Pressable>
                <TextInput
                    placeholder="Search User..."
                    style={[{ fontSize: 20, padding: 10, margin: 10, flex: 2, backgroundColor: '#ebedf0', borderRadius: 2 }]}
                    onChangeText={text => this.changeText(text)}
                />
            </View>
        );
    }
}


const Follow = (follow: any, user: string,setState: any) => {
    AsyncStorage.getItem('user').then(e=>{
        follow.doc(user).collection('Admin').doc('Data').get().then((u: any)=>{

            if (u.exists) {
                let recieved = [...u.data().recieved];
                let index = recieved.indexOf(e);

                if (index !== -1) {
                    follow.doc(user).collection('Admin').doc('Data').update({
                        recieved: recieved,
                    }).then(()=>{
                        setState('followBtnText','Unfollow');
                    });
                } else {
                    recieved.unshift(e);
                    follow.doc(user).collection('Admin').doc('Data').update({
                        recieved: recieved,
                    }).then(()=>{
                        setState('followBtnText','Unfollow');
                    });
                }
            } else {
                follow.doc(user).collection('Admin').doc('Data').set({
                    recieved: [e],
                    sent: [],
                    confirmed: [],
                }).then(()=>{
                    setState('followBtnText','Unfollow');
                });
            }
        });

        follow.doc(e).collection('Admin').doc('Data').get().then((u: any)=>{
            if (u.exists) {
                let sent = [...u.data().sent];
                let index = sent.indexOf(user);
                if (index !== -1) {
                    follow.doc(e).collection('Admin').doc('Data').update({
                        sent: sent,
                    }).then(()=>{
                        setState('followBtnText','Unfollow');
                    });
                } else {
                    sent.unshift(user);
                    follow.doc(e).collection('Admin').doc('Data').update({
                        sent: sent,
                    }).then(()=>{
                        setState('followBtnText','Unfollow');
                    });
                }
            } else {
                follow.doc(e).collection('Admin').doc('Data').set({
                    sent: [user],
                    recieved: [],
                    confirmed: [],
                }).then(()=>{
                    setState('followBtnText','Unfollow');
                });
            }
        });
    });
};

const Unfollow = (follow: any, user: string,setState: any) => {
    AsyncStorage.getItem('user').then((e: any)=>{
        follow.doc(user).collection('Admin').doc('Data').get().then((u: any)=>{
            if (u.exists) {
                let recieved = [...u.data().recieved];
                let index = recieved.indexOf(e);
                if (index !== -1) {
                    let splice = recieved.splice(index, index + 1);
                    console.log(splice);
                    follow.doc(user).collection('Admin').doc('Data').update({
                        recieved: recieved,
                    }).then(()=>{
                        setState('followBtnText','Follow');
                    });
                }
            }
        });

        follow.doc(user).collection('Admin').doc('Data').get().then((u: any)=>{
            if (u.exists) {
                let confirmed = [...u.data().confirmed];
                let index = confirmed.indexOf(e);
                if (index !== -1) {
                    confirmed.splice(index, index + 1);
                    follow.doc(user).collection('Admin').doc('Data').update({
                        confirmed: confirmed,
                    }).then(()=>{
                        setState('followBtnText','Follow');
                    });
                }
            }
        });

        follow.doc(user).collection('Admin').doc('Data').get().then((u: any)=>{
            if (u.exists) {
                let recieved = [...u.data().recieved];
                let index = recieved.indexOf(e);
                if (index !== -1) {
                    let splice = recieved.splice(index, index + 1);
                    console.log(splice);
                    follow.doc(user).collection('Admin').doc('Data').update({
                        recieved: recieved,
                    }).then(()=>{
                        setState('followBtnText','Follow');
                    });
                }
            }
        });

        follow.doc(user).collection('Admin').doc('Data').get().then((u: any)=>{
            if (u.exists) {
                let confirmed = [...u.data().confirmed];
                let index = confirmed.indexOf(e);
                if (index !== -1) {
                    confirmed.splice(index, index + 1);
                    follow.doc(user).collection('Admin').doc('Data').update({
                        confirmed: confirmed,
                    }).then(()=>{
                        setState('followBtnText','Follow');
                    });
                }
            }
        });
    });
};

const followBack = (follow: any, user: string,setState: any) => {
    AsyncStorage.getItem('user').then((e: any)=>{
        follow.doc(e).collection('Admin').doc('Data').get().then((u: any)=>{

            if (u.exists) {
                let recieved: string[] = [...u.data().recieved];
                let sent: string[] = [...u.data().sent];
                let confirmed: string[] = [...u.data().confirmed];
                let indexSent: number = sent.indexOf(user);
                let indexRec: number = recieved.indexOf(user);

                if (indexRec !== -1) {
                    confirmed.push(recieved.splice(indexRec, indexRec + 1).toString());
                    follow.doc(e).collection('Admin').doc('Data').update({
                        recieved: recieved,
                    });

                    follow.doc(e).collection('Admin').doc('Data').update({
                        confirmed: confirmed,
                    }).then(()=>{
                        setState('followBtnText','Unfollow');
                    });
                }

                if (indexSent !== -1) {
                    confirmed.push(sent.splice(indexSent, indexSent + 1).toString());
                    follow.doc(e).collection('Admin').doc('Data').update({
                        sent: sent,
                    });

                    follow.doc(e).collection('Admin').doc('Data').update({
                        confirmed: confirmed,
                    }).then(()=>{
                        setState('followBtnText','Unfollow');
                    });
                }
            }
        });

        follow.doc(user).collection('Admin').doc('Data').get().then((u: any)=>{

            if (u.exists) {
                let recieved: string[] = [...u.data().recieved];
                let sent: string[] = [...u.data().sent];
                let confirmed: string[] = [...u.data().confirmed];
                let indexSent: number = sent.indexOf(e);
                let indexRec: number = recieved.indexOf(e);

                if (indexSent !== -1) {
                    confirmed.push(sent.splice(indexSent, indexSent + 1).toString());
                    follow.doc(user).collection('Admin').doc('Data').update({
                        sent: sent,
                    });

                    follow.doc(user).collection('Admin').doc('Data').update({
                        confirmed: confirmed,
                    }).then(()=>{
                        setState('followBtnText','Unfollow');
                    });
                }

                if (indexRec !== -1) {
                    confirmed.push(recieved.splice(indexRec, indexRec + 1).toString());
                    follow.doc(user).collection('Admin').doc('Data').update({
                        recieved: recieved,
                    });

                    follow.doc(user).collection('Admin').doc('Data').update({
                        confirmed: confirmed,
                    }).then(()=>{
                        setState('followBtnText','Unfollow');
                    });
                }
            }

        });
    });
};

const profileButtonHandlerModule = (type: string,user: string,setState: any) => {

    let follow = firestore().collection('Friends');

    if (type === 'Follow') {
        Follow(follow,user,setState);
    }
    else if (type === 'Unfollow') {
        Unfollow(follow,user,setState);
    }
    else if (type === 'Follow Back') {
        followBack(Follow,user,setState);
    }
};

const sentRequest = (database: any,user: string,setState: any) => {

    AsyncStorage.getItem('user').then(e=>{
        database.doc(user).collection('Admin').doc('Data').get().then((u: any)=>{
            if (u.exists) {
                let sent = [...u.data().sent];
                for (let  x of sent) {
                    if (x === e) {
                        setState('followBtnText','Follow Back');
                        return {
                            valid: true,
                        };
                    }
                }
            }
        });
    });

};

const recievedRequest = (database: any,user: string,setState: any) => {

    AsyncStorage.getItem('user').then((e: any) => {
        database.doc(user).collection('Admin').doc('Data').get().then((u: any) =>{
            if (u.exists && e) {
                let recieved = [...u.data().recieved];
                setState('followers', recieved.length);
            }
        });
    });

};

const confirmedRequest = (database: any, user: string, setState: any) => {
    AsyncStorage.getItem('user').then((e: any)=>{
        database.doc(user).collection('Admin').doc('Data').get().then((u: any) =>{
            if (u.exists) {
                let confirmed = [...u.data().confirmed];
                for (let  x of confirmed) {
                    //console.log(user);
                    if (x === e) {
                        setState('followBtnText','Unfollow');
                        return {
                            valid: true,
                        };
                    }
                }
            }
        });
    });
};

const getLawyers = (Admin: any, User: any, setState: any) => {
    Admin.doc('Users').onSnapshot((email: any) => {
        let emails: Array<string> = [];
        if (email.exists) {
            emails = [...email._data.email];
            let lawyers: any[] = [];
            AsyncStorage.getItem('user').then(e=>{
                for (let x of emails) {
                    if ( x !== e) {
                        User.doc(x).get().then((lawyer: any) => {
                            if (lawyer.exists) {

                                let profilePic = lawyer.data().profilePicture;
                                if (lawyer.gender === 'Male' && profilePic === undefined) {
                                    profilePic = require('../assets/img/profileM.png');
                                } else if (lawyer.gender === 'Female' && profilePic === undefined) {
                                    profilePic = require('../assets/img/profileW.png');
                                }

                                lawyers.push({
                                    name: `${lawyer.data().firstname} ${lawyer.data().lastname}`,
                                    key: `${Math.ceil(Math.random() * 19)}${Math.ceil(Math.random() * 19)}${Math.ceil(Math.random() * 19)}${Math.ceil(Math.random() * 19)}${Math.ceil(Math.random() * 19)}`,
                                    profilePicture: profilePic,
                                    email: lawyer.data().email,
                                    location: `${lawyer.data().country}, ${lawyer.data().state}`,
                                });
                                setState(lawyers);
                            }
                        });
                    }
                }
            });
        }
    });
};



export {
    SearchCenterHeaderModule,
    profileButtonHandlerModule,
    sentRequest,
    recievedRequest,
    confirmedRequest,
    Follow,
    Unfollow,
    followBack,
    getLawyers,
};

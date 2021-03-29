/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from './styles';
import { Image } from 'react-native-elements';
import { View, TextInput, Text, Pressable } from 'react-native';

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

const profileButtonHandlerModule = (type: string,user: string,setState: any) => {

    let follow = firestore().collection('Friends');

    if (type === 'Follow') {
        AsyncStorage.getItem('user').then(e=>{
            follow.doc(user).collection('Admin').doc('Data').get().then(u=>{

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

            follow.doc(e).collection('Admin').doc('Data').get().then(u=>{
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
    }
    else if (type === 'Unfollow') {
        AsyncStorage.getItem('user').then(e=>{
            follow.doc(user).collection('Admin').doc('Data').get().then(u=>{
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

            follow.doc(user).collection('Admin').doc('Data').get().then(u=>{
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

            follow.doc(user).collection('Admin').doc('Data').get().then(u=>{
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

            follow.doc(user).collection('Admin').doc('Data').get().then(u=>{
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
    }
    else if (type === 'Follow Back') {
        AsyncStorage.getItem('user').then(e=>{
            follow.doc(e).collection('Admin').doc('Data').get().then(u=>{

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

            follow.doc(user).collection('Admin').doc('Data').get().then(u=>{

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
    }
};

const sentRequest = (database: any,user: string,setState: any) => {

    AsyncStorage.getItem('user').then(e=>{
        database.doc(user).collection('Admin').doc('Data').get().then(u=>{
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

    AsyncStorage.getItem('user').then(e=>{
        database.doc(user).collection('Admin').doc('Data').get().then( u =>{
            if (u.exists) {
                let recieved = [...u.data().recieved];
                setState('followers', recieved.length);
            }
        });
    });

};

const confirmedRequest = (database: any,user: string,setState: any) => {
    AsyncStorage.getItem('user').then(e=>{
        database.doc(user).collection('Admin').doc('Data').get().then( u =>{
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
}


export {
    SearchCenterHeaderModule,
    profileButtonHandlerModule,
    sentRequest,
    recievedRequest,
    confirmedRequest
};
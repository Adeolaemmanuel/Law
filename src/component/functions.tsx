/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS} from 'react-native-permissions';
import { Styles } from './styles';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Geocoder from 'react-native-geocoding';
import { Image } from 'react-native-elements';
import {
    View,
    TextInput,
    Pressable,
    ToastAndroid,
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

const geoLocation = (setState: any) => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
        if (result === 'granted') {
            Geolocation.getCurrentPosition(
                (position) => {
                    Geocoder.init('AIzaSyD8LIhgvlYbX89FYSOLfM-z8MkuIwoUeYE');
                    Geocoder.from({ latitude: position.coords.latitude, longitude: position.coords.longitude  })
                        .then(json => {
                            var addressComponent = json.results[0].address_components;
                            setState('addressComponent', addressComponent);
                            setState('result', result);
                        })
                        .catch(error => console.warn(error));
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );

        } else {
            PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        }
      });
};

const Follow = (follow: any, user: string,setState: any) => {
    AsyncStorage.getItem('user').then((e: any)=>{
        //user refers to friend
        follow.doc(user).collection('Admin').doc('Data').get().then((u: any)=>{

            if (u.exists) {
                let recieved: string[] = [...u.data().recieved];
                let index: number = recieved.indexOf(e);

                if (index !== 1) {
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
                let sent: string[] = [...u.data().sent];
                let index: number = sent.indexOf(user);
                if (index !== 1) {
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

const Unfollow = (unfollow: any, user: string,setState: any) => {
    //user refers to friend
    AsyncStorage.getItem('user').then((e: any)=>{
        unfollow.doc(e).collection('Admin').doc('Data').get().then((u: any)=>{
            if (u.exists) {
                let recieved: string[] = [...u.data().recieved];
                let confirmed: string[] = [...u.data().confirmed];
                let indexR: number = recieved.indexOf(user);
                let indexC: number = confirmed.indexOf(user);

                if (indexR !== -1) {
                    let splice = recieved.splice(indexR, indexR + 1);
                    console.log(splice);
                    unfollow.doc(e).collection('Admin').doc('Data').update({
                        recieved: recieved,
                    }).then(()=>{
                        setState('followBtnText','Follow');
                    });
                }

                if (indexC !== -1) {
                    let splice = confirmed.splice(indexC, indexC + 1);
                    console.log(splice);
                    unfollow.doc(e).collection('Admin').doc('Data').update({
                        confirmed: confirmed,
                    }).then(()=>{
                        setState('followBtnText','Follow');
                    });
                }
            }
        });

        unfollow.doc(user).collection('Admin').doc('Data').get().then((u: any)=>{
            if (u.exists) {
                let recieved: string[] = [...u.data().recieved];
                let confirmed: string[] = [...u.data().confirmed];
                let indexR: number = recieved.indexOf(e);
                let indexC: number = confirmed.indexOf(e);

                if (indexC !== -1) {
                    confirmed.splice(indexC, indexC + 1);
                    unfollow.doc(user).collection('Admin').doc('Data').update({
                        confirmed: confirmed,
                    }).then(()=>{
                        setState('followBtnText','Follow');
                    });
                }

                if (indexR !== -1) {
                    let splice = recieved.splice(indexR, indexR + 1);
                    console.log(splice);
                    unfollow.doc(user).collection('Admin').doc('Data').update({
                        recieved: recieved,
                    }).then(()=>{
                        setState('followBtnText','Follow');
                    });
                }
            }
        });
    });
};

const followBack = (follow: any, user: string,setState: any) => {
    //user refairs to friend
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
                        confirmed: confirmed,
                    }).then(()=>{
                        setState('followBtnText','Unfollow');
                    });
                }

                if (indexSent !== -1) {
                    confirmed.push(sent.splice(indexSent, indexSent + 1).toString());
                    follow.doc(e).collection('Admin').doc('Data').update({
                        sent: sent,
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
        followBack(follow,user,setState);
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

const meStatitics = (setState: any, type: string, you: boolean = true, friends: boolean = true) => {
    AsyncStorage.getItem('user').then((e: any) => {

        firestore().collection('Friends').doc(e).collection('Admin').doc('Data').onSnapshot((s: any) => {
            if (s.exists && you){
                let confirmedMe: any = [...s.data().confirmed];
                let sentMe: any = [...s.data().sent];
                let recievedMe: any = [...s.data().recieved];
                switch (type) {
                    case 'confirmed':
                        setState('following', confirmedMe.length);
                        break;
                    case 'recieved':
                        setState('recieved', recievedMe.length);
                        break;
                    case 'sent':
                        setState('sent', sentMe.length);
                        break;
                    default:
                        return false;
                }
            }
        });

        firestore().collection('Admin').doc('Users').onSnapshot((s: any) => {
            if (s.exists && friends) {
                let emails: any = [...s.data().email];
                let followers: any = [];
                for (let x of emails) {
                    firestore().collection('Friends').doc(x).collection('Admin').doc('Data').onSnapshot((f: any) => {
                        if (f.exists) {
                            let sent: any[] = [...f.data().sent];
                            let confirmed: any[] = [...f.data().confirmed];
                            if (sent.indexOf(e) !== -1){
                                followers.push(followers.length + 1);
                                setState('followers', followers.length);
                            }

                            if (confirmed.indexOf(e) !== -1){
                                followers.push(followers.length + 1);
                                setState('followers', followers.length);
                            }
                        }
                    });
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
                                if (lawyer.data().type === 'Lawyer') {

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
                            }
                        });
                    }
                }
            });
        }
    });
};

const upload = (setState: any) => {
    launchImageLibrary('photo', img => {
        let profilePic: any = img.uri;
        setState('profilePic', profilePic);
        let user = firestore().collection('Users');

        AsyncStorage.getItem('user').then((d: any) => {
            if (d != null) {
                const reference = storage().ref(`${d}/profile`);
                reference.putFile(profilePic).then(() => {
                    reference.getDownloadURL().then(i => {
                        user.doc(d).update({
                            profilePicture: i,
                        }).then(() => {
                            ToastAndroid.show('Profile Picture Updated', ToastAndroid.TOP);
                        });
                    });

                });
            }
        });
    });
};

const getFeeds = (setState: any) => {
    let Feed: any;
    firestore().collection('Jobs').doc('All').onSnapshot( (j: any) => {
        if (j.exists) {
            Feed = [...j.data().all];
            for (let x of Feed) {
                firestore().collection('Users').doc(x.user).onSnapshot( (u: any) => {
                    x.profilePicture = u.data().profilePicture;
                    setState('Feed', Feed);
                });
            }
        }
    });
};

const apply = (setState: any, job: any) => {
    let jobs: any = {...job};
    let applied;
    firestore().collection('Jobs').doc('Applied').get().then((e: any)=>{
      if (e.exists) {
        if (jobs.jobOwner !== jobs.appliedUser) {
          console.log('yes');
          applied = [...e.data().applied];
          applied.push(jobs);
          firestore().collection('Jobs').doc('Applied').update({applied: applied}).then((res: any)=>{
            console.log(res);
            setState('btnText', 'APPLIED');
            setState('disableBtn', true);
          });
        }
      } else {
        firestore().collection('Jobs').doc('Applied').set({applied: [jobs]}).then((res: any)=>{
          console.log(res);
            setState('btnText', 'APPLIED');
            setState('disableBtn', true);
        });
      }
    });
};

const postJob = (data: any, toastMessage: string) => {
    let Jobs = firestore().collection('Jobs');
    console.log(data);
    for (let x in data) {
        if (data[x] != null) {
            Jobs.doc('All').get().then((e: any) => {
                if (e.exists) {
                    let jobs = [...e.data().all];
                    data.id = jobs[jobs.length - 1].id + 1;
                    jobs.unshift(data);
                    Jobs.doc('All').update({
                        all: jobs,
                    }).then(()=>{
                        ToastAndroid.show(toastMessage, ToastAndroid.TOP);
                        data[x] = null;
                    });
                } else {
                    Jobs.doc('All').set({all: [data]}).then(()=>{
                        ToastAndroid.show(toastMessage, ToastAndroid.TOP);
                        data[x] = null;
                    });
                }
            });
        }
    }
};

const applied = (setState: any,user: string) => {
    let jobs = firestore().collection('Jobs');
    jobs.doc('Applied').get().then((a: any)=>{
      if (a.exists) {
        let applyed = [...a.data().applied];
        for (let x of applyed) {
          if (x.appliedUser === user) {
            setState('btnText', 'APPLIED');
            setState('disableBtn', true);
          }
        }
      }
    });
};

const login = (data: any, navigate: any) => {
    firestore().collection('Users').doc(data.email).get().then( (u: any) => {
        if (u.exists) {
            if (data.email === u.data().email && data.password === u.data().password) {
                if (u.data().type === 'User') {
                    AsyncStorage.setItem('user', data.email);
                    AsyncStorage.setItem('type', u.data().type);
                    navigate('User Dash');
                } else if (u.data().type === 'Lawyer') {
                    AsyncStorage.setItem('user', data.email);
                    AsyncStorage.setItem('type', u.data().type);
                    navigate('Drawer');
                }
            } else {
                ToastAndroid.showWithGravityAndOffset('Wrong Email/Password', 2000, ToastAndroid.TOP,10,10);
            }
        } else {
            ToastAndroid.showWithGravityAndOffset('User Dosen\'t Exist', 2000, ToastAndroid.TOP,10,10);
        }
    });
};

const register = (datas: any, navigate: any, route: string) => {
    let data = {...datas};
    let users: any[] = [];
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    firestore().collection('Admin').doc('Users').get().then((u: any) => {
        if (u.exists) {
            users = [...u.data().email];
            if (users.indexOf(data.email) === -1) {
                users.push(data.email);
                firestore().collection('Admin').doc('Users').update({
                    email: users,
                });
                firestore().collection('Users').doc(data.email).set(data).then(()=>{
                    AsyncStorage.setItem('user', data.email);
                    AsyncStorage.setItem('type', data.type);
                    navigate(route);
                });
            } else if (users.indexOf(data.email) !== -1) {
                ToastAndroid.showWithGravity('User alread exist', 2000, ToastAndroid.TOP);
            }
        }
    });
};


const messageHandler = (user: string, navigate: any) => {
    AsyncStorage.getItem('user').then((me: any)=>{
        let key = `${me}||${user}`;
        firestore().collection('Admin').doc('Messages').get()
        .then((k: any)=> {
            if (k.exists) {
                let keys = [...k.data().keys];
                if (keys.length !== 0) {
                    keys.forEach((val: any,ind: number,arr: any[])=>{
                        if (val.key === `${me}||${user}` || val.key === `${user}||${me}`) {
                            navigate('Chat',{pram: val.key});
                        } else {
                            keys.unshift({key: key, user1: user, user2: me});
                            firestore().collection('Admin').doc('Messages').update({keys: keys});
                            firestore().collection('Messages').doc(me).get()
                            .then((u: any) =>{
                                if (u.exists) {
                                    let keyU = [...u.data().keys];
                                    keyU.unshift({key: key, user: user});
                                    firestore().collection('Messages').doc(me).update({keys: keyU});
                                } else {
                                    firestore().collection('Messages').doc(me).set({keys: [{key: key, user: user}]});
                                }
                            });
                            firestore().collection('Messages').doc(user).get()
                            .then((u: any) =>{
                                if (u.exists) {
                                    let keyU = [...u.data().keys];
                                    keyU.unshift({key: key, user: me});
                                    firestore().collection('Messages').doc(me).update({keys: keyU});
                                    firestore().collection('Messages').doc(user).update({keys: keys});
                                } else {
                                    firestore().collection('Messages').doc(user).set({keys: [{key: key, user: user}]});
                                }
                            });
                            navigate('Chat',{pram: val.key});
                        }
                    });
                }
            } else {
                firestore().collection('Admin').doc('Messages').set({keys: [{key: key, user1: user, user2: me}]});
                firestore().collection('Messages').doc(me).set({keys: [{user: user, key: key}]});
                firestore().collection('Messages').doc(user).set({keys: [{user: me, key: key}]});
                navigate('Chat',{pram: key});
            }
        });
    });
};

const chat = (chats: any, key: string) => {
    firestore().collection('Messages').doc('Admin').collection('Chat').doc(key).get()
    .then((me: any) => {
        if (me.exists) {
            let messages = [...me.data().message];
            messages.unshift(chats[0]);
            firestore().collection('Messages').doc('Admin').collection('Chat').doc(key)
            .update({message: messages});
        } else {
            firestore().collection('Messages').doc('Admin').collection('Chat').doc(key)
            .set({message: chats});
        }
    });
};

const getChat = (key: string, callback: any) => {
    console.log('====================================');
    console.log(key);
    console.log('====================================');
    firestore().collection('Messages').doc('Admin').collection('Chat').doc(key)
    .onSnapshot((chats: any) => {
        if (chats.exists) {
            let messages = [...chats.data().message];
            console.log('====================================> clalback');
            console.log(messages);
            console.log('====================================');
            callback(messages);
        }
    });
};

const getMessages = (callback: any) => {
    AsyncStorage.getItem('user').then((me: any) => {
        firestore().collection('Messages').doc(me).onSnapshot((c: any) => {
            if ( c.exists) {
                let contact = [...c.data().keys];
                contact.forEach((val: any) => {
                    console.log('====================================');
                    console.log(val);
                    console.log('====================================');
                    firestore().collection('Users').doc(val.user).get()
                    .then((k: any) => {
                        val.name = `${k.data().firstname} ${k.data().lastname}`;
                        val.disabled = false;
                        callback(contact);
                    });
                });
            } else {
                callback([{name: 'No message yet', disabled: true}]);
            }
        });
    });
};








/**
 * Quick Tools:
 * 1.) set State
 *  setHandlerState = (state: string, data: string) => {
        this.setState({[state]: data});
    }
 */


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
    upload,
    getFeeds,
    geoLocation,
    applied,
    apply,
    postJob,
    meStatitics,
    login,
    register,
    messageHandler,
    chat,
    getChat,
    getMessages,
};
    //Debug: SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
    //DebugTest: SHA1: 5E: 8F: 16: 06: 2E: A3: CD: 2C: 4A: 0D: 54: 78: 76: BA: A6: F3: 8C: AB: F6: 25;

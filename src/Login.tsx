/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Styles } from './component/styles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    TextInput,
    ToastAndroid,
 } from 'react-native';
import { Button } from 'react-native-elements';


interface LoginProps {
    navigation: any
}

interface LoginState {
    email: string
    password: string
}
export default class Login extends Component<LoginProps, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    ismounted = false
    componentDidMount(){
        this.ismounted = true;
        if (this.ismounted) {
            AsyncStorage.getItem('user', (u: any) =>{
                if (u) {
                    this.props.navigation.navigate('Drawer')
                }
            });
        }
    }

    Admin = firestore().collection('Admin');
    Users = firestore().collection('Users');
    Login = (data: any) => {
        console.log(data);
        this.Users.doc(data.email).get().then( (u: any) => {
            if (u.exists) {
                if (data.email === u.data().email && data.password === u.data().password) {
                    AsyncStorage.setItem('user', data.email);
                    this.props.navigation.push('Drawer');
                } else {
                    ToastAndroid.show('Wrong Email/Password', ToastAndroid.TOP);
                }
            }
        });
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.conSize}>
                    <Text style={Styles.nameText}>LAW</Text>
                </View>
                <View>
                    <TextInput style={Styles.input}
                        placeholder="Email Address:"
                        keyboardType="email-address"
                        onChangeText={
                            email => {
                                this.setState({ email });
                            }
                        }
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={Styles.input}
                        placeholder="Password:"
                        onChangeText={
                            password => {
                                this.setState({ password });
                            }
                        }
                       />
                </View>
                <Button
                    title="Login"
                    type="solid"
                    buttonStyle={{ height: 70, margin: 15, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20 }}
                    onPress={() => this.Login({ ...this.state})}
                />
                <View>
                    <Text style={Styles.or}>OR</Text>
                </View>
                <Button
                    title="Register"
                    type="solid"
                    buttonStyle={{ height: 70, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22' }}
                    onPress={() => this.props.navigation.navigate('Register')}
                />

            </View>
        );
    }
}

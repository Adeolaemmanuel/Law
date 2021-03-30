/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Styles } from './component/styles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as fn from './component/functions';
import {
    View,
    Text,
    TextInput,
 } from 'react-native';
import { Button } from 'react-native-elements';


interface LoginProps {
    navigation: any
}

interface LoginState {
    email: string
    password: string
    type: boolean
}
export default class Login extends Component<LoginProps, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            type: true,
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

    type = () => {
        if (this.state.type === true) {
            let type: boolean = false;
            this.setState({type});
        } else {
            let type: boolean = true;
            this.setState({type});
        }
    }

    callback = () => {
        this.props.navigation.push('Drawer');
    }

    users = () => {
        if (this.state.type) {
            return (
                <View style={[Styles.containerPaddingMargin]}>
                    <View style={{marginTop: 40, marginBottom: 40}}>
                        <Text style={Styles.nameText}>LAW</Text>
                    </View>

                    <View style={{height: 80}}>
                        <TextInput
                            style={[{height: 80}, Styles.cardC]}
                            placeholder="Email Address:"
                            keyboardType="email-address"
                            onChangeText={
                                email => {
                                    this.setState({ email });
                                }
                            }
                        />
                    </View>
                    <View style={{height: 80}}>
                        <TextInput
                            secureTextEntry={true}
                            style={[{height: 80 }, Styles.cardC]}
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
                        buttonStyle={{ height: 60, margin: 15, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, borderRadius: 10 }}
                        onPress={() => fn.login({ ...this.state}, this.callback)}
                    />
                    <View>
                        <Text style={Styles.or}>OR</Text>
                    </View>
                    <Button
                        title="Register"
                        type="solid"
                        buttonStyle={{ height: 60, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', borderRadius: 10 }}
                        onPress={this.type}
                    />
                </View>
            );
        } else {
            return (
                <View style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
                    <Button
                        title="Lawyers"
                        type="solid"
                        buttonStyle={{ height: 60, margin: 15, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, borderRadius: 10 }}
                        onPress={() => this.props.navigation.navigate('Register')}
                    />
                    <Button
                        title="Users"
                        type="solid"
                        buttonStyle={{ height: 60, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', borderRadius: 10 }}
                        onPress={() => this.props.navigation.navigate('Signup')}
                    />
                    <View>
                        <Text style={Styles.or}>OR</Text>
                    </View>
                    <Button
                        title="Login"
                        type="solid"
                        buttonStyle={{ height: 60, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', borderRadius: 10 }}
                        onPress={this.type}
                    />
                </View>
            );
        }
    }

    render() {
        return (
            this.users()
        );
    }
}

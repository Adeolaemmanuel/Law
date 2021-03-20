import React, { Component } from 'react';
import { View, Stylesheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Styles } from './functions/styles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null
        };
    }


    Admin = firestore().collection('Admin')
    Users = firestore().collection('Users')
    Login = (data) => {
        console.log(data)
        this.Users.doc(data.email).get().then(u => {
            if (u.exists) {
                if (data.email === u.data().email && data.password === u.data().password) {
                    AsyncStorage.setItem('user', data.email)
                    this.props.navigation.push('Drawer')
                }
            }
        })
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
                                this.setState({ email })
                            }
                        }
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={Styles.input}
                        placeholder="Password:"
                        onChangeText={
                            password => {
                                this.setState({ password })
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

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Component } from 'react';
import { Styles } from './component/styles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as fn from './component/functions';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Image,
    ScrollView
 } from 'react-native';
import { Button } from 'react-native-elements';


interface LoginProps {
    navigation: any
}

interface LoginState {
    data: any
    type: boolean
}
export default class Login extends Component<LoginProps, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: {
                email: '',
                password: '',
            },
            type: true,
        };
    }

    ismounted = false
    componentDidMount(){
        this.ismounted = true;
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
                                    let data = {...this.state.data};
                                    data.email = email;
                                    this.setState({ data });
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
                                    let data = {...this.state.data};
                                    data.password = password;
                                    this.setState({ data });
                                }
                            }
                        />
                    </View>
                    <Button
                        title="Login"
                        type="solid"
                        buttonStyle={{ height: 60, margin: 15, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, borderRadius: 10 }}
                        onPress={() => fn.login(this.state.data, this.props.navigation.navigate)}
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
                <ScrollView style={{backgroundColor: 'white'}}>
                    <View style={{justifyContent: 'center', alignContent: 'center', flex: 1, flexDirection: 'row'}}>
                        <View style={{width: (Dimensions.get('screen').width - 30) / 2, height: 160, padding: 5, margin: 7, marginTop: 0, paddingTop: 0}}>
                            <TouchableOpacity  style={Styles.nav} onPress={()=> this.props.navigation.push(`${'Register'}`)}>
                                <Image style={{width: 80, height: 80, alignSelf: 'center'}} source={require('./assets/img/lawyer.png')} />
                                <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', padding: 6}}>LAWYERS</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: (Dimensions.get('screen').width - 30) / 2, height: 160, padding: 5, margin: 7, marginTop: 0, paddingTop: 0}}>
                            <TouchableOpacity  style={Styles.nav} onPress={()=> this.props.navigation.push(`${'Signup'}`)}>
                                <Image style={{width: 80, height: 80, alignSelf: 'center'}} source={require('./assets/img/user.png')} />
                                <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', padding: 6}}>USERS</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={Styles.or}>OR</Text>
                    </View>
                    <Button
                        title="Login"
                        type="solid"
                        buttonStyle={{ height: 60, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', borderRadius: 10 }}
                        onPress={this.type}
                    />
                </ScrollView>
            );
        }
    }

    render() {
        return (
            this.users()
        );
    }
}

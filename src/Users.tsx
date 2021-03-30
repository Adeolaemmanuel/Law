/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { Component } from 'react';
import { Styles } from './component/styles';
import * as fn from './component/functions';
import {
    View,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import {
    Button,
} from 'react-native-elements';



export default class Users extends Component {
    constructor(props: any) {
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <View>

            </View>
        );
    }
}


export class Signup extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            User: {firstname: '', lastname: '', email: '', number: '', password: '', type: 'User'},
        };
    }

    callback = () => {
        this.props.navigation.navigate('Drawer');
    }

    render(){
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <KeyboardAvoidingView>
                    <View style={[{marginTop: 50}, Styles.containerPaddingMargin]}>
                        <View style={Styles.containerRow}>
                            <TextInput
                                style={[{height: 70 }, Styles.cardC]}
                                placeholder="First Name"
                                onChangeText={(text: string) => {
                                    let User = {... this.state.User};
                                    User.firstname = text;
                                    this.setState({User})
                                }}
                            />
                            <TextInput
                                style={[{height: 70 }, Styles.cardC]}
                                placeholder="Last Name"
                                onChangeText={(text: string) => {
                                    let User = {... this.state.User};
                                    User.lastname = text;
                                    this.setState({User});
                                }}
                            />
                        </View>
                        <View style={{height: 80 }}>
                            <TextInput
                                style={[{height: 80 }, Styles.cardC]}
                                placeholder="Email"
                                onChangeText={(text: string) => {
                                    let User = {... this.state.User}
                                    User.email = text;
                                    this.setState({User});
                                }}
                            />
                        </View>
                        <View style={{height: 80 }}>
                            <TextInput
                                style={[{height: 80 }, Styles.cardC]}
                                placeholder="Phone Number"
                                onChangeText={(text: string) => {
                                    let User = {... this.state.User}
                                    User.nymber = text;
                                    this.setState({User});
                                }}
                            />
                        </View>
                        <View style={{height: 80 }}>
                            <TextInput
                                style={[{height: 80 }, Styles.cardC]}
                                placeholder="Password"
                                secureTextEntry={true}
                                onChangeText={(text: string) => {
                                    let User = {... this.state.User}
                                    User.password = text;
                                    this.setState({User});
                                }}
                            />
                        </View>
                        <Button
                            title="Register"
                            type="solid"
                            buttonStyle={{ height: 60, margin: 15, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 25, borderRadius: 10 }}
                            onPress={() => fn.register({ ...this.state}, this.callback)}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

export class DashUser extends Component {


    render(){
        return (
            <View></View>
        );
    }
}

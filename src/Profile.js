import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, BackHandler, Image } from 'react-native';
import { NavigationAction } from '@react-navigation/native';
import { Styles } from './functions/styles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => { return true });

        AsyncStorage.getItem('user').then(res => {
            let user = firestore().collection('Users');

        })
    }


  render() {
    return (
      <>
        <View style={Styles.container}>
          <View style={Styles.profileIamge}>
            <Text>Image</Text>
         </View>

          <View style={Styles.profileDetails}>
            <TouchableOpacity style={Styles.loginBtn}>
              <Text  style={Styles.loginText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.loginBtn}>
              <Text  style={Styles.loginText}>Deposit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={Styles.body}>
            <Text style={Styles.heading}>ABOUT</Text>
            <View style={Styles.profileDetails}>
                    <View>
                        <View>
                            <Image source={require('./assets/img/user2.png')} />
                        </View>
                </View>
            </View>
        </View>
      </>
    );
  }
}

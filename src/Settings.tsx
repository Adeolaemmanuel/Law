/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from './component/styles';
import {
    ScrollView,
    View,
    Image,
    Pressable,
} from 'react-native';


interface SettingsProps {
    navigation: any
}

interface SettingsState {
    Nav: any
}

export default class Settings extends Component<SettingsProps, SettingsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            Nav: [
                {name: 'Setings', link: 'Settings', img: require('./assets/img/logout.png'), style: {height: 150, width: 70, padding: 10, margin: 10}, imgStyle: {width: 70, height: 70}, action: this.logout},
            ],
        };
    }

    logout = () => {
        AsyncStorage.setItem('user', 'null');
        this.props.navigation.navigate('Home');
    }

    render(){
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <View style={[Styles.containerRow]}>
                    {
                        this.state.Nav.map((nav: any,ind: number)=>{
                            return (
                                <View key={`Settings-${ind}`} style={nav.style}>
                                    <Pressable onPress={nav.action}>
                                        <Image source={nav.img} style={nav.imgStyle} />
                                    </Pressable>
                                </View>
                            );
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}
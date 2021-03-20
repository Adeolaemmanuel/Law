import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Functions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: false,
        }
    }

    setStorage = async (name,value) => {
        try {
            await AsyncStorage.setItem(name, value);
        } catch (e) {
            // save error
            console.log(e)
        }
    }

    clearAll = async () => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            // clear error
        }
    }


    getStorage = async (name) => {
        try {
            let value = await AsyncStorage.getItem(name);
            console.log(value)
            if (value === 'true') {
                return true;
            } else if (value === null) {
                return false;
            }
        } catch (e) {
            // read error
            console.log(e)
        }
    }


}

const fn = new Functions;
export { fn };
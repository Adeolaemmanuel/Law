/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity, 
    Image, 
    BackHandler, 
    Dimensions 
} from 'react-native';
import {
    Card,
 } from 'react-native-elements';
import Jobs from './assets/img/businessman.png';
import Lawyer from './assets/img/lawyer.png';
import LawBook from './assets/img/law-book.png';
import Calender from './assets/img/schedule.png';
import Post from './assets/img/sticky-notes.png';
import Blog from './assets/img/blog.png';
import { Styles } from './functions/styles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            Nav: [
                {name: 'Jobs', image: require('./assets/img/businessman.png'), route: 'Jobs' },
                {name: 'Post Jobs', image: require('./assets/img/sticky-notes.png'), route: 'Post' },
                {name: 'Calendar', image: require('./assets/img/schedule.png'), route: 'Calender' },
                {name: 'Lawyer', image: require('./assets/img/lawyer.png'), route: 'Lawyers' },
                {name: 'Law', image: require('./assets/img/law-book.png'), route: 'Law' },
                {name: 'Blog', image: require('./assets/img/blog.png'), route: 'Blog' },
            ],
        };
    }

    componentDidMount() {

        BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                return true;
            }
        );

        const user = firestore().collection('Users')

        AsyncStorage.getItem('user').then(u => {
            user.doc(u).onSnapshot(e => {
                let name = `Welcome! ${e.data().firstname} ${e.data().lastname}`;
                let email = e.data().email;
                this.setState({ name });
            });
        });
    }


    render() {
        return (
            <ScrollView>
                <View style={[{backgroundColor: 'white'}, Styles.container]}>
                    <Card>
                        <View style={Styles.container}>
                            <View>
                                <Text style={{ alignSelf: 'center', fontSize: 20 }}>{this.state.name}</Text>
                            </View>
                        </View>
                    </Card>
                    <View style={[{backgroundColor: 'white'}, Styles.containerRow]}>
                        {
                            this.state.Nav.map((arr,ind)=>{
                                return (
                                    <View key={`dashboard-${ind}`} style={{width: (Dimensions.get('screen').width - 30) / 2, height: 160, padding: 5, margin: 7, marginTop: 0, paddingTop: 0}}>
                                        <TouchableOpacity  style={Styles.nav} onPress={()=> this.props.navigation.navigate(`${arr.route}`)}>
                                        <Image style={Styles.image} source={arr.image} />
                                        <Text style={Styles.navText}>{arr.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        );
    }
}

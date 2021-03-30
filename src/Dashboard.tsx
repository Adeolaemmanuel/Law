/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Styles } from './component/styles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DashProps, DashState } from './component/types';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    BackHandler,
    Dimensions,
} from 'react-native';
import {
    Card,
 } from 'react-native-elements';





export default class Dashboard extends Component<DashProps, DashState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            Nav: [
                {name: 'Jobs', image: require('./assets/img/businessman.png'), route: 'Jobs' },
                {name: 'Post Jobs', image: require('./assets/img/sticky-notes.png'), route: 'Post' },
                {name: 'Agenda', image: require('./assets/img/schedule.png'), route: 'Agenda' },
                {name: 'Lawyer', image: require('./assets/img/lawyer.png'), route: 'Lawyers' },
                {name: 'Law', image: require('./assets/img/law-book.png'), route: 'Law' },
                {name: 'Blog', image: require('./assets/img/blog.png'), route: 'Blog' },
            ],
        };
    }

    componentDidMount() {
        this.ismounted = true;
        this.initializeDash();
    }

    ismounted = false;
    componentWillUnmount(){
        this.ismounted = false;
    }

    initializeDash(){
        if (this.ismounted) {
            BackHandler.addEventListener(
                'hardwareBackPress',
                () => {
                    return true;
                }
            );

            const user = firestore().collection('Users');

            AsyncStorage.getItem('user').then((u: any) => {
                if (u){
                    user.doc(u).onSnapshot((e: any) => {
                        if (e.exists) {
                            let name = `Welcome! ${e.data().firstname} ${e.data().lastname}`;
                            //let email = e.data().email;
                            this.setState({ name });
                        }
                    });
                }
            });
        }
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
                            this.state.Nav.map((arr: any,ind: number)=>{
                                return (
                                    <View key={`dashboard-${ind}`} style={{width: (Dimensions.get('screen').width - 30) / 2, height: 160, padding: 5, margin: 7, marginTop: 0, paddingTop: 0}}>
                                        <TouchableOpacity  style={Styles.nav} onPress={()=> this.props.navigation.push(`${arr.route}`)}>
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

import React, { Component } from 'react';
import { View, Text, Stylesheet, ScrollView, TouchableOpacity, Image, BackHandler, } from 'react-native';
import { Card } from 'react-native-elements';
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
        };
    }

    componentDidMount() {

        BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                return true
            }
        );

        const user = firestore().collection('Users')

        AsyncStorage.getItem('user').then(u => {
            user.doc(u).onSnapshot(e => {
                let name = `Welcome! ${e.data().firstname} ${e.data().lastname}`;
                let email = e.data().email
                this.setState({ name })
            })
        })
    }


    render() {
        return (
            <ScrollView>
                <View style={Styles.container}>
                    <Card>
                        <View style={Styles.container}>
                            <View>
                                <Text style={{ alignSelf: 'center', fontSize: 20 }}>{this.state.name}</Text>
                            </View>
                        </View>
                    </Card>
                    <View style={Styles.NavContainer}>
                        <TouchableOpacity  style={Styles.nav} onPress={()=> this.props.navigation.navigate('Jobs')}>
                            <Image style={Styles.image} source={Jobs} />
                            <Text style={Styles.text}>Jobs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={Styles.nav} onPress={()=> this.props.navigation.navigate('Post')}>
                            <Image style={Styles.image} source={Post} />
                            <Text style={Styles.text}>Post Jobs</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.NavContainer}>
                        <TouchableOpacity  style={Styles.nav} onPress={()=> this.props.navigation.navigate('Calender')}>
                            <Image style={Styles.image} source={Calender} />
                            <Text style={Styles.text}>Calendar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={Styles.nav} onPress={()=> this.props.navigation.navigate('Lawyers')}>
                            <Image style={Styles.image} source={Lawyer} />
                            <Text style={Styles.text}>Lawyers</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.NavContainer}>
                        <TouchableOpacity  style={Styles.nav} onPress={()=> this.props.navigation.navigate('Law')}>
                            <Image style={Styles.image} source={LawBook} />
                            <Text style={Styles.text}>Law</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={Styles.nav}  onPress={()=> this.props.navigation.navigate('Blog')}>
                            <Image style={Styles.image} source={Blog} />
                            <Text style={Styles.text}>Blog</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

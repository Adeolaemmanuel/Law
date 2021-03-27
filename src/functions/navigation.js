/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
import React, {Component} from 'react';
import { Image, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import {getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Home';
import Register from '../Register';
import Feeds, {FeedDetails} from '../Feed';
import Profile from '../Profile';
import Dash from '../Dashboard';
import Post, { Appeal, Vacancy } from '../Post';
import Wallet from '../Wallet';
import Notification from '../Notification';
import News from '../News';
import Calender from '../Calender';
import Blog, { BlogPost } from '../Blog';
import Message from '../Message';
import Me, { Edit } from '../Me';
import Law from '../Law';
import Lawyers from '../Lawyers';
import Jobs, {JobDetails} from '../Jobs';
import dash from '../assets/img/dashboard.png';
import wallet from '../assets/img/wallet.png';
import feed from '../assets/img/feed.png';
import user from '../assets/img/user.png';
import bell from '../assets/img/bell.png';
import chat from '../assets/img/chat.png';
import logout from '../assets/img/logout.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Setup = createStackNavigator();
const Draw = createDrawerNavigator();
const Dash_Stack = createStackNavigator();
const Feeds_Stack = createStackNavigator();
const Me_Stack = createStackNavigator();
const Notifications_Stack = createStackNavigator();
const Messages_Stack = createStackNavigator();


const Dash_Screen = ({navigation}) => {
    return (
        <Dash_Stack.Navigator>
            <Dash_Stack.Screen name="Dashboard" options={{headerTitleAlign: 'center', headerShown: false}}  component={ Dash } />
        </Dash_Stack.Navigator>
    );
};

const Feeds_Screen = ({navigation}) => {
    return (
        <Feeds_Stack.Navigator>
            <Feeds_Stack.Screen name="Feeds" options={{headerTitleAlign: 'center', headerLeft: false}}  component={ Feeds } />
        </Feeds_Stack.Navigator>
    );
};

const Me_Screen = ({navigation}) => {
    return (
        <Me_Stack.Navigator>
            <Me_Stack.Screen name="Me" options={{headerTitleAlign: 'center', headerLeft: false}}  component={ Me } />
        </Me_Stack.Navigator>
    );
};

const Notifications_Screen = ({navigation}) => {
    return (
        <Notifications_Stack.Navigator>
            <Notifications_Stack.Screen name="Notification" options={{headerTitleAlign: 'center', headerLeft: false}}  component={ Notification } />
        </Notifications_Stack.Navigator>
    );
};

const Message_Screen = ({navigation}) => {
    return (
        <Messages_Stack.Navigator>
            <Messages_Stack.Screen name="Message" options={{headerTitleAlign: 'center', headerLeft: false}}  component={ Message } />
        </Messages_Stack.Navigator>
    );
};


const Setup_N = () => {
    return (
        <Setup.Navigator>
            <Setup.Screen name="Home" options={{ headerShown: false }} component={Home} />
            <Setup.Screen name="Register" options={{ headerShown: false }} component={Register} />
        </Setup.Navigator>
    );
};

const Drawer = () => {
    return (
        <>
            <Draw.Navigator>
                <Draw.Screen name="Dashboard" options={{
                    title: 'Dashboard',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    drawerIcon: ()=>(
                        <Image source={dash} style={{width: 30, height: 30}} />
                    ),
                    }} component={ Dash_Screen } />
                <Draw.Screen name="Wallet" options={{
                    title: 'Wallet',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    drawerIcon: ()=>(
                        <Image source={wallet} style={{width: 30, height: 30}} />
                    ),
                }} component={ Wallet } 
                />
                
            </Draw.Navigator>
        </>
    );
};

const getHeaderTitle = (route,pram) => {
    if (pram === 'tabs'){
        const setUp = getFocusedRouteNameFromRoute(route) ?? 'Profile';
        switch (setUp) {
        case 'Feed':
            return 'Feed';
        case 'Profile':
            return 'Profile';
        }
    } else if (pram === 'drawer'){
        const setUp = getFocusedRouteNameFromRoute(route) ?? 'Profile';
        switch (setUp) {
        case 'Feed':
            return 'Feed';
        case 'Profile':
            return 'Profile';
        }
    }
};

const Tabs = () => {
    return (
        <>
            <Tab.Navigator>
                <Tab.Screen 
                name="Dashboard"  
                component={ Drawer } 
                options={{
                    tabBarIcon: ()=>(
                        <Image source={dash} style={{width: 25, height: 25,}} />
                    ),
                }} 
                />
                <Tab.Screen 
                name="Feeds" 
                component={ Feeds_Screen } 
                options={{
                    tabBarIcon: ()=>(
                        <Image source={ feed } style={{width: 25, height: 25,}} />
                    ),
                }} 
                />
                <Tab.Screen name="Me"  component={ Me_Screen } options={{
                    tabBarIcon: ()=>(
                        <Image source={ user } style={{width: 25, height: 25,}} />
                    ),
                }} />
                <Tab.Screen name="Notification" component={ Notifications_Screen } options={{
                    tabBarIcon: ()=>(
                        <Image source={ bell } style={{width: 25, height: 25,}} />
                    ),
                }} />
                <Tab.Screen name="Message" component={ Message_Screen }  options={{
                    tabBarIcon: ()=>(
                        <Image source={ chat } style={{width: 25, height: 25,}} />
                    ),
                }}/>
            </Tab.Navigator>
        </>
    );
};

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };
    }
    pres(){
        if (this.state.modal === true) {
            this.setState({modal: false});
        } else if (this.state.modal === false) {
            this.setState({modal: true});
        }
        console.log(this.state.modal);
    }
    render(){
        return (
            <Stack.Navigator>
                <Stack.Screen 
                name="Home" 
                options={{headerShown: false}} 
                component = { Setup_N } 
                />
                <Stack.Screen 
                name="Drawer" 
                options = {({route})=>({
                    headerShown: false,
                })} component =  { Tabs } 
                />
                <Stack.Screen 
                name="Post" 
                options={{headerTitleAlign: 'center'}} 
                component={ Post } 
                />
                <Stack.Screen 
                name="News" 
                options={{headerTitleAlign: 'center'}} 
                component={ News } 
                />
                <Stack.Screen 
                name="Calender" 
                options={{
                    headerTitleAlign: 'center',
                }} component={ Calender } 
                />
                <Stack.Screen 
                name="Blog" 
                options={{headerTitleAlign: 'center'}} 
                component={ Blog } 
                />
                <Stack.Screen 
                name="Law" 
                options={{ headerTitleAlign: 'center' }} 
                component={Law} 
                />
                <Stack.Screen 
                name="Lawyers" 
                options={{ headerShown: false }} 
                component={Lawyers} 
                />
                <Stack.Screen 
                name="Jobs" 
                options={{ headerTitleAlign: 'center' }} 
                component={Jobs} 
                />
                <Stack.Screen 
                name="Profile" 
                options={{ headerTitleAlign: 'center' }} 
                component={Profile} 
                />
                <Stack.Screen 
                name="Job Details" 
                options={{ headerTitleAlign: 'center', headerTitle: 'Details' }} 
                component={JobDetails} 
                />
                <Stack.Screen 
                name="Feed Details" 
                options={{ headerTitleAlign: 'center', headerTitle: 'Details' }} 
                component={FeedDetails} 
                />
                <Stack.Screen 
                name="Vacancy" 
                options={{ headerTitleAlign: 'center' }} 
                component={Vacancy} 
                />
                <Stack.Screen 
                name="Appeal" 
                options={{ headerTitleAlign: 'center' }} 
                component={Appeal} 
                />
                <Stack.Screen 
                name="Blog Post" 
                options={{ headerTitleAlign: 'center' }} 
                component={BlogPost} 
                />
                <Stack.Screen 
                name="Profile Edit" 
                options={{ headerTitleAlign: 'center', headerTitle: 'Edit' }} 
                component={Edit} 
                />
            </Stack.Navigator>
        );
    }
}


export { Nav, getHeaderTitle };

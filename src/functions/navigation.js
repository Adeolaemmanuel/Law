import React, {Component} from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import {getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Home';
import Register from '../Register';
import Feed from '../Feed';
import Profile from '../Profile';
import Dash from '../Dashboard';
import Login from '../Login';
import Post from '../Post';
import Wallet from '../Wallet';
import Notification from '../Notification';
import News from '../News';
import Calender from '../Calender';
import Blog from '../Blog';
import Message from '../Message';
import Me from '../Me';
import Law from '../Law';
import Lawyers from '../Lawyers';
import Jobs from '../Jobs';
import dash from '../assets/img/dashboard.png';
import wallet from '../assets/img/wallet.png';
import feed from '../assets/img/feed.png';
import user from '../assets/img/user.png';
import bell from '../assets/img/bell.png';
import chat from '../assets/img/chat.png';
import add from '../assets/img/add.png';
import { SearchCenterHeaderModule } from './component';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Setup = createStackNavigator();
const Draw = createDrawerNavigator();
const Feed_Stack = createStackNavigator();
const Profile_Stack = createStackNavigator();
const Dash_Stack = createStackNavigator();
const Login_Stack = createStackNavigator();
const Post_Stack = createStackNavigator();
const Wallet_Stack = createStackNavigator();
const News_Stack = createStackNavigator();
const Notification_Stack = createStackNavigator();
const Calender_Stack = createStackNavigator();
const Blog_Stack = createStackNavigator();
const Message_Stack = createStackNavigator();
const Me_Stack = createStackNavigator();
const Lawyers_Stack = createStackNavigator();
const Law_Stack = createStackNavigator();
const Jobs_Stack = createStackNavigator();

const Feed_Screen = () => {
    return (
        <Feed_Stack.Navigator>
            <Feed_Stack.Screen name="Feed" options={{ headerTitleAlign: 'center', headerLeft: null}} component={ Feed } />
        </Feed_Stack.Navigator>
    );
};

const Me_Screen = () => {
    return (
        <Me_Stack.Navigator>
            <Me_Stack.Screen name ="Me" options={{headerTitleAlign: 'center', headerLeft: null}} component={ Me } />
        </Me_Stack.Navigator>
    );
};

const Law_Screen = () => {
    return (
        <Law_Stack.Navigator>
            <Law_Stack.Screen name ="Law" options={{headerTitleAlign: 'center'}} component={ Law } />
        </Law_Stack.Navigator>
    );
};

const Lawyers_Screen = () => {
    return (
        <Lawyers_Stack.Navigator>
            <Lawyers_Stack.Screen name ="Lawyers" options={{headerTitleAlign: 'center'}} component={ Lawyers } />
        </Lawyers_Stack.Navigator>
    );
};

const Jobs_Screen = () => {
    return (
        <Jobs_Stack.Navigator>
            <Jobs_Stack.Screen name ="Jobs" options={{headerTitleAlign: 'center'}} component={ Jobs } />
        </Jobs_Stack.Navigator>
    );
};

const Profile_Screen = () => {
    return (
        <Profile_Stack.Navigator>
            <Profile_Stack.Screen name ="Profile" options={{headerTitleAlign: 'center', headerLeft: null}} component={ Profile } />
        </Profile_Stack.Navigator>
    );
};

const Wallet_Screen = () => {
    return (
        <Wallet_Stack.Navigator>
            <Wallet_Stack.Screen name ="Wallet" options={{headerTitleAlign: 'center', headerShown: false}} component={ Wallet } />
        </Wallet_Stack.Navigator>
    );
};

const Dash_Screen = ({navigation}) => {
    return (
        <Dash_Stack.Navigator>
            <Dash_Stack.Screen name="Dashboard" options={{headerTitleAlign: 'center', headerShown: false}}  component={ Dash } />
        </Dash_Stack.Navigator>
    );
};

const Message_Screen = ({navigation}) => {
    return (
        <Message_Stack.Navigator>
            <Message_Stack.Screen name="Message" options={{headerTitleAlign: 'center', headerLeft: null}}  component={ Message } />
        </Message_Stack.Navigator>
    );
};

const Blog_Screen = ({navigation}) => {
    return (
        <Blog_Stack.Navigator>
            <Blog_Stack.Screen name="Blog" options={{headerTitleAlign: 'center', headerShown: false}}  component={ Blog } />
        </Blog_Stack.Navigator>
    );
};

const Calender_Screen = ({navigation}) => {
    return (
        <Calender_Stack.Navigator>
            <Calender_Stack.Screen name="Calender" options={{headerTitleAlign: 'center', headerShown: false, headerLeft: null}}  component={ Calender } />
        </Calender_Stack.Navigator>
    );
};

const News_Screen = ({navigation}) => {
    return (
        <News_Stack.Navigator>
            <News_Stack.Screen name="News" options={{headerTitleAlign: 'center', headerShown: false}}  component={ News } />
        </News_Stack.Navigator>
    );
};

const Notification_Screen = ({navigation}) => {
    return (
        <Notification_Stack.Navigator>
            <Notification_Stack.Screen name="Notification" options={{headerTitleAlign: 'center', headerLeft: null}}  component={ Notification } />
        </Notification_Stack.Navigator>
    );
};

const Login_Screen = () => {
    return (
        <Login_Stack.Navigator>
            <Login_Stack.Screen name="Login" options={{headerTitleAlign: 'center'}}  component={ Login } />
        </Login_Stack.Navigator>
    );
};

const Post_Screen = () => {
    return (
        <Post_Stack.Navigator>
            <Post_Stack.Screen name="Post" options={{headerTitleAlign: 'center'}}  component={ Post } />
        </Post_Stack.Navigator>
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

const Tabs = () => {
    return (
        <>
            <Tab.Navigator>
                <Tab.Screen name="Dashboard"  component={ Drawer } options={{
                    tabBarIcon: ()=>(
                        <Image source={dash} style={{width: 25, height: 25,}} />
                    ),
                }} />
                <Tab.Screen name="Feeds" component={ Feed_Screen } options={{
                    tabBarIcon: ()=>(
                        <Image source={ feed } style={{width: 25, height: 25,}} />
                    ),
                }} />
                <Tab.Screen name="Me"  component={ Me_Screen } options={{
                    tabBarIcon: ()=>(
                        <Image source={ user } style={{width: 25, height: 25,}} />
                    ),
                }} />
                <Tab.Screen name="Notification" component={ Notification_Screen } options={{
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

const Drawer = () => {
    return (
        <>
            <Draw.Navigator>
                <Draw.Screen name="Dashboard" options={{
                    title: 'Dashboard',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    drawerIcon: ()=>(
                        <Image source={dash} style={{width: 50, height: 50,}} />
                    ),
                    }} component={ Dash_Screen } />
                <Draw.Screen name="Wallet" options={{
                    title: 'Wallet',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    drawerIcon: ()=>(
                        <Image source={wallet} style={{width: 50, height: 50,}} />
                    ),
                }} component={ Wallet_Screen } />
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
                <Stack.Screen name="Home" options={{headerShown: false}} component = { Setup_N } />
                <Stack.Screen name="Drawer" options = {({route})=>({
                    headerShown: false,
                })} component =  { Tabs } />
                <Stack.Screen name="Post" options={{headerTitleAlign: 'center'}} component={ Post } />
                <Stack.Screen name="News" options={{headerTitleAlign: 'center'}} component={ News } />
                <Stack.Screen name="Calender" options={{
                    headerTitleAlign: 'center',
                }} component={ Calender } />
                <Stack.Screen name="Blog" options={{headerTitleAlign: 'center'}} component={ Blog } />
                <Stack.Screen name="Law" options={{ headerTitleAlign: 'center' }} component={Law} />
                <Stack.Screen name="Lawyers" options={{ headerTitle: () => <SearchCenterHeaderModule /> }} component={Lawyers} />
                <Stack.Screen name="Jobs" options={{headerTitleAlign: 'center'}} component={ Jobs } />
            </Stack.Navigator>
        );
    }
}




const styles = StyleSheet.create({
    img: {
        width: 40,
        height: 40,
        marginLeft: 9,
    },
});

export { Nav, getHeaderTitle };

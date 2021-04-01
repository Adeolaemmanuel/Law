/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Component } from 'react';
import { Styles } from './component/styles';
import * as fn from './component/functions';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Text,
    Dimensions,
    Image,
    ToastAndroid,
    BackHandler,
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


interface SignupProps {
    navigation: any
}

interface SignupState {
    User: any
}

export class Signup extends Component<SignupProps, SignupState> {
    constructor(props: any) {
        super(props);
        this.state = {
            User: {firstname: '', lastname: '', email: '', number: '', password: '', type: 'User', country: '', state: ''},
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
                                    User.firstname = text.charAt(0).toUpperCase() + text.slice(1);
                                    this.setState({User});
                                }}
                            />
                            <TextInput
                                style={[{height: 70 }, Styles.cardC]}
                                placeholder="Last Name"
                                onChangeText={(text: string) => {
                                    let User = {... this.state.User};
                                    User.lastname = text.charAt(0).toUpperCase() + text.slice(1);
                                    this.setState({User});
                                }}
                            />
                        </View>
                        <View style={Styles.containerRow}>
                            <TextInput
                                style={[{height: 70 }, Styles.cardC]}
                                placeholder="Country"
                                onChangeText={(text: string) => {
                                    let User = {... this.state.User};
                                    User.country = text.charAt(0).toUpperCase() + text.slice(1);
                                    this.setState({User});
                                }}
                            />
                            <TextInput
                                style={[{height: 70 }, Styles.cardC]}
                                placeholder="State"
                                onChangeText={(text: string) => {
                                    let User = {... this.state.User};
                                    User.state = text.charAt(0).toUpperCase() + text.slice(1);
                                    this.setState({User});
                                }}
                            />
                        </View>
                        <View style={{height: 80 }}>
                            <TextInput
                                style={[{height: 80 }, Styles.cardC]}
                                placeholder="Email"
                                onChangeText={(text: string) => {
                                    let User = {... this.state.User};
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
                                    let User = {... this.state.User};
                                    User.number = text;
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
                                    let User = {... this.state.User};
                                    User.password = text;
                                    this.setState({User});
                                }}
                            />
                        </View>
                        <Button
                            title="Register"
                            type="solid"
                            buttonStyle={{ height: 60, margin: 15, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 25, borderRadius: 10 }}
                            onPress={() => fn.register(this.state.User, this.props.navigation.navigate,'User Dash')}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

interface DashProps {
    navigation: any
    style: any
}

interface DashState {
    Nav: any[]
}
export class DashUser extends Component<DashProps, DashState> {

    constructor(props: any) {
        super(props);
        this.state = {
            Nav: [
                {name: 'Profile', img: require('./assets/img/user.png'), route: 'User Profile'},
                {name: 'Legal', img: require('./assets/img/blog.png'), route: 'User Profile'},
                {name: 'Lawyers', img: require('./assets/img/lawyer.png'), route: 'Lawyers' },
                {name: 'Messages', img: require('./assets/img/chat.png'), route: 'Message' },
                {name: 'Settings', img: require('./assets/img/settings.png'), route: 'Settings' },
            ],
        };
    }


    render(){
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <View style={Styles.containerRow}>
                    {
                        this.state.Nav.map((arr: any, ind: number)=>{
                            return (
                                <View key={`dashboard-${ind}`} style={{width: (Dimensions.get('screen').width - 30) / 2, height: 160, padding: 5, margin: 7, marginTop: 0, paddingTop: 0}}>
                                    <TouchableOpacity  style={Styles.nav} onPress={()=> this.props.navigation.push(`${arr.route}`)}>
                                        <Image style={Styles.image} source={arr.img} />
                                        <Text style={Styles.navText}>{arr.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}


interface UserProps {
    navigation: any
    style: any
}

interface UserState {
    me: any
    profilePic: string
}
export class UserProfile extends Component<UserProps, UserState> {

    constructor(props: any) {
        super(props);
          this.state = {
              me: {
                  firstname: ' ', country: ' ', lastname: ' ', email: ' ',
                  number: '', state: ' ',
              },
              profilePic: 'null',
          };
      }

      ismounted: boolean = false;
        componentDidMount() {
            this.ismounted = true;
            this.initializeMe();
        }

        initializeMe(){
            if (this.ismounted) {
                BackHandler.addEventListener('hardwareBackPress', () => { return true;});
                fn.meStatitics(this.setHandlerState,'confirmed');
                AsyncStorage.getItem('user').then((res: any) => {

                    let user = firestore().collection('Users');
                    // eslint-disable-next-line no-shadow
                    user.doc(res).onSnapshot( (user: any) => {
                        if (user.exists) {
                            let me = { ...this.state.me };
                            me.firstname = user.data().firstname;
                            me.lastname = user.data().lastname;
                            me.number = user.data().number;
                            me.email = user.data().email;
                            me.country = user.data().country;
                            me.state = user.data().state;

                            let profilePic = user.data().profilePicture;
                            if ( profilePic === undefined) {
                                this.setState({ profilePic: require('./assets/img/profileM.png') });
                            }  else {
                                this.setState({ profilePic });
                            }

                            for (let x in me) {
                                if (me[x] === undefined) {
                                    me[x] = 'none';
                                }
                            }
                            this.setState({ me });
                        }
                    });
                });
            }
        }

        componentWillUnmount(){
            this.ismounted = false;
        }

        setHandlerState = (state: string, data: string | number) => {
            this.setState({[state]: data});
        }

        render() {
            return (
                <ScrollView  style={[{backgroundColor: 'white'}, Styles.container]}>
                    <View style={Styles.containerRow}>
                        <View style={Styles.profileIamge}>
                            <Image
                                source={typeof this.state.profilePic === 'number' ? this.state.profilePic : { uri: this.state.profilePic }}
                                style={{ width: 150, height: 150, margin: 10 }}
                            />
                        </View>
                        <View style={Styles.container}>
                            <TouchableOpacity
                                style={[{ width: '90%', height: 60, backgroundColor: 'black', margin: 10, borderRadius: 5 }]}
                                onPress={()=>this.props.navigation.navigate('User Profile Edit')}
                            >
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 25, margin: 10 }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[{ width: '90%', height: 60, backgroundColor: 'black', margin: 10, borderRadius: 5 }]}
                                onPress={()=> fn.upload(this.setHandlerState)}
                            >
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 25, padding: 10 }}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={[Styles.container]}>
                        <Text style={Styles.heading}>ABOUT</Text>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/user2.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{`${this.state.me.firstname} ${this.state.me.lastname}`}</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/at.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.email}</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/smartphone.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.number}</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/world.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.country}</Text>
                            </View>
                        </View>
                        <View style={Styles.containerRow}>
                            <View style={{ margin: 10 }}>
                                <Image source={require('./assets/img/pin.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.me.state}</Text>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            );
        }
}

interface EditProps {
    navigation: any
    style: any
}

interface EditState {
    me: any
}

export class UserEdit extends Component<EditProps, EditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            me: {
                firstname: ' ', country: ' ',lastname: ' ', email: '',
                state: '', number: '',
            },
        };
    }


    ismounted = false;
    componentDidMount() {
        this.ismounted = true;
        this.initiazileEdit();
    }

    initiazileEdit(){
        if (this.ismounted) {
            BackHandler.addEventListener('hardwareBackPress', () => { return true;});

            AsyncStorage.getItem('user').then((res: any) => {
                let user = firestore().collection('Users');
                user.doc(res).onSnapshot( (user: any) => {
                    if (user.exists) {
                        let me = { ...this.state.me };
                        me.firstname = user.data().firstname;
                        me.lastname = user.data().lastname;
                        me.country = user.data().country;
                        me.state = user.data().state;
                        me.email = user.data().email;
                        this.setState({ me });
                    }
                });
            });
        }
    }

    componentWillUnmount(){
        this.ismounted = false;
    }

    update = () => {
        let user = firestore().collection('Users');
        AsyncStorage.getItem('user').then((res: any) => {
            user.doc(res).update(this.state.me).then(() => {
                ToastAndroid.show('Profile Updated', ToastAndroid.TOP);
            });
        });
    }

    render(){
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <KeyboardAvoidingView>
                    <View style={Styles.container}>

                    <Text style={[{ alignSelf: 'center' }, Styles.heading]}>ABOUT</Text>

                    <View style={Styles.containerRow}>
                        <TextInput
                            placeholder="Firstname:"
                            style={[{ flex: 1, height: 70 }, Styles.cardC]}
                            value={this.state.me.firstname}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.firstname = text.charAt(0).toUpperCase() + text.slice(1);
                                this.setState({me});
                            }}
                        />
                        <TextInput
                            placeholder="Lastname:"
                            style={[{ flex: 1, height: 70 }, Styles.cardC]}
                            value={this.state.me.lastname}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.lastname = text.charAt(0).toUpperCase() + text.slice(1);
                                this.setState({ me });
                            }}
                        />
                    </View>
                    <View style={Styles.containerRow}>
                        <TextInput
                            placeholder="Country:"
                            style={[{ flex: 1, height: 70 }, Styles.cardC]}
                            value={this.state.me.country}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.country = text.charAt(0).toUpperCase() + text.slice(1);
                                this.setState({ me });
                            }}
                        />
                        <TextInput
                            placeholder="State:"
                            style={[{ flex: 1, height: 70 }, Styles.cardC]}
                            value={this.state.me.state}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.state = text.charAt(0).toUpperCase() + text.slice(1);
                                this.setState({ me });
                            }}
                        />
                    </View>
                    <View style={Styles.container}>
                        <TextInput
                            placeholder="Phone Number:"
                            style={[{height: 70 }, Styles.cardC]}
                            value={this.state.me.number}
                            onChangeText={text => {
                                let me = { ...this.state.me };
                                me.number = text;
                                this.setState({ me });
                            }}
                        />
                    </View>

                    <Button
                            title="Update"
                            type="solid"
                            buttonStyle={{ height: 70, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }}
                            onPress={this.update}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

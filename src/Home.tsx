import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GestureRecognizer from 'react-native-swipe-gestures';
import Login from './Login';
import { NavigationAction } from '@react-navigation/native';
import { block } from 'react-native-reanimated';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: [
                {
                    key: 1,
                    title: 'CREATE',
                    text: 'Create a group and invite your choosen contact',
                    image: require('./assets/img/friends.png'),
                    backgroundColor: '#59b2ab',
                },
                {
                    key: 2,
                    title: 'SAVE',
                    text: 'Other cool stuff',
                    image: require('./assets/img/piggy-bank.png'),
                    backgroundColor: '#febe29',
                },
                {
                    key: 3,
                    title: 'TRACK',
                    text: 'Track your groups activity',
                    image: require('./assets/img/track.png'),
                    backgroundColor: '#22bcb5',
                },
                {
                    key: 4,
                    title: 'DEPOSIT',
                    text: 'Deposit your money in your bank',
                    image: require('./assets/img/bank.png'),
                    backgroundColor: '#22bcb5',
                },
            ],
            slideVisible: null,
            currentIndex: 0,
            btnText: 'Next',
            load: true,
            dimensions: { width: Math.ceil(Dimensions.get('window').width), height: Math.ceil(Dimensions.get('window').height) },
        };
        let slideVisible;
        AsyncStorage.getItem('slideVisible').then(d => {
            console.log(d)
            if (d === 'true') {
                slideVisible = false;
                if (!slideVisible) {
                    this.setState({ slideVisible });
                }
            } else {
                slideVisible = true;
                if (slideVisible) {
                    this.setState({ slideVisible });
                }
            }
        });
        AsyncStorage.getItem('user').then(d => {
            if (d !== 'null') {
                this.props.navigation.push('Drawer')
            }
        });
    }

    componentDidMount() {
        //this.clearAll();
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        setTimeout(() => {
            let load = false;
            this.setState({ load });
        }, 3000);
    }

    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationAction.back());
        return true;
    };


    clearAll = async () => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            // clear error
        }
    }


    display = (state) => {
        return (
            <View style={style.containerR}>

                <View style={style.header}>
                    <Text style={style.title}>{state.title}</Text>
                </View>

                <View style={style.img}>
                    <Image source={state.image} style={style.img} />
                </View>

                <View style={style.textC}>
                    <Text style={style.text}>{state.text}</Text>
                </View>

            </View>
        );
    };

    slideDone = () => {
        if (this.state.btnText === 'Done') {
            this.setState({ slideVisible: false });
            AsyncStorage.setItem('slideVisible', 'true');
        } else if (this.state.btnText === 'Next') {
            if (this.state.currentIndex !== (this.state.slides.length - 1)) {
                this.setState({ currentIndex: this.state.currentIndex += 1 });
                if (this.state.currentIndex === (this.state.slides.length - 1)) {
                    this.setState({ btnText: 'Done' });
                }
            }
        }
    }
    onSwipe = (pram) => {
        if (pram === 'left') {
            if (this.state.currentIndex !== (this.state.slides.length - 1)) {
                this.setState({ currentIndex: this.state.currentIndex += 1 });
                if (this.state.currentIndex === (this.state.slides.length - 1)) {
                    this.setState({ btnText: 'Done' });
                }
            } else {
                this.setState({ currentIndex: this.state.slides.length - 1 });
            }
        } else if (pram === 'right') {
            if (this.state.currentIndex !== 0) {
                this.setState({ currentIndex: this.state.currentIndex -= 1 });
                this.setState({ btnText: 'Next' });
            } else {
                this.setState({ currentIndex: 0 });
            }
        }
    }

    render() {
        if (this.state.load) {
            return (
                <View>
                    <Text style={{ fontSize: 70, alignSelf: 'center', fontWeight: '800', marginTop: 150, }}>LAW</Text>
                </View>
            );
        }
        if (this.state.slideVisible) {

            return (
                <>
                    <GestureRecognizer
                        onSwipeLeft={() => this.onSwipe('left')}
                        onSwipeRight={() => this.onSwipe('right')}
                    >
                        {
                            this.display(this.state.slides[this.state.currentIndex])
                        }
                    </GestureRecognizer>
                    <TouchableOpacity style={style.btn} onPress={this.slideDone}>
                        <View>
                            <Text style={style.textCenter}>{this.state.btnText}</Text>
                        </View>
                    </TouchableOpacity>
                </>
            );
        }
        if (this.state.slideVisible !== null) {
            return <Login navigation={this.props.navigation} />;
        }
    }
}

const style = StyleSheet.create({
    containerR: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    },
    header: {
        width: '100%',
        height: 60,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Lato',
        fontWeight: 'bold',
    },
    textC: {
        flex: 1,
        margin: 30,
        padding: 30,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        padding: 12,
        fontFamily: 'Lato',
    },
    img: {
        width: 300,
        height: 300,
        marginTop: 20,
        alignSelf: 'center',
        padding: 20,
    },
    btn: {
        width: 100,
        height: 50,
        textAlign: 'center',
        borderRadius: 3,
        backgroundColor: 'black',
        opacity: 0.5,
        position: 'absolute',
        right: 3,
        bottom: 3,
    },
    textCenter: {
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
        color: 'white',
    },
    padding: {
        padding: 16,
    },
});
import React from 'react';
import { Component } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import * as fn from './component/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from './component/styles';
import {
    View,
    ScrollView,
    Text,
    Pressable,
 } from 'react-native';
 import {
    Card,
 } from 'react-native-elements';

export default class Message extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            contact: [],
        };
    }

    ismounted = false
    componentDidMount(){
        this.ismounted = true;
        if (this.ismounted) {
            fn.getMessages(this.setHandler);
        }
    }

    setHandler = (contact: any) => {
        this.setState({contact});
    }


    render() {
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                {
                    this.state.contact.map((arr: any) => {
                        return (
                            <Pressable key={arr.user} style={{marginTop: 10}} disabled={arr.disabled} onPress={()=> this.props.navigation.navigate('Chat', {pram: arr.key})} >
                                <Card>
                                    <View style={Styles.container}>
                                        <View>
                                            <Text style={{ alignSelf: 'center', fontSize: 20 }}>{arr.name}</Text>
                                        </View>
                                    </View>
                                </Card>
                            </Pressable>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

export class Chat extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            messages: [],
            name: '',
            img: '',
            key: '',
        };
        this.onSend = this.onSend.bind(this);
    }

    ismounted: boolean = false;

    componentDidMount(){
        this.ismounted = true;
        if (this.ismounted) {
            AsyncStorage.getItem('user').then((u: any)=>{
                firestore().collection('Users').doc(u)
                .get().then((e: any)=>{
                    let name = `${e.data().firstname} ${e.data().lastname}`;
                    let img = e.data().profilePicture;
                    this.setState({name, img});
                });

                const {pram} = this.props.route.params;
                this.setState({key: pram});
                fn.getChat(pram, this.setStateHandler);
            });
        }
    }

    setStateHandler = (message : any) => {
        let messages = message || [];
        this.setState({messages});
    }

    renderBubble(props: any) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: 'white',
                padding: 5,
                margin: 5,
                },
              right: {
                  padding: 5,
                  margin: 5,
              },
            }}
          />
        );
    }


    onSend(messages = []) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, messages),
          };
        });
        fn.chat(messages, this.state.key);
    }



    render() {
        return (
            <GiftedChat
              messages={this.state.messages}
              onSend={this.onSend}
              user={{
                _id: this.state.name,
                avatar: this.state.img,
              }}
              renderBubble={this.renderBubble}
            />
          );
    }
}

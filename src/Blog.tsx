/* eslint-disable react-native/no-inline-styles */

import React, { Component } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View,
    TouchableHighlight,
} from 'react-native';
import { Styles } from './functions/styles';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-elements';
import {  } from 'react-native';
import { Badge } from 'react-native-elements';
import { ToastAndroid } from 'react-native';



interface PropsBlog {
    navigation: any;
}

interface StateBlog {
    Post: any
}

export default class Blog extends Component<PropsBlog, StateBlog> {
    constructor(props: any) {
        super(props);
        this.state = {
            Post: [],
        };
    }


    render() {
        return (
            <View style={{ position: 'absolute', bottom: 16, right: 16 }}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Blog Post')}>
                    <Image source={require('./assets/img/add.png')} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
            </View>
        );
    }
}


interface PropsBlogPost {
    navigation: any;
    source: any
}

interface StateBlogPost {
    PicStyle: any
    Post: {title: string, post: string, image: number[]}
}

export class BlogPost extends Component<PropsBlogPost, StateBlogPost> {
    constructor(props: any) {
        super(props);
        this.state = {
            PicStyle: [],
            Post: { title: '', post: '', image: []},
        };
    }

    imageHandler = (data: any, type: string, index: any = null) => {
        launchImageLibrary('photo', img =>{
            if (data.image.length <= 2 && type === 'add') {
                data.image.push(img.uri);
                this.setState({ Post: data });
            } else if (type === 'minus') {
                data.image.splice(index);
                this.setState({Post: data});
            } else {
                ToastAndroid.show('User already exist !', ToastAndroid.TOP);
            }
        });
    }

    post = () => {
        for (let x in this.state.Post) {
            console.log(x);
        }
    }

    render(){
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <KeyboardAvoidingView>
                    <View style={{marginTop: 20}} >
                        <View style={[{ padding: 5 }, Styles.container]}>
                            <TextInput
                                style={[{height: 70}, Styles.inputCustom]}
                                placeholder="Title:"
                            />
                        </View>
                        <View style={[{ padding: 5 }, Styles.container]}>
                            <TextInput
                                style={[{ backgroundColor: '#ebedf0' }, Styles.inputCustom]}
                                placeholder="What's on your mind..."
                                multiline={true}
                                numberOfLines={3}

                            />
                        </View>

                        <View style={Styles.containerRow}>
                            {
                                this.state.Post.image.map((arr,ind)=>{
                                    return (
                                        <View style={[Styles.container]}>
                                            <Badge value="X" status="error" key={`blogB-${ind}`} containerStyle={{margin: 10, padding: 10}}  />
                                            <TouchableHighlight key={`blog-${ind}`}>
                                                <Image source={{uri: arr}} key={`blogI-${ind}`} style={{width: 130, height: 130}} />
                                            </TouchableHighlight>
                                        </View>
                                    );
                                })
                            }
                        </View>

                        <TouchableOpacity onPress={()=> this.imageHandler(this.state.Post,'add',0)} style={{ alignSelf: 'flex-end', margin: 10 }}>
                            <Image source={require('./assets/img/photo.png')} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>

                        <Button
                            title="Post"
                            type="solid"
                            buttonStyle={{ height: 70, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }}
                            onPress={this.post}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}
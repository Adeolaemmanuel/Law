/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { Component } from 'react';
import { Styles } from './component/styles';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-elements';
import { Badge } from 'react-native-elements';
import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View,
    TouchableHighlight,
    Dimensions,
    ToastAndroid,
} from 'react-native';
import {
    Overlay,
} from 'react-native-elements';



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
    overlay: boolean
}

export class BlogPost extends Component<PropsBlogPost, StateBlogPost> {
    constructor(props: any) {
        super(props);
        this.state = {
            PicStyle: [],
            Post: { title: '', post: '', image: []},
            overlay: false,
        };
    }

    imageHandler = (data: any, type: string, index: any = null) => {
        launchImageLibrary('photo', img =>{
            if (data.image.length <= 3 && type === 'add') {
                data.image.push(img.uri);
                this.setState({ Post: data });
            } else if (type === 'minus') {
                data.image.splice(index);
                this.setState({Post: data});
            } else {
                ToastAndroid.show('Can\'t select more than four !', ToastAndroid.TOP);
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
                                style={[{height: 60}, Styles.cardC]}
                                placeholder="Title:"
                            />
                        </View>
                        <View style={[{ padding: 5 }, Styles.container]}>
                            <TextInput
                                style={[{justifyContent: 'flex-start', textAlignVertical: 'top', height: 80 }, Styles.cardC]}
                                placeholder="What's on your mind..."
                                multiline={true}
                                numberOfLines={3}

                            />
                        </View>

                        <Overlay
                            isVisible={this.state.overlay}
                            overlayStyle={{width: 350, height: 500}}
                            onBackdropPress={()=> this.setState({overlay: false})}
                        >
                            <View style={Styles.containerRow}>
                                {
                                    this.state.Post.image.map((arr,ind)=>{
                                        return (
                                            <View style={{width: (Dimensions.get('screen').width - 30) / 3, height: 160, padding: 5, margin: 7, marginTop: 0, paddingTop: 0}}>
                                                <Badge value="X" status="error" key={`blogB-${ind}`} containerStyle={{marginTop: 10, marginBottom: 10, alignSelf: 'center'}}  />
                                                <TouchableHighlight>
                                                    <Image source={{uri: arr}} style={{width: 130, height: 130, marginLeft: 10, padding: 15}} />
                                                </TouchableHighlight>
                                            </View>
                                        );
                                    })
                                }
                            </View>
                            <TouchableOpacity onPress={()=> this.imageHandler(this.state.Post,'add')} style={{  margin: 10 }}>
                                <Image source={require('./assets/img/photo.png')} style={{ width: 50, height: 50 }} />
                            </TouchableOpacity>
                        </Overlay>

                        <TouchableOpacity onPress={()=> this.setState({overlay: true})} style={{ alignSelf: 'flex-end', margin: 10 }}>
                            <Image source={require('./assets/img/photo.png')} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>

                        <Button
                            title="Post"
                            type="solid"
                            buttonStyle={{ height: 50, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }}
                            onPress={this.post}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

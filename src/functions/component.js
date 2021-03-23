import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TextInput, Text, Pressable } from 'react-native';
import { Styles } from './styles';
import { Overlay, Image, Icon } from 'react-native-elements';

class SearchCenterHeaderModule extends Component {

    constructor(props) {
        super(props);

    }

    changeText = (text) => {
        this.props.valueChange(text)
    }

    render() {
        return (
            <View style={[{ backgroundColor: 'white', elevation: 5, shadowColor: 'black', shadowOffset: { width: 15, height: 15 }, shadowOpacity: 1, }, Styles.containerRow]}>
                <Pressable onPress={() => this.props.navigation.goBack()}>
                    <Image style={{ flex: 1, width: 20, height: 20, padding: 10, margin: 10, marginTop: 25 }} source={require('../assets/img/left-arrow.png')} />
                </Pressable>
                <TextInput
                    placeholder='Search User...'
                    style={[{ fontSize: 20, padding: 10, margin: 10, flex: 2, backgroundColor: '#ebedf0', borderRadius: 2 }]}
                    onChangeText={text => this.changeText(text)}
                />
            </View>    
        )
    }
}

class ImageGallerySelectModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Images: [],
            visible: false,
        }
    }

    componentDidUpdate() {
        let Images = [...this.props.image];
        let visible = this.props.visible;
        if (this.props.visible !== this.state.visible) {
            this.setState({ Images, visible })
        }
    }

    visible() {
        if (this.state.visible) {
            this.state.Images.map(arr => {
                return (
                    <Image key={arr} source={{ uri: arr.node.image.uri }} />
                )
            })
        }
    }

    render() {
        return (
            <View>
                {
                    this.visible()
                }
            </View>    
        )
    }
}


export {
    SearchCenterHeaderModule,
    ImageGallerySelectModule
}
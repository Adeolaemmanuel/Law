import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TextInput, Text } from 'react-native';
import { Styles } from './styles';
import { Overlay, Image } from 'react-native-elements';

class SearchCenterHeaderModule extends Component {

    render() {
        return (
            <View style={[{ width: '100%' }]}>
                <TextInput placeholder='Search...' style={[{ width: '100%', fontSize: 20 }, Styles.inputCustom]} />
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
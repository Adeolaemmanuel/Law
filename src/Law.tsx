/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Component } from 'react';
import {
    Pressable,
    ScrollView,
    View,
} from 'react-native';
import { Avatar, Card, ListItem } from 'react-native-elements';
import { Styles } from './component/styles';
import firestore from '@react-native-firebase/firestore';
import { SearchCenterHeaderModule } from './component/functions';
import { Dimensions } from 'react-native';
import * as fn from './component/functions';
export default class Law extends Component {
    render() {
        return (
            <View>
                
            </View>
        );
    }
}

interface LawyerProps {
    navigation: any
    route: any
}

interface LawyerState {
    lawyers: any[]
    search: string
}
export class Lawyers extends Component<LawyerProps, LawyerState> {

    constructor(props: any) {
        super(props);
        this.state = {
            lawyers: [],
            search: '',
        };
    }

    ismounted = false;
    componentDidMount() {
        this.ismounted = true;
        this.initializeLaw();
    }

    componentWillUnmount(){
        this.ismounted = false;
    }

    initializeLaw(){
        if (this.ismounted) {
            fn.getLawyers(this.Admin, this.user, this.setStateHandler);
        }
    }

    setStateHandler = (lawyers: any) => {
        this.setState({lawyers});
    }

    search = (search: string) => {
        this.setState({ search });
        this.state.lawyers.filter(lawyers => {
            if (lawyers.name.match(search)) {
                if (search.length > 1) {
                    this.setState({ lawyers: [lawyers] });
                } else {
                    fn.getLawyers(this.Admin, this.user, this.setStateHandler);
                }
            }
        });
    }

    Admin = firestore().collection('Admin')
    user = firestore().collection('Users')

    render() {
        return (
            <View style={[{backgroundColor: 'white', height: Dimensions.get('screen').height}, Styles.container]}>
                <View style={[{height: 65}]}>
                    <SearchCenterHeaderModule navigation={this.props.navigation} valueChange={this.search} />
                </View>
                <ScrollView>
                    <View>
                        {
                            this.state.lawyers.map((item: any) => (
                                <Pressable key={`Btn-${item.key}`} onPress={() => this.props.navigation.navigate('Profile', { email: item.email })}>
                                    <Card>
                                        <ListItem>
                                            <Avatar
                                                rounded
                                                source={{
                                                    uri: item.profilePicture,
                                                } || item.profilePicture}
                                            />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.name}</ListItem.Title>
                                                <ListItem.Subtitle>{item.location}</ListItem.Subtitle>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    </Card>
                                </Pressable>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

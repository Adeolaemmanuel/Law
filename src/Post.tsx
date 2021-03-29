/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { PerlState, PostProps, PostState, PostVacancyProps, PostVacancyState, PrelProps } from './component/types';
import { Styles } from './component/styles';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';
import * as fn from './component/functions';
import {Picker} from '@react-native-picker/picker';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
     KeyboardAvoidingView,
} from 'react-native';

export default class Post extends Component<PostProps, PostState> {
    constructor(props: any) {
        super(props);
        this.state = {
            Jobs: [
                { name: 'Vacancy', modal: false, icon: require('./assets/img/vacancy.png'), route: 'Vacancy' },
                { name: 'Prelim', modal: false, icon: require('./assets/img/compliant.png'), route: 'Prelim' },
            ],
        };
    }




    render() {
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <View style={[Styles.containerRow]}>
                    {
                        this.state.Jobs.map((arr,ind)=>{
                            return (
                                <View key={`Post-${ind}`} style={{width: (Dimensions.get('screen').width - 10) / 2, height: 170, padding: 5, margin: 2}}>
                                    <TouchableOpacity
                                    android_disableSound={true}
                                    style={[Styles.nav]}
                                    onPress={() => this.props.navigation.navigate(`${arr.route}`, {[arr.route]: arr})}>
                                    <Image source={this.state.Jobs[ind].icon} style={Styles.image} />
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



// fore serurity reasons i advise only lincensce confirmed lawyers are allowed access
export class Vacancy extends Component<PostVacancyProps, PostVacancyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            vacancy: { title: null, company: null, type: null, location: null, experience: null, user: null, job: 'Vacancy', summary: null, id: 0},
        };
    }

    componentDidMount(){
        this.initializeVacancy();
    }

    initializeVacancy(){
        AsyncStorage.getItem('user').then(u=>{
            let vacancy = {...this.state.vacancy};
            vacancy.user = u;
            this.setState({vacancy});
        });
    }


    render(){
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <KeyboardAvoidingView>
                    <View style={Styles.container} >
                        <View style={Styles.containerPaddingMargin}>
                            <View>
                                <TextInput
                                    style={[Styles.input, Styles.cardC]}
                                    placeholder="Job Title:"
                                    onChangeText={
                                        text => {
                                            let vacancy = { ...this.state.vacancy };
                                            vacancy.title = text.charAt(0).toUpperCase() + text.slice(1);
                                            this.setState({ vacancy });
                                        }
                                    }
                                />
                            </View>
                            <View style={Styles.containerRow} >
                                <TextInput
                                    style={[{ flex: 2 }, Styles.input, Styles.cardC]}
                                    placeholder="Company:"
                                    onChangeText={
                                        text => {
                                            let vacancy = { ...this.state.vacancy };
                                            vacancy.company = text.charAt(0).toUpperCase() + text.slice(1);
                                            this.setState({ vacancy });
                                        }
                                    }
                                />
                                <TextInput
                                    style={[{ flex: 2 }, Styles.input, Styles.cardC]}
                                    placeholder="Job Type:"
                                    onChangeText={
                                        text => {
                                            let vacancy = { ...this.state.vacancy };
                                            vacancy.type = text.charAt(0).toUpperCase() + text.slice(1);
                                            this.setState({ vacancy });
                                        }
                                    }
                                />
                            </View>
                            <View style={Styles.containerRow} >
                                <TextInput
                                    style={[{ flex: 2 }, Styles.input, Styles.cardC]}
                                    placeholder="Location:"
                                    onChangeText={
                                        text => {
                                            let vacancy = { ...this.state.vacancy };
                                            vacancy.location = text.charAt(0).toUpperCase() + text.slice(1);
                                            this.setState({ vacancy });
                                        }
                                    }
                                />
                                <TextInput
                                    style={[{ flex: 2 }, Styles.input, Styles.cardC]}
                                    placeholder="Experience:"
                                    onChangeText={
                                        text => {
                                            let vacancy = { ...this.state.vacancy };
                                            vacancy.experience = text.charAt(0).toUpperCase() + text.slice(1);
                                            this.setState({ vacancy });
                                        }
                                    }
                                />
                            </View>
                            <View style={[{ padding: 5 }, Styles.container]}>
                                <TextInput
                                    style={[{ justifyContent: 'flex-start', textAlignVertical: 'top' }, Styles.inputCustom, Styles.cardC]}
                                    placeholder="Job details and reqirements:"
                                    multiline={true}
                                    numberOfLines={3}
                                    onChangeText={
                                        text => {
                                            let vacancy = { ...this.state.vacancy };
                                            vacancy.summary = text.charAt(0).toUpperCase() + text.slice(1);
                                            this.setState({ vacancy });
                                        }
                                    }
                                />
                            </View>
                        </View>

                        <Button
                            title="Post"
                            type="solid"
                            buttonStyle={{ height: 70, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }}
                            onPress={()=> fn.postJob(this.state.vacancy, 'Vacancy Posted')}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

export class Prelim extends Component<PrelProps, PerlState> {
    constructor(props: any) {
        super(props);
        this.state = {
            prelim: { title: null, location: null, date: null, summary: null, user: null, job: 'Prelim', id: 0, type: 'Post Process' },
            type: ['Post Process', 'Post Brief'],
        };
    }

    componentDidMount(){
        AsyncStorage.getItem('user').then((u: any)=>{
            let prelim = {...this.state.prelim};
            prelim.user = u;
            this.setState({prelim});
        });
    }


    render(){
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <KeyboardAvoidingView>
                    <View style={Styles.container} >
                        <View style={Styles.containerPaddingMargin}>
                            <View>
                                <TextInput
                                    style={[{marginTop: -2}, Styles.input, Styles.cardC]}
                                    placeholder="Title:"
                                    onChangeText={
                                        text => {
                                            let prelim = { ...this.state.prelim };
                                            prelim.title = text.charAt(0).toUpperCase() + text.slice(1);
                                            this.setState({ prelim });
                                        }
                                    }
                                />
                            </View>

                            <View style={[Styles.input, Styles.cardC]}>
                                <Picker
                                    selectedValue={this.state.prelim.type}
                                    mode="dropdown"
                                    onValueChange={(text) =>{
                                        let prelim = {...this.state.prelim};
                                        prelim.type = text;
                                        this.setState({prelim});
                                    }
                                    }>
                                    <Picker.Item label="Post Process" value="Post Process" />
                                    <Picker.Item label="Post Brief" value="Post Brief" />
                                </Picker>
                            </View>

                            <View>
                                <TextInput
                                    style={[Styles.input, Styles.cardC]}
                                    placeholder="Location:"
                                    onChangeText={
                                        text => {
                                            let prelim = { ...this.state.prelim };
                                            prelim.location = text.charAt(0).toUpperCase() + text.slice(1);
                                            this.setState({ prelim });
                                        }
                                    }
                                />
                            </View>
                            <View>
                                <TextInput
                                    style={[Styles.input, Styles.cardC]}
                                    placeholder="Date:"
                                    onChangeText={
                                        text => {
                                            let prelim = { ...this.state.prelim };
                                            prelim.date = text.charAt(0).toUpperCase() + text.slice(1);
                                            this.setState({ prelim });
                                        }
                                    }
                                />
                            </View>
                            <View style={[{ padding: 5 }, Styles.container]}>
                                <TextInput
                                    style={[{ textAlignVertical: 'top' }, Styles.inputCustom, Styles.cardC]}
                                    placeholder="Summary:"
                                    multiline={true}
                                    numberOfLines={3}
                                    underlineColorAndroid="transparent"
                                    onChangeText={
                                        text => {
                                            let prelim = { ...this.state.prelim };
                                            prelim.summary = text.charAt(0).toUpperCase() + text.slice(1);
                                            this.setState({ prelim });
                                        }
                                    }

                                />
                            </View>

                            <Button
                                title="Post"
                                type="solid"
                                buttonStyle={{ height: 70, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }}
                                onPress={()=> fn.postJob(this.state.prelim, 'Prelim Posted')}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

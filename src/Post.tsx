/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
     KeyboardAvoidingView,
    ToastAndroid,
} from 'react-native';
import { Styles } from './functions/styles';
import { Button } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';


export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Jobs: [
                { name: 'Vacancy', modal: false, icon: require('./assets/img/vacancy.png'), route: 'Vacancy' },
                { name: 'Appeal', modal: false, icon: require('./assets/img/compliant.png'), route: 'Appeal' },
            ],
        };
    }

    componentDidMount() {
        this.getUser('vacancy', this.state.vacancy);
        this.getUser('appeal', this.state.appeal);
    }

    getUser = async (stateData,state) => {
        let value = await AsyncStorage.getItem('user');
        if (value) {
            let data = { ...state };
            data.user = value;
            this.setState({ [stateData]: data });
        }
    }

    modalOpen = (index) => {
        const Jobs = [...this.state.Jobs];
        if (Jobs[index].modal === false) {
            Jobs[index].modal = true;
            this.setState({ Jobs });
            this.setState({ home: false });
        } else if (Jobs[index].modal === true) {
            Jobs[index].modal = false;
            this.setState({ Jobs });
            this.setState({ home: true });
        }
    }



    render() {
        return (
            <ScrollView>
                <View style={[{backgroundColor: 'white'}, Styles.containerRow]}>
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
export class Vacancy extends Component {
    constructor(props) {
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


    postJob = (data) => {
        let Jobs = firestore().collection('Jobs');
        console.log(data);
        for (let x in data) {
            if (data[x] != null) {
                Jobs.doc('All').get().then(e => {
                    if (e.exists) {
                        let jobs = [...e.data().all];
                        data.id = jobs[jobs.length - 1].id + 1;
                        jobs.unshift(data);
                        Jobs.doc('All').update({
                            all: jobs,
                        }).then(()=>{
                            ToastAndroid.show('Appeal Posted', ToastAndroid.TOP);
                            data[x] = null;
                        });
                    } else {
                        Jobs.doc('All').set({all: [data]}).then(()=>{
                            ToastAndroid.show('Appeal Posted', ToastAndroid.TOP);
                            data[x] = null;
                        });
                    }
                });
            }
        }
    }

    render(){
        return (
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style={Styles.container} >
                        <View style={Styles.containerPaddingMargin}>
                            <View>
                                <TextInput
                                    style={Styles.input}
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
                                    style={[{ flex: 2 }, Styles.input]}
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
                                    style={[{ flex: 2 }, Styles.input]}
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
                                    style={[{ flex: 2 }, Styles.input]}
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
                                    style={[{ flex: 2 }, Styles.input]}
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
                                    style={[{ justifyContent: 'flex-start', textAlignVertical: 'top', backgroundColor: '#ebedf0' }, Styles.inputCustom]}
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
                            onPress={()=> this.postJob(this.state.vacancy)}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

export class Appeal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appeal: { title: null, location: null, date: null, summary: null, user: null, job: 'Appeal', id: 0 },
        };
    }

    componentDidMount(){
        AsyncStorage.getItem('user').then(u=>{
            let appeal = {...this.state.appeal};
            appeal.user = u;
            this.setState({appeal});
        });
    }

    postJob = (data) => {
        let Jobs = firestore().collection('Jobs');
        for (let x of data) {
            if (data[x] !== null) {
                Jobs.doc('All').get().then(e => {
                    if (e.exists) {
                        let jobs = [...e.data().all];
                        data.id = jobs[jobs.length - 1].id + 1;
                        jobs.unshift(data);
                        Jobs.doc('All').update({
                            all: jobs,
                        }).then(()=>{
                            ToastAndroid.show('Appeal Posted', ToastAndroid.TOP);
                            data[x] = null;
                        });
                    } else {
                        Jobs.doc('All').set({all: [data]}).then(()=>{
                            ToastAndroid.show('Appeal Posted', ToastAndroid.TOP);
                            data[x] = null;
                        });
                    }
                });
            }
        }
    }

    render(){
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <KeyboardAvoidingView>
                    <View style={Styles.container} >
                        <View style={Styles.containerPaddingMargin}>
                            <View>
                                <TextInput
                                    style={Styles.input}
                                    placeholder="Title:"
                                    onChangeText={
                                        text => {
                                            let appeal = { ...this.state.appeal };
                                            appeal.title = text.charAt(0).toUpperCase() + text.slice(1);
                                            this.setState({ appeal });
                                        }
                                    }
                                />
                            </View>
                            <View>
                                <TextInput
                                    style={Styles.input}
                                    placeholder="Location:"
                                    onChangeText={
                                        text => {
                                            let appeal = { ...this.state.appeal };
                                            appeal.location = text.charAt(0).toUpperCase() + text.slice(1);
                                            this.setState({ appeal });
                                        }
                                    }
                                />
                            </View>
                            <View>
                                <TextInput
                                    style={Styles.input}
                                    placeholder="Date:"
                                    onChangeText={
                                        text => {
                                            let appeal = { ...this.state.appeal };
                                            appeal.date = text.charAt(0).toUpperCase() + text.slice(1);
                                            this.setState({ appeal });
                                        }
                                    }
                                />
                            </View>
                            <View style={[{ padding: 5 }, Styles.container]}>
                                <TextInput
                                    style={[{ textAlignVertical: 'top', backgroundColor: '#ebedf0' }, Styles.inputCustom]}
                                    placeholder="Summary:"
                                    multiline={true}
                                    numberOfLines={3}
                                    underlineColorAndroid="transparent"
                                    onChangeText={
                                        text => {
                                            let appeal = { ...this.state.appeal };
                                            appeal.summary = text.charAt(0).toUpperCase() + text.slice(1);
                                            this.setState({ appeal });
                                        }
                                    }

                                />
                            </View>

                            <Button
                                title="Post"
                                type="solid"
                                buttonStyle={{ height: 70, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }}
                                onPress={()=> this.postJob(this.state.appeal)}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

import React, { Component } from 'react';
import { View, Modal, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Styles } from "./functions/styles";
import { Button } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';



export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Jobs: [
                { name: 'Vacancy', modal: false, icon: require('./assets/img/vacancy.png') },
                { name: 'Appeal', modal: false, icon: require('./assets/img/compliant.png') },
                { name: 'Vacancy', modal: false, icon: require('./assets/img/vacancy.png') },
                { name: 'Vacancy', modal: false, icon: require('./assets/img/vacancy.png') },
            ],
            home: true,
            vacancy: { title: null, position: null, salary: null, location: null, experience: null }

        }
    }

    modalOpen = (index) => {
        const Jobs = [...this.state.Jobs]
        if (Jobs[index].modal === false) {
            Jobs[index].modal = true;
            this.setState({ Jobs })
            this.setState({ home: false })
        } else if (Jobs[index].modal === true) {
            Jobs[index].modal = false;
            this.setState({ Jobs })
            this.setState({ home: true })
        }
    }

    postJob = (type,data) => {
        let Jobs = firestore().collection('Jobs')
        let dataStream = { ...data, type: type }
        for (let x in dataStream) {
            if (dataStream.type === 'Appeal' && data[x] != "" ) {
                
            }
        }
    }

    Home = (view) => {
        if (view) {
            return (
                <View>
                    <View style={Styles.containerRow}>
                        <TouchableOpacity
                            android_disableSound={true}
                            style={Styles.nav}
                            onPress={() => this.modalOpen(0)}>
                            <Image source={this.state.Jobs[0].icon} style={Styles.image} />
                            <Text style={Styles.navText}>{this.state.Jobs[0].name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            android_disableSound={true}
                            style={Styles.nav}
                            onPress={() => this.modalOpen(1)}>
                            <Image source={this.state.Jobs[1].icon} style={Styles.image} />
                            <Text style={Styles.navText}>{this.state.Jobs[1].name}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }


    // fore serurity reasons i advise only lincensce confirmed lawyers are allowed access
    vacancy = (view) => {
        if (view) {
            return (
                <ScrollView>
                    <KeyboardAvoidingView>
                        <View style={Styles.container} >
                            <View style={Styles.containerPaddingMargin}>
                                <View>
                                    <TouchableOpacity style={Styles.button} onPress={() => this.modalOpen(0)}>
                                        <Text style={[{ color: 'white' }, Styles.buttonText]}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TextInput
                                        style={Styles.input}
                                        placeholder="Title:"
                                        onChangeText={
                                            text => {
                                                let vacancy = { ...this.state.vacancy }
                                                vacancy.title = text
                                                this.setState({ vacancy })
                                            }
                                        }
                                    />
                                </View>
                                <View style={Styles.containerRow} >
                                    <TextInput
                                        style={[{ flex: 2 }, Styles.input]}
                                        placeholder="Position:"
                                        onChangeText={
                                            text => {
                                                let vacancy = { ...this.state.vacancy }
                                                vacancy.position = text
                                                this.setState({ vacancy })
                                            }
                                        }
                                    />
                                    <TextInput
                                        style={[{ flex: 2 }, Styles.input]}
                                        placeholder="Salary:"
                                        onChangeText={
                                            text => {
                                                let vacancy = { ...this.state.vacancy }
                                                vacancy.salary = text
                                                this.setState({ vacancy })
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
                                                let vacancy = { ...this.state.vacancy }
                                                vacancy.location = text
                                                this.setState({ vacancy })
                                            }
                                        }
                                    />
                                    <TextInput
                                        style={[{ flex: 2 }, Styles.input]}
                                        placeholder="Experience:"
                                        onChangeText={
                                            text => {
                                                let vacancy = { ...this.state.vacancy }
                                                vacancy.experience = text
                                                this.setState({ vacancy })
                                            }
                                        }
                                    />
                                </View>
                                <View style={[{ padding: 5 }, Styles.container]}>
                                    <TextInput
                                        style={[{ justifyContent: 'flex-start', textAlignVertical: 'top' }, Styles.inputCustom]}
                                        placeholder="Summary:"
                                        multiline={true}
                                        numberOfLines={10}
                                        placeholderTextColor='grey'
                                        underlineColorAndroid='transparent'
                         
                                    />
                                </View>

                                <Button title="Post" type="solid" buttonStyle={{ height: 70, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }} />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            )
        }
    }

    appeal = (view) => {
        if (view) {
            return (
                <ScrollView>
                    <KeyboardAvoidingView>
                        <View style={Styles.container} >
                            <View style={Styles.containerPaddingMargin}>
                                <View>
                                    <TouchableOpacity style={Styles.button} onPress={() => this.modalOpen(1)}>
                                        <Text style={[{ color: 'white' }, Styles.buttonText]}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TextInput style={Styles.input} placeholder="Title:" />
                                </View>
                                <View>
                                    <TextInput style={Styles.input} placeholder="Location:" />
                                </View>
                                <View>
                                    <TextInput style={Styles.input} placeholder="Date:" />
                                </View>
                                <View>
                                    <TextInput style={[Styles.inputCustom]} placeholder="Summary:" multiline={true} numberOfLines={5} />
                                </View>

                                <Button title="Post" type="solid" buttonStyle={{ height: 70, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }} />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style={Styles.container}>
                        {
                            this.Home(this.state.home)
                        }
                        {
                            this.vacancy(this.state.Jobs[0].modal)
                        }
                        {
                            this.appeal(this.state.Jobs[1].modal)
                        }
                </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}


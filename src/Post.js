import React, { Component } from 'react';
import { View, Modal, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Styles } from "./functions/styles";
import { Button } from 'react-native-elements';

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

    Home = (view) => {
        if (view) {
            return (
                <View>
                    <View style={Styles.homeContainer}>
                        <TouchableOpacity
                            android_disableSound={true}
                            style={Styles.coloumn}
                            onPress={() => this.modalOpen(0)}>
                            <Image source={this.state.Jobs[0].icon} style={Styles.icon} />
                            <Text style={Styles.navText}>{this.state.Jobs[0].name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            android_disableSound={true}
                            style={Styles.coloumn}
                            onPress={() => this.modalOpen(1)}>
                            <Image source={this.state.Jobs[1].icon} style={Styles.icon} />
                            <Text style={Styles.navText}>{this.state.Jobs[1].name}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

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

    appeal = () => {
        return (
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style={Styles.container} >
                        <Modal
                            animationType="slide"
                            visible={this.state.Jobs[1].modal}
                        >
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
                                    <TextInput style={Styles.input} placeholder="Position:" />
                                </View>
                                <View>
                                    <TextInput style={Styles.input} placeholder="Salary:" />
                                </View>
                                <View style={{ margin: 10 }}>
                                    <TextInput style={[{ height: 130 }, Styles.inputCustom]} placeholder="Summary:" multiline={true} numberOfLines={10} />
                                </View>

                                <Button title="Post" type="solid" buttonStyle={{ height: 70, margin: 5, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 20, width: 180, alignSelf: 'center' }} />
                            </View>
                        </Modal>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
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


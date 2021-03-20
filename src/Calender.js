import React, { Component } from 'react';
import { View, Dimensions, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Styles } from './functions/styles';
import { Button } from 'react-native-elements';


export default class Calender extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            add: false,
        };
        this.modal = this.modal.bind(this)
    }

    modal = () => {
        if (this.state.add === false) {
            this.setState({ add: true });
        } else if (this.state.add === true) {
            this.setState({ add: false });
        }
    }

    render() {
        if (this.state.add) {
            return (
                <Add modal={this.modal} />
            )
        } else {
            return (
                <Home modal={this.modal} />    
            )
        }
    }
}

class Home extends Component {

    render() {
        return (
            <View style={Styles.container}>
                <Agenda style={{ height: Dimensions.get('window').height }} />
                <View style={Styles.modal}>
                    <TouchableOpacity
                        style={Styles.button}
                        onPress={()=>this.props.modal()}
                    >
                        <Text style={[{ color: 'white', }, Styles.buttonText]}>Add Event</Text>
                    </TouchableOpacity>
                </View>
            </View>   
         )
    }
}

class Add extends Component {
    render() {
        return (
            <View style={[Styles.container]}>
                <View>
                    <TouchableOpacity style={Styles.button} onPress={()=>this.props.modal()}>
                        <Text style={[{ color: 'white' }, Styles.buttonText]}>Close</Text>
                    </TouchableOpacity>
                </View>
                <View style={Styles.containerPadding}>
                    <TextInput style={Styles.input} placeholder="Title:" />
                </View>
                <View style={[Styles.containerRow]}>
                    <TextInput style={[{ flex: 2 }, Styles.input]} placeholder="Start:" />
                    <TextInput style={[{ flex: 2 }, Styles.input]} placeholder="End:" />
                </View>
                <View style={Styles.container}>
                    <TextInput style={[Styles.inputCustom]} placeholder="Event:" multiline={true} numberOfLines={10} />
                </View>

                <Button title="Create" type="solid" buttonStyle={{ height: 70, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 30, width: 180, alignSelf: 'center' }} />
            </View>    
        )
    }
}
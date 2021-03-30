/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { Styles } from './component/styles';
import { Button } from 'react-native-elements';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {AgendaState, AgendaProps, AddagendaProps, AddagendaState } from './component/types';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';



export default class Agenda extends Component<AgendaProps, AgendaState> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedStartDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }


    onDateChange(date: any) {
        this.setState({
          selectedStartDate: date,
        });
      }

    render() {
        return (
            <View style={[{backgroundColor: 'white'}, Styles.container]}>
                <CalendarPicker
                    onDateChange={this.onDateChange}
                />
                <View style={Styles.modal}>
                    <TouchableOpacity
                        style={Styles.button}
                        onPress={()=>this.props.navigation.navigate('Add Agenda')}
                    >
                    <Text style={[{ color: 'white'}, Styles.buttonText]}>Add Event</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export class AddAgenda extends Component<AddagendaProps, AddagendaState> {
    constructor(props: any) {
        super(props);
        this.state = {
            date: new Date(1598051730000),
            agendas: {},
        };
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <View style={[{margin: 10}, Styles.container]}>
                <View style={Styles.container}>
                    <TextInput style={[{height: 70}, Styles.cardC]} placeholder="Title:" />
                </View>
                <View style={[Styles.containerRow]}>
                <RNDateTimePicker mode="time" value={this.state.date} />
                    <TextInput style={[{ flex: 2, height: 70 }, Styles.cardC]} placeholder="End:" />
                </View>
                <View style={[{ padding: 5 }, Styles.container]}>
                    <TextInput
                        style={[{ justifyContent: 'flex-start', textAlignVertical: 'top', height: 80 }, Styles.cardC]}
                        placeholder="Summary:"
                        multiline={true}
                        numberOfLines={3}
                        onChangeText={
                            text => {
                                let agendas = { ...this.state.agendas };
                                agendas.summary = text.charAt(0).toUpperCase() + text.slice(1);
                                this.setState({ agendas });
                            }
                        }
                    />
                </View>

                <Button title="Add Event" type="solid" buttonStyle={{ height: 55, margin: 10, fontSize: 20, fontWeight: 'bold', backgroundColor: '#161b22', marginTop: 30, width: 180, alignSelf: 'center' }} />
            </View>
            </ScrollView>
        );
    }
}

/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Agenda} from 'react-native-calendars';
import { Styles } from './component/styles';
import { Button } from 'react-native-elements';
import {
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';



interface CalendarProps {
    navigation: any
    view: any
}

interface CalendarState {
    add: any
}

export default class Calender extends Component<CalendarProps, CalendarState> {
    constructor(props: any) {
        super(props);
        this.state = {
            add: false,
        };
        this.modal = this.modal.bind(this);
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
                <Add view={this.modal} />
            );
        } else {
            return (
                <Home view={this.modal} />
            );
        }
    }
}


interface HomeProps {
    view: any
}

class Home extends Component<HomeProps> {

    render() {
        return (
            <View style={[{backgroundColor: 'white'}, Styles.container]}>
                <Agenda style={{ height: Dimensions.get('window').height }} />
                <View style={Styles.modal}>
                    <TouchableOpacity
                        style={Styles.button}
                        onPress={()=>this.props.view()}
                    >
                        <Text style={[{ color: 'white', }, Styles.buttonText]}>Add Event</Text>
                    </TouchableOpacity>
                </View>
            </View>
         );
    }
}


interface AddProps {
    view: any
}

class Add extends Component<AddProps> {
    render() {
        return (
            <View style={[{backgroundColor: 'white'}, Styles.container]}>
                <View>
                    <TouchableOpacity style={Styles.button} onPress={()=>this.props.view()}>
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
        );
    }
}
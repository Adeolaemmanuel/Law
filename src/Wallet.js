import React, { Component } from 'react';
import {ScrollView, View, Text} from 'react-native';
import { Card } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { Styles } from './functions/styles';


export default class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
        }
    }
    
    render() {
        return (
            <ScrollView>
                <View style={Styles.container}>
                    <View style={Styles.card}>
                        <View style={Styles.cardD}>
                            <Text style={{ fontSize: 50 }}>₦ {this.state.balance}</Text>
                        </View>
                        <View style={{ margin: 5, padding: 5 , justifyContent: 'flex-end', alignContent: 'flex-end', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 20 }}>Adeola Emmanuel</Text>
                        </View>
                    </View>
                    <View style={Styles.container}>
                        <TextInput placeholder="Card Number:" style={Styles.input} />
                    </View>
                    <View style={Styles.containerRow}>
                        <TextInput placeholder="First Name:" style={[{ flex: 1 }, Styles.input]} />
                        <TextInput placeholder="Last Name:" style={[{ flex: 1 }, Styles.input]} />
                    </View>
                    <View style={Styles.containerRow}>
                        <TextInput placeholder="Ex:" style={[{ flex: 1 }, Styles.input]} />
                        <TextInput placeholder="Card Number:" style={[{ flex: 1 }, Styles.input]} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}


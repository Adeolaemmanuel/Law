import React from 'react';
import { Component } from 'react';
import { Styles } from './component/styles';
import {ScrollView, View, Text, TextInput} from 'react-native';

interface WalletProps {
    navigation: any
}

interface WalletState {
    balance: number
}


export default class Wallet extends Component<WalletProps, WalletState> {
    constructor(props: any) {
        super(props);
        this.state = {
            balance: 0,
        };
    }



    render() {
        return (
            <ScrollView>
                <View style={Styles.container}>
                    <View style={Styles.card}>
                        <View style={Styles.cardD}>
                            <Text style={{ fontSize: 50 }}>₦ {this.state.balance}</Text>
                        </View>
                        <View style={{ margin: 5, padding: 5, alignSelf: 'flex-end', marginTop: 10 }}>
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


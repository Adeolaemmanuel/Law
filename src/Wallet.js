import React, { Component } from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import { Card } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';


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
                <View style={styles.container}>
                    <Card>
                        <View style={styles.cardD}>
                            <View>
                                <Text style={{fontSize: 50}}>₦ {this.state.balance}</Text>
                            </View>
                        </View>
                        <View style={styles.name}>
                            <View>
                                <Text style={{fontSize: 20}}>Adeola Emmanuel</Text>
                            </View>
                        </View>
                    </Card>
                    <View style={styles.inputCon}>
                        <TextInput placeholder="Card Number:" style={{width: '90%', borderColor: 'green', borderRadius: 5, borderWidth: 1, margin: 20, marginTop: 40}} />
                    </View>
                    <View style={styles.inputCon}>
                        <TextInput placeholder="First Name:" style={styles.input} />
                        <TextInput placeholder="Last Name:" style={styles.input} />
                    </View>
                    <View style={styles.inputCon}>
                        <TextInput placeholder="Card Number:" style={styles.input} />
                        <TextInput placeholder="Card Number:" style={styles.input} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardD: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 20,
    },
    name: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        marginTop: 25,
        marginBottom: 10,
    },
    inputCon: {
        flex: 1,
        flexDirection: 'row',
    },
    input: {
        width: '46%',
        height: 50,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: 'green',
        margin: 10,
        padding: 10,
    },
});

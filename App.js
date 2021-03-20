import React, {Component} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Nav, getHeaderTitle } from './src/functions/navigation';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <NavigationContainer>
                <Nav  options={({ route }) => ({
                        headerTitle: getHeaderTitle(route,'drawer'),
                        headerTitleAlign: 'center',
                        })}
                />
            </NavigationContainer>
        );
    }
}

export default App;

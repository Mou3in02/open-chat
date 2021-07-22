import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from "./src/containers/home/Home";
import Room from "./src/containers/room/Room";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="Room" component={Room} options={({ route }) => ({
                    title: route.params.name,
                    headerStyle: {
                        backgroundColor: '#FE1495',
                    },
                    headerTitleStyle:{
                        color: '#fff'
                    },
                    headerTintColor: '#fff'
                })}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

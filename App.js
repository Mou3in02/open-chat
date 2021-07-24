import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from "./src/containers/home/Home";
import Room from "./src/containers/room/Room";
import Login from "./src/containers/login/Login";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="Room" component={Room} options={({ route }) => ({
                    title: route.params.name,
                    headerStyle: {
                        backgroundColor: '#52006A',
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

import React, {useState} from "react";
import {View, TouchableOpacity, StatusBar, Text, TextInput} from "react-native";
import Styles from './styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


const Login = () => {

    return (
        <KeyboardAwareScrollView  contentContainerStyle={{flexGrow:1,backgroundColor: '#fff'}}>
            <StatusBar backgroundColor={'#52006A'}/>
            {/*<View style={Styles.containerView}>*/}
                <View style={Styles.headerView}>
                    <FontAwesome5 name={'user-lock'} color={'#52006A'} size={40}/>
                    <Text style={Styles.loginText}>Sign In</Text>
                </View>
                <View style={Styles.bodyView}>
                    <Text style={Styles.labelText}>Email address</Text>
                    <TextInput onChangeText={()=>{}} style={Styles.emailInput} />
                    <Text style={Styles.labelText}>Password</Text>
                    <TextInput onChangeText={()=>{}} style={Styles.passwordInput} secureTextEntry={true}/>
                </View>
                <View style={Styles.footerView}>
                    <TouchableOpacity style={Styles.loginBtn}>
                        <Text style={Styles.loginBtnText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.forgetBtn}>
                        <Text style={Styles.forgetBtnText}>Forget password !</Text>
                    </TouchableOpacity>
                </View>
            {/*</View>*/}
        </KeyboardAwareScrollView>
    )
}

export default Login

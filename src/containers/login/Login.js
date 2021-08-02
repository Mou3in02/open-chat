import React, {useState, useEffect} from "react";
import {View, TouchableOpacity, StatusBar, Text, TextInput, ActivityIndicator} from "react-native";
import Styles from './styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import isEmpty from "validator/es/lib/isEmpty";
import isEmail from "validator/es/lib/isEmail";
import Toast from "react-native-simple-toast";
import AxiosInstance from "../../../network/AxiosInstance";


const Login = (props) => {

    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        AxiosInstance.get('/')
            .then(() => {
                props.navigation.push('home')
            })
            .catch((error) => {
                if (error.response.status === 401){
                    setIsLoaded(true)
                }
            })
    }, [])

    const onClickLogin = () => {
        setEmailError(false)
        setPasswordError(false)
        if (isEmpty(emailInput) || isEmpty(emailInput.trim()) || !isEmail(emailInput)) {
            Toast.show('Email address is not valid !')
            setEmailInput('')
            setEmailError(true)
        } else if (isEmpty(passwordInput) || isEmpty(passwordInput.trim())) {
            Toast.show('Password must be not empty !')
            setPasswordInput('')
            setPasswordError(true)
        } else {
            console.log(emailInput, passwordInput)
            setEmailInput('')
            setPasswordInput('')
        }
    }
    const goToRegister = () => {
        props.navigation.push('Register')
    }

    return (
        !isLoaded ?
            <View style={{backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={'#52006A'} size={'large'} />
                <StatusBar backgroundColor={'#52006A'}/>
            </View>
            :
            <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#fff'}}>
                <StatusBar backgroundColor={'#52006A'}/>
                <View style={Styles.headerView}>
                    <FontAwesome5 name={'user-lock'} color={'#52006A'} size={40}/>
                    <Text style={Styles.loginText}>Open Chat</Text>
                </View>
                <View style={Styles.bodyView}>
                    <Text style={Styles.labelText}>Email address</Text>
                    <TextInput onChangeText={(text) => {
                        setEmailInput(text)
                    }} style={[Styles.emailInput, emailError && {borderColor: 'red'}]} value={emailInput}/>
                    <Text style={Styles.labelText}>Password</Text>
                    <TextInput onChangeText={(text) => {
                        setPasswordInput(text)
                    }} style={[Styles.passwordInput, passwordError && {borderColor: 'red'}]} value={passwordInput}
                               secureTextEntry={true}/>
                </View>
                <View style={Styles.footerView}>
                    <TouchableOpacity style={Styles.loginBtn} onPress={onClickLogin}>
                        <Text style={Styles.loginBtnText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.forgetBtn} onPress={goToRegister}>
                        <Text style={Styles.forgetBtnText}>Register now</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
    )
}

export default Login

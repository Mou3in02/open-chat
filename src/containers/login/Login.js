import React, {useState, useEffect} from "react";
import {View, TouchableOpacity, StatusBar, Text, TextInput, ActivityIndicator} from "react-native";
import Styles from './styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import isEmpty from "validator/es/lib/isEmpty";
import isEmail from "validator/es/lib/isEmail";
import Toast from "react-native-simple-toast";
import AxiosInstance from "../../../network/AxiosInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = (props) => {

    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)

    const setToken = async (token) => {
        try {
            await AsyncStorage.setItem('token', token)
            props.navigation.push('Home')
        } catch (error) {
            throw error
        }
    }

    const onClickLogin = () => {
        setShowSpinner(true)
        setEmailError(false)
        setPasswordError(false)
        if (isEmpty(emailInput) || isEmpty(emailInput.trim()) || !isEmail(emailInput)) {
            Toast.show('Email address is not valid !')
            setEmailInput('')
            setEmailError(true)
            setShowSpinner(false)
        } else if (isEmpty(passwordInput) || isEmpty(passwordInput.trim())) {
            Toast.show('Password must be not empty !')
            setPasswordInput('')
            setPasswordError(true)
            setShowSpinner(false)
        } else {
            AxiosInstance.post('/login', {
                email: emailInput,
                password: passwordInput
            }).then((response) => {
                setShowSpinner(false)
                setToken(response.data.token)
            }).catch(() => {
                Toast.LONG('Email address or password is invalid !')
                setShowSpinner(false)
            })
        }
    }
    const goToRegister = () => {
        props.navigation.push('Register')
    }

    return (
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
                    {showSpinner && <ActivityIndicator color={'#fff'} size={'small'}/>}
                </TouchableOpacity>
                <TouchableOpacity style={Styles.forgetBtn} onPress={goToRegister}>
                    <Text style={Styles.forgetBtnText}>Register now</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Login

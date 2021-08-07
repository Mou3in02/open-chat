import React, {useState} from "react";
import {View, TouchableOpacity, StatusBar, Text, TextInput} from "react-native";
import Styles from './styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import isEmpty from "validator/es/lib/isEmpty";
import isEmail from "validator/es/lib/isEmail";
import Toast from "react-native-simple-toast";
import AxiosInstance from "../../../network/AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = (props) => {

    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const onClickLogin = async () => {
        setEmailError(false)
        setPasswordError(false)
        if (isEmpty(emailInput) || isEmpty(emailInput.trim()) || !isEmail(emailInput)){
            Toast.show('Email address is not valid !')
            setEmailInput('')
            setEmailError(true)
        }
        else if (isEmpty(passwordInput) || isEmpty(passwordInput.trim())){
            Toast.show('Password must be not empty !')
            setPasswordInput('')
            setPasswordError(true)
        }
        else {
            AxiosInstance.post('/users/add',{
                email: emailInput,
                password: passwordInput
            }).then((response) => {
                successRegister(response)
            }).catch((error) => {
                if (error.response.status === 400){
                    setEmailError(true)
                    Toast.show('Email is already exists !',Toast.LONG)
                }
                else if(error.response.status === 500){
                    Toast.show('Server error !',Toast.LONG)
                    throw new Error(error)
                }
            })
        }
    }
    const goToLogin = () => {
        props.navigation.push('Login')
    }
    const successRegister = async (response) => {
        try {
            const {token} = response.data
            await AsyncStorage.setItem('token',token)
            props.navigation.push('Home')
        }catch (error) {
            Toast.show('AsyncStorage error !',Toast.LONG)
            throw new Error(error)
        }
    }

    return (
        <KeyboardAwareScrollView  contentContainerStyle={{flexGrow:1,backgroundColor: '#fff'}}>
            <StatusBar backgroundColor={'#52006A'}/>
            <View style={Styles.headerView}>
                <FontAwesome5 name={'user-plus'} color={'#52006A'} size={40}/>
                <Text style={Styles.loginText}>Register</Text>
            </View>
            <View style={Styles.bodyView}>
                <Text style={Styles.labelText}>Email address</Text>
                <TextInput onChangeText={(text)=>{setEmailInput(text)}} style={[Styles.emailInput, emailError && {borderColor: 'red'}]} value={emailInput} />
                <Text style={Styles.labelText}>Password</Text>
                <TextInput onChangeText={(text)=>{setPasswordInput(text)}} style={[Styles.passwordInput, passwordError && {borderColor: 'red'}]} value={passwordInput} secureTextEntry={true}/>
            </View>
            <View style={Styles.footerView}>
                <TouchableOpacity style={Styles.loginBtn} onPress={onClickLogin}>
                    <Text style={Styles.loginBtnText}>Register now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.forgetBtn} onPress={goToLogin} >
                    <Text style={Styles.forgetBtnText}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Login

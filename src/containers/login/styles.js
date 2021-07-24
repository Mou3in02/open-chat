import {StyleSheet, Dimensions, StatusBar} from "react-native";

const Styles = StyleSheet.create({
    containerView:{
        // flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // backgroundColor: '#fff',
    },
    headerView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height/3 - StatusBar.currentHeight
    },
    loginText:{
        fontSize: 30,
        color: '#52006A',
        marginLeft: 10
    },
    bodyView:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height/3 - StatusBar.currentHeight
    },
    labelText:{
        color: '#52006A',
        fontSize: 15,
        alignSelf: 'flex-start',
        marginLeft: '10%'
    },
    emailInput:{
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#52006A',
        marginVertical: 10,
        borderRadius: 50,
        color: '#52006A'
    },
    passwordInput:{
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#52006A',
        marginVertical: 10,
        borderRadius: 50,
        color: '#52006A'
    },
    footerView:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height/3 - StatusBar.currentHeight
    },
    loginBtn:{
        backgroundColor: '#52006A',
        paddingVertical: 12,
        width: '80%',
        borderRadius: 50,
    },
    loginBtnText:{
        color: '#fff',
        fontSize: 17,
        textAlign: 'center'
    },
    forgetBtn:{
        marginTop: 10,
        backgroundColor: '#fff',
        paddingVertical: 12,
        width: '80%',
        borderRadius: 50,
    },
    forgetBtnText:{
        color: '#52006A',
        fontSize: 14,
        textAlign: 'center',
    }
})
export default Styles

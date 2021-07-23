import {StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
    viewContainer:{
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column'
    },
    addMessageView:{
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 9999,
        height: 55,
        backgroundColor: '#52006A',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10

    },
    addMessageInput:{
        width: '80%',
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 50,
        color: '#4A47A3',
        fontSize: 16
    }
})

export default Styles

import {StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
    homeView:{
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column' //default
    },
    addView: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backgroundColor: '#52006A',
        position: 'absolute',
        height: 60,
        width: 60,
        bottom: '5%',
        right: '5%',
        borderRadius: 50
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#52006A',
        height: 60
    },
    homeTitle:{
        fontSize: 20,
        color: '#fff',
        marginLeft: 10
    },
    searchInput: {
        marginLeft: 10,
        width: '80%',
        paddingVertical: 6,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 50,
        fontSize: 18,
        color: '#4A47A3',
        letterSpacing: .5,
        textDecorationLine: 'none'
    },
    searchIcon:{
        marginRight: 10
    },
    roomTitle: {
        fontSize: 18,
        color: '#4A47A3',
        margin: 10,
        backgroundColor: '#EDEEF7',
        borderColor: '#999',
        borderWidth: 1,
        padding: 12,
        borderRadius: 20,
        textAlign: 'center',
        flexDirection: 'row'
    },
    newRoomTxt: {
        fontSize: 18,
        marginLeft: 5,
        color: '#fff'
    },
    viewModal: {
        flexDirection: 'column',
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        color: '#4A47A3'
    },
    inputRoomName: {
        borderWidth: 1,
        borderColor: '#52006A',
        borderRadius: 10,
        width: '80%',
        paddingHorizontal: 30,
        paddingVertical: 10,
        fontSize: 18,
        color: '#52006A'

    },
    modalAction: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    add: {
        backgroundColor: '#52006A',
        fontSize: 18,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        color: '#fff'
    },
    cancel: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#999',
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        color: '#666'
    }
})

export default Styles

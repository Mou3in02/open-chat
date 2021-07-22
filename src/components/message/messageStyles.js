import {StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
    messageView:{
        alignSelf: 'flex-end',
        margin: 10,
    },
    messageContent:{
        fontSize: 14,
        color: '#666',
        borderRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // backgroundColor: '#eee',
        padding: 15,
        borderWidth: 1,
        borderColor: '#999',
        maxWidth: '80%'
    },
    createdByText:{
        fontSize: 13,
        color: '#4A47A3',

    }
})

export default Styles

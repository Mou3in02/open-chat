import {StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
    messageView:{
        flexDirection: 'column',
        margin: 10,
    },
    contentView:{
        flexDirection: 'row',
        // backgroundColor: '#eee'
    },
    authorView:{
        flexDirection: 'row',
    },
    messageContent:{
        fontSize: 14,
        color: '#4A47A3',
        borderRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 15,
    },
    createdByText:{
        fontSize: 13,
        color: '#52006A',

    }
})

export default Styles

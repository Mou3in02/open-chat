import React from 'react'
import {View, FlatList, Text, TouchableOpacity, ScrollView} from 'react-native'
import Styles from "./messageStyles";


const Message = (props) => {

    return (
        <View style={Styles.messageView}>
            <Text style={Styles.messageContent}>{props.content}</Text>
            <Text style={Styles.createdByText}>{props.createdBy}</Text>
        </View>
    )
}

export default Message

import React, {useEffect, useState} from 'react'
import {View, FlatList, Text, TouchableOpacity, ScrollView} from 'react-native'
import Styles from "./styles";


const Message = (props) => {

    const [myMessage, setMyMessage] = useState(null)

    useEffect(() => {
        if (props.createdBy === 'Mou3in02') {
            setMyMessage(true)
        } else {
            setMyMessage(false)
        }
    }, [])

    return (
        <View style={Styles.messageView}>
            <View style={[Styles.contentView, myMessage ? {justifyContent: 'flex-end'} : {justifyContent: 'flex-start'}]}>
                <Text style={[Styles.messageContent, myMessage ? {backgroundColor: '#4A47A3',color: '#fff'} : {backgroundColor: '#eee'}]}>
                    {props.content}
                </Text>
            </View>
            <View style={[Styles.authorView, myMessage ? {justifyContent: 'flex-end'} : {justifyContent: 'flex-start'}]}>
                <Text style={Styles.createdByText}>{props.createdBy}</Text>
            </View>
        </View>
    )
}

export default Message

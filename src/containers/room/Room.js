import React, {useState, useEffect} from 'react'
import {View, FlatList, Text, TouchableOpacity, ScrollView} from 'react-native'
import Styles from "./styles"
import Axios from "axios";
import {io} from "socket.io-client";
import Message from "../../components/message/Message";

const Room = (props) => {

    const roomId = props.route.params.roomId
    const [messages, setMessages] = useState([])

    // const socketClient = io.connect('https://mouin-chat-app.herokuapp.com/' + roomId);
    // socketClient.on('server send message', (data) => { // receive data from server
    //     console.log(data)
    // })

    // get all messages
    useEffect(() => {
        // Axios.get('https://mouin-chat-app.herokuapp.com/conversations/' + roomId + '/messages')
        //     .then(response => {
        //         console.log(response.data)
        //         setMessages(...messages, response.data)
        //     })
        //     .catch(error => {console.log(error)})
    }, [])

    return (
        <View style={Styles.viewContainer}>
            <FlatList
                data={messages}
                renderItem={({item}) => {
                    console.log(item)
                    return <Message content={item.content.toString()}/>
                }}
                keyExtractor={(item) => item._id.toString()}
            />
        </View>
    )
}

export default Room

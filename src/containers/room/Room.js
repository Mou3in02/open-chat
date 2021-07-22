import React, {useState, useEffect} from 'react'
import {View, FlatList, Text, TouchableOpacity, ScrollView} from 'react-native'
import Styles from "./styles"
import Axios from "axios";
import {io} from "socket.io-client";
import Message from "../../components/message/Message";


const Room = (props) => {

    const roomId = props.route.params.roomId
    const [messages, setMessages] = useState([
        {_id: 1, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat id in labore maiores minus nam, nostrum pariatur rem veniam veritatis.', createdBy: 'Mou3in02'},
        {_id: 2, content: 'hello world', createdBy: 'Mou3in02'},
        {_id: 3, content: 'hello world', createdBy: 'Mou3in02'},
        {_id: 4, content: 'hello world', createdBy: 'Mou3in02'},
        {_id: 5, content: 'hello world', createdBy: 'Mou3in02'},
        {_id: 6, content: 'hello world', createdBy: 'Mou3in02'},
        {_id: 7, content: 'hello world', createdBy: 'Mou3in02'},
        {_id: 8, content: 'hello world', createdBy: 'Mou3in02'},
        {_id: 9, content: 'hello world', createdBy: 'Mou3in02'},
    ])
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
                    return <Message content={item.content.toString()} createdBy={item.createdBy.toString()} />
                }}
                keyExtractor={(item) => item._id.toString()}
            />
        </View>
    )
}

export default Room

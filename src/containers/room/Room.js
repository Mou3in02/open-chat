import React, {useState, useEffect} from 'react'
import {View, FlatList, TextInput, Platform, TouchableOpacity, ScrollView} from 'react-native'
import Styles from "./styles"
import Axios from "axios";
import {io} from "socket.io-client";
import Message from "../../components/message/Message";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Toast from "react-native-simple-toast";
import {Audio} from 'expo-av';


const Room = (props) => {

    const roomId = props.route.params.roomId
    const [messages, setMessages] = useState([
        {
            _id: 1,
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat id in labore maiores minus nam, nostrum pariatur rem veniam veritatis.',
            createdBy: 'Mou3in02'
        },
        {_id: 2, content: 'hello world', createdBy: 'Kylor'},
        {_id: 3, content: 'lorem10', createdBy: 'Kévin'},
        {_id: 4, content: 'hello world', createdBy: 'Mou3in02'},
        {
            _id: 5,
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat id in labore maiores minus nam, nostrum pariatur rem veniam veritatis.',
            createdBy: 'Mou3in02'
        },
        {_id: 6, content: 'hello world', createdBy: 'Kylor'},
        {_id: 7, content: 'lorem10', createdBy: 'Kévin'},
        {_id: 8, content: 'hello world', createdBy: 'Mou3in02'},
        {_id: 9, content: 'hello world', createdBy: 'Kylor'},
        {_id: 10, content: 'lorem10', createdBy: 'Kévin'},

    ])
    const [newMessage, setNewMessage] = useState('')

    const playSound = async () => {
        const soundObj = new Audio.Sound()
        try {

            await soundObj.loadAsync(require('../../../assets/sounds/juntos-607.mp3'))
            await soundObj.playAsync()
            // Don't forget to unload the sound from memory
            // when you are done using the Sound object
            // await soundObj.unloadAsync();
        } catch (error) {
            // An error occurred!
            throw new Error(error)
        }
    }

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

    const addNewMessage = () => {
        if (newMessage.length < 1 || newMessage.trim().length < 1) {
            Toast.show('Message is empty !')
            setNewMessage('')
        } else {
            playSound().then().catch()
            let _id = Math.ceil(Math.random() * 100000)
            messages.unshift({_id: _id, createdBy: 'Mou3in02', content: newMessage.trim()})
            setMessages(messages)
            setNewMessage('')
            playSound().then(() => {
                console.log('Sound is playing !')
            }).catch((error) => {
                throw new Error(error)
            })
        }
    }

    return (
        <View style={Styles.viewContainer}>
            <FlatList
                data={messages}
                renderItem={({item}) => {
                    return <Message content={item.content.toString()} createdBy={item.createdBy.toString()}/>
                }}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={{ paddingBottom: 55 }}
            />
            <View style={Styles.addMessageView}>
                <TextInput value={newMessage} onChangeText={(text) => setNewMessage(text)}
                           style={Styles.addMessageInput} placeholder={'write new message ...'}/>
                <TouchableOpacity onPress={addNewMessage}>
                    <FontAwesome5 name={'arrow-circle-right'} color={'#fff'} size={35}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Room

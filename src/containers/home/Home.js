import React, {useState, useEffect} from 'react'
import {View, FlatList, Text, TouchableOpacity, ScrollView, TextInput} from 'react-native'
import Modal from 'react-native-modal';
import Styles from "./styles"
import AxiosInstance from "../../../network/AxiosInstance";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import isEmpty from 'validator/es/lib/isEmpty'
import Toast from 'react-native-simple-toast';

const Home = (props) => {

    const [rooms, setRooms] = useState([
        {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
    ])
    const [visible, setVisible] = useState(false)
    const [roomName, setRoomName] = useState(null)

    useEffect(() => {
        // get all conversations
        // AxiosInstance.get('/')
        //     .then(response => {
        //         let rooms = response.data.reverse()
        //         setRooms(rooms)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         throw new Error(error)
        //     })
    }, [])

    const addRoom = () => {
        if (!roomName || isEmpty(roomName.trim())){
            setRoomName(null)
            Toast.show('Room\'s name must be not empty !')
        }
        else {
            rooms.unshift({
                _id: Math.floor(Math.random() * 10000),
                name: roomName
            })
            setRooms(rooms)
            setVisible(false)
            setRoomName(null)
        }
        // add new conversation
        // AxiosInstance.post('/conversations/add',
        //     {
        //         name: roomName,
        //         createdBy: '5f73d8b91d3db61a4cd7df12'
        //     })
        //     .then(response => {
        //         rooms.unshift({'_id': response.data.id, 'name': response.data.name})
        //         setRooms(rooms)
        //         setVisible(false)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         throw new Error(error)
        //     })
    }
    return (
        <View style={Styles.viewContainer}>
            <View style={Styles.addView}>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <FontAwesome5 name={'plus'} size={30} color={'#fff'}/>
                </TouchableOpacity>
            </View>
            <Modal isVisible={visible}>
                <View style={Styles.viewModal}>
                    <Text style={Styles.modalTitle}>Room name</Text>
                    <TextInput
                        style={Styles.inputRoomName}
                        maxLength={20}
                        onChangeText={text => setRoomName(text)}
                        value={roomName}
                    />
                    <View style={Styles.modalAction}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={Styles.cancel}>cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => addRoom()}>
                            <Text style={Styles.add}> save </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={rooms}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('Room', {roomId: item._id.toString()})}>
                            <Text style={Styles.roomTitle}>{item.name.toString()}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default Home

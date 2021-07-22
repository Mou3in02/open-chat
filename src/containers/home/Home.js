import React, {useState, useEffect} from 'react'
import {View, FlatList, Text, TouchableOpacity, SafeAreaView, TextInput, StatusBar} from 'react-native'
import Modal from 'react-native-modal';
import Styles from "./styles"
import AxiosInstance from "../../../network/AxiosInstance";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import isEmpty from 'validator/es/lib/isEmpty'
import Toast from 'react-native-simple-toast';


const Home = (props) => {

    const [rooms, setRooms] = useState([
        {_id: Math.floor(Math.random() * 10000), name: 'hard', createdBy: '5f73d8b91d3db61a4cd7df12'},
        {_id: Math.floor(Math.random() * 10000), name: 'work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        // {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        // {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        // {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        // {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        // {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        // {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        // {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        // {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        // {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
        // {_id: Math.floor(Math.random() * 10000), name: 'hard work', createdBy: '5f73d8b91d3db61a4cd7df12'},
    ])
    const [roomsFilter, setRoomsFilter] = useState(rooms)
    const [visible, setVisible] = useState(false)
    const [roomName, setRoomName] = useState(null)
    const [showSearch, setShowSearch] = useState(true)
    const [searchInput, setSearchInput] = useState('')

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
    useEffect(() => {
        if (searchInput === '') {
            setRoomsFilter(rooms)
        } else {
            let newRoomsFilter = rooms.filter((room) => {
                if (room.name.includes(searchInput)) {
                    return room
                }
            })
            setRoomsFilter(newRoomsFilter)
        }

    }, [searchInput])

    const onClickCloseSearch = () => {
        setShowSearch(false)
        setSearchInput('')
        setRoomsFilter(rooms)
    }
    const addRoom = () => {
        if (!roomName || isEmpty(roomName.trim())) {
            setRoomName(null)
            Toast.show('Room\'s name must be not empty !')
        } else {
            rooms.unshift({
                _id: Math.floor(Math.random() * 10000),
                name: roomName
            })
            setRooms(rooms)
            setVisible(false)
            setRoomName(null)
            onClickCloseSearch()
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
    const goToRoom = (room) => {
        props.navigation.push('Room', {
            name: room.name.toString(),
            roomId: room._id.toString()
        })
    }

    return (
        <SafeAreaView style={Styles.homeView}>
            <StatusBar backgroundColor={'#FE1495'}/>
            {showSearch ?
                <View style={Styles.headerView}>
                    <TextInput style={Styles.searchInput}
                               placeholder={'search'}
                               maxLength={20}
                               onChangeText={(text) => {setSearchInput(text)}}
                               value={searchInput}
                    />
                    <TouchableOpacity onPress={onClickCloseSearch}>
                        <FontAwesome5 style={Styles.searchIcon} name={'times'} color={'#fff'} size={30}/>
                    </TouchableOpacity>
                </View>
                :
                <View style={Styles.headerView}>
                    <Text style={Styles.homeTitle}>Home page</Text>
                    <TouchableOpacity onPress={() => setShowSearch(true)}>
                        <FontAwesome5 style={Styles.searchIcon} name={'search'} color={'#fff'} size={30}/>
                    </TouchableOpacity>
                </View>
            }
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
                data={roomsFilter}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={() => goToRoom(item)}>
                            <Text style={Styles.roomTitle}>{item.name.toString()}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default Home

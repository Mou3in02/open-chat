import React, {useState, useEffect} from 'react'
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    StatusBar,
    ActivityIndicator
} from 'react-native'
import Modal from 'react-native-modal';
import Styles from "./styles"
import AxiosInstance from "../../../network/AxiosInstance";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import isEmpty from 'validator/es/lib/isEmpty'
import Toast from 'react-native-simple-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Home = (props) => {

    const [rooms, setRooms] = useState([])
    const [roomsFilter, setRoomsFilter] = useState(rooms)
    const [visible, setVisible] = useState(false)
    const [roomName, setRoomName] = useState(null)
    const [showSearch, setShowSearch] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        async function checkToken() {
            try {
                const token = await AsyncStorage.getItem('token')
                if(token !== null) {
                    AxiosInstance.get('/', {
                        headers: {
                            Authorization: 'Bearer '+token
                        }
                    }).then((response) => {
                        let rooms = response.data.reverse()
                        console.log(rooms)
                        setRooms(rooms)
                        setRoomsFilter(rooms)
                        setIsLoaded(true)
                    }).catch((error) => {
                        if (error.response.status === 500) {
                            Toast.LONG('Server error !')
                            throw new Error(error)
                        } else {
                            props.navigation.push('Login')
                        }
                    })
                }
            } catch(error) {
                throw error
            }
        }
        checkToken()
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
        !isLoaded ?
            <View style={{backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={'#52006A'} size={'large'}/>
                <StatusBar backgroundColor={'#52006A'}/>
            </View>
            :
            <SafeAreaView style={Styles.homeView}>
                <StatusBar backgroundColor={'#52006A'}/>
                {showSearch ?
                    <View style={Styles.headerView}>
                        <TextInput style={Styles.searchInput}
                                   placeholder={'search'}
                                   maxLength={20}
                                   onChangeText={(text) => {
                                       setSearchInput(text)
                                   }}
                                   value={searchInput}
                        />
                        <TouchableOpacity onPress={onClickCloseSearch}>
                            <FontAwesome5 style={Styles.searchIcon} name={'times'} color={'#fff'} size={30}/>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={Styles.headerView}>
                        <Text style={Styles.homeTitle}>Open Chat</Text>
                        <View style={Styles.options}>
                            <TouchableOpacity onPress={() => setShowSearch(true)}>
                                <FontAwesome5 style={Styles.searchIcon} name={'search'} color={'#fff'} size={30}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}}>
                                <FontAwesome5 style={Styles.searchIcon} name={'ellipsis-v'} color={'#fff'} size={22}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                <View style={Styles.addView}>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <FontAwesome5 name={'plus'} size={35} color={'#fff'}/>
                    </TouchableOpacity>
                </View>
                <Modal isVisible={visible}>
                    <View style={Styles.viewModal}>
                        <Text style={Styles.modalTitle}>New room</Text>
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

import React, {useState, useEffect} from 'react'
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    StatusBar,
    ActivityIndicator,
} from 'react-native'
import Modal from 'react-native-modal';
import Styles from "./styles"
import AxiosInstance from "../../../network/AxiosInstance";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import isEmpty from 'validator/es/lib/isEmpty'
import Toast from 'react-native-simple-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "../../../utils/JWT";


const Home = (props) => {

    const [rooms, setRooms] = useState([])
    const [roomsFilter, setRoomsFilter] = useState(rooms)
    const [visible, setVisible] = useState(false)
    const [roomName, setRoomName] = useState(null)
    const [showSearch, setShowSearch] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [showUserDetails, setUserDetails] = useState(false)
    const [idUser, setIdUser] = useState(null)
    const [emailUser, setEmailUser] = useState(null)

    useEffect(() => {
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

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token !== null) {
                let {_id, email} = JWT.getPayload(token)
                setIdUser(_id)
                setEmailUser(email)
                AxiosInstance.get('/', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }).then((response) => {
                    let rooms = response.data.reverse()
                    setRooms(rooms)
                    setRoomsFilter(rooms)
                    setIsLoaded(true)
                }).catch((error) => {
                    if (error.response.status === 500) {
                        Toast.show('Server error !',Toast.LONG)
                    } else {
                        props.navigation.push('Login')
                    }
                })
            }
            else {
                props.navigation.push('Login')
            }
        } catch (error) {
            Toast.show('AsyncStorage error !',Toast.LONG)
            throw new Error(error)
        }
    }

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
    const logout = async () => {
        setUserDetails(false)
        try {
            await AsyncStorage.setItem('token','')
            props.navigation.push('Login')
        }catch (error){
            throw error
        }
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
                            <TouchableOpacity onPress={() => {
                                setUserDetails(true)
                            }}>
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
                <Modal isVisible={showUserDetails}
                       style={{margin: 0, padding: 0}}
                       transparent={true}
                       onRequestClose={() => {
                           setUserDetails(false)
                       }}
                       animationType={'fade'}>
                    <View style={Styles.userDetailsView}>
                        <TouchableOpacity style={Styles.closeView} onPress={() => setUserDetails(false)}>
                            <FontAwesome5 name={'times-circle'} size={25} color={'#999'}/>
                        </TouchableOpacity>
                        <View style={Styles.userId}>
                            <FontAwesome5 name={'user-circle'} size={19} color={'#4A47A3'}/>
                            <Text style={Styles.id}>{idUser}</Text>
                        </View>
                        <View style={Styles.userDetails}>
                            <FontAwesome5 name={'envelope'} size={18} color={'#4A47A3'}/>
                            <Text style={Styles.email}>{emailUser}</Text>
                        </View>
                        <View style={Styles.userLogout}>
                            <TouchableOpacity style={Styles.logoutBtn} onPress={logout}>
                                <Text style={Styles.logout}>Log Out</Text>
                                <FontAwesome5 name={'sign-out-alt'} size={16} color={'#BD1616'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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

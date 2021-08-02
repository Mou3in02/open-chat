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

    const [rooms, setRooms] = useState([
        // {_id: Math.floor(Math.random() * 10000), name: 'hard', createdBy: '5f73d8b91d3db61a4cd7df12'},
        // {_id: Math.floor(Math.random() * 10000), name: 'work', createdBy: '5f73d8b91d3db61a4cd7df12'},
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
    const [showSearch, setShowSearch] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)


    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (!token) return null
            return token
        } catch (e) {
            Toast.LONG('AsyncStorage error !')
            return null
        }
    }

    useEffect(() => {
        AxiosInstance.get('/', {
            headers: {
                Authorization: 'Bearer '+'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjczZDhiOTFkM2RiNjFhNGNkN2RmMTIiLCJlbWFpbCI6Im1vdTNpbjAyQGdtYWlsLmNvbSIsImlhdCI6MTYyNzkyMDE2NywiZXhwIjoxNjI4MDA2NTY3' +
                    'fQ.e7ntpBzgfczuxADk1WI5fHT0k69ZX-h_lO1Gvt1ZcUnzG1f52nrD6KyAxRMWSdlv7ltVzR67GknXE69KjW3R8wzT1CYKiYDRKkSqOKbBvP1vKG4zI_tEpzdTx2QeEAD24gWYG84d9n43H12YvZG3xs8XSRp6aECsIl' +
                    'nOZtgzJ6N30Q5mVMH9-jnIFKNPAiBG0Ol0Mo73ab81L50B6-k0bh7cHLp41ieAI7djSEZUkHuAT4ON1PwLhSVaXXguYp1Bcu9LPjtnVMKngR5L5UJ5IjYlv1M25DaUU-U6ij2MstL0VGlSaM6KjVIZ7vnio3VQrx2Tjry' +
                    'J3iwNS5_SRfVmknuse_VYfb3_nwrYBZy0M1v0_-BF1iofAlAU0LnNtr6MrAd02Gmw0bJQC2gxawKDmPGs2bHM1UqKODkU2JNx0d1mgp-1zeu0CgJtO1mTUubO9JYvhuW_ECZNGuxauslwkwAUYXZhor7A1aPaBFdcij9A' +
                    'JDKp6ezjLYhfjJ0viaRM_ZVg5SVIshsLP_exNE47psXS7939IxflIcSDKEX7zm3oDVj0lOK0US2dp3aRv7nMO-SdK7uZ4ErehkI6NiOBN6RN-Qa44l3IG-uW14n-Jhx3bkpXeB9qBe8JV_7Nismrmxg9PKkjXhOsEuwXY' +
                    'GlykbCoZLI_mOfGkSMJK_wGXSg'
            }
        }).then((response) => {
            let rooms = response.data.reverse()
            setRooms(rooms)
            setIsLoaded(true)
        }).catch((error) => {
            if (error.response.status === 500) {
                Toast.LONG('Server error !')
                throw new Error(error)
            } else {
                props.navigation.push('Login')
            }
        })
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
                        <Text style={Styles.homeTitle}>Home page</Text>
                        <TouchableOpacity onPress={() => setShowSearch(true)}>
                            <FontAwesome5 style={Styles.searchIcon} name={'search'} color={'#fff'} size={30}/>
                        </TouchableOpacity>
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

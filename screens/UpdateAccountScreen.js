import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signin, updateEmail } from "../reducers/user";

export default function SigninScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [email, setEmail] = useState('');
    const [trialPassword, setTrialPassword] = useState('');
    const [newPassword, setNewPassword] = useState('')
    const [address, setAddress] = useState('');
    const [iban, setIban] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const handleModifyPassword = () => {
        setModalVisible(true)
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }


    useEffect(() => {
        fetch(`https://voltify-backend.vercel.app/users/viewUser/${user.token}`)
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    console.log('yes')
                    setUserInfo(data.profile)
                }
            });
    }, []);

    console.log('MYUSER', userInfo);


    const handleUpdate = () => {
        fetch('https://voltify-backend.vercel.app/users/updateUser', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, address: address, iban: iban, token: user.token }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(updateEmail({ email: data.email }));
                    console.log('Great success!');
                    navigation.navigate('HomeScreen')
                } else {
                    console.log('You fail!')
                }
            });
    };

    const handleNewPassword = () => {
        fetch('https://voltify-backend.vercel.app/users/updatePassword', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token, password: trialPassword, updatedPassword: newPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    setModalVisible(false)
                    console.log('password updated!')
                } else {
                    console.log('data error', data.error)
                }
            })
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            
            <Text style={styles.title}>Account</Text>
            <Modal visible={modalVisible} animationType="fade" transparent stume>
                <KeyboardAvoidingView style={styles.container1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput placeholder="Current Password" onChangeText={(value) => { console.log(value); setTrialPassword(value) }} value={trialPassword} style={styles.input} secureTextEntry={true} placeholderTextColor={'#696969'} />
                            <TextInput placeholder="New Password" onChangeText={(value) => { console.log(value); setNewPassword(value) }} value={newPassword} style={styles.input} secureTextEntry={true} placeholderTextColor={'#696969'} />
                            <TouchableOpacity onPress={() => handleNewPassword()} style={styles.buttonModal} activeOpacity={0.8}>
                                <Text style={styles.textButton}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleCloseModal()} style={styles.buttonModalCancel} activeOpacity={0.8}>
                                <Text style={styles.textButton}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </Modal>

            <View style={styles.view}>
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true} editable={false} value='thisisafake' style={styles.inputWithButton} />
                <TouchableOpacity title="Modify password" style={styles.buttonInput} onPress={() => handleModifyPassword()}><Text style={styles.modify}>Modify Password</Text></TouchableOpacity>
            </View>

            <TextInput
                defaultValue={userInfo.email}
                onChangeText={(value) => { console.log(value); setEmail(value) }} style={styles.inputEmail} keyboardType="email-address" autoCapitalize='none' textContentType='emailaddress' />

            <TextInput
                defaultValue={userInfo.address}
                onChangeText={(value) => { console.log(value); setAddress(value) }} style={styles.input} />

            <TextInput
                placeholder="Your IBAN to receive payments"
                onChangeText={(value) => { console.log(value); setIban(value) }} value={iban} style={styles.input} />
            <TouchableOpacity onPress={() => handleUpdate()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.buttonTwo} activeOpacity={0.8}>
                <Text style={styles.textButton}>Back</Text>
            </TouchableOpacity>
           
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container1: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: '100%',
        height: '50%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modify:{
        color:'blue',
    },

    view:{
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 350,
        height: 350,
    },

    title: {
        width: '80%',
        fontSize: 38,
        fontFamily: 'Roboto-Black',
        fontWeight: '600',
        marginBottom: 50,
        paddingTop: 150,
        textAlign: 'center',
    },
    inputWithButton: {
        width: '80%',
        marginTop: 25,
        borderBottomColor: '#0FCCA7',
        borderBottomWidth: 1,
        fontSize: 18,
        marginBottom: 25,

    },
    buttonInput: {
        position: 'absolute',
        right: 50
    },
    input: {
        width: '80%',
        marginTop: 25,
        borderBottomColor: '#0FCCA7',
        borderBottomWidth: 1,
        fontSize: 18,
        marginBottom: 50,
    },
    inputEmail: {
        width: '80%',
        marginTop: 50,
        borderBottomColor: '#0FCCA7',
        borderBottomWidth: 1,
        fontSize: 18,
        marginBottom: 50,
    },
    button: {
        alignItems: 'center',
        paddingTop: 8,
        width: '80%',
        marginTop: 30,
        backgroundColor: '#0FCCA7',
        borderRadius: 10,
        marginTop: 0,
        marginBottom: 0,
    },
    buttonModal: {
        alignItems: 'center',
        paddingTop: 8,
        width: '80%',
        marginTop: 30,
        backgroundColor: '#0FCCA7',
        borderRadius: 10,
        marginTop: 0,
        marginBottom: 0,
    },
    buttonModalCancel: {
        alignItems: 'center',
        paddingTop: 8,
        width: '80%',
        marginTop: 30,
        backgroundColor: '#020202',
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 0,
    },


    buttonTwo: {
        alignItems: 'center',
        paddingTop: 8,
        width: '80%',
        marginTop: 20,
        backgroundColor: '#020202',
        borderRadius: 10,
        marginBottom: 160,
    },

    textButton: {
        color: '#ffffff',
        height: 30,
        fontWeight: '600',
        fontSize: 16,
    },
});

import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Modal } from 'react-native';
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

    const handleModifyPassword = () => {
        setModalVisible(true)
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    const handleUpdate = () => {
        fetch('https://voltify-backend.vercel.app/users/updateUser', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, address: address, iban: iban, token: user.token }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(updateEmail({ email: data.email}));
                    console.log('Great success!');
                } else {
                    console.log('You fail!')
                }
            });
    };

    const handleNewPassword = () => {
        fetch('https://voltify-backend.vercel.app/users/updatePassword', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({token: user.token, password: trialPassword, updatedPassword: newPassword}),
        }).then(response => response.json())
            .then(data => {
                if(data.result) {
                    setModalVisible(false)
                    console.log('password updated!')
                } else {
                    console.log('data error',data.error)
                }
            })
    }

    return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <Text style={styles.title}>Account</Text>
      <Modal visible={modalVisible} animationType="fade" transparent>
            <KeyboardAvoidingView style={styles.container1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput placeholder='Current Password' onChangeText={(value) => { console.log(value); setTrialPassword(value)}} value={trialPassword} secureTextEntry={true} placeholderTextColor={"#696969"} borderBottomWidth= '1' style={{width: "80%", margin: 20}}/>
                    <TextInput placeholder='New Password' onChangeText={(value) => { console.log(value); setNewPassword(value)}}  value={newPassword} secureTextEntry={true}  placeholderTextColor={"#696969"} borderBottomWidth= '1' style={{width: "80%", margin: 20}}/>
                    <TouchableOpacity onPress={() => handleNewPassword} style={styles.buttonModal} activeOpacity={0.8}>
                        <Text style={styles.textButton}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCloseModal()} style={styles.buttonModalCancel} activeOpacity={0.8}>
                        <Text style={styles.textButton}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </KeyboardAvoidingView>
      </Modal>
            <View style={{width:"100%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true} editable={false} value='thisisafake' style={styles.inputWithButton} />
                <TouchableOpacity title="Modify password" style={styles.buttonInput} onPress={() => handleModifyPassword()}><Text style={{color: "blue"}}>Modify Password</Text></TouchableOpacity>
            </View>

            <TextInput
                placeholder="Email"
                 onChangeText={(value) => { console.log(value); setEmail(value) }} value={email}  style={styles.inputEmail} keyboardType="email-address" autoCapitalize='none' textContentType='emailaddress' />

            <TextInput
                placeholder="Address"
                 onChangeText={(value) => { console.log(value); setAddress(value) }} value={address} style={styles.input} />

            <TextInput
                placeholder="IBAN"
                onChangeText={(value) => { console.log(value); setIban(value) }} value={iban}  style={styles.input} />

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
        fontWeight: '600',
        marginBottom: 50,
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
        marginTop: 50,
        marginBottom: 0,
    },
    buttonModal: {
        alignItems: 'center',
        paddingTop: 8,
        width: '80%',
        marginTop: 30,
        backgroundColor: '#0FCCA7',
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 0,
    },
    buttonModalCancel: {
        alignItems: 'center',
        paddingTop: 8,
        width: '80%',
        marginTop: 30,
        backgroundColor: '#020202',
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 0,
    },


    buttonTwo: {
        alignItems: 'center',
        paddingTop: 8,
        width: '80%',
        marginTop: 20,
        backgroundColor: '#020202',
        borderRadius: 10,
        marginBottom: 20,
    },

    textButton: {
        color: '#ffffff',
        height: 30,
        fontWeight: '600',
        fontSize: 16,
    },
});

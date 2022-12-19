import { useState } from 'react';
import { useDispatch, } from 'react-redux';
import {
    View,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import { signin } from '../reducers/user'
export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')

    /*    
        set password visibility eye
    
        const [passwordVisibility, setPasswordVisibility] = useState(true)
        const [rightIcon, setRightIcon] = useState('eye')
    
        const handlePasswordVisibility = () => {
            if (rightIcon === 'eye') {
                setRightIcon('eye-off');
                setPasswordVisibility(!passwordVisibility)
            } else if (rightIcon === 'eye-off') {
                setRightIcon('eye');
                setPasswordVisibility(!passwordVisibility)
            }
        }
     */
    const handleSignUp = () => {
        fetch('https://voltify-backend.vercel.app/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email, password: password, address: address }),
        }).then(response => response.json())
            .then(data => {
                console.log('data', data)
                if (data.result) {
                    dispatch(signin({ token: data.token, email: data.email }))
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPassword('')
                    setAddress('')

                    navigation.navigate('ChoiceScreen')
                }
            })
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView style={styles.scrollView}>

                <Text style={styles.title}>Who are you?</Text>
                <TextInput placeholder="First Name" onChangeText={(value) => setFirstName(value)} value={firstName} style={styles.input} />
                <TextInput placeholder="Last Name" onChangeText={(value) => setLastName(value)} value={lastName} style={styles.input} />
                <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} keyboardType="email-address" autoCapitalize='none' textContentType='emailaddress' />
                <TextInput placeholder="Address" onChangeText={(value) => setAddress(value)} value={address} style={styles.input} autoCorrect={false} autoCapitalize={'none'} />
                <TextInput placeholder="Password" onChangeText={(value) => setPassword(value)} value={password} style={styles.input} autoCorrect={false} autoCapitalize={'none'} secureTextEntry={true} />
                <TouchableOpacity onPress={() => handleSignUp()} style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Next</Text>
                </TouchableOpacity>
            </ScrollView >
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'space-between',
        justifyContent: 'space-between',
    },

    scrollView: {
        width: '90%',
    },

    image: {
        width: '100%',
        height: '50%',
    },

    title: {
        width: '80%',
        fontSize: 38,
        fontWeight: '600',
        marginBottom: 50,
        marginTop: 100,
        textAlign: 'center',
    },

    input: {
        width: '80%',
        marginTop: 25,
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
        marginBottom: 40,
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
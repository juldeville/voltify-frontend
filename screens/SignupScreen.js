import { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';

export default function HomeScreen({ navigation }) {
    

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = () => {
        fetch('voltify-backend-i698a8ghp-juldeville.vercel.app', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstname: firstName, lastName: lastName, email: email, password: password, }),
        }).then(response => response.json)
          .then(data => {
            if (data.result) {
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('')
            }
          })
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <Text style={styles.title}>Who are you?</Text>
            <View>
                <TextInput placeholder="First Name" onChangeText={(value) => setFirstName(value)} value = {firstName} styles={styles.input}/>
                <TextInput placeholder="Last Name" onChangeText={(value) => setLastName(value)} value = {lastName} styles={styles.input}/>
                <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value = {email} styles={styles.input}/>
                <TextInput placeholder="Password" onChangeText={(value) => setPassword(value)} value={password} styles={styles.input}/>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SigninScreen')} style={styles.buttonTwo} activeOpacity={0.8}>
                <Text style={styles.textButton}>Next</Text>
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

    logo: {
        width: '70%',
        height: '7%',
        marginBottom: 40,
    },

    image: {
        width: '80%',
        height: '20%',
        marginTop: 30,
        marginBottom: 100,
    },
    title: {
        width: '80%',
        fontSize: 38,
        fontWeight: '600',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
    },
    input: {
        width: '80%',
        marginTop: 25,
        borderBottomColor: '#ec6e5b',
        borderBottomWidth: 1,
        fontSize: 18,
    },
    button: {
        alignItems: 'center',
        paddingTop: 8,
        width: '80%',
        marginTop: 30,
        backgroundColor: '#0FCCA7',
        borderRadius: 10,
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

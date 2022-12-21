import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from "../reducers/user";

export default function SigninScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const handleConnection = () => {
        fetch('https://voltify-backend.vercel.app/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: signInEmail, password: signInPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(signin({ email: data.email, token: data.token }));
                    setSignInEmail('');
                    setSignInPassword('');
                    console.log('Great succes!');
                    navigation.navigate('SearchScreen')

                } else {
                    console.log('You fail!')
                }
            });
    };






    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <Text style={styles.title}>Sign in to your Voltify accout</Text>

            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                onChangeText={(value) => { console.log(value); setSignInEmail(value) }} value={signInEmail} style={styles.input} />

            <TextInput
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={true}

                onChangeText={(value) => { console.log(value); setSignInPassword(value) }} value={signInPassword} style={styles.input} />

            <TouchableOpacity onPress={() => handleConnection()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.buttonTwo} activeOpacity={0.8}>
                <Text style={styles.textButton}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('DevScreen')} style={styles.buttonTwo} activeOpacity={0.8}>
                <Text style={styles.textButton}>Go to Dev hub</Text>
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
    image: {
        width: '100%',
        height: '50%',
    },
    title: {
        width: '80%',
        fontSize: 38,
        fontWeight: '600',
        marginBottom: 50,
        fontFamily: 'Roboto-Black',
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
        marginTop: 50,
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

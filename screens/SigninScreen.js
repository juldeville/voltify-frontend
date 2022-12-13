import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function SigninScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const handleConnection = () => {
        fetch('voltify-backend-i698a8ghp-juldeville.vercel.app/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: signInEmail, password: signInPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(signin({ email: data.email, token: data.token }));
                    setSignInUsername('');
                    setSignInPassword('');
                }
            });
    };





    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <Text style={styles.title}>Sign in</Text>

            <TextInput placeholder="Email" onChangeText={(value) => { console.log(value); setSignInEmail(value) }} value={signInEmail} style={styles.input} />

            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.button} activeOpacity={0.8}>

                <Text style={styles.textButton}>Go to map</Text>

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
        backgroundColor: '#ec6e5b',
        borderRadius: 10,
        marginBottom: 80,
    },
    textButton: {
        color: '#ffffff',
        height: 30,
        fontWeight: '600',
        fontSize: 16,
    },
});

import { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

export default function HomeScreen({ navigation }) {


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>


            <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SigninScreen')} style={styles.buttonTwo} activeOpacity={0.8}>
                <Text style={styles.textButton}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ChoiceScreen')} style={styles.buttonTwo} activeOpacity={0.8}>
                <Text style={styles.textButton}>Choice</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('MyAccountScreen')} style={styles.buttonTwo} activeOpacity={0.8}>
                <Text style={styles.textButton}>My Account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('UpdateAccountScreen')} style={styles.buttonTwo} activeOpacity={0.8}>
                <Text style={styles.textButton}>Update Account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('AddOutletScreen')} style={styles.buttonTwo} activeOpacity={0.8}>
                <Text style={styles.textButton}>Add Outlet</Text>
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

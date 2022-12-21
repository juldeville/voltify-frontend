import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';


export default function MyAccountScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    

    /*const handleName = () => {
        fetch('https://voltify-backend.vercel.app/users',)
        .then(response => response.json())
        .then(data => {
        setName(data.FirstName);
        })
    }*/

      useEffect(() => {
        fetch(`https://voltify-backend.vercel.app/users/viewUser/${user.token}`)
          .then(response => response.json())
          .then(data => {
            setLastName(data.profile.lastName);
            setFirstName(data.profile.firstName);
          });
      }, []);

        const handleDelete = () => {
        fetch(`https://voltify-backend.vercel.app/users/deleteUser`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token }),
        })

        .then(response => response.json())
        .then(data =>{
            navigation.navigate('HomeScreen'); 
          });
        }

       
   


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <Text style={styles.title}>PROFILE</Text>

            <Image style={styles.avatar} size={24} source={require('../assets/photo.jpg')} />

            <Text style={styles.name}>{firstName} {lastName}</Text>
            <Text style={styles.total}>Amount earned: 139.81€</Text>


            <TouchableOpacity onPress={() =>  navigation.navigate('UpdateAccountScreen')} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Modify</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDelete()}  style={styles.buttonTwo} activeOpacity={0.8}>
                <Text style={styles.textButton}>DeleteAccount</Text>
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
   
    title: {
        width: '80%',
        fontSize: 38,
        fontWeight: '600',
        marginTop:-20,
        textAlign: 'center',
        fontFamily: 'Roboto-Black'
       

    },

    avatar:{
            width: 120,
            height: 120,
            marginTop:30,
           
           
    },

    name:{
        fontSize: 25,
         textAlign: 'center',
         marginBottom:20,
        
       
    },
    
    total:{

        fontSize: 25,
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
        backgroundColor: '#EEA61B',
        borderRadius: 10,
        marginTop: 120,
        
    },

    buttonTwo: {
        alignItems: 'center',
        paddingTop: 8,
        width: '80%',
        marginTop: 20,
        backgroundColor: '#EE1B42',
        borderRadius: 10,
        marginBottom: 28,
        
    },

    textButton: {
        color: '#ffffff',
        height: 30,
        fontWeight: '600',
        fontSize: 16,
    },

 });

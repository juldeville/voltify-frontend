import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';


export default function RecentTransactionScreen() {

const user = useSelector((state) => state.user.value);
const [userData, setUserData] = useState()

useEffect(() => {
  fetch (`https://voltify-backend.vercel.app/transactions/addTransaction/${user.token}`)
  .then(response => response.json())
  .then(data => {
    console.log('azefffffffffazefazefazefazef', data.outlet);
    setUserData(data.outlet)
  })
}, [])


 return (
   <View style={styles.container}>
     <Text>RecentTransactionScreen</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});

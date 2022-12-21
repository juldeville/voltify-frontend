import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';


export default function RecentTransactionScreen() {

const user = useSelector((state) => state.user.value);
const [userData, setUserData] = useState([])


useEffect(() => {
  fetch (`https://voltify-backend.vercel.app/transactions/addTransaction/${user.token}`)
  .then(response => response.json())
  .then(data => {
    console.log('azefffffffffazefazefazefazef', data.outlet);
    setUserData(data.outlet)
  })
}, [])

console.log('UserData VALUE', userData)

const transactions = userData.map((data, i) => {



  return (
    <View>
      <Text>{data.price}</Text>
      <Text>{data.date}</Text>
      <Text>{data.duration}</Text>
      <Text> Check-Out</Text>
    </View>
  )
})


 return (
   <View style={styles.container}>
    {transactions}
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

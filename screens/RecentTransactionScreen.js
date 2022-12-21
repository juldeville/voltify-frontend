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

console.log('UserData VALUZZZE', userData)


const transactions = userData.map((data, i) => {
const dateObj = new Date(data.date)
const withoutTime = data.date.split('T')
const hour = dateObj.getUTCHours()
const minute = dateObj.getUTCMinutes()
const minutes = Math.ceil(data.duration/60)
console.log(hour, minute)
  return (
    <View key = {i} style={styles.infoCard}>
      <View >
      <Text><Text style={{fontWeight:"600"}}>Date: </Text>{withoutTime[0]}</Text>
      <Text><Text style={{fontWeight:"600"}}>Time: </Text>{hour} : {minute}</Text>
      <Text><Text style={{fontWeight:"600"}}>Duration: </Text>{minutes}</Text>
      </View>
      <View>
      <Text>${data.price}</Text>
      </View>
    </View>
  )
})


 return (
   <View style={styles.container}>
    <Text style={styles.title}>Recent Transactions</Text>
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
 
 infoCard: {
  flexDirection: 'row',
  width: 300,
  height: 100,
  justifyContent: 'space-around',
  alignItems: 'center',
  margin: 20,
  borderWidth: 1
 },

 title: {
  width: '80%',
  fontSize: 38,
  fontWeight: '600',
  paddingBottom: 50,
  textAlign: 'center',
  fontFamily: 'Roboto-Black'
 

},
});

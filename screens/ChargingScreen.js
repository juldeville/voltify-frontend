import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';


export default function StartChargingScreen({navigation}) {
    
   const [count, setCount] = useState(0);
   const [stop, setStop] = useState(0);
   const [price, setPrice] = useState(0);
  const savedCallback = useRef();

  function callback() {
    setCount(count +1);
  }

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

 /*   // Post transaction: à terminer
    const handleTransaction = () => {
    fetch('https://voltify-backend.vercel.app/transactions/addTransaction', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({token: user.token}),
                       
     })
}};


    // Get outlet: à terminer
    useEffect(() => {
    fetch(`https://voltify-backend.vercel.app/transactions`)
      .then(response => response.json())
      .then(data => {
        // duration:
        // price: 
      });
  }, []);
*/

 return (
   <View style={styles.container}>
    <Text style={styles.title} >You are charging</Text>
    <Text style={styles.text}>You have been charging for </Text>
    <Text style={styles.textone}>{count}sec</Text>
    <TouchableOpacity onPress={() => navigation.navigate('CheckoutScreen')}  style={styles.button} activeOpacity={0.8}>
      <Text style={styles.textButton}>Checkout</Text>
    
    </TouchableOpacity>
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

 title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
    // marginTop:-150,
    // marginBottom: 200,
    paddingBottom: 100,
    textAlign: 'center', 
   },

   text: {
    textAlign: 'center', 
    fontSize: 20,
    marginBottom: 40,
  },

  textone: {
    fontSize: 25,
    marginBottom: 120,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

 button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#0FCCA7',
    borderRadius: 10,
    marginTop: 80,
    marginBottom: 0,
    marginBottom: 80,
  },

 

  
textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
   
  },

});

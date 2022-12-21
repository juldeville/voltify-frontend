import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TouchableHighlight } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stopwatch } from 'react-native-stopwatch-timer';
import user from '../reducers/user';



export default function ChargingScreen({ navigation }) {

  const outlet = useSelector((state) => state.outlet.value);
  const user = useSelector((state) => state.user.value);



  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [finalTime, setFinalTime] = useState(0);


  console.log('USER TOKEN IS...', user.token);
  console.log('FINAL TIME IS...', finalTime);
  console.log('OUTLET ID IS...', outlet.id);
  console.log('OUTLET PRICE IS...', outlet.price);

  const handlePress = () => {

    fetch('https://voltify-backend.vercel.app/transactions/addTransaction/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: user.token,
        id: outlet.id,
        duration: finalTime,
        price: outlet.price,
        date: new Date(),
      }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log('Great succes!', data);


        } else {
          console.log('You fail!')
        }
      });
  }





  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Start charging now</Text>
      <Text style={styles.text}>You have been chargin for:</Text>


      <View style={styles.watch}>

        <Stopwatch
          laps
          msecs
          start={isStopwatchStart}
          reset={resetStopwatch}
          getMsecs={(time) => {
            setFinalTime(time / 1000);
          }}
        />

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            setIsStopwatchStart(!isStopwatchStart);
            setResetStopwatch(false);
          }}
        >
          <Text style={styles.textButton}>
            {!isStopwatchStart ? 'START' : 'STOP'}
          </Text>
        </TouchableHighlight>

      </View>


      <TouchableOpacity onPress={() => { navigation.navigate('CheckoutScreen'); handlePress() }} style={styles.buttonTwo} activeOpacity={0.8}>
        <Text style={styles.textButton}>Checkout</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  watch: {
  },

  title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
    marginTop: 50,
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
    paddingBottom: 8,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: '#020202',
    borderRadius: 10,
    marginTop: 50,
  },

  buttonTwo: {
    width: '80%',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: '#0FCCA7',
    borderRadius: 10,
    marginTop: 50,
  },




  textButton: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,

  },

});

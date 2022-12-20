import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TouchableHighlight } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stopwatch } from 'react-native-stopwatch-timer';



export default function StartChargingScreen({ navigation }) {

  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.watch}>
        <Stopwatch
          laps
          msecs
          start={isStopwatchStart}
          reset={resetStopwatch}
          getTime={(time) => {
            console.log(time);
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


      <TouchableOpacity onPress={() => navigation.navigate('CheckoutScreen')} style={styles.buttonTwo} activeOpacity={0.8}>
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
    marginTop: 100,
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

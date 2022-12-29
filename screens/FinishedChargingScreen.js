import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';



export default function FinishedChargingScreen({ navigation }) {

  const outlet = useSelector((state) => state.outlet.value);
  const transaction = useSelector((state) => state.transaction.value);

  let totalPrice = (outlet.price / 60) * transaction.duration;
  totalPrice = totalPrice.toFixed(2);

  const [personalNote, setPersonalNote] = useState(0);

  const addVote = () => {
    fetch(`https://voltify-backend.vercel.app/outlets/addVote`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: outlet.id, vote: personalNote }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result == true) {
          navigation.navigate('SearchScreen', { screen: 'MyAccountScreen' });
        } else {
          alert("outlet not found")
        }
      })
  }

  const personalStars = [];
  
  for (let i = 0; i < 5; i++) {
    let style = { 'cursor': 'pointer', fontSize: 50 };
    if (i < personalNote) {
      style = { color: '#f1c40f', fontSize: 50 };
    }
    personalStars.push(<FontAwesome key={i} name={'star'} onPress={() => setPersonalNote(i + 1)} style={style} />);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Charge finished</Text>
      <Text style={styles.textone}>You recharged your vehicule for a total amount of ${totalPrice}€</Text>
      <Text style={styles.texttow}>Rate your experience with this outlet:</Text>
      <View>
        <TouchableOpacity style={styles.star}>{personalStars}</TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => addVote()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Complete</Text>
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
    fontFamily: 'Roboto-Black',
    fontWeight: '600',
    marginTop: -100,
    textAlign: 'center',
  },

  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#0FCCA7',
    borderRadius: 10,
    marginTop: 120,
    marginBottom: 0,
  },

  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },

  star: {
    flexDirection: 'row',
    paddingTop: 50,
  },

  textone: {
    fontSize: 20,
    paddingTop: 50,
  },

  texttow: {
    fontSize: 20,
    paddingTop: 50,
  }
});

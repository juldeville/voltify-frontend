import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



export default function MyOutletScreen() {

  const user = useSelector((state) => state.user.value);
  const [outletLatitude, setOutletLatitude] = useState()
  const [outletLongitude, setOutletLongitude] = useState()
  // Pour savoir si une prise a bien été trouvé
  const [validOutlet, setValidOutlet] = useState(false)
  const [address, setAddress] = useState(null);
  const [type, setType] = useState(null);
  const [price, setPrice] = useState(null);
  const [averageVote, setAverageVote] = useState(null);

  console.log('token is', user.token)

  useEffect(() => {
    fetch(`https://voltify-backend.vercel.app/outlets/displayUserOutlet/${user.token}`)
      .then(response => response.json())
      .then(data => {
        console.log('UseEffect data', data)
        setOutletLatitude(data.outlet.latitude);
        setOutletLongitude(data.outlet.longitude);
        setAddress(data.outlet.address);
        setType(data.outlet.type);
        setPrice(data.outlet.price)

        console.log('VOTES', data.outlet.votes)

        if (data) {
          setValidOutlet(true);
        }

        let voteInfo = data.outlet.votes;

        console.log(voteInfo.length)


        if (voteInfo.length > 0) {
          let voteFinal = voteInfo.reduce((a, b) => a + b, 0) / voteInfo.length;
          voteFinal = voteFinal.toFixed(1);
          setAverageVote(voteFinal);
        }
        else {
          setAverageVote('No reviews yet')
        }
      });
  }, []);

  const currentPosition = {
    latitude: outletLatitude,
    longitude: outletLongitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }


  if (!validOutlet) {
    return (<View style={styles.container}>
      <Text>You currently have no outlet, please contact support at maximeGomez@laposte.fr</Text>
    </View>)
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={currentPosition}>
        {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#0FCCA7" />}
      </MapView>
      <View style={styles.infoCardView}>
        <View style={styles.textWrap}>
          <View style={{ margin: 10, }}>

            <Text>{address}</Text>

          </View>
          <View style={styles.rightBox}>
            <Text><FontAwesome name="plug" /> {type}</Text>
            <Text>{price} €/min</Text>
            <Text><FontAwesome name="star" /> {averageVote}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: 'white' }}>Add outlet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={{ color: 'white' }}> Delete </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  },
  infoCardView: {
    justifyContent: 'space-between', backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 70,
    zIndex: 1,
    left: '3%',
    right: '3%',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
  },

  rightBox: {
    alignItems: 'flex-end',
    marginTop: 10,
  },

  button: {
    alignItems: 'center',
    padding: 8,
    width: '80%',
    height: 40,
    backgroundColor: '#0FCCA7',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
  },

  button2: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    height: 40,
    backgroundColor: '#EE1B42',
    borderRadius: 10,
    marginBottom: 10,
  },
  textWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: "100%",
    alignItems: 'center',
  }

});




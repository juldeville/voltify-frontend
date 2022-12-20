import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



export default function MyOutletScreen({ navigation }) {

  const user = useSelector((state) => state.user.value);
  const [outletLatitude, setOutletLatitude] = useState()
  const [outletLongitude, setOutletLongitude] = useState()
  // Pour savoir si une prise a bien été trouvé
  const [validOutlet, setValidOutlet] = useState(false)
  const [address, setAddress] = useState(null);
  const [type, setType] = useState(null);
  const [price, setPrice] = useState(null);
  const [averageVote, setAverageVote] = useState(null);
  const [outletVote, setOutletVote] = useState(null);
  const [updatePage, setUpdatePage] = useState(null);


  console.log('token is', user.token)

  useEffect(() => {
    fetch(`https://voltify-backend.vercel.app/outlets/displayUserOutlet/${user.token}`)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log('UseEffect data', data)
          setOutletLatitude(data.outlet.latitude);
          setOutletLongitude(data.outlet.longitude);
          setAddress(data.outlet.address);
          setType(data.outlet.type);
          setPrice(data.outlet.price)
          setValidOutlet(true);
          setOutletVote(data.outlet.votes)


        }



      });
  }, []);

  console.log('VALUE OF OUTLETVOTE IS...', outletVote)

  let voteFinal;
  if (!outletVote === []) {
    voteFinal = outletVote.reduce((a, b) => a + b, 0) / outletVote.length;
    voteFinal = voteFinal.toFixed(1);

  }

  else {
    console.log('No reviews yet')
    voteFinal = 'No reviews yet'
  }
  console.log('Value of voteFinal...', voteFinal)


  console.log('Value of validOutlet...', validOutlet)

  const currentPosition = {
    latitude: outletLatitude,
    longitude: outletLongitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }


  if (!validOutlet) {
    return (<View style={styles.subContainer}>
      <Text>You currently have no outlet.</Text>

      <TouchableOpacity onPress={() => navigation.navigate('AddOutletScreen')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Add an outlet</Text>
      </TouchableOpacity>
    </View>)
  }

  const handleDelete = () => {
    console.log("YOUR TOKEN IS", user.token)
    fetch(`https://voltify-backend.vercel.app/outlets/deleteOutlet`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    })

      .then(response => response.json())
      .then(data => {
        console.log('DELETION CONFIRMED', data);
        setValidOutlet(false)
      });
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
            <Text><FontAwesome name="star" /> {voteFinal}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleDelete()} style={styles.button2}>
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

  subContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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

  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },

});




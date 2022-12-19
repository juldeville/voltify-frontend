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


//  TENTATIVE DE MOYENNE ECHOUE, bien tester le cas où le user aurai 0 votes.
 /*        let vote = data.outlet.votes
        console.log('vote', vote)
        let averageVote
        if(vote && vote.length > 0){
          let averageVote = vote.reduce((a, b) => a + b, 0) / vote.length;
          averageVote = averageVote.toFixed(1);
          console.log('averageVote', averageVote);
        } else averageVote = '(-)'

        if (data.result) {
          setValidOutlet(true)
        } */
      });
  }, []);
  console.log('outletLatitude for the win', outletLatitude)

  const currentPosition = {
    latitude: outletLatitude,
    longitude: outletLongitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }

  console.log('currentposition for the win', currentPosition)

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
        <View style= {styles.textWrap}>
          <View style={{margin: 10,}}>
              <Text>{type}</Text>
              <Text>{address}</Text>
              <Text>{price}</Text>
          </View>
          <View>
            <Text style={{margin: 10}}>Vote Average</Text>
          </View>
        </View>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: 'white'}}>Add outlet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text style={{color: 'white'}}> Delete </Text>
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
    flexDirection: 'column',
    alignItems: 'center',
    width: "100%",
    height: 180,
    marginBottom: 20
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    height: 30,
    backgroundColor: '#0FCCA7',
    borderRadius: 10,
    marginBottom: 0,
},
button2: {
  alignItems: 'center',
  paddingTop: 8,
  width: '80%',
  height: 30,
  backgroundColor: '#EE1B42',
  borderRadius: 10,
  marginBottom: 10,
},
textWrap: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: "100%",
  alignItems: 'center'
}
});




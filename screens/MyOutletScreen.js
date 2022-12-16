import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export default function MyOutletScreen() {

  const user = useSelector((state) => state.user.value);
  const [outletLatitude, setOutletLatitude] = useState()
  const [outletLongitude, setOutletLongitude] = useState()
  // Pour savoir si une prise a bien été trouvé
  const [validOutlet, setValidOutlet] = useState(false)

useEffect(() => {
    fetch(`https://voltify-backend.vercel.app/outlets/displayUserOutlet/${user.token}`)
      .then(response => response.json())
      .then(data => {
        console.log('UseEffect data', data)
        setOutletLatitude(data.outlet.latitude);
        setOutletLongitude(data.outlet.longitude);
        if(data.result) {
          setValidOutlet(true)
        }
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
      <Text style={{fontSize: "18px"}}>You currently have no outlet, please contact support at maximeGomez@laposte.fr</Text>
    </View>)
  }

  return (
    <View style={styles.container}>
      <MapView  style={styles.map} region={currentPosition}>
        {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="black" />}
      </MapView>
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
 }
});

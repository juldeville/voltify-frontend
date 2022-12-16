import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export default function MyOutletScreen() {

  const user = useSelector((state) => state.user.value);
  const [outletLatitude, setOutletLatitude] = useState()
  const [outletLongitude, setOutletLongitude] = useState()

useEffect(() => {
    fetch(`https://voltify-backend.vercel.app/outlets/displayUserOutlet/${user.token}`)
      .then(response => response.json())
      .then(data => {
        console.log('UseEffect data', data)
        setOutletLatitude(data.outlet.latitude);
        setOutletLongitude(data.outlet.longitude);
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

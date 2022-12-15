import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { current } from '@reduxjs/toolkit';


export default function SearchScreen() {

  const [currentPosition, setCurrentPosition] = useState(null);
  const [searchedPlace, setSearchedPlace] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [newPlace, setNewPlace] = useState('');
  const [importPlaces, setImportPlaces] = useState();



  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition({ ...location.coords, longitudeDelta: 0.05, latitudeDelta: 0.05 });
          });
      }
    })();

    fetch('https://voltify-backend.vercel.app//outlets/displayOutlet')
      .then((response) => response.json())
      .then((data) => {
        data.result && setImportPlaces(data.data);

        console.log('reception', data);

      });

  }, []);


  console.log('my currentposition is', currentPosition);

  const handleNewPlace = () => {

    const search = ' ';
    const replaceWith = '+';
    let formatedAddress = newPlace.split(search).join(replaceWith);

    fetch(`https://api-adresse.data.gouv.fr/search/?q=${formatedAddress}`)
      .then((response) => response.json())
      .then((data) => {
        // Reatribute the data LONG and LAT to new consts because the LONG and LAT states are only updated when component re-renders
        const updatedOutletLongitude = data.features[0].geometry.coordinates[0];
        const updatedOutletLatitude = data.features[0].geometry.coordinates[1];

        setSearchedPlace({ latitude: updatedOutletLatitude, longitude: updatedOutletLongitude, latitudeDelta: 0.05, longitudeDelta: 0.05 })


      })
  };


  console.log('searchedplace is', searchedPlace)


  const handleClose = () => {
    setModalVisible(false);
    setNewPlace('');
  };



  console.log('My CURRENT POSITION2', currentPosition)

  //Display Markers
  let markers

  if (importPlaces) {
    markers = importPlaces.map((data, i) => {
      return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.type} pinColor='#0FCCA7' />
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <TextInput placeholder="Search a specific address" onChangeText={(value) => { console.log(value); setNewPlace(value) }} value={newPlace} style={styles.input} />
        <TouchableOpacity onPress={() => handleNewPlace()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Search</Text>
        </TouchableOpacity>
      </View>



      <MapView mapType="hybrid" style={styles.map} region={searchedPlace ? searchedPlace : currentPosition}>
        {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="black" />}
        {markers}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  map: {
    flex: 7,
  },


  modalView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  input: {
    width: '70%',
    marginTop: 20,
    borderBottomColor: '#0FCCA7',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    width: 70,
    alignItems: 'center',
    marginTop: 20,
    padding: 8,
    backgroundColor: '#020202',
    borderRadius: 10,
  },
  textButton: {
    color: '#ffffff',
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },
});

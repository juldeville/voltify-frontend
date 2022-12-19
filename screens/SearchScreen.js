import { useEffect, useState } from 'react';
import { Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { current } from '@reduxjs/toolkit';
import { registerOutlet } from '../reducers/outlet'
import { useDispatch, useSelector } from 'react-redux';
import * as geolib from 'geolib';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SearchScreen() {
  const dispatch = useDispatch()
  const outlet = useSelector((state) => state.outlet.value);

  const [currentPosition, setCurrentPosition] = useState(null);
  const [searchedPlace, setSearchedPlace] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [newPlace, setNewPlace] = useState('');
  const [importPlaces, setImportPlaces] = useState();
  const [outletID, setOutletID] = useState();
  const [selectedOutletID, setSelectedOutletID] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({},
          (location) => {
            setCurrentPosition({ ...location.coords, longitudeDelta: 0.05, latitudeDelta: 0.05 });
          });
      }
    })();

    fetch('https://voltify-backend.vercel.app//outlets/displayOutlet')
      .then((response) => response.json())
      .then((data) => {
        data.result && setImportPlaces(data.data);
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

  let infoCard;
  let distance;

  const displayCard = (latitude, longitude, price, address, type) => {
    console.log('info')
    dispatch(registerOutlet({ id: outletID }));
    distance = geolib.getDistance({ latitude: currentPosition.latitude, longitude: currentPosition.longitude }, { latitude: latitude, longitude: longitude }) / 1000;
    distance = distance.toFixed(1);
    console.log('My DISTANCE is', distance);
    infoCard =
      < View style={styles.infoCardView} >

        <View style={styles.infoCardSub1}>
          <Text style={styles.textCard}>{distance} km from here</Text>

          <View style={styles.outletType}>
            <FontAwesome name="plug" />
            <Text style={{fontWeight:"600", fontSize:15, color: 'black'}}> {type}</Text>
            <FontAwesome name='times-circle' color='black'  style={{fontSize: 20, marginLeft: 20}} onPress={() => setSelectedOutletID()}/>
          </View>

        </View>

        <View style={styles.infoCardSub2}>
          <Text style={styles.textCard}>{address}</Text>
          <Text style={styles.textCard}>{price}€/min</Text>
        </View>

        <View style={styles.infoCardSub3}>
          <TouchableOpacity onPress={() => handleNewPlace()} style={styles.buttonCard} activeOpacity={0.8}>
            <Text style={styles.textButton}>Go there</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleNewPlace()} style={styles.buttonCard2} activeOpacity={0.8}>
            <Text style={styles.textButton}>Start charging</Text>
          </TouchableOpacity>
        </View>

      </View >

    setSelectedOutletID(infoCard);
    console.log('My outlet ID is', outletID)

  };

  //Display Markers
  let markers

  if (importPlaces) {
    markers = importPlaces.map((data, i) => {
      return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.type} pinColor='#0FCCA7' onPress={() => { displayCard(data.latitude, data.longitude, data.price, data.address, data.type) }} />
    });
  }

  console.log('MY CURRENT POSITION IS', currentPosition)

  return (
    <View style={styles.container}>

      <View style={styles.modalView}>
        <TextInput placeholder="Search a specific address" onChangeText={(value) => { console.log(value); setNewPlace(value) }} value={newPlace} style={styles.input} />
        <TouchableOpacity onPress={() => handleNewPlace()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Search</Text>
        </TouchableOpacity>
      </View>
      {selectedOutletID}
      <MapView style={styles.map} region={searchedPlace ? searchedPlace : currentPosition} /* onPress={() => { Keyboard.dismiss(), setSelectedOutletID() }} */>
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
    flex: 1,
  },

  modalView: {
    flexDirection: 'row',
    justifyContent: 'space-between', backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    top: 40,
    zIndex: 1,
    left: '3%',
    right: '3%',
    paddingLeft: 10,
    paddingRight: 10,
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

  infoCardSub1: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '5%',
  },

  infoCardSub2: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

  infoCardSub3: {
    width: '90%',
    flexDirection: 'row',
  },

  outletType: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    justifyContent: 'space-between'
  },

  input: {
    width: '70%',
    borderBottomColor: '#0FCCA7',
    borderBottomWidth: 1,
    fontSize: 18,
    marginLeft: 10,
  },
  button: {
    width: 70,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    padding: 8,
    backgroundColor: '#020202',
    borderRadius: 10,
  },

  buttonCard: {
    width: '50%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
    padding: 8,
    backgroundColor: '#020202',
    borderRadius: 10,
  },

  buttonCard2: {
    width: '50%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
    padding: 8,
    backgroundColor: '#0FCCA7',
    borderRadius: 10,
  },

  textButton: {
    color: '#ffffff',
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },

  textCard: {
    color: 'black',
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },
});

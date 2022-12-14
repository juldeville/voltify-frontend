import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function ChoiceScreen({ navigation }) {


  return (

    <View style={styles.container}>

      <Text style={styles.title}>What would you like to do?</Text>

      <Button style={styles.button}
        title="Locate charging points to charge up my car"
        onPress={() => navigation.navigate('HomeScreen')}
      />

      <TouchableOpacity onPress={() => navigation.navigate('SigninScreen')} style={styles.buttonTwo} activeOpacity={0.8}>
        <Text style={styles.textButton}>Sign in</Text>
      </TouchableOpacity>

      <Button style={styles.button}
        title="Offer charging station and generate income"
        onPress={() => navigation.navigate('HomeScreen')}
      />


      <Button style={styles.button}
        title="Do both"
        onPress={() => navigation.navigate('HomeScreen')}
      />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },


  title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
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

  buttonTwo: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 20,
    backgroundColor: '#020202',
    borderRadius: 10,
    marginBottom: 20,
  },

  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});
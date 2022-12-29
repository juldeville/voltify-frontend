import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function ChoiceScreen({ navigation }) {

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>What would you like to do?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Locate charging outlet</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AddOutletScreen')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Offer a charging outlet</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AddOutletScreen')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Do both</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    fontFamily: 'Roboto-Black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 100,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    width: '80%',
    height: '10%',
    marginTop: 30,
    backgroundColor: '#0FCCA7',
    borderRadius: 10,
    marginBottom: 0,
  },

  textButton: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
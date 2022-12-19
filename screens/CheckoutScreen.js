import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function StartChargingScreen({navigation}) {
 return (
   <View style={styles.container}>
    <Text>Checkout</Text>
    <Text>Payment information</Text>
    <TouchableOpacity onPress={() => navigation.navigate('FinishedChargingScreen')} style={styles.button} activeOpacity={0.8}>
      <Text style={styles.textButton}>Confirm payment</Text>
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
 
 textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
   
  },

 button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#0FCCA7',
    borderRadius: 10,
    marginTop: 80,
    marginBottom: 0,
    marginBottom: 80,
  },

});

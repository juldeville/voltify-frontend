import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function StartChargingScreen({navigation}) {
 return (
   <View style={styles.container}>
      <Text style={styles.title}>Start charging</Text>
      <Text style={styles.text}>To start charging, simply scan the WR code located on the Voltify Power Outlet.</Text>
    <TouchableOpacity onPress={() => navigation.navigate('QrCodeScreen')} style={styles.button} activeOpacity={0.8}>
      <Text style={styles.textButton}>Scan now</Text>
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

 title: {
  width: '80%',
  fontSize: 38,
  fontFamily: 'Roboto-Black',
  fontWeight: '600',
  marginTop:-150,
  textAlign: 'center', 
 },

 text: {
  fontSize: 20,
  paddingTop:100,
 },
 

 button: {
  alignItems: 'center',
  paddingTop: 8,
  width: '80%',
  marginTop: 30,
  backgroundColor: '#0FCCA7',
  borderRadius: 10,
  marginTop: 150,
  marginBottom: 0,
},


textButton: {
  color: '#ffffff',
  height: 30,
  fontWeight: '600',
  fontSize: 16,
},
});


import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function StartChargingScreen({navigation}) {
 return (
   <View style={styles.container}>
    <Text>Start charging</Text>
    <Text>To start charging, simply scan the WR code located on the Voltify Power Outlet.</Text>
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
 button: {
  alignItems: 'center',
  paddingTop: 8,
  width: '80%',
  marginTop: 30,
  backgroundColor: '#0FCCA7',
  borderRadius: 10,
  marginTop: 50,
  marginBottom: 0,
},
});


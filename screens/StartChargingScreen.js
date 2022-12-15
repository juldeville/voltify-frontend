import { StyleSheet, Text, View } from 'react-native';

export default function StartChargingScreen() {
 return (
   <View style={styles.container}>
     <Text>StartChargingScreen</Text>
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
});
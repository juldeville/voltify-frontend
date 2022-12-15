import { StyleSheet, Text, View } from 'react-native';

export default function FinishedChargingScreen() {
 return (
   <View style={styles.container}>
     <Text>FinishedChargingScreen</Text>
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
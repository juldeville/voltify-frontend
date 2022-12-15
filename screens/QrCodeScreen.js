import { StyleSheet, Text, View } from 'react-native';

export default function QrCodeScreen() {
 return (
   <View style={styles.container}>
     <Text>QrCodeScreen</Text>
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
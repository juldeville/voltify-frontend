import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CheckoutScreen({navigation}) {
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Text style={styles.title}>Checkout</Text>
                <Text style={styles.payment}>Payment Information  <FontAwesome  name={'credit-card'}></FontAwesome></Text>
                <TextInput placeholder="Name on card" style={styles.input} />
                <TextInput placeholder="Card Number" style={styles.input} />
                <TextInput placeholder="Expiration Date" style={styles.input} keyboardType="email-address" autoCapitalize='none' textContentType='emailaddress' />
                <TextInput placeholder="Cvv" style={styles.input} autoCorrect={false} autoCapitalize={'none'} />
            <TouchableOpacity onPress={() => navigation.navigate ("FinishedChargingScreen")} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Confirm Payment</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    title: {
        fontFamily: 'Roboto-Black',
        fontSize: 38,
        fontWeight: '600',
        marginBottom: 50,
        marginTop: 50,
        textAlign: 'center',
    },

    payment:{
        textAlign: 'center',
        fontSize: 20,
        marginTop: -40,
    },

    input: {
        width: '80%',
        // marginTop: 10,
        borderBottomColor: '#0FCCA7',
        borderBottomWidth: 1,
        fontSize: 18,
        marginBottom: 40,
    },

    button: {
        alignItems: 'center',
        paddingTop: 8,
        width: '80%',
        marginTop: 30,
        backgroundColor: '#0FCCA7',
        borderRadius: 10,
        marginBottom: 80,
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

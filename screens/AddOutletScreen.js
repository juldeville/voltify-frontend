import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from "../reducers/user";
import { SelectList } from 'react-native-dropdown-select-list'


export default function AddOutletScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const data = [
        { key: '1', value: 'Combo CCS' },
        { key: '2', value: 'Type 2' },
        { key: '2', value: 'Wall Plug' },
        { key: '2', value: 'CHAdeMO' },
    ]

    const [outletAddress, setOutletAddress] = useState('');
    const [outletType, setOutletType] = useState('');
    const [outletPrice, setOutletPrice] = useState('');
    const [outletAvailability, setOutletAvailibitlity] = useState(true);


    const handleAddOutlet = () => {


        const search = ' ';
        const replaceWith = '+';
        let formatedAddress = outletAddress.split(search).join(replaceWith);

        fetch(`https://api-adresse.data.gouv.fr/search/?q=${formatedAddress}`)
            .then((response) => response.json())
            .then((data) => {
                // Reatribute the data LONG and LAT to new consts because the LONG and LAT states are only updated when component re-renders
                const updatedOutletLongitude = data.features[0].geometry.coordinates[0];
                const updatedOutletLatitude = data.features[0].geometry.coordinates[1];

                console.log('Test Longitude', updatedOutletLongitude);
                console.log('Test Latitude', updatedOutletLatitude);
                console.log('Test Outlet', outletType);



                fetch('https://voltify-backend.vercel.app/outlets/addOutlet', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        token: user.token,
                        longitude: updatedOutletLongitude,
                        latitude: updatedOutletLatitude,
                        type: outletType,
                        price: outletPrice,
                        availability: true,
                    }),
                }).then(response => response.json())
                    .then(data => {
                        if (data.result) {
                            console.log('Great succes!');
                            navigation.navigate('SignupScreen');


                        } else {
                            console.log('You fail!')
                        }
                    });

            })








    };





    return (

        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <Text style={styles.title}>Add your outlet</Text>

            <ScrollView style={styles.scrollView}>

                <SelectList
                    placeholder="Select your outlet type"
                    setSelected={(val) => setOutletType(val)}
                    data={data}
                    save="value"
                    style={styles.input}
                />


                <TextInput
                    placeholder="Price"
                    autoCapitalize="none"
                    onChangeText={(value) => { console.log(value); setOutletPrice(value) }} value={outletPrice} style={styles.input} />



                <TextInput
                    placeholder="Availibility"
                    autoCapitalize="none"
                    onChangeText={(value) => { console.log(value); setOutletAvailibitlity(value) }} value={outletAvailability} style={styles.input} />

                <TextInput
                    placeholder="Address. Example : 143 Bd René Cassin Nice"
                    autoCapitalize="none"
                    onChangeText={(value) => { console.log(value); setOutletAddress(value) }} value={outletAddress} style={styles.input} />



                <TouchableOpacity onPress={() => handleAddOutlet()} style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Add</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.buttonTwo} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Back</Text>
                </TouchableOpacity>
            </ScrollView>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollView: {
        width: '80%',

    },


    image: {
        width: '100%',
        height: '50%',
    },
    title: {
        width: '80%',
        fontSize: 38,
        fontWeight: '600',
        marginBottom: 50,
        marginTop: 100,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        marginTop: 25,
        borderBottomColor: '#0FCCA7',
        borderBottomWidth: 1,
        fontSize: 18,
        marginBottom: 25,
    },
    button: {
        alignItems: 'center',
        paddingTop: 8,
        width: '100%',
        marginTop: 30,
        backgroundColor: '#0FCCA7',
        borderRadius: 10,
        marginTop: 50,
        marginBottom: 0,
    },

    buttonTwo: {
        alignItems: 'center',
        paddingTop: 8,
        width: '100%',
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

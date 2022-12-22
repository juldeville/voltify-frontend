import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Button, showDatepicker, showTimepicker, date } from 'react-native';
import { useSelector } from 'react-redux';
import { SelectList } from 'react-native-dropdown-select-list';



export default function AddOutletScreen({ navigation }) {

    //Start of WeekDayPicker
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
                        address: outletAddress,
                        type: outletType,
                        price: outletPrice,
                    }),
                }).then(response => response.json())
                    .then(data => {
                        if (data.result) {
                            console.log('Great succes!');
                            navigation.navigate('SearchScreen', { screen: 'Search' });


                        } else {
                            console.log('You fail!')
                        }
                    });

            })
    };


    return (

        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <View style={styles.boxView}>

                <Text style={styles.title}>Add your outlet</Text>

                <SelectList
                    style={styles.inputBox}
                    placeholder="Select your outlet type"
                    setSelected={(val) => { setOutletType(val); console.log(val) }}
                    data={data}
                    save="value"
                />

                <TextInput
                    placeholder="Address"
                    autoCapitalize="none"
                    onChangeText={(value) => { setOutletAddress(value) }} value={outletAddress} style={styles.input} />

                <TextInput
                    placeholder="Price"
                    autoCapitalize="none"
                    onChangeText={(value) => { setOutletPrice(value) }} value={outletPrice} style={styles.input} />

                <View style={styles.buttons}>

                    <TouchableOpacity onPress={() => handleAddOutlet()} style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.textButton}>Add</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.buttonTwo} activeOpacity={0.8}>
                        <Text style={styles.textButton}>Back</Text>
                    </TouchableOpacity>

                </View>



            </View>



        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },

    boxView: {
        width: '80%',
        height: '100%',
        justifyContent: 'space-between',
    },


    image: {
        width: '100%',
        height: '50%',
    },

    title: {
        width: '100%',
        fontSize: 38,
        fontFamily: 'Roboto-Black',
        fontWeight: '600',
        marginBottom: 50,
        marginTop: 100,
        textAlign: 'center',
    },

    subTitle: {
        textAlign: 'center',
    },


    input: {
        width: '100%',
        marginTop: 55,
        borderBottomColor: '#0FCCA7',
        borderBottomWidth: 1,
        fontSize: 18,
        marginBottom: 25,
    },


    button: {
        alignItems: 'center',
        paddingTop: 8,
        width: '100%',
        backgroundColor: '#0FCCA7',
        borderRadius: 10,
        marginTop: 50,
    },

    buttons: {
        marginBottom: 50,
    },

    buttonTwo: {
        alignItems: 'center',
        paddingTop: 8,
        width: '100%',
        marginTop: 20,
        backgroundColor: '#020202',
        borderRadius: 10,
    },

    textButton: {
        color: '#ffffff',
        height: 30,
        fontWeight: '600',
        fontSize: 16,
    },
});

import { createPermissionHook } from 'expo-modules-core';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

//Loading screen work in progress

const AppLoader = () => {
    return(
        <View style= {[StyleSheet.absoluteFillObject, styles.container]}>
            <AnimatedLottieView source={require('../assets/loading.json')} autoPlay loop/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 1,
    }
})

export default AppLoader
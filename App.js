import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import DevScreen from './screens/DevScreen';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import ChoiceScreen from './screens/ChoiceScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import UpdateAccountScreen from './screens/UpdateAccountScreen';
import AddOutletScreen from './screens/AddOutletScreen';
import RecentTransactionScreen from './screens/RecentTransactionScreen';
import FinishedChargingScreen from './screens/FinishedChargingScreen';
import MyOutletScreen from './screens/MyOutletScreen';
import QrCodeScreen from './screens/QrCodeScreen';
import SearchScreen from './screens/SearchScreen';
import StartChargingScreen from './screens/StartChargingScreen';
import ChargingScreen from './screens/ChargingScreen';
import CheckoutScreen from './screens/CheckoutScreen';

import { useFonts } from 'expo-font';






// redux imports
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import outlet from './reducers/outlet';
import transaction from './reducers/transaction';



// redux-persist imports
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = combineReducers({ user, outlet, transaction });
const persistConfig = {
  key: 'voltify',
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Search') {
          iconName = 'search'
        } else if (route.name === "DevScreen") {
          iconName = 'calendar'
        } else if (route.name === "RecentTransaction") {
          iconName = 'bars'
        } else if (route.name === "MyOutlet") {
          iconName = 'plug'
        } else if (route.name === "MyAccount") {
          iconName = 'user'
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      // tabBarActiveTintColor: '#ec6e5b',
      // tabBarInactiveTintColor: '#335561',
      headerShown: false,
    })}>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="RecentTransaction" component={RecentTransactionScreen} />
      <Tab.Screen name="MyOutlet" component={MyOutletScreen} />
      <Tab.Screen name="MyAccount" component={MyAccountScreen} />

    </Tab.Navigator>
  );
};

export default function App() {
  const [loaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-BlackItalic': require('./assets/fonts/Roboto-BlackItalic.ttf'),

  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="AddOutletScreen" component={AddOutletScreen} />
            <Stack.Screen name="UpdateAccountScreen" component={UpdateAccountScreen} />
            <Stack.Screen name="SigninScreen" component={SigninScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="ChoiceScreen" component={ChoiceScreen} />
            <Stack.Screen name="StartChargingScreen" component={StartChargingScreen} />
            <Stack.Screen name="QrCodeScreen" component={QrCodeScreen} />
            <Stack.Screen name="FinishedChargingScreen" component={FinishedChargingScreen} />
            <Stack.Screen name="ChargingScreen" component={ChargingScreen} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
            <Stack.Screen name="SearchScreen" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
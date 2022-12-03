import react, { useEffect, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/LoginSignupScreens/WelcomeScreen';
import MealScreen from './src/screens/MealScreen';
import OrderInfo from './src/screens/OrderInfo';
import OrderSuccessfullPage from './src/screens/OrderSuccessfullPage';
import PaymentPage from './src/screens/PaymentPage';
import PlaceOrder from './src/screens/PlaceOrder';
import ProductPage from './src/screens/ProductPage';
import UserProfile from './src/screens/UserProfile';

import { MaterialIcons, Entypo, Foundation } from '@expo/vector-icons';
import TiffinScreen from './src/screens/TiffinScreen';
import Orders from './src/screens/Orders';
import OrderHistory from './src/screens/OrderHistory';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginSignupScreens/LoginScreen';
import SignupScreen from './src/screens/LoginSignupScreens/SignupScreen';
import SkipMeal from './src/screens/SkipMeal';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


export default function App() {

  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false)
    }, 1000);
  }, [])


  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }} >

        {showSplashScreen ?
          <Stack.Screen name='splashscreen' component={SplashScreen} />
          : null
        }
        <Stack.Screen name='welcomepage' component={WelcomeScreen} />
        <Stack.Screen name='login' component={LoginScreen} />
        <Stack.Screen name='signup' component={SignupScreen} />



        <Stack.Screen name='mealpage' component={Bottomnavigator} />
        <Stack.Screen name='tiffinpage' component={TiffinScreen} />
        <Stack.Screen name='orderspage' component={Orders} />


        <Stack.Screen name='userprofile' component={UserProfile} />
        <Stack.Screen name='productpage' component={ProductPage} />
        <Stack.Screen name='placeorder' component={PlaceOrder} />
        <Stack.Screen name='orderinfo' component={OrderInfo} />
        <Stack.Screen name='paymentpage' component={PaymentPage} />
        <Stack.Screen name='ordersuccessfullpage' component={OrderSuccessfullPage} />
        <Stack.Screen name='orderhistory' component={OrderHistory} />
        <Stack.Screen name='skipmeal' component={SkipMeal} />



      </Stack.Navigator>

    </NavigationContainer>
  );
}

const Bottomnavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray'
    }} >
      <Tab.Screen
        name='Meal'
        component={MealScreen}
        options={{
          tabBarIcon: ({ focused, color }) => <Entypo name="box" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name='Tiffin'
        component={TiffinScreen}
        options={{
          tabBarIcon: ({ focused, color }) => <Foundation name="shopping-bag" size={24} color={color} />
        }}

      />
      <Tab.Screen
        name='Order'
        component={Orders}
        options={{
          tabBarIcon: ({ focused, color }) => <MaterialIcons name="library-books" size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  )
}


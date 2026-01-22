import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import BottomTabs from './navigation/BottomTabs';
import RegisterScreen from './screens/RegisterScreen';
import SplashScreen from './screens/splashScreen';
import NotificationScreen from './screens/notificationScreen';
import ProfileScreen from './screens/profileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={SplashScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name='profile' component={ProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

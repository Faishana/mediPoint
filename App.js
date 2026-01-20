import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import splashScreen from './screens/splashScreen';
import loginScreen from './screens/LoginScreen';
import homeScreen from './screens/homeScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='splash' component={splashScreen} />
        <Stack.Screen name='login' component={loginScreen} />
        <Stack.Screen name='home' component={homeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


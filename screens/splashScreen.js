import { View, Image, StyleSheet, Animated, StatusBar } from 'react-native';
import { useEffect, useRef } from 'react';

export default function SplashScreen({ navigation }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progress, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    // Navigate after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Register');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const width = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '80%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2ecc71" barStyle="light-content" />
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFAD5', // primary app color
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  progressContainer: {
    width: '80%',
    height: 10,
    backgroundColor: '#a5e49d',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 5,
  },
});

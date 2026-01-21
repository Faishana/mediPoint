import { View, Image, StyleSheet, Animated } from 'react-native';
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
    setTimeout(() => {
      navigation.replace('Register');
    }, 2000);
  }, []);

  const width = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '80%'],
  });

  return (
    <View style={styles.container}>
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30
  },
  progressContainer: {
    width: '80%',
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2e7dff',
    borderRadius: 5
  }
});

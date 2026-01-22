import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const loadUser = async () => {
      const data = await AsyncStorage.getItem('user');
      if (data) {
        const user = JSON.parse(data);
        setUsername(user.username);
      }
    };
    loadUser();
  }, []);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.replace('Login');
  };

  const images = [
    require('../assets/img1.jpg'),
    require('../assets/img2.jpg'),
    require('../assets/img3.jpg'),
    require('../assets/img4.jpg'),
    require('../assets/img5.jpg'),
    require('../assets/img6.jpg'),
  ];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>Welcome {username}</Text>
            <Text style={styles.dateText}>
              {dateTime.toLocaleDateString()} | {dateTime.toLocaleTimeString()}
            </Text>
          </View>

          {/* Profile navigation */}
          <TouchableOpacity onPress={() => navigation.navigate('profile')}>
            <MaterialIcons name="person" size={26} color="#fff" />
          </TouchableOpacity>
        </View>


        {/* Image Grid */}
        <View style={styles.grid}>
          {images.map((img, index) => (
            <View key={index} style={styles.card}>
              <Image source={img} style={styles.image} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 20
  },
  header: {
    padding: 15,
    backgroundColor: '#2ecc71', // primary green
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 4,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  dateText: {
    color: '#e0e0e0',
    fontSize: 12,
    marginTop: 4
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20
  },
  card: {
    width: '40%',
    height: 120,
    backgroundColor: '#fff',
    marginVertical: 15,
    borderRadius: 10,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain'
  }
});

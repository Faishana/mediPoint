import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [username, setUsername] = useState('');

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

  const images = [
    require('../assets/img1.jpg'),
    require('../assets/img2.jpg'),
    require('../assets/img3.jpg'),
    require('../assets/img4.jpg'),
    require('../assets/img5.jpg'),
    require('../assets/img6.jpg'),
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Welcome {username}
        </Text>
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
    backgroundColor: '#f5f5f5' 
  },
  header: { 
    padding: 15, 
    backgroundColor: '#2e7dff', 
    alignItems: 'center' 
  },
  headerText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
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
    alignItems: 'center'
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain'
  }
});

import { View, Text, StyleSheet } from 'react-native';
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Welcome {username}
        </Text>
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        <View style={styles.card} />
        <View style={styles.card} />
        <View style={styles.card} />
        <View style={styles.card} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    ackgroundColor: '#f5f5f5' 
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
    height: 100,
    backgroundColor: '#fff',
    marginVertical: 15,
    borderRadius: 10,
    elevation: 4
  }
});

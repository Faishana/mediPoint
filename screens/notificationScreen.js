// screens/NotificationScreen.js
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

const notifications = [
  { id: '1', text: 'Appointment confirmed' },
  { id: '2', text: 'Doctor available today' },
  { id: '3', text: 'New health tip added' }
];

const { width } = Dimensions.get('window');

export default function NotificationScreen() {
  const [readIds, setReadIds] = useState([]);

  const handlePress = (id) => {
    if (!readIds.includes(id)) {
      setReadIds([...readIds, id]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.notificationCard,
              readIds.includes(item.id) && styles.readCard,
            ]}
            onPress={() => handlePress(item.id)}
          >
            <MaterialIcons
              name={readIds.includes(item.id) ? 'notifications-none' : 'notifications'}
              size={24}
              color={readIds.includes(item.id) ? '#999' : '#2ecc71'}
              style={styles.icon}
            />
            <Text
              style={[
                styles.notificationText,
                readIds.includes(item.id) && styles.readText,
              ]}
            >
              {item.text}
            </Text>
            {readIds.includes(item.id) && (
              <MaterialIcons
                name="check-circle"
                size={20}
                color="#2ecc71"
                style={styles.readCheck}
              />
            )}
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: width < 400 ? 18 : 30,
    paddingHorizontal: width < 400 ? 8 : 16,
  },
  title: {
    fontSize: width < 400 ? 20 : 24,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: width < 400 ? 12 : 20,
    alignSelf: 'center',
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: width < 400 ? 10 : 18,
    marginBottom: width < 400 ? 8 : 14,
    elevation: 3,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  readCard: {
    backgroundColor: '#e0e0e0',
  },
  icon: {
    marginRight: 12,
  },
  notificationText: {
    fontSize: width < 400 ? 14 : 16,
    color: '#333',
    flex: 1,
  },
  readText: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  readCheck: {
    marginLeft: 10,
  },
});

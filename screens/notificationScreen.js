// screens/NotificationScreen.js
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
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
          <View
            style={[
              styles.notificationCard,
              readIds.includes(item.id) && styles.readCard,
            ]}
            onTouchEnd={() => handlePress(item.id)}
          >
            <MaterialIcons
              name={readIds.includes(item.id) ? 'notifications-none' : 'notifications'}
              size={24}
              color={readIds.includes(item.id) ? '#b0c4de' : '#2196f3'}
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
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf6f6',
    paddingTop: width < 400 ? 18 : 30,
    paddingHorizontal: width < 400 ? 8 : 16,
  },
  title: {
    fontSize: width < 400 ? 20 : 24,
    fontWeight: 'bold',
    color: '#2196f3',
    marginBottom: width < 400 ? 12 : 20,
    alignSelf: 'center',
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: width < 400 ? 10 : 18,
    marginBottom: width < 400 ? 8 : 14,
    elevation: 3,
    shadowColor: '#2196f3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  readCard: {
    backgroundColor: '#f0f0f0',
  },
  icon: {
    marginRight: 12,
  },
  notificationText: {
    fontSize: width < 400 ? 14 : 16,
    color: '#333',
  },
  readText: {
    color: '#b0c4de',
    textDecorationLine: 'line-through',
  },
});

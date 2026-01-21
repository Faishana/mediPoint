// screens/NotificationScreen.js
import { View, Text, FlatList } from 'react-native';

const notifications = [
  { id: '1', text: 'Appointment confirmed' },
  { id: '2', text: 'Doctor available today' },
  { id: '3', text: 'New health tip added' }
];

export default function NotificationScreen() {
  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 15, borderBottomWidth: 1 }}>
          <Text>{item.text}</Text>
        </View>
      )}
    />
  );
}

import React, { useState } from 'react';
import {
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Provider as PaperProvider, Text, TextInput, Button,
  Card, Snackbar, useTheme, MD3LightTheme
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 15,
  },
  card: {
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
  },
  emptyState: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
  },
});

// COMPONENT: Spacer
const Spacer = ({ size = 10 }) => <Text style={{ marginVertical: size / 2 }} />;

// SCREEN: Groups
function GroupScreen() {
  const [groupName, setGroupName] = useState('');
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

  const handleCreateGroup = () => {
    const trimmed = groupName.trim();
    if (trimmed) {
      setSnackbar({ visible: true, message: `✅ Group "${trimmed}" created.` });
      setGroupName('');
    } else {
      setSnackbar({ visible: true, message: '⚠️ Please enter a group name.' });
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <Text style={styles.title}>Groups</Text>
          <Card style={styles.card} elevation={3}>
            <Card.Title title="Create or Join a Group" />
            <Card.Content>
              <TextInput
                label="Group Name"
                value={groupName}
                onChangeText={setGroupName}
                style={styles.input}
                mode="outlined"
              />
              <Button mode="contained" onPress={handleCreateGroup} style={styles.button}>
                Submit
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
        <Snackbar
          visible={snackbar.visible}
          onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
          duration={3000}
        >
          {snackbar.message}
        </Snackbar>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// SCREEN: Add Item
function AddItemScreen() {
  const [item, setItem] = useState('');
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

  const handleAddItem = () => {
    const trimmed = item.trim();
    if (trimmed) {
      setSnackbar({ visible: true, message: `✅ "${trimmed}" added to listing.` });
      setItem('');
    } else {
      setSnackbar({ visible: true, message: '⚠️ Enter an item name.' });
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <Text style={styles.title}>Add Item</Text>
          <Card style={styles.card} elevation={3}>
            <Card.Title title="List a New Item" />
            <Card.Content>
              <TextInput
                label="Item Name"
                value={item}
                onChangeText={setItem}
                style={styles.input}
                mode="outlined"
              />
              <Button mode="contained" onPress={handleAddItem} style={styles.button}>
                Upload Item
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
        <Snackbar
          visible={snackbar.visible}
          onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
          duration={3000}
        >
          {snackbar.message}
        </Snackbar>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// SCREEN: Item List
function ItemListScreen() {
  const items = ['Generator', 'Camera', 'Projector']; // You can make this dynamic later

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        <Text style={styles.title}>Available Items</Text>
        {items.length === 0 ? (
          <Text style={styles.emptyState}>No items available.</Text>
        ) : (
          items.map((item, index) => (
            <Card key={index} style={styles.card} elevation={2}>
              <Card.Title title={item} />
              <Card.Content>
                <Text>Available for lease. Contact group admin.</Text>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// NAVIGATION
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#6200ee',
            tabBarIcon: ({ color, size }) => {
              let iconName = 'help-circle';
              if (route.name === 'Groups') iconName = 'account-group';
              else if (route.name === 'Add Item') iconName = 'plus-box';
              else if (route.name === 'Items') iconName = 'view-list';
              return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
            },
          })}
        >
          <Tab.Screen name="Groups" component={GroupScreen} />
          <Tab.Screen name="Add Item" component={AddItemScreen} />
          <Tab.Screen name="Items" component={ItemListScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
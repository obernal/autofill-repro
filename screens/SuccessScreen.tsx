import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Success: { email: string };
};

type SuccessScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Success'>;

interface Props {
  navigation: SuccessScreenNavigationProp;
  route: { params: { email: string } };
}

export default function SuccessScreen({ navigation, route }: Props) {
  const { email } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Login Successful!</Text>
      <Text style={styles.subtitle}>Welcome back, {email}</Text>
      <Text style={styles.description}>
        Your password should have been offered for saving by Android's password manager.
        Now you can test autofill functionality.
      </Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Test Autofill Again</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Welcome')}
      >
        <Text style={styles.backButtonText}>Back to Welcome</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
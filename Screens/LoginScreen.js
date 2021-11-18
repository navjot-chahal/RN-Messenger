import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { useAuth } from '../context/useAuthContext';
import loginAPI from '../helpers/APICalls/login';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const { updateLoginContext } = useAuth();

  const handleSignIn = () => {
    loginAPI(email, password).then((data) => {
      if (data.success) {
        updateLoginContext(data.success);
      } else {
        setError('Wrong Email or Password!');
      }
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require('../assets/shopping-list.webp')}
        style={styles.image}
      />

      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Text style={styles.error}>{error}</Text>
      <Button
        containerStyle={styles.button}
        onPress={handleSignIn}
        title="Login"
      />
      <Button
        onPress={() => navigation.navigate('Register')}
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
      <Button
        onPress={() => {
          setEmail('demo@demo.com');
          setPassword('testtest');
        }}
        style={{ marginTop: 50 }}
        containerStyle={styles.button}
        type="solid"
        title="Demo Login"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  image: { width: 200, height: 200, borderRadius: 20 },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  error: {
    color: 'red',
  },
});

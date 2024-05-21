import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView,Image,ImageBackground , Button} from 'react-native';
import { auth, db } from '../firebase';
import { push, ref, set, child} from 'firebase/database'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';

import { useNavigation } from '@react-navigation/core';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        navigation.replace("List")        
      }
    });

    return () => unsubscribe();
  }, [auth]);

  function create(){
    const newKey = auth.currentUser.uid;
    set(ref(db,'users/' + newKey + '/userinfo'),{
        name: name,
        surname: surname,
        email: email
    })
  }
  const handleAuthentication = async () => {
    try {
        if (isLogin) {
            // Sign in
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in successfully!');
          } else {
            // Sign up
            await createUserWithEmailAndPassword(auth, email, password);
            create();
            console.log('User created successfully!');
          }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        {isLogin
        ?
        <View style={{ height: 250, width: 420, backgroundColor: '#FF9800', borderBottomLeftRadius: 20, borderBottomRightRadius:20, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/logo.png')} style={{ width: 175, height: 175 }} />
        </View>
        :
        <View style={{ height: 150, width: 420, backgroundColor: '#FF9800', borderBottomLeftRadius: 20, borderBottomRightRadius:20, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/logo2.jpg')} style={{ width: 90, height: 90 }} />
        </View>
        }
        
        <View style={styles.container}>
          <ImageBackground
            style={styles.gradient}
            source={require('../assets/gradient.png')}
          >
          <View style={{width: 320, alignItems:'stretch' , justifyContent: 'center' }}>
          {isLogin
          ?
          <View/>
          :
          <View>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter name"
              
            />
            <TextInput
              style={styles.input}
              value={surname}
              onChangeText={setSurname}
              placeholder="Enter surname"
              
            />        
          </View>
          }
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry
            />
            <View >
              <Pressable  style={styles.button} onPress={handleAuthentication}>
                <Text style={styles.text}>{isLogin ? 'Login' : 'Register'}</Text>
              </Pressable>
            </View>
  
            <View style={styles.bottomContainer}>
              <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Don\'t have any account? Register now' : 'Have already member? Login now'}
              </Text>
            </View>
          </View>    
        </ImageBackground>
      </View>
    </View>
    );
  };
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  
    },
    gradient: {
        paddingTop: 50,
      flex: 1,
      width: '100%',
      
      alignItems: 'center',
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 300,
    },
    authContainer: {
      width: '100%',
      height: '30%',
        backgroundColor: '#FFA500',
        borderRadius: 20
      
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      height: 50,
      borderColor: '#ddd',
      backgroundColor: '#ffffff',
      borderWidth: 1,
      marginTop: 25,
      padding: 10,
      borderRadius: 20    
    },
    button: {
      height: 50,
      marginTop: 25,
      backgroundColor: '#FF9800',
      padding: 10,
      borderRadius: 20,
      alignContent: 'center'
    },
    text:{
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 22,
      fontWeight: 'bold'
  
    },
    toggleText: {
      color: '#A36100',
      textAlign: 'center',
    },
    bottomContainer: {
      marginTop: 20,
    },
    emailText: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20,
    },
  });
  
export default AuthScreen;


  
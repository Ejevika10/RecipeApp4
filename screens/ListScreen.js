import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, ScrollView,Image,ImageBackground , Button, TouchableOpacity} from 'react-native';
import { auth, db } from '../firebase';
import {Database, push, ref, set, child, onValue} from 'firebase/database'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import ItemInList from '../components/itemInList';
import ListHeader from '../components/listHeader';

const ListScreen = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([]);
    //const items = [];
    useEffect( () => {
        getItems();
    },[]); 
      
    const getItems = async () => {
        const itemsRef = ref(db, 'items/');
        onValue(itemsRef, (snapshot) => {
          console.log(snapshot.val());
          const data = snapshot.val();
            if (data) {
                const itemKeys = Object.keys(data);
                const newItems = itemKeys.map(key => {
                    return {...data[key], id: key};
                });
                setItems(newItems);
            } else {
                setItems([]);
            }
        });
    };

    return (
    <View style={styles.container}>
      <ListHeader/>
      <ImageBackground
        style={styles.gradient}
        source={require('../assets/gradient.png')}
      > 
        <ScrollView style={styles.scroll}>
        {items.map((item, index) => {
          return (
            <TouchableOpacity 
              key={index}
              onPress={() =>
              {navigation.navigate('Item', {item});}
              }>
              <ItemInList item={item}/>
            </TouchableOpacity>
            
          );
        })}
        </ScrollView>
      </ImageBackground>
    </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    gradient: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
    scroll:{
      padding: 10, 
      width: '100%'
    }
  })
export default ListScreen;


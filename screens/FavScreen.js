import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, ScrollView,Image,ImageBackground , Button, TouchableOpacity} from 'react-native';
import { auth, db } from '../firebase';
import {Database, push, ref, set, child, on, onValue} from 'firebase/database'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import ItemInList from '../components/itemInList';
import FavHeader from '../components/favHeader';

const FavScreen = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([]);
    const [favs, setFavs] = useState([]);
    //const items = [];
    useEffect( () => {
        getItems();
        getFavs();
    },[]); 
      
    const getItems = async () => {
      const itemsRef = ref(db, 'items/');
        onValue(itemsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
           // console.log(data);
            const itemKeys = Object.keys(data);
            const newItems = itemKeys.map(key => {
                return {...data[key], id: key};
            });
            setItems(newItems);
          }
        });
    };
    const getFavs = async () => {
      const userId = auth.currentUser.uid 
        const favRef = ref(db,'users/' + userId + '/favourites');
        onValue(favRef, (snapshot) => {
          
          const data = snapshot.val();
          if (data) {
            const favKeys = Object.keys(data);
            const newFavs = favKeys.map(key => {
                return {...data[key].id, id: key};
            });
            setFavs(favKeys);
          }

        });  
    };
    console.log(items);
    console.log(favs);
    const favItems = items.filter((item) => favs.includes(item.id));



    return (
    <View style={styles.container}>
      <FavHeader/>
      <ImageBackground
        style={styles.gradient}
        source={require('../assets/gradient.png')}
      > 
        <ScrollView style={styles.scroll}>
        {favItems.map((item, index) => {
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
export default FavScreen;


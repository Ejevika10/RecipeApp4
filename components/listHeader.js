import {Text, View,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';


export default function ListHeader(){
    
  const navigation = useNavigation();
    return (
    <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 10, paddingTop: 25, paddingBottom:5, height: 75, width: '100%',padding:10, backgroundColor: '#FF9800', borderBottomLeftRadius: 20, borderBottomRightRadius:20, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={{flex: 1 }} onPress={() =>
          {auth
              .signOut()
              .then(() => {
              navigation.replace('Auth');
              })
              .catch((error) => alert(error.message));}
          }>
          <Image source={require('../assets/exit.png')}
              style={{ width: 35, height: 35 }}
          />
        </TouchableOpacity >
        <Text style={{flex: 1, color: '#ffffff', textAlign: 'auto', fontSize: 22, fontWeight: 'bold'}}>  Items</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() =>
            {navigation.navigate('Favourites')}
          }>
            <Image source={require('../assets/fav_btn.png')}
          style={{ width: 35, height: 35, marginHorizontal:5 }}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
            {navigation.navigate('Profile')}
          }>
            <Image source={require('../assets/profile_btn.png')}
                style={{ width: 35, height: 35 }}
            />
          </TouchableOpacity>      

        </View>
          
    </View>
    )
  }

    
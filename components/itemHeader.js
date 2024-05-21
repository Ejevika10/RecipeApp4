import {Text, View,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { StackActions } from '@react-navigation/native';


export default function ItemHeader(itemId){
    
  const navigation = useNavigation();
    return (
    <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 10, paddingTop: 25, paddingBottom:5, height: 75, width: '100%',padding:10, backgroundColor: '#FF9800', borderBottomLeftRadius: 20, borderBottomRightRadius:20, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={{flex: 1 }} onPress={() =>
          {const popAction = StackActions.pop(1);
            navigation.dispatch(popAction);
        }
          }>
          <Image source={require('../assets/back_btn.png')}
              style={{ width: 35, height: 35 }}
          />
        </TouchableOpacity >
        <Text style={{flex: 1, color: '#ffffff', textAlign: 'auto', fontSize: 22, fontWeight: 'bold'}}>Item</Text>
        <TouchableOpacity onPress={() =>
              {navigation.navigate('Comment', itemId);}
              }>
            <Image source={require('../assets/comments.png')}
          style={{ width: 35, height: 35, marginHorizontal:5 }}
          />
          </TouchableOpacity>
          
    </View>
    )
  }

    
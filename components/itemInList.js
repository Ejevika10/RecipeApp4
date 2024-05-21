import {Text, View,Image} from 'react-native'
import React, { useState, useEffect } from 'react';
import {st} from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ItemInList({item}){
  const [url, setUrl] = useState('https://firebasestorage.googleapis.com/v0/b/lab1-b5a75.appspot.com/o/img%2Fcarbonara.jpg?alt=media&token=c4ca8099-72d2-417b-90e2-2bc54943173d');
  const storageRef = ref(st, 'img/' + item.img);

  getDownloadURL(storageRef).then((downloadURL) => {
    console.log('File available at', downloadURL);
    setUrl(downloadURL);
  });
    return (
        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, margin: 10 }}>
      <Image
        source={{uri: url}}
        style={{ width: '100%', height: 200, resizeMode: 'cover', borderRadius: 10 }}
      />
      <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 5 }}>
        <Text style={{ fontSize: 25, flex: 1 }}>{item.name}</Text>
        <Text style={{ fontSize: 25, fontWeight: 'bold', paddingHorizontal: 5 }}>{parseFloat(item.avgRating.toFixed(1))}</Text>
        <Image
          source={require('../assets/star_filled.png')}
          style={{ width: 25, height: 25, alignSelf: 'center' }}
        />
    </View>
      <View style={{ flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 20, paddingTop: 5, paddingBottom: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
          <Image
            source={require('../assets/clock.png')}
            style={{ width: 20, height: 20, alignSelf: 'center' }}
          />
          <Text style={{ fontSize: 17, paddingLeft: 5 }}>{item.time}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
          <Image
            source={require('../assets/cook.png')}
            style={{ width: 20, height: 20, alignSelf: 'center' }}
          />
          <Text style={{ fontSize: 17, paddingLeft: 5 }}>{item.diff}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
          <Image
            source={require('../assets/money.png')}
            style={{ width: 20, height: 20, alignSelf: 'center' }}
          />
          <Text style={{ fontSize: 17, paddingLeft: 5 }}>{item.price}</Text>
        </View>
      </View>
    </View>
    )

}
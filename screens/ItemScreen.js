import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View,Text,  StyleSheet, ScrollView,Image,ImageBackground , Button, TouchableOpacity} from 'react-native';
import { auth, db, st } from '../firebase';
import { getStorage, ref as myref,  getDownloadURL } from "firebase/storage";
import {Database, update, push, ref, set, remove, child, onValue} from 'firebase/database'
import ItemHeader from '../components/itemHeader';
import moment from 'moment';
import { SliderBox } from "react-native-image-slider-box";

const ItemScreen = ({route}) => {
  const [item, setItem] = useState(route.params.item);
  const [isInFav, setIsInFav] = useState(true);
  const [curMark, setCurMark] = useState(0);
  const navigation = useNavigation();
  const [images,setArray] = useState([]);
  const [url, setUrl] = useState('https://firebasestorage.googleapis.com/v0/b/lab1-b5a75.appspot.com/o/img%2Fcarbonara.jpg?alt=media&token=c4ca8099-72d2-417b-90e2-2bc54943173d');
    
  useEffect( () => {
    getItem();
    getFav();
    getCurMark();
    if(item.images && images.length < 7){
      for(let i = 1; i < 8; i++){
        const storageRef = myref(st, item.images + '/0' + i + '.jpg');
        getDownloadURL(storageRef).then((downloadURL) => {
          setArray(oldArr => [...oldArr, downloadURL]);
        });
      }
    }
    else{
      const storageRef = myref(st, 'img/' + item.img);
      getDownloadURL(storageRef).then((downloadURL) => {
        setUrl(downloadURL);
      });
    }
  },[]); 
    
  const getItem = async () => {
    const itemRef = ref(db,'items/' + item.id);
      onValue(itemRef, (snapshot) => {
        console.log(snapshot.val());
        const data = snapshot.val();
          if (data) {
            setItem(data);
          }
      });
  }
  const getFav = async () => {
    const userId = auth.currentUser.uid 
    const favRef = ref(db,'users/' + userId + '/favourites/' + item.id);
      onValue(favRef, (snapshot) => {
        console.log(snapshot.val());
        const data = snapshot.val();
          if (data) {
            setIsInFav(true);
          }
          else{
            setIsInFav(false);
          }
      });
  };
  const getCurMark = async () => {
    const userId = auth.currentUser.uid 
    const markRef = ref(db,'items/' + item.id + '/ratings/' + userId);
      onValue(markRef, (snapshot) => {
        console.log(snapshot.val());
        const data = snapshot.val();
          if (data) {
            setCurMark(data);
          }
          else{
            setCurMark(0);
          }
      });

  };
    function createFav(){
      const userId = auth.currentUser.uid
      if(!isInFav){
        set(ref(db,'users/' + userId + '/favourites/' + item.id),{
            itemId: item.id,
            timestamp: moment()
            .utcOffset('+05:30')
            .format('YYYY-MM-DD hh:mm:ss a')
          }
        )
      }
      else{
        remove(ref(db,'users/' + userId + '/favourites/' + item.id))
      }
    }

    function createMark(mark, create){
      const userId = auth.currentUser.uid
      if(create){
        let score = item.avgRating * item.numOfRatings;
        score = score + mark;
        let num = item.numOfRatings + 1;
        let avgRating = score/num;
        
        set(ref(db,'items/' + item.id + '/ratings/' + userId), mark);
        update(ref(db,'items/' + item.id),{avgRating:avgRating});
        update(ref(db,'items/' + item.id),{numOfRatings:num});
      }
      else{
        let score = item.avgRating * item.numOfRatings;
        score = score - curMark;
        score = score + mark;
        let avgRating = score/item.numOfRatings;
        set(ref(db,'items/' + item.id + '/ratings/' + userId), mark);
        update(ref(db,'items/' + item.id),{avgRating:avgRating});

      }
    }

    const onFavBtnClick = () => {
      createFav();
      setIsInFav(!isInFav);
    };
    const onStarBtnClick = (mark) => {
      if(curMark > 0){
        createMark(mark, false);
      }
      else{
        createMark(mark, true);
      }
      
      setCurMark(mark);
    };
      
    
    return (
        <View style={styles.container}>
          <ItemHeader itemId = {item.id}/>
          <ImageBackground
            style={styles.gradient}
            source={require('../assets/gradient.png')}
            >
            <View style={{ width:390, borderRadius: 10, margin: 10 }}>
                {item.images
                ?<SliderBox
                style={{ width: '100%', height: 250, resizeMode: 'cover', borderRadius: 10 }}
                images={images}
                sliderBoxHeight={250}
                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
              />
                :<Image
                source={{uri: url}}
                style={{ width: '100%', height: 250, resizeMode: 'cover', borderRadius: 10 }}
                />
                }
                <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 27, flex: 1 }}>{item.name}</Text>
                    <TouchableOpacity  onPress={onFavBtnClick}>
                      {isInFav 
                      ? <Image source={require('../assets/heart_filled.png')}
                          style={{ width: 35, height: 35 }}
                        />
                      : <Image source={require('../assets/heart.png')}
                          style={{ width: 35, height: 35 }}
                        />
                      }
                        
                    </TouchableOpacity >

                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 0, justifyContent:'space-between'}}>
                    <View style={{ flexDirection: 'row', paddingVertical: 0 }}>
                    <TouchableOpacity style={{paddingHorizontal: 2}} onPress={() =>onStarBtnClick(1)}>
                      {curMark > 0
                      ? <Image source={require('../assets/star_filled.png')}
                          style={{ width: 35, height: 35 }}
                        />
                      : <Image source={require('../assets/star.png')}
                          style={{ width: 35, height: 35 }}
                        />
                      }
                    </TouchableOpacity>    
                    <TouchableOpacity style={{paddingHorizontal: 2}} onPress={() =>onStarBtnClick(2)}>
                    {curMark > 1
                      ? <Image source={require('../assets/star_filled.png')}
                          style={{ width: 35, height: 35 }}
                        />
                      : <Image source={require('../assets/star.png')}
                          style={{ width: 35, height: 35 }}
                        />
                      } 
                    </TouchableOpacity>                         
                    <TouchableOpacity style={{paddingHorizontal: 2}} onPress={() =>onStarBtnClick(3)}>
                    {curMark > 2
                      ? <Image source={require('../assets/star_filled.png')}
                          style={{ width: 35, height: 35 }}
                        />
                      : <Image source={require('../assets/star.png')}
                          style={{ width: 35, height: 35 }}
                        />
                      }
                    </TouchableOpacity>   
                    <TouchableOpacity style={{paddingHorizontal: 2}} onPress={() =>onStarBtnClick(4)}>
                      {curMark > 3
                      ? <Image source={require('../assets/star_filled.png')}
                          style={{ width: 35, height: 35 }}
                        />
                      : <Image source={require('../assets/star.png')}
                          style={{ width: 35, height: 35 }}
                        />
                      }
                    </TouchableOpacity>     
                    <TouchableOpacity style={{paddingHorizontal: 2}} onPress={() =>onStarBtnClick(5)}>
                    {curMark > 4
                      ? <Image source={require('../assets/star_filled.png')}
                          style={{ width: 35, height: 35 }}
                        />
                      : <Image source={require('../assets/star.png')}
                          style={{ width: 35, height: 35 }}
                        />
                      }
                    </TouchableOpacity>         
                  </View>
                    <View style={{ flexDirection: 'row',  paddingVertical: 0 }}>
                      <Text style={{ fontSize: 30, fontWeight: 'bold', paddingHorizontal: 5 }}>{parseFloat(item.avgRating.toFixed(1))}</Text>
                      <Image
                      source={require('../assets/star_filled.png')}
                      style={{ width: 30, height: 30, alignSelf: 'center' }}
                      />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                    <Image
                        source={require('../assets/clock.png')}
                        style={{ width: 20, height: 20, alignSelf: 'center' }}
                    />
                    <Text style={{ fontSize: 20, paddingLeft: 5 }}>{item.time}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                    <Image
                        source={require('../assets/cook.png')}
                        style={{ width: 20, height: 20, alignSelf: 'center' }}
                    />
                    <Text style={{ fontSize: 20, paddingLeft: 5 }}>{item.diff}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                    <Image
                        source={require('../assets/money.png')}
                        style={{ width: 20, height: 20, alignSelf: 'center' }}
                    />
                    <Text style={{ fontSize: 20, paddingLeft: 5 }}>{item.price}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#ffffff', borderRadius: 10,marginVertical:10, padding: 15 }}>
                    <Text style={{ fontSize: 21}}>
                        {item.desk}
                    </Text>
                </View>
            </View>
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
  
export default ItemScreen;
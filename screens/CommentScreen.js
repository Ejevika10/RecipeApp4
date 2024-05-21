import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View,Text, TextInput, Pressable, StyleSheet, ScrollView,Image,ImageBackground , Button, TouchableOpacity} from 'react-native';
import { auth, db } from '../firebase';
import {Database, push, ref, set, child, onValue} from 'firebase/database'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import CommentInList from '../components/commentInList';
import CommentHeader from '../components/commentHeader';

const CommentScreen = ({route}) => {
    const navigation = useNavigation();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [itemId, setItemId] = useState(route.params.itemId);
    const [username, setUsername] = useState('');
    //const items = [];
    useEffect( () => {
        getComments();
        getUserName();
        
    },[]); 
    const getUserName = async () => {
        const userId = auth.currentUser.uid 
        const userRef = ref(db, 'users/' + userId + '/userinfo');
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          if (data) {
           setUsername(data.name + ' ' + data.surname);
          }
        });
    };  
    const getComments = async () => {
        const commentsRef = ref(db, 'items/' + itemId + '/comments');
        onValue(commentsRef, (snapshot) => {
          console.log(snapshot.val());
          const data = snapshot.val();
            if (data) {
                const itemKeys = Object.keys(data);
                const newComments = itemKeys.map(key => {
                    return {...data[key], id: key};
                });
                setComments(newComments);
            } else {
                setComments([]);
            }
        });
    };
    const onSendBtnClick = () => {
        createComment();
      };
    
      function createComment(){
        const userId = auth.currentUser.uid
        const newPostKey = push(child(ref(db,'items/' + itemId + '/comments'), 'posts')).key;
        set(ref(db,'items/' + itemId + '/comments/' + newPostKey),{
            comment: comment,
            id: newPostKey,
            itemId: itemId,
            userId: userId,
            userName: username
          }
        );
        setComment('');
      }  

    return (
    <View style={styles.container}>
      <CommentHeader/>
      <ImageBackground
        style={styles.gradient}
        source={require('../assets/gradient.png')}
      > 
        <ScrollView style={styles.scroll}>
        {comments.map((comment, index) => (
          
          <CommentInList key={index} comment = {comment}/>
        )  
        )}
        </ScrollView>
        <View style={{flexDirection: 'row', justifyContent:'space-between', height: 100, width: '100%', paddingHorizontal: 10, paddingVertical:25,backgroundColor: '#FF9800', borderTopLeftRadius: 20, borderTopRightRadius:20}}>
          <TextInput
            style={{height: 50,borderColor: '#ddd',backgroundColor: '#ffffff',borderWidth: 1,borderRadius: 20, padding:10, width:330}}
            value={comment}
            onChangeText={setComment}
            placeholder="Your comment"
          />  
            <TouchableOpacity style={{flex: 1, padding:10 }} onPress={onSendBtnClick}>
              <Image source={require('../assets/send_comment.png')}
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity >
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
export default CommentScreen;


import {Text, View,Image} from 'react-native'
import React, { useState, useEffect } from 'react';

export default function CommentInList({comment}){
    return (
    <View style={{ backgroundColor: '#ffffff', borderRadius: 10, margin: 10, paddingVertical:10 }}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 5 }}>
        <Image
          source={require('../assets/comment_icon.png')}
          style={{ width: 25, height:25, alignSelf: 'center', marginRight: 10 }}
        />
        <Text style={{ fontSize: 25, flex: 1 }}>{comment.userName}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 20, paddingTop: 5, paddingBottom: 10 }}>
        <Text style={{ fontSize: 17, flex: 1 }}>{comment.comment}</Text>
      </View>
    </View>
    )

}
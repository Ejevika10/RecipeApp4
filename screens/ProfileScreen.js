import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text,Pressable, TextInput, StyleSheet, ScrollView,Image,ImageBackground , Button, TouchableOpacity} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { auth, db } from '../firebase';
import {Database, push, ref, set, child, on, onValue} from 'firebase/database'
import { StackActions } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';


const ProfileScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState('');

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [favRec, setFavRec] = useState('');
    
    const [vegeterian, setVegeterian] = useState(true);
    const [gender, setGender] = useState(true);
    const [skill, setSkill] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const newDate = new Date();

    useEffect( () => {
        getUserInfo();
    },[]); 
      
    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShowDatePicker(false);
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const date = currentDate.getDate();
      setBirthdate(date+"."+month+"."+year);
    };
  



    const getUserInfo = async () => {
        const userId = auth.currentUser.uid 
        const userRef = ref(db, 'users/' + userId + '/userinfo');
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          if (data) {
           setUser(data);
           setName(data.name);
           setSurname(data.surname);
           setGender(data.gender);
           setPhone(data.phone);
           setAddress(data.address);
           setEmail(data.email);
           setVegeterian(data.vegeterian);
           setSkill(data.skill);
           setFavRec(data.favRecipe);
           setBirthdate(data.birthdate);
           console.log(gender);
          }
        });
    };

    function create(){
        const userId = auth.currentUser.uid
        set(ref(db,'users/' + userId + '/userinfo'),{
            address: address ?? '',
            birthdate: birthdate ?? '',
            email: email,
            favRecipe: favRec ?? '',
            gender: gender ?? false,
            name: name,
            phone: phone ?? '',
            skill: skill ?? 0,
            surname: surname,
            vegeterian: vegeterian ?? false
          }
        )
      }
  
      const onFavBtnClick = () => {
        create();
      };

    return (
    <View style={styles.container}>
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
        <Text style={{flex: 1, color: '#ffffff', textAlign: 'auto', fontSize: 22, fontWeight: 'bold'}}>Profile</Text>
        <View style={{width:30}}/>
        <TouchableOpacity style={{}} onPress={() =>
          {onFavBtnClick()}
          }>
          <Image source={require('../assets/edit_btn.png')}
              style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity >  
      </View>
      <ImageBackground
        style={styles.gradient}
        source={require('../assets/gradient.png')}
      > 
        <ScrollView style={styles.scroll}>

        <View style={{marginVertical:10, flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{ width:100, fontSize:20, fontWeight:'bold', alignSelf:'center'}}>Name</Text>
            <View style={{ flexDirection: 'row', width:250}}>
                <TextInput
                style={{fontSize:17}}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
                autoCapitalize="none"
                />
            </View>  
        </View>    
        <View style={{marginVertical:10, flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{ width:100, fontSize:20, fontWeight:'bold', alignSelf:'center'}}>Surname</Text>
            <View style={{ flexDirection: 'row', width:250}}>
                <TextInput
                style={{fontSize:17}}
                value={surname}
                onChangeText={setSurname}
                placeholder="Enter surname"
                autoCapitalize="none"
                />
            </View>  
        </View>     

        <View style={{marginVertical:10, flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{ width:100, fontSize:20, fontWeight:'bold', alignSelf:'center'}}>Gender</Text>
            <RadioButton.Group
             
            style={{ flexDirection: 'row'}}
            onValueChange={(value) => setGender(value)}
            value={gender}
            
            >
            <View style={{ flexDirection: 'row', width:250}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value={true} status={gender?'checked':'unchecked'} color="black" />
                    <Text style={{fontSize:17}}>Female</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value ={false} status={gender?'unchecked':'checked'} color="black"/>
                    <Text style={{fontSize:17}}>Male</Text>
                </View>
            </View>
            </RadioButton.Group>
        </View> 
        <View style={{marginVertical:10, flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{ width:100, fontSize:20, fontWeight:'bold', alignSelf:'center'}}>Birthdate</Text>            
            <View style={{width:260, flexDirection: 'row', justifyContent:'space-around'}}>
              <Text style={{fontSize:17}}>{birthdate}</Text>
              <Pressable style={{height: 25,paddingHorizontal: 25, backgroundColor: '#FF9800', borderRadius: 20, alignContent: 'center'}} onPress={() => setShowDatePicker(true)}>
                <Text style={{fontSize:17}}>Change date</Text>
              </Pressable>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={newDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
        </View>
        <View style={{marginVertical:10, flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{ width:100, fontSize:20, fontWeight:'bold', alignSelf:'center'}}>Phone</Text>
            <View style={{ flexDirection: 'row', width:250}}>
                <TextInput
                style={{fontSize:17}}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone"
                autoCapitalize="none"
                />
            </View>  
        </View>   
        <View style={{marginVertical:10, flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{ width:100, fontSize:20, fontWeight:'bold', alignSelf:'center'}}>Address</Text>
            <View style={{ flexDirection: 'row', width:250}}>
                <TextInput
                style={{fontSize:17}}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter address"
                autoCapitalize="none"
                />
            </View>  
        </View>       
        <View style={{marginVertical:10, flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{ width:100, fontSize:20, fontWeight:'bold', alignSelf:'center'}}>Email</Text>
            <View style={{ flexDirection: 'row', width:250}}>
                <TextInput
                style={{fontSize:17}}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                autoCapitalize="none"
                />
            </View>  
        </View>  
        <View style={{marginVertical:10, flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{ width:100, fontSize:20, fontWeight:'bold', alignSelf:'center'}}>Vegeterian</Text>
            <RadioButton.Group 
            style={{ flexDirection: 'row'}}
            onValueChange={(value) => setVegeterian(value)}
            value={vegeterian}
            >
            <View style={{ flexDirection: 'row', width:250}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value={true} color="black" />
                <Text style={{fontSize:17}}>Yes</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value ={false} color="black" />
                <Text style={{fontSize:17}}>No</Text>
                </View>
            </View>
            </RadioButton.Group>
        </View>
        <View style={{marginVertical:10, flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{ width:100, fontSize:20, fontWeight:'bold', alignSelf:'center'}}>Skill</Text>
            <RadioButton.Group 
            style={{ flexDirection: 'row'}}
            onValueChange={(value) => setSkill(value)}
            value={skill}
            >
            <View style={{ flexDirection: 'row', width:250}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value={1} color="black" />
                <Text style={{fontSize:17}}>easy</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value ={2} color="black" />
                <Text style={{fontSize:17}}>medium</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value ={3} color="black" />
                <Text style={{fontSize:17}}>hard</Text>
                </View>
            </View>
            </RadioButton.Group>
        </View>
        <View style={{marginVertical:10, flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{ width:100, fontSize:20, fontWeight:'bold', alignSelf:'center'}}>Favourite recipe</Text>
            <View style={{ flexDirection: 'row', width:250}}>
                <TextInput
                style={{fontSize:17}}
                value={favRec}
                onChangeText={setFavRec}
                placeholder="Favourite recipe"
                autoCapitalize="none"
                />
            </View>  
        </View>     


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
export default ProfileScreen;


import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../../Firebase/FirebaseConfig'
import { useNavigation } from '@react-navigation/native'
import { hr80, navbtnout, navbtn } from '../globals/Style'
import { Ionicons, Feather } from '@expo/vector-icons';


const UserProfile = () => {

  const navigation = useNavigation()

  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState('')

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        // console.log(user);
        if (user) {
          // navigation.navigate('home');
          setUserloggeduid(user.uid);
        } else {
          // No user is signed in.
          console.log('no user');
        }
      });
    }
    checklogin();
  }, [])

  // console.log(userloggeduid);

  useEffect(() => {
    const getuserdata = async () => {
      const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
      console.log(docRef);
      const doc = await docRef.get()
      if (!doc.empty) {
        doc.forEach((doc) => {
          setUserdata(doc.data())
        })
      }
      else {
        // navigation.navigate('login')
      }
    }

    getuserdata()

  }, [userloggeduid])


  console.log(userdata);

  return (
    <View style={{ flex: 1, backgroundColor:'#fff' }}>

      <View style={[styles.normalflex, { marginHorizontal: 20 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Ionicons name="arrow-back-outline" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.title}>edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileTitle}>
        <Feather name="user" size={60} color="black" style={styles.profileicon} />
        <Text style={styles.name}>{userdata.name}</Text>
      </View>
      <View style={hr80} />
      <View style={styles.box}>
        <Text style={styles.datatitle}>Contact no :</Text>
        <Text style={styles.data}>{userdata.phone}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.datatitle}>Optional Canteact no : ( roomate, friend etc )</Text>
        <Text style={styles.data}>7823042946</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.datatitle}>Birth Date :</Text>
        <Text style={styles.data}>09/10/2001</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.datatitle}>Home Address :</Text>
        <Text style={styles.data}>{userdata.address}</Text>
      </View>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  normalflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color:'#0a95ff'
  },
  profileTitle: {
    alignItems: 'center'
  },
  profileicon: {
    backgroundColor: '#e3e6e8',
    padding: 10,
    borderRadius: 20
  },
  name:{
    marginTop:10,
    fontSize:20,
    fontWeight:'400'
  },
  box: {
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  datatitle: {
    fontWeight: '600',
    color: 'gray'
  },
  data: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#c3d4e3',
    borderRadius: 10,
    color:'#6c6c6c'
  }
})
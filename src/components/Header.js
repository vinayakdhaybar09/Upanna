import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather, FontAwesome } from '@expo/vector-icons';
import { colors } from '../globals/Style'
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.myicon} onPress={() => navigation.navigate('userprofile')}  >
        <Feather name="user" size={26} color="black" />
      </TouchableOpacity>

      <Text style={styles.mytext}>upanna</Text>

      <TouchableOpacity
        style={styles.myicon}
        onPress={() => {
          Linking.openURL('http://api.whatsapp.com/send?phone=+919359652921')
        }}
      >
        <FontAwesome name="whatsapp" size={26} color="green" />
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    backgroundColor: colors.col1,
    elevation: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  myicon: {
    // padding: 10, 
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: 50
  },
  mytext: {
    color: colors.text1,
    fontSize: 24,
    fontWeight:'600'
  },
  userIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
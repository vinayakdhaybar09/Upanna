import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, nonveg, veg } from '../globals/Style'
import { useNavigation } from '@react-navigation/native'

const CardSlider = ({ title, data, subTitle }) => {

    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)

    // console.log(data);
    const openProductPage = (item) => {
        navigation.navigate('productpage', item)
        // console.log(item);
    }

    return (
        <View style={styles.container}>
            <View style={styles.typeStyle} >
                <Text style={styles.title}>{title}
                <Text style={{color:'gray', fontSize:12}} >{subTitle}</Text>
                </Text>
            </View>
            <FlatList style={styles.cardsout}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item.index}
                        onPress={() => { openProductPage(item) }}
                        activeOpacity={0.8}>
                        
                        <View style={styles.box}>
                            {/* <Text>hello</Text> */}
                            <Image
                                style={styles.image}
                                source={{ uri: item.foodImageUrl }}
                            />
                            <View>
                                <Text style={styles.foodName}>{item.foodName}</Text>
                            </View>
                            <View style={styles.flex}>
                                <Text style={{color:'gray'}}>Price</Text>
                                <Text style={{color:'gray', textDecorationLine:'line-through'}}>&#8377; {item.normalPrice}</Text>
                            </View>
                            <View style={styles.flex}>
                                <Text style={styles.offerprice}>Offer Price</Text>
                                <Text style={styles.offerprice}>&#8377; {item.offerPrice}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default CardSlider

const { height, width } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    typeStyle: {
        margin: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color:'#f44336'
    },
    cardsout: {
        width: '100%',
        // backgroundColor: 'red',
    },
    box: {
        width: width /2,
        height: 375,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 10
    },
    foodName:{
        fontSize:15,
        fontWeight:'500',
        padding:5,
        // color:'gray'
    },
    flex:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:5
    },
    offerprice:{
        fontWeight:'500',
        color:'green'
    }








    // card: {
    //     // backgroundColor: "aqua",
    //     width: '50%',
    //     height: 300,
    //     margin: 10,
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     borderColor: '#e8e8e8',
    //     backgroundColor: colors.col1,
    // },
    // cardimgin: {
    //     width: "100%",
    //     height: 200,
    //     borderRadius: 10,
    // },
    // s2: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     // backgroundColor: 'aqua',
    // },
    // txt1: {
    //     fontSize: 18,
    //     color: colors.text3,
    //     marginHorizontal: 5,
    //     width: 150,
    // },
    // txt2: {
    //     fontSize: 20,
    //     color: colors.text2,
    //     marginRight: 10,
    // },
    // s2in: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginHorizontal: 10,

    // },
    // s3: {
    //     alignItems: 'center',
    //     position: 'absolute',
    //     bottom: 1,
    //     width: '100%',
    // },
    // buybtn: {
    //     backgroundColor: colors.text1,
    //     color: colors.col1,
    //     paddingHorizontal: 10,
    //     paddingVertical: 5,
    //     fontSize: 20,
    //     borderRadius: 10,
    //     width: '90%',
    //     textAlign: 'center',
    // }
})
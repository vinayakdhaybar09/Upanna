import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, nonveg, veg, navbtn, navbtnout, navbtnin, btn2, hr80, incdecbtn, incdecout, incdecinput } from '../globals/Style'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { firebase } from '../../Firebase/FirebaseConfig'/


const ProductPage = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const data = route.params
    // console.log(item);

    if (route.params === undefined) {
        navigation.navigate('home')
    }

    const [quantity, setQuantity] = useState('1')
    const [addonquantity, setAddonquantity] = useState('0')
    const [foodTypeIcon, setFoodTypeIcon] = useState('green')

    const addtocart = () => {
        // const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid)

        // const data1 = { data, Addonquantity: addonquantity, Foodquantity: quantity }
        // console.log(data1);

        // docRef.get().then((doc) => {
        //     if (doc.exists) {
        //         docRef.update({
        //             cart: firebase.firestore.FieldValue.arrayUnion(data1)
        //         })
        //         alert('Food added to cart')
        //     } else {
        //         docRef.set({
        //             cart: [data1],
        //         })
        //         alert('Food added to cart')
        //     }
        // })
    }


    // const increaseQuantity = () => {
    //     setQuantity((parseInt(quantity) + 1).toString())
    // }

    // const decreaseQuantity = () => {
    //     if (parseInt(quantity) > 1) {
    //         setQuantity((parseInt(quantity) - 1).toString())
    //     }
    // }

    // const increaseAddonQuantity = () => {
    //     setAddonquantity((parseInt(addonquantity) + 1).toString())
    // }

    // const decreaseAddonQuantity = () => {
    //     if (parseInt(addonquantity) >= 1) {
    //         setAddonquantity((parseInt(addonquantity) - 1).toString())
    //     }
    // }

    const foodTypeColor = () => {
        if (data.foodType == 'veg') {
            setFoodTypeIcon('#1b7810')
        }
        else if (data.foodType == 'non-veg') {
            setFoodTypeIcon('#b51414')
        }
        else if (data.foodType == 'egg') {
            setFoodTypeIcon('#af721a')
        }
    }


    useEffect(() => {
        foodTypeColor()
    }, [data])

    return (
        <View style={{ flex: 1 }} >
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={navbtnout}>
                    <View style={navbtn}>
                        <Ionicons name="arrow-back-outline" size={35} color="white" />
                    </View>
                </TouchableOpacity>
                <View style={styles.container1}>
                    <View style={styles.s1}>
                        <Image source={{
                            uri: data.foodImageUrl
                        }} style={styles.cardimgin} />
                    </View>
                </View>

                <View style={styles.s2}>
                    <View style={styles.s2in}>
                        <Text style={styles.head1}>{data.foodName}</Text>
                        <Text style={styles.head2}>&#8377; {data.offerPrice}/-</Text>
                    </View>
                    <Text style={{ color: 'black', marginVertical: 25 }}>{data.foodDescription}</Text>
                    <View style={styles.s3}>
                        <View style={styles.s3in}>
                            <Text style={styles.head3}>About Food</Text>
                            <MaterialCommunityIcons name="square-circle" size={24} color={foodTypeIcon} />
                        </View>
                        <Text style={styles.head4}>{data.foodItems}</Text>
                    </View>
                    {
                        data.days.monday == 'null' ?
                            <View></View>
                            :
                            <View>
                                <Text style={{ marginVertical: 20, fontSize: 20, color: 'gray', fontWeight: '600' }}>Days</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View style={styles.container2}>
                                        <Text style={styles.day}>Mon</Text>
                                        <Text>{data.days.monday}</Text>
                                    </View>
                                    <View style={styles.container2}>
                                        <Text style={styles.day}>Tue</Text>
                                        <Text>{data.days.tuesday}</Text>
                                    </View>
                                    <View style={styles.container2}>
                                        <Text style={styles.day}>Wed</Text>
                                        <Text>{data.days.wednesday}</Text>
                                    </View>
                                    <View style={styles.container2}>
                                        <Text style={styles.day}>Thur</Text>
                                        <Text>{data.days.thursday}</Text>
                                    </View>
                                    <View style={styles.container2}>
                                        <Text style={styles.day}>Fri</Text>
                                        <Text>{data.days.friday}</Text>
                                    </View>
                                    <View style={styles.container2}>
                                        <Text style={styles.day}>Sat</Text>
                                        <Text>{data.days.saturday}</Text>
                                    </View>
                                    <View style={styles.container2}>
                                        <Text style={styles.day}>Sun</Text>
                                        <Text>{data.days.sunday}</Text>
                                    </View>
                                </ScrollView>
                            </View>
                    }
                </View>

            </ScrollView>
            {/* <Text style={[hr80, { width: '100%' }]}></Text> */}
            {/* <Text style={{color:'red', textAlign:'center', backgroundColor:'white'}}>for monthly or weekly subscription</Text> */}
            <TouchableOpacity style={styles.subscribeBtn} onPress={()=> navigation.navigate('placeorder', {data})}  >
                <Text style={styles.btntxt}>Subscribe now</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProductPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        width: '100%',

    },
    container1: {
        // position: 'absolute',
        // top: 0,
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    s1: {
        width: '100%',
        height: 300,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    cardimgin: {
        width: '100%',
        height: '100%',
    },
    s2: {
        width: '100%',
        padding: 20,
        position: 'relative',
        top: -30,
        backgroundColor: colors.col1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    s2in: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    head1: {
        fontSize: 25,
        fontWeight: '500',
        color: 'gray',
        width: 220,
        marginRight: 10,
    },
    head2: {
        fontSize: 30,
        // fontWeight: '400',
        color: 'green',
    },
    s3: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        // elevation:10,
        borderColor:'green'
    },
    head3: {
        fontSize: 30,
        fontWeight: '200',
        color: "#000",
    },
    head4: {
        marginVertical: 10,
        fontSize: 15,
        letterSpacing: 0.2,
        // fontWeight: '400',
        color: '#000',
    },
    s3in: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    head5: {
        color: colors.text3,
        fontSize: 20,
        fontWeight: '200',
        marginLeft: 10,
    },
    btntxt: {
        backgroundColor: 'green',
        color: 'white',
        paddingVertical: 10,
        fontSize: 20,
        borderRadius: 10,
        marginHorizontal:10,
        textAlign: 'center',
        marginVertical:10
    },
    btncont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
    },
    container2: {
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        elevation: 10,
        shadowRadius: 15,
        borderWidth: 1.3,
        borderColor: '#000',
        borderRadius: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20
    },
    day: {
        borderBottomWidth: 1,
        padding: 5,
        marginBottom: 4
    },
    txt1: {
        color: colors.text1,
        fontSize: 20,
        fontWeight: '200',

    },
    txt2: {
        color: colors.text3,
        fontSize: 30,
        fontWeight: '200',
        marginVertical: 10,

    },
    container2in: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt3: {
        color: colors.text1,
        fontSize: 18,
        textAlign: 'center'
    },
    dash: {
        width: 1,
        height: 20,
        backgroundColor: colors.text1,
        marginHorizontal: 10,
    },
    c3in: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    container3: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    text4: {
        color: colors.text3,
        fontSize: 20,
        marginHorizontal: 10,
    },
    c4in: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    subscribeBtn: {
        width: '100%',
        backgroundColor:'white'
    }
})
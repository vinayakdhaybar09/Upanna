import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import OfferSlider from '../components/OfferSlider'



import { firebase } from '../../Firebase/FirebaseConfig'
import CardSlider from '../components/CardSlider'

const TiffinScreen = () => {
    const [tiffinData, setTiffinData] = useState([])
    const [mealData, setMealData] = useState([])
    const [fullTiffinCategory, setFullTiffinCategory] = useState([])
    const [halfTiffinCategory, setHalfTiffinCategory] = useState([])
    const [otherCategory, setOtherCategory] = useState([])



    const foodRef = firebase.firestore().collection('TiffinData')

    useEffect(() => {
        foodRef.onSnapshot(snapshot => {
            setTiffinData(snapshot.docs.map((doc) => doc.data()))
        })
    }, [])

    useEffect(() => {
        setFullTiffinCategory(tiffinData.filter(item => item.foodCategory == 'full'))
        setHalfTiffinCategory(tiffinData.filter(item => item.foodCategory == 'half'))
        setOtherCategory(tiffinData.filter(item => item.foodCategory == 'other'))
    }, [tiffinData])

    // console.log(mealCategory);
    return (
        <View style={styles.container} >
            <StatusBar backgroundColor={'black'} />
            <Header />
            <ScrollView>
                <View style={styles.typeStyle} >
                    <Text style={styles.title}>Tiffin</Text>
                    <Text style={styles.subTitle}>You can order quality & quantity food in group in low price.</Text>
                </View>
                <CardSlider title={'Full Tiffin'} data={fullTiffinCategory} subTitle={'( students, bachlers, family )'} />
                <CardSlider title={'Half Tiffin'} data={halfTiffinCategory} subTitle={'( students, bachlers, family )'} />

            </ScrollView>
        </View>
    )
}

export default TiffinScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    infoText: {
        borderWidth: 1,
        margin: 20,
        padding: 10,
        borderRadius: 10,
        borderColor: 'green'
    },
    typeStyle: {
        margin: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        // letterSpacing:0.5
    },
    subTitle: {
        marginTop: 7,
        paddingHorizontal: 10,
        color: 'gray',
        textAlign: 'center'
    },

})
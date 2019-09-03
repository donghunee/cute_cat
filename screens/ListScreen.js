import React from 'react';

import {View, ScrollView,Text, StyleSheet,TouchableOpacity} from 'react-native';
import MasonryList from "react-native-masonry-list"        
import {SafeAreaView, getActiveChildNavigationOptions} from 'react-navigation';
import ListHeader from '../components/ListHeader'

export default ListScreen = (props) => { 

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <MasonryList sorted images={props.screenProps.data} />
            </ScrollView>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
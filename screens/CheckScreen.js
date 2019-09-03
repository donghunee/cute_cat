import React from 'react';
import { Text,Image, View, TouchableOpacity,StyleSheet } from 'react-native';
import {Ionicons,AntDesign,MaterialCommunityIcons} from '@expo/vector-icons'
import uuid from 'uuid/v4'
import { Platform } from 'react-native'


export default class CheckScreen extends React.Component {


    
    render(){
        const {photo} = this.props.navigation.state.params
        const navigation = this.props.navigation
        return (
            <View style={{flex:1}}>
                <Image source={{uri:photo}} style={{flex:1}} />
                <View
                    style={{
                        position:"absolute",
                        flex:0.1,
                        width:"100%",
                        bottom:30,
                        flexDirection:'row',
                        justifyContent: 'space-around',
                    }}>
                     <TouchableOpacity 
                        onPress={()=>{navigation.goBack()}}>
                        <Text style={styles.text} >다시시도</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>{
                            this.props.screenProps.picUpload(photo)
                            navigation.navigate('Tab')
                        }}>
                        <Text style={styles.text} >업로드</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
      color: "white",
      fontSize:20,
      fontWeight:"bold"
    },
  });
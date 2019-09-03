import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import {Ionicons,AntDesign,MaterialCommunityIcons} from '@expo/vector-icons'

export default class CameraExample extends React.Component {

    state = {
        isFlased:false,
        flashType:null,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        autoFocus: Camera.Constants.AutoFocus.on,
    };

    navigation = this.props.navigation

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snapPhoto() {       
    if (this.camera) {
       const options = { quality: 1, base64: false, fixOrientation: true, exif: true, skipProcessing: true };
       await this.camera.takePictureAsync(options).then(photo => {
            photo.exif.Orientation = 1;            
            console.log(photo.uri); 
            this.navigation.navigate('Check', {photo: photo.uri})
        });     
     }
    }

  render() {
    
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
            style={{ flex: 1 }} 
            ref={ (ref) => {this.camera = ref} }
            type={this.state.type}
            autoFocus={this.state.autoFocus}
            ratio={"16:9"}
            flashMode={this.state.flashType}>
            
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}>
            <TouchableOpacity 
                  style={{
                    position:'absolute',
                    bottom:35,
                    flex: 0.1,
                    alignItems: 'center',
                }} onPress={this.snapPhoto.bind(this)}>
                <MaterialCommunityIcons name="circle-slice-8" size={60} color={"white"} />
            </TouchableOpacity>    
            <TouchableOpacity 
                  style={{
                    position:'absolute',
                    top:15,
                    left:20,
                    flex: 0.1,
                    alignSelf:'flex-start',
                    alignItems: 'center',
                    }} 
                    onPress={() => {this.navigation.goBack()}}>
                    <AntDesign name="arrowleft" size={28} color={"white"}/>
            </TouchableOpacity>
            <TouchableOpacity 
                  style={{
                    position:'absolute',
                    bottom:42,
                    left:30,
                    flex: 0.1,
                    alignSelf:'flex-start',
                    alignItems: 'center',
                    }} 
                    onPress={() => {
                        this.state.isFlased ? this.setState({isFlased:false,flashType:Camera.Constants.FlashMode.off}):this.setState({isFlased:true,flashType:Camera.Constants.FlashMode.on});
                    }} >
                     {
                
                this.state.isFlased ? <MaterialCommunityIcons name="flash-off" size={40} color={"white"} /> : <MaterialCommunityIcons name="flash" size={40} color={"white"} />
                    }
            </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
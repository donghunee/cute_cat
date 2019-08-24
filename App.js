import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import Navigation from './Navigator'
import uuid from 'uuid/v4'
import { Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
export default class App extends React.Component {  

  state = {
    photo:null,
    data:[{
      uri:"https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg"
      },{
          uri: "https://cdn.pixabay.com/photo/2014/11/30/14/11/kitty-551554__340.jpg"
      },{
          uri: "https://cdn.pixabay.com/photo/2017/11/14/13/06/kitty-2948404__340.jpg"
      },{
          uri: "https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662__340.jpg"
      },{
          uri: "https://cdn.pixabay.com/photo/2016/02/10/16/37/cat-1192026__340.jpg"
      },{
          uri: "https://cdn.pixabay.com/photo/2018/01/28/12/37/cat-3113513__340.jpg"
      },{
          uri: "https://cdn.pixabay.com/photo/2014/03/12/01/36/eyes-285825__340.png"
      },{
          uri: "https://cdn.pixabay.com/photo/2017/04/30/18/33/cat-2273598__340.jpg"
      },{
          uri: "https://cdn.pixabay.com/photo/2018/07/13/10/20/cat-3535404__340.jpg"
      },{
          uri: "https://cdn.pixabay.com/photo/2016/05/15/03/29/cat-1393075__340.jpg"
      }]
    }
    
    async componentDidMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      alert(status)
    }

    _imageUpload = async() => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
      })
      const tail = /jpg|png/.exec(result.uri)
      
      if(result.cancelled !== true){
        this.setState({photo: result});
        const data = new FormData()
        var photo = this.state.photo
        var body = { userId: "123" }
        data.append("photo", {
          name: uuid()+'.'+tail,
          type: 'image/'+tail,
          uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });
        fetch(`http://cute-cat.dv3fkwnfc2.ap-northeast-2.elasticbeanstalk.com/images/upload`, {
          method: "POST",
          headers:{  
            "Content-Type": "multipart/form-data",
            },
          body: data,
        })
          .then(response => response.json())
          .then(response => {
            console.log("upload succes", response.uri);
            alert("업로드 완료!");
            const prevImage = [...this.state.data]
            const newImage = {
              uri: response.uri
            }

            this.setState({ 
              photo: null,
              data: prevImage.concat(newImage) });
          })
          .catch(error => {
            console.log("upload error", error);
            alert("Upload failed!");
          });
      }
      
  }


  render(){
    return(
      <Navigation 
      imageUpload={this._imageUpload}

      screenProps={{
        imageUpload: this._imageUpload,
        data:this.state.data
      }}
       />  
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:20
  },
});

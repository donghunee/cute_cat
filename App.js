import { StyleSheet, Text, View,BackHandler } from 'react-native';
import React from 'react'
import Navigation from './Navigator'
import uuid from 'uuid/v4'
import { Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default class App extends React.Component {  

  state = {
    photo:null,
    is_upload:false,
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

    componentWillUnmount() {
        

    }
    componentDidUpdate() {
      
    }


    componentDidMount() {
    
    }
      
    _imageUpload = async() => {
      try {
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
          this.setState({
            is_upload:true
          })
          fetch(`http://cute-cat.dv3fkwnfc2.ap-northeast-2.elasticbeanstalk.com/images/upload`, {
            method: "POST",
            headers:{  
              "Content-Type": "multipart/form-data",
              },
            body: data,
          })
            .then(response => response.json())
            .then(response => {
              if (response.result !=="dog") {
                const prevImage = [...this.state.data]
                const newImage = {
                  uri: response.result
                }
  
                this.setState({ 
                  photo: null,
                  is_upload:false,
                  data: prevImage.concat(newImage) });
                  alert("업로드 완료!");
                  
                }else{
                  this.setState({ 
                    is_upload:false 
                  });
                  alert("고양이 사진을 업로드 해주세요!!")
                }
            })
            .catch(error => {
              this.setState({
                is_upload:false
              })
              console.log("upload error", error);
              alert("Upload failed!");
            });
        }
      } catch (e) {
        this.setState({
          is_upload:false
        })
      }
      
      
  }


  _PicUpload = async(photo) => {
    try {
        const tail = /jpg|png/.exec(photo)
        if(photo !== null){
            const data = new FormData()
            data.append("photo", {
            name: uuid()+'.'+tail,
            type: 'image/'+tail,
            uri:
                Platform.OS === "android" ? photo : photo.replace("file://", "")
            });
            this.setState({
            is_upload:true
            })
            fetch(`http://9a87f40e.ngrok.io/images/upload`, {
            method: "POST",
            headers:{  
                "Content-Type": "multipart/form-data",
                },
            body: data,
            })
            .then(response => response.json())
            .then(response => {
                if (response.result !=="dog") {
                const prevImage = [...this.state.data]
                const newImage = {
                    uri: response.result
                }
                this.setState({ 
                    photo: null,
                    is_upload:false,
                    data: prevImage.concat(newImage) });
                    alert("업로드 완료!");
                  
                    
                }else{
                    this.setState({ 
                    is_upload:false 
                    });
                    alert("고양이 사진을 업로드 해주세요!!")
                }
            })
            .catch(error => {
                this.setState({
                is_upload:false
                })
                console.log("upload error", error);
                alert("업로드 실패!");
                // setTimeout(() => {
                //     this.props.navigation.goBack()
                // }, 1000);
            });

        }
    } catch (e) {
      this.setState({
        is_upload:false
      })
    }
    
    
}

  render(){
    return(
      <Navigation 
      imageUpload={this._imageUpload}
      
      screenProps={{
        picUpload: this._PicUpload,
        imageUpload: this._imageUpload,
        data:this.state.data,
        isupload:this.state.is_upload
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

import React from 'react';
import {TouchableOpacity,ActivityIndicator}from 'react-native'
import {createAppContainer,
        createBottomTabNavigator,
        createStackNavigator } from "react-navigation"
import ListScreen from './screens/ListScreen'
import CameraScreen from './screens/CameraScreen'
import {Ionicons} from '@expo/vector-icons'
import CameraHeader from './components/CameraHeader'
import CheckScreen from './screens/CheckScreen'

const TabNavigator = createBottomTabNavigator({
    ListScreen: {
        screen: ListScreen,
                    //해당 탭의 옵션 중
        navigationOptions: {
                        // '아이콘 설정'을 합니다.
            tabBarIcon: () => {
                                //tabBarOptions에서 color을 받아와 아이콘에 적용해서 리턴합니다.
                    
                         return <Ionicons name='ios-apps' size={25} color={'#fddb00'}/>                         
    						// 만약 isLoaded가 true라면 Forecast 컴포넌트를 출력하고, 아니라면 로딩화면을 띄워줘.
                     
            }
        }
    },
    CameraScreen: {
        screen: () => null,
        navigationOptions: {
            tabBarIcon: () => {
                return <Ionicons name='ios-camera' size={25} color={'#fddb00'}/>
            },
            tabBarOnPress: ({navigation}) => {
                navigation.navigate('Camera')
            }
        }

    }
},{
            //하단 탭을 커스텀 할 수 있는 옵션 중
    tabBarOptions: {
                    //탭이 선택되었을 때 하단 탭의 색깔을 설정합니다.
        activeTintColor: '#000',
                    //탭이 선택되지 않았을 때 하단 탭의 색깔을 설정합니다.
        inactiveTintColor: "#29538b",
                    //탭의 제목을 표시하지 않습니다. default는 true입니다.
        showLabel: false,
        style: {
            borderTopColor: '#fddb00',
            borderTopWidth: 3,
            backgroundColor: '#29538b'
        }
    }
}//end of tabBarOptions
);//end of createBottomTabNavigator

const AppNavigator = createStackNavigator (
    {
        Tab: {
            screen:TabNavigator,
            navigationOptions: ({screenProps}) => ({
                headerTintColor: "#fddb00",
                headerStyle: {
                    backgroundColor: '#29538b',
                    borderBottomColor: '#fddb00',
                    borderBottomWidth: 3,
                },
                title:"CuteCat",
                headerRight:
                <TouchableOpacity
                    style={{marginRight:20}}
                    onPress={screenProps.imageUpload}
                    activeOpacity={0.8}
                    disabled={screenProps.isupload? true: false}
                    hitSlop={{top:2, bottom:2, left:2, right: 2}}>
                    {
                        screenProps.isupload ? <ActivityIndicator color={"#fddb00"} /> : <Ionicons name="ios-image" size={25} color={'#fddb00'}></Ionicons>
                    }
                </TouchableOpacity>
            })
        },
        Camera: {
            screen: CameraScreen,
            navigationOptions:{
                header: <CameraHeader />,
            }
        },
        Check: {
            screen: CheckScreen,
             navigationOptions:{
                header: <CameraHeader />,
            }
        }
        // View: ViewScreen,  
    },
    {
        initialRouteName: 'Tab',
        mode: '',
        headerMode: 'float'
    }
)

export default createAppContainer(AppNavigator)
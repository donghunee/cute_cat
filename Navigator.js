import React from 'react';
import {TouchableOpacity}from 'react-native'
import {createAppContainer,
        createBottomTabNavigator,
        createStackNavigator } from "react-navigation"
import ListScreen from './screens/ListScreen'
import {Ionicons} from '@expo/vector-icons'

const TabNavigator = createBottomTabNavigator({
    ListScreen: {
        screen: ListScreen,
                    //해당 탭의 옵션 중
        navigationOptions: {
                        // '아이콘 설정'을 합니다.
            tabBarIcon: ({tintColor}) => {
                                //tabBarOptions에서 color을 받아와 아이콘에 적용해서 리턴합니다.
                return <Ionicons name='ios-apps' size={25} color={'#fddb00'}/>
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
                    hitSlop={{top:2, bottom:2, left:2, right: 2}}>
                    <Ionicons name="ios-image" size={25} color={'#fddb00'}></Ionicons>
                </TouchableOpacity>
            })
        }
        // View: ViewScreen,  
    },
    {
        initialRouteName: 'Tab',
        mode: 'modal',
        headerMode: 'float'
    }
)

export default createAppContainer(AppNavigator)
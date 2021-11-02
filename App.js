import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Home from './screens/home';
import About from "./screens/about";
import Product from "./screens/product";
import Setting from './screens/setting';
import ProductDetail from "./screens/productdetail";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddProduct from './screens/addproduct';
import Quiz from './screens/quiz';
import Login from './screens/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopularMovie from './screens/popularmovie';
import PopularActor from './screens/popularactor';
import DetailMovie from './screens/detailmovie';
import NewPopMovie from './screens/newpopmovie';
import EditMovie from './screens/editmovie';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const cekLogin = async () => {
  try {
   const value = await AsyncStorage.getItem('username');
   global.activeuser=value;
   if(value !== null) {
    return value;
   }
  } catch(e) {
   // error reading value
  }
 }

 function CustomDrawerContent(props) {
  return (
   <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
    <DrawerItem label={() => <Text>Logout</Text>}
     onPress={() => doLogout()}
    />
   </DrawerContentScrollView>
  );
 }

 doLogout = async () => {
  try {
   await AsyncStorage.removeItem('username')
   alert('logged out');
   NativeModules.DevSettings.reload();
  } catch (e) {
  }
}
  
 

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      islogin:false
    }

    cekLogin().then((item)=>{
      if(item!=null){
      this.setState(
       this.state = {
        islogin:true
       })
      }
     })
 
  }
 
  render() {
    if(!this.state.islogin)
    { return (<NavigationContainer><Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
      </NavigationContainer>);
    }
    else{
   return(  
     
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Dashboard" component={Nav1} options={{ headerShown:true}}  />
        <Drawer.Screen name="Add Product" component={AddProduct} />
        <Drawer.Screen name="Setting" component={Setting} />
        <Drawer.Screen name="Quiz" component={Quiz} />
        <Drawer.Screen name="Popular Movie" component={NavMovie} />
        <Drawer.Screen name="PopularActor" component={PopularActor} />
        <Drawer.Screen name="NewPopMovie" component={NewPopMovie} />
      </Drawer.Navigator>
    </NavigationContainer>
 );
   }
  }
}

function NavMovie() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PopularMovie" component={PopularMovie} 
       options={{ headerShown: false }}/>
      <Stack.Screen name="DetailMovie" component={DetailMovie} />
      <Stack.Screen name="EditMovie" component={EditMovie}  />
    </Stack.Navigator>
  );
}



// function Nav3()
// {
//   return (
//       <Drawer.Navigator initialRouteName="  ">
//         <Drawer.Screen name="Dashboard" component={Home}/>
//         <Drawer.Screen name="AddProduct" component={AddProduct} />
//         <Drawer.Screen name="Setting" component={Setting} />
//         <Drawer.Screen name="Quiz" component={Quiz} />
//       </Drawer.Navigator>
//   )
// }
function Nav1(){
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({focused}) => {
        var iconName;
        if(route.name=='Home')
        { iconName='home';
          var iconColor=(focused)? 'blue':'gray';}
        if(route.name == 'About') 
        { iconName='help';
          var iconColor=(focused)? 'blue':'gray';}
        if(route.name == 'Product') 
        { iconName='cube';
          var iconColor=(focused)? 'blue':'gray';}
        return <Ionicons name={iconName} size={30} color={iconColor}/>;
      },
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="About" component={About} />
      <Tab.Screen name="Product" component={Nav2} 
       options={{ headerShown: false }}/>
    </Tab.Navigator>

  );
}
function Nav2() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={Product} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

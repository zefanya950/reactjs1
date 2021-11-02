import { StyleSheet, View, Text, FlatList,Button,TextInput } from "react-native";
import { Card,Input,Image,Icon,SearchBar } from 'react-native-elements';
import React from "react";
import {useNavigation} from '@react-navigation/native';

class PopularMovie extends React.Component {
        
    constructor(){
     super();
     this.state = {
        cari:"",
        tes:"menunggu API"
     }
     this.fetchData();
    }

    fetchData = () => {
      const options = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: "cari="+this.state.cari
      };
        try {
          fetch('http://ubaya.fun/react/160418044/movielist.php',options)
            .then(response => response.json())
            .then(resjson =>{
              this.setState(
                this.state = {
                  tes:resjson.result,
                  data:resjson.data
                })
            });
        } catch (error) {
          console.log(error);
        } 
      }

      showData(data){
        return <FlatList
          data={data}
          keyExtractor={(item) => item.movie_id.toString()}
          renderItem={({item}) => (
            <Card>
            <Card.Title>{item.title}</Card.Title>
            <Card.Divider/>
            <Card.Image source={{uri:'http://placekitten.com/200/150'}}>
            </Card.Image>
            <Text style={{marginBottom: 10}}>
                 {item.overview}
              </Text>
              <Button
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VIEW DETAIL'
                onPress={() =>{
                  const { navigation } = this.props;
                  navigation.navigate("DetailMovie",{movie_id: item.movie_id })}
                }
              />
            
          </Card>
          )}
          />
        }

    
    
    render() {
        return <View>
                <SearchBar
                placeholder="Input Movie Name"
                lightTheme="true"
                inputContainerStyle={{borderRadius:15}}
                onChangeText={(cari) => {
                    this.setState({cari});
                }}
                onSubmitEditing={this.fetchData()}
                value={this.state.cari}
                />
                 {this.showData(this.state.data)}
              </View>
    }
   }
   
   const styles = StyleSheet.create({
          input: {
            height: 40,
            width:200,
            borderWidth: 1,
            padding: 10,
          },
          viewRow:{
             flexDirection:"row",
             justifyContent:"flex-end",
             alignItems: 'center',
             paddingRight:50,
             margin:3
          }
       })
  
    export default function(props) {
        const navigation = useNavigation();
        return <PopularMovie {...props} navigation={navigation} />;
      }
      
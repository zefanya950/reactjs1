import { StyleSheet, View, Text, FlatList,Button,TextInput } from "react-native";
import { Card,Input,Image,Icon,SearchBar } from 'react-native-elements';
import React from "react";

class DetailMovie extends React.Component {
    constructor(){
      super();
      this.state = {  
        movie_id:0,
        is_fetched:false,
        data:{}
      }
    }

    deleteData = () => {
        const options = {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
          }),
          body: "id="+this.state.movie_id
        };
          try {
            fetch('http://ubaya.fun/react/160418044/deletemovie.php',
            options)
              .then(response => response.json())
              .then(resjson =>{
                console.log(resjson);
                if(resjson.result==='success') alert('Terhapus')
              });
          } catch (error) {
            console.log(error);
          } 
        }

    fetchData = () => {
              const options = {
                method: 'POST',
                headers: new Headers({
                  'Content-Type': 'application/x-www-form-urlencoded'
                }),
                body: "id="+this.state.movie_id
              };
                try {
                  fetch('http://ubaya.fun/react/160418044/detailmovie.php',
                  options)
                    .then(response => response.json())
                    .then(resjson =>{
                      this.setState(
                        this.state = {
                          is_fetched:true,
                          data:resjson.data
                        })
                    });
                } catch (error) {
                  console.log(error);
                } 
              }
        

        render() { 
            if(!this.state.is_fetched)
       {
         this.state.movie_id= this.props.route.params.movie_id;
         this.fetchData();
         return <Text>Waiting JSON..</Text>
       }else
       {
        return <View>
        <Card>
            <Card.Title>{this.state.data.title}</Card.Title>
            <Card.Divider/>
            <Card.Image 
                source={{uri:'http://placekitten.com/200/150'}}>
            </Card.Image>
            <Text style={{marginBottom: 10}}>
            {this.state.data.overview}
            </Text>
            <Text style={{marginBottom: 10}}>
            {this.state.data.homepage}
            </Text>
            <Text>Genre:</Text>
            <FlatList
                data={this.state.data.genres}
                keyExtractor={(item) => item.genre_name}
                renderItem={({item}) => (
                <View><Text>{item.genre_name}</Text>
                </View>)}
            />
            <Text></Text>
            <Text>Cast:</Text>
            <FlatList
                data={this.state.data.casts}
                keyExtractor={(item) => item.person_name}
                renderItem={({item}) => (
                <View>
                    <Text>{item.person_name+" as "+item.character_name}</Text>
                </View>)}
            />
            <Button
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Delete Movie'
                onPress={() =>{this.deleteData()}
                }
              />

            </Card>
        </View>

       }
    
        }
    }

export default DetailMovie;

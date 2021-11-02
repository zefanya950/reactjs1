import { StyleSheet, View,FlatList,Button } from "react-native";
import { Card,Text,Input,Image,Icon } from 'react-native-elements';
import React from "react";

class PopularActor extends React.Component {
    constructor(){
        super();
        this.state = {
            data:''
        }
        this.fetchData();
    }
    fetchData = () => {
        try {
            fetch('http://ubaya.fun/react/160418044/actorlist.php')
            .then(response => response.json())
            .then(resjson =>{
                this.setState(
                    this.state = {
                        data:resjson.data,
                    })
                });
            } catch (error) {
                console.log(error);
            }
        }
        showData(data){
            return <FlatList
            data={data}
            keyExtractor={(item) => item.person_id.toString()}
            renderItem={({item}) => (
                <React.Fragment>
                <Card containerStyle={{borderRadius:15}}>
                <Card.Title style={{fontSize:18}}>{item.person_name}</Card.Title>
                <Card.Divider/>
                <Card.Image source={{uri:'https://cdn.idntimes.com/content-images/community/2019/09/markruffalo-ftr-b67da73bd3779de5d163aa2c2cc4e6b7_600x400.jpg'}}>
                </Card.Image>
                <Text style={{marginBottom: 10}}>
                 {item.person_id}
                </Text>
                <Card.Divider/>
                <Button
                icon={<Icon name='rowing' color='#ffffff' />}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Detail' />
                </Card>
                </React.Fragment>
                )}
                />
            }
            
            render() { 
                return <View>
                {this.showData(this.state.data)}
                </View>
            }
        }
        export default PopularActor;
        
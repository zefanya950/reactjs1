import React, {Component} from 'react';
import { StyleSheet,View, Text, TextInput} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import {Card,Icon,Button} from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import { SliderPicker } from 'react-native-slider-picker';

export default class NewPopMovie extends ValidationComponent {
    constructor(props){
        super(props);
        this.state = {  
            title:"",
            homepage:"",
            overview:"",
            release_date:"",
            runtime:0,
            isDateTimePickerVisible:false,
        }
    } 
    _onPressButton = () => {
        if(this.validate({
          title: {required: true},
          homepage : {required:true, website:true},
          overview : {minlength:50},
        }))
        {
            this.submitData();
        }
    }

    submitData = () => {
        const options = {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
          }),
          body: "title="+this.state.title+"&"+
                "homepage="+this.state.homepage+"&"+
                "overview="+this.state.overview+"&"+
                "release_date="+this.state.release_date+"&"+
                "runtime="+this.state.runtime
        };
          try {
            fetch('http://ubaya.fun/react/160418044/newmovie.php',
            options)
              .then(response => response.json())
              .then(resjson =>{
                console.log(resjson);
                if(resjson.result==='success') alert('sukses')
              });
          } catch (error) {
            console.log(error);
          } 
        }
  

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
       };
     
       hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
       };
     
       handleDatePicked = date => {
        this.setState(
         { release_date: date.getFullYear() + "-" +
                 (date.getMonth()+1) + "-" +
                 date.getDate() }
         );
        this.hideDateTimePicker();
       };
     

    render() {
        return (
          <View>
            <Card>
            <Card.Title>Masukkan Data Movie</Card.Title>
            <Card.Divider/>
            <Text>Title</Text>
            <TextInput style={styles.input} 
            ref="title" onChangeText={(title) => this.setState({title})} value={this.state.title} />
            <Text>Homepage</Text>
            <TextInput style={styles.input}
            onChangeText={(homepage) => this.setState({homepage})} value={this.state.homepage} />
            <Text>Overview</Text>
                <TextInput
                multiline
                numberOfLines={4}
                style={styles.input2}
                onChangeText={(overview) => this.setState({overview})} value={this.state.overview} />
            <Text>Release Date</Text>
            <View style={styles.viewRow}>
            <Text style={styles.input3}>{this.state.release_date}</Text>
            <Button title="..." onPress={this.showDateTimePicker} />
            </View>
            <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
            />
            <Text>Runtime</Text>
            <View style={styles.viewRow}>
                <Text style={styles.input4}>{this.state.runtime}</Text>
                <SliderPicker
                maxValue={300}
                callback={position => {
                this.setState({ runtime: position });
                }}
                defaultValue={this.state.runtime}
                showFill={true}
                fillColor={'red'}
                labelFontWeight={'300'}
                labelFontSize={12}
                buttonBackgroundColor={'#fff'}
                buttonBorderColor={"#6c7682"}
                buttonBorderWidth={1}
                buttonDimensionsPercentage={6}
                heightPercentage={1}
                widthPercentage={60}
                />
            </View>
            <Button 
            onPress={this._onPressButton}
            title="Submit"
            />

          <Text>
            {this.getErrorMessages()}
          </Text>
          </Card>
        </View>
         ) 
    }
}


const styles = StyleSheet.create({
          input: {
            height: 40,
            width:'100%',
            borderWidth: 1,
            padding: 10,
            marginBottom:10
          },
        input2: {
            height: 100,
            width:'100%',
            borderWidth: 1,
            padding: 10,
            marginBottom:10
        },
        input3: {
            height: 40,
            width:'85%',
            borderWidth: 1,
            padding: 10,
          },
        input4: {
                height: 40,
                width:'20%',
                borderWidth: 1,
                padding: 10,
              },
          viewRow:{
             flexDirection:"row",
             justifyContent:"flex-start",
             paddingRight:50,
             marginBottom:10
          }
       })

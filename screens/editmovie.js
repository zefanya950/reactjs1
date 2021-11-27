import React, {Component} from 'react';
import {View,Image, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet,FlatList} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import {Card,Icon,Button} from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import { SliderPicker } from 'react-native-slider-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { LogBox } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain']);
export default class EditMovie extends ValidationComponent {
    constructor(props){
        super(props);
        this.state = {  
            movie_id:0,
            is_fetched:false,
            title:"",
            homepage:"",
            overview:"",
            release_date:"",
            runtime:100,
            genres:[],
            dd_items:[{genre_name: 'Action', genre_id: '1'},
                        {genre_name: 'Horror', genre_id: '2'},
                        {genre_name: 'Family', genre_id: '3'},
                        ],
            dd_value:"",
            dd_open:false,
            is_addgenre:false,
            id_genre:0,
            _imageUri:"http://ubaya.fun/blank.jpg",
            _image64:""
          }
    }

    fetchDataDD = () => {
        const options = {
         method: 'POST',
         headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
         }),
         body: "movie_id="+this.state.movie_id
        };
         try {
          fetch('http://ubaya.fun/react/160418044/genrelist.php',
          options)
           .then(response => response.json())
           .then(resjson =>{
            var data=resjson.data;
            this.setState(
             this.state = {
              dd_items:data
             })
           });
         } catch (error) {
          console.log(error);
         }
        }


    setOpen = open => {
        this.setState({
         dd_open:open
        });
       }
       setValue=callback=> {
        this.setState(state => ({
         dd_value: callback(state.value),
         is_addgenre:true
        }));
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
                    (date.getMonth()+1)  + "-" +
                    date.getDate()  }
    );
    this.hideDateTimePicker();
    };

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
            "runtime="+this.state.runtime+"&"+
            "movie_id="+this.state.movie_id
        };
         try {
          fetch('http://ubaya.fun/react/160418044/updatemovie.php',
          options)
           .then(response => response.json())
           .then(resjson =>{
            console.log(resjson);
            if(resjson.result==='success') alert('sukses')
            const data = new FormData();
          data.append('movie_id', this.state.movie_id);
          data.append('image', this.state._image64);
          const options2 = {
            method: 'POST',
            headers: new Headers({
            'Content-Type': 'application/form-data'
            }),
            body: data
          };
            try {
            fetch('http://ubaya.fun/react/160418044/uploadposter.php',
            options2)
              .then(response => response.json())
              .then(resjson =>{
              console.log(resjson);
              if(resjson.result==='success') alert(resjson.msg)
              else alert(resjson.msg)
              });
            } catch (error) {
            console.log(error);
            }
           });
         } catch (error) {
          console.log(error);
         }
          }

        _onPressButton = () => {
            if(this.validate({
             title: {required: true},
             homepage : {required:true, website:true},
             overview : {minlength:50}
            }))
            {
             this.submitData();
            }
          }

          addGenre = () => {     
            const options = {
             method: 'POST',
             headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded'
             }),
             body: "genre_id="+this.state.dd_value+"&"+
                "movie_id="+this.state.movie_id
            };
             try {
              fetch('http://ubaya.fun/react/160418044/addmoviegenre.php',
              options)
               .then(response => response.json())
               .then(resjson =>{
                console.log(resjson);
                if(resjson.result==='success') alert('sukses')
                this.setState(
                   this.state = {
                      is_fetched:false,
                      is_addgenre:false
                })
               });
             } catch (error) {
              console.log(error);
             }
            }

            deleteGenre(idgenre){
              const options = {
               method: 'POST',
               headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
               }),
               body: "genre_id="+idgenre+"&"+
                  "movie_id="+this.state.movie_id
              };
               try {
                fetch('http://ubaya.fun/react/160418044/deletemoviegenre.php',
                options)
                 .then(response => response.json())
                 .then(resjson =>{
                  console.log(resjson);
                  if(resjson.result==='success') alert('sukses')
                  this.setState(
                     this.state = {
                        is_fetched:false,
                        is_addgenre:false
                  })
                 });
               } catch (error) {
                console.log(error);
               }
              }

              _imgGaleri = async () => {
                        let result = await ImagePicker.launchImageLibraryAsync({
                         mediaTypes: ImagePicker.MediaTypeOptions.All,
                         allowsEditing: true,
                         aspect: [4, 3],
                         quality: 1,
                        });
                        console.log(result);
                
                        if (!result.cancelled) {
                        //  this.setState(state => ({
                        //   _imageUri:result.uri
                        //  }))
                        this._prosesFoto(result.uri);
                        }
                       }
              _imgKamera = async () => {
                      let result = await ImagePicker.launchCameraAsync({
                       mediaTypes: ImagePicker.MediaTypeOptions.Images,
                       allowsEditing: true,
                       aspect: [4, 3],
                       quality: 1,
                      });
                      console.log(result);
                      if (!result.cancelled) {
                      //  this.setState(state => ({
                      //   _imageUri:result.uri
                      //  }))
                      this._prosesFoto(result.uri);
                      }
                     }
              _prosesFoto = async (uri) => {
                      const manipResult = await manipulateAsync(
                       uri,
                       [
                        {resize:{height:480,width:360}}
                       ],
                       { compress: 1, format: SaveFormat.JPEG, base64:true }
                      );
                      this.setState(state => ({
                        _imageUri:manipResult.uri,
                        _image64: manipResult.base64
                       }))
                     };
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
                var data=resjson.data;
                this.setState(
                  this.state = {
                    is_fetched:true,
                    title:data.title,
                    homepage:data.homepage,
                    overview:data.overview,
                    release_date:data.release_date,
                    runtime:data.runtime,
                    genres:data.genres
                  })
              });
          } catch (error) {
            console.log(error);
          } 
        }


render() {
    if(this.state.is_addgenre) this.addGenre();
    if(!this.state.is_fetched)
    {
        this.state.movie_id= this.props.route.params.movie_id;
        this.fetchData();
        this.fetchDataDD();
        return <Text>Waiting JSON..</Text>
    }else
    {
        return <ScrollView>
            <Card>
    <Card.Title>Edit Data Movie</Card.Title>
    <Card.Divider/>
    <Text>Title</Text>
    <TextInput style={styles.input} 
    ref="title" onChangeText={(title) => this.setState({title})} value={this.state.title} />
    
    <Text>Homepage</Text>
    <TextInput style={styles.input}
        ref="title" onChangeText={(homepage) => this.setState({homepage})} value={this.state.homepage} />
 
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
          buttonDimensionsPercentage={  6}
          heightPercentage={1}
          widthPercentage={40}
        />
          </View>
          <TouchableOpacity onPress={() => this.RBSheet.open()}>
          <Image
          style={styles.imgPoster}
          source={{uri: this.state._imageUri}}
          />
          </TouchableOpacity>
          <RBSheet
     ref={ref => {
      this.RBSheet = ref;
     }}
     height={100}
     openDuration={250}
     customStyles={{
      container: {
       justifyContent: "center",
       alignItems: "center"
      }
     }}
    >
      <View>
      <Button style={styles.btn}
      onPress={this._imgKamera}
      icon={{
       name: "camera",
       size: 15,
       color: "white"
      }}
      title="Camera"/>
     
      <Button style={styles.btn}
      onPress={this._imgGaleri}
      icon={{
       name: "photo",
       size: 15,
       color: "white"
      }}
      title="Gallery" />
     </View>
   </RBSheet>
                <Button
            onPress={this._onPressButton}
            title="Submit"
            />

          <Text style={styles.warning}>
            {this.getErrorMessages()}
          </Text>
          <Text>Genre:</Text>
          <FlatList 
            data={this.state.genres} 
            keyExtractor={(item) => item.genre_name} 
            renderItem={({item}) => (
            <View><Text>{item.genre_name}<Button
            onPress={() => this.deleteGenre(item.genre_id)}
            title="Delete"
            /></Text>
            </View>)}
            />
            <DropDownPicker
                schema={{
                label: 'genre_name',
                value: 'genre_id'
                }}
                open={this.state.dd_open}
                value={this.state.dd_value}
                items={this.state.dd_items}
                setOpen={this.setOpen}
                setValue={this.setValue}
            />
          </Card>
                </ScrollView>
            }
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
          
          warning:{
            color:"#ff0000"
          },
          input3: {
                height: 40,
                width:'85%',
                borderWidth: 1,
                padding: 10,
               },
            input4: {
                    height: 40,
                    width:'15%',
                    borderWidth: 1,
                    padding: 10,
                   },
       viewRow:{
        flexDirection:"row",
        justifyContent:"flex-start",
        
        paddingRight:50,
        marginBottom:10
       },
        imgPoster:{
          width:'100%',
          height:400
        },
        btn:{
          marginLeft:20,
          marginRight:20
        }
     })
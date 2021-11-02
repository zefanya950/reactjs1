import { StyleSheet, View } from "react-native";
import { LinearProgress,Text,Button,Chip  } from 'react-native-elements';
import React from "react";
import clsQuiz from "../class/clsQuiz";
import AsyncStorage from '@react-native-async-storage/async-storage';

var batas =30;
function toHHMMSS (v) {
        var sec_num = parseInt(v, 10); 
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    }

class Quiz extends React.Component {
    topScore = 0;
    topUser = "";
    constructor(){
     super();
     this.state = {
        nama:"Clark Kent",
        umur:25,
        counter:batas,
        oneSecInterval : setInterval(() => {
            var temp=this.state.counter-1;
            if(temp<=0)
            {
             var temp2=this.state.nomor+1;
             if(temp2>=this.state.quiz.length) 
             {
                this.setState(
                    this.state = {
                      selesai:true
                    })
                    this.cekScore();
             }else{
                this.setState(
                 this.state = {
                   counter:batas,
                   nomor:temp2
                 })
                }
            }else
            {this.setState(
               this.state = {
                 counter:temp
               })
             }
        }, 1000) ,

        quiz : [
            new clsQuiz('Not a member of Avenger ', 'Ironman',
             'Spiderman', 'Thor', 'Hulk Hogan', 'Hulk Hogan'),
            new clsQuiz("Not a member of Teletubbies", 'Dipsy',
             'Patrick', 'Laalaa', 'Poo', 'Patrick'),
            new clsQuiz("Not a member of justice league", 'batman',
             'superman', 'flash', 'aquades', 'aquades')
        ],
        nomor:0,
        skor:0,
        selesai:false
     }
    }

    cekScore = async () => {
      try{
        const value = await AsyncStorage.getItem('topscore');
        const vals = await AsyncStorage.getItem('topuser');
        this.topScore=value;
        this.topUser=vals;
        if(parseInt(value) < this.state.skor){
          try{
            await AsyncStorage.setItem('topscore',this.state.skor.toString());
            await AsyncStorage.setItem('topuser',global.activeuser);
            this.topScore = await AsyncStorage.getItem('topscore');
            this.topUser = await AsyncStorage.getItem('topuser');
          }
          catch(e){
            alert("tess "+e);
          }
        }
      }
      catch(e){
        alert(e);
      }
    }
     
    checkAnswer(s) {
        var temp2;
        var temp3=this.state.skor;
        if (s == this.state.quiz[this.state.nomor].answer) {
            temp3=temp3 + 100;
            console.debug(temp3)
          }
        temp2=this.state.nomor+1;
        if(temp2>=this.state.quiz.length) 
        {
            this.setState(
                this.state = {
                  selesai:true,
                  skor:temp3
                })
          this.cekScore();
         }else{
        this.setState(
        this.state = {
            counter:batas,
            nomor:temp2,
            skor:temp3
        })}
          
      }

    berubah()
    {
       this.setState(
         this.state = {
             nama:"Superman",
             umur:50
         })
    }
    render() {
     if(this.state.selesai==true)
      {
        return <View style={styles.vparent}>
            <Text h3>{global.activeuser} You Score:</Text>
            <Chip
                title={this.state.skor}
                icon={{
                name: "star",
                type: "font-awesome",
                size: 20,
                color: 'white',
                }}
            />
            <Text>High Score : {this.topScore}</Text>
            <Text>User High Score : {this.topUser}</Text>
            <Button onPress={ () => {this.state.counter=batas, this.state.nomor=0,
        this.state.skor=0,
        this.state.selesai=false}} title="Main Lagi" type="outline"></Button>
        </View>
      }
      else
      {
       return <View  style={styles.vparent}>
           <LinearProgress variant='determinate'
             value={1-(this.state.counter/batas)}
            color="primary" />
           <Text style={styles.textTimer}>
             {toHHMMSS( this.state.counter)}</Text>
         
        <Text h3>{this.state.quiz[this.state.nomor].narration}</Text>
        <View style={styles.vparentleft}>
        <Button onPress={() => { this.checkAnswer(this.state.quiz[this.state.nomor].option_a)}}
           title={"A. "+this.state.quiz[this.state.nomor].option_a} type="outline" />
        <Button onPress={() => {this.checkAnswer(this.state.quiz[this.state.nomor].option_b)}}
         title={"B. "+this.state.quiz[this.state.nomor].option_b} type="outline" />
        <Button  onPress={() => {this.checkAnswer(this.state.quiz[this.state.nomor].option_c)}}
         title={"C. "+this.state.quiz[this.state.nomor].option_c} type="outline" />
        <Button  onPress={() => {this.checkAnswer(this.state.quiz[this.state.nomor].option_d)}}
         title={"D. "+this.state.quiz[this.state.nomor].option_d} type="outline" />
         </View>
         </View>;
     }}

   }


   const styles=StyleSheet.create({
    vparent:{
        justifyContent:'center',
        alignItems:'center'
      },
      vparentleft:{
        justifyContent:'flex-start',
        alignItems:'flex-start'
      },
    textTimer:{
      fontSize:30,
    },
  });

 export default Quiz;
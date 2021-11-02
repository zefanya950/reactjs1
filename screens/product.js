import { StyleSheet, View, Text, Button, Image,FlatList } from "react-native";

import React from "react";
import { color } from "react-native-reanimated";
import {DATA} from "../data";
export default function Product({navigation}) {

  
return (  
<View >
  <Text >Ini Product</Text>
  
  <Button
        title="Product 1"
        onPress={() => navigation.navigate("ProductDetail", { id: 1 })}
      />
  <Button 
        title="Product 2"
        onPress={() => navigation.navigate("ProductDetail", { id: 2 })}
      />

  <Button
        title="Go to About page"
        onPress={() => navigation.navigate("About")}
      />

    <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View style={styles.vparent}>
                <Text style={styles.tnama}>{item.nama}</Text>
                <Image
                  style={styles.imgresep}
                  source={{uri: item.photo}}
                />
                <Text style={styles.tdesk}>{item.desk}</Text>
          </View>
        )}
    />
      
</View>
);
}



const styles = StyleSheet.create({
  vparent:{
    
      justifyContent: 'center',
      alignItems: 'center',
    borderWidth:1,
    borderColor:'#777',
    marginBottom:30,
    marginHorizontal:40,
    borderRadius:20,
    padding:20

  },
  tnama:{
    fontSize:20,
    color:"#55f"
  },
  imgresep: {
    width: 300,
    height: 200,
    
  },
});
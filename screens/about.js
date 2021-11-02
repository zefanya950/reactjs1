import { StyleSheet, View, Text, Image, ImageBackground, ScrollView } from "react-native";
import React from "react";

export default function About() {
return (  
<ScrollView>
<ScrollView horizontal={true}>
<View style={styles.vparent}>
  <ImageBackground
    style={styles.imgkucing}
    source={{uri: 'http://placekitten.com/300/400?image=1'}}
  >
  <Image
    source={require('../assets/missing.png')} />
  </ImageBackground>
</View>

<View style={styles.vparent}>
  <ImageBackground
    style={styles.imgkucing}
    source={{uri: 'http://placekitten.com/300/400?image=2'}}
  >
  <Image
    source={require('../assets/missing.png')} />
  </ImageBackground>
</View>

<View style={styles.vparent}>
  <ImageBackground
    style={styles.imgkucing}
    source={{uri: 'http://placekitten.com/300/400?image=3'}}
  >
  <Image
    source={require('../assets/missing.png')} />
  </ImageBackground>
</View>

</ScrollView>

<ScrollView horizontal={true}>
<View style={styles.vparent}>
  <ImageBackground
    style={styles.imgkucing}
    source={{uri: 'http://placekitten.com/300/400?image=4'}}
  >
  <Image
    source={require('../assets/missing.png')} />
  </ImageBackground>
</View>

<View style={styles.vparent}>
  <ImageBackground
    style={styles.imgkucing}
    source={{uri: 'http://placekitten.com/300/400?image=5'}}
  >
  <Image
    source={require('../assets/missing.png')} />
  </ImageBackground>
</View>

<View style={styles.vparent}>
  <ImageBackground
    style={styles.imgkucing}
    source={{uri: 'http://placekitten.com/300/400?image=6'}}
  >
  <Image
    source={require('../assets/missing.png')} />
  </ImageBackground>
</View>

</ScrollView>

<ScrollView horizontal={true}>
<View style={styles.vparent}>
  <ImageBackground
    style={styles.imgkucing}
    source={{uri: 'http://placekitten.com/300/400?image=7'}}
  >
  <Image
    source={require('../assets/missing.png')} />
  </ImageBackground>
</View>

<View style={styles.vparent}>
  <ImageBackground
    style={styles.imgkucing}
    source={{uri: 'http://placekitten.com/300/400?image=8'}}
  >
  <Image
    source={require('../assets/missing.png')} />
  </ImageBackground>
</View>

<View style={styles.vparent}>
  <ImageBackground
    style={styles.imgkucing}
    source={{uri: 'http://placekitten.com/300/400?image=9'}}
  >
  <Image
    source={require('../assets/missing.png')} />
  </ImageBackground>
</View>

</ScrollView>

</ScrollView>
);
}


const styles = StyleSheet.create({
  vparent:{
    
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  imgkucing: {
    width: 300,
    height: 400,
    
  },
});



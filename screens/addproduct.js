import { StyleSheet, View, Text, TextInput,Image, Button, Alert , Picker} from "react-native";
import React from "react";
import { DATA } from "../data";

export default function AddProduct(props) {
    const [nama, onChangeText] = React.useState("");
    const [desk, onChangeDesk] = React.useState("");
    const [foto, onChangeFoto] = React.useState("");
    const [url,onSubmitFoto] = React.useState("https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg");
    const [kategori, onSelectKategori] = React.useState("Kue basah");
return (  
<View >
  <Text >Nama</Text>
  <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={nama}
        placeholder="nama masakan"
      />
      <Text >Deskripsi</Text>
  <TextInput
        style={styles.input2}
        onChangeText={onChangeDesk}
        value={desk}
        placeholder="deskripsi"
        multiline={true}
        numberOfLines={4}
        maxLength={100}
      />
<Text >Foto</Text>
  <TextInput
        style={styles.input}
        onChangeText={onChangeFoto}
        onSubmitEditing={(event) => 
         onSubmitFoto(foto)
        }
        value={foto}
        placeholder="url"/>
    <Image style={styles.imgresep}
            source={{uri: url}} />
    <Button
        title="SIMPAN"
        onPress={() => {
            var id=DATA.length+1;
            DATA.push({
                id: id,
                nama: nama,
                desk:desk,
                photo:url
              })
            Alert.alert('Data Resep tersimpan');
            props.navigation.goBack(null);
            
        }
        }
      />
</View>
);
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      borderWidth: 1,
      padding: 10,
    },
    input2: {
        height: 120,
        borderWidth: 1,
        padding: 10,
      },
      imgresep: {
        width: "100%",
        height: 300,
        
      },
  });
  
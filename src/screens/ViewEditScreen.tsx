import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, TextInput, Button, Image, ScrollView} from 'react-native';
import ActionSheet from "react-native-actions-sheet";
import React, { createRef, useState } from "react";
import { addData, removeData } from '../actions/dataAction';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToViewEditScreenProps = (store: { test: { title: any; }; data: { data: any; }; }) => { 
  return {
    title: store.test.title,
    data: store.data.data,
  }
};

const mapDispatchToViewEditScreenProps = (dispatch: (arg0: { type: string; payload: any; }) => any) => {
  return {
    addDataAction: (title:string, body:string, createDate:Date, editDate:Date, url:string, index:number) => dispatch(addData(title, body, createDate, editDate, url, index)),
    //removeDataAction: (id:number) => dispatch(removeData(id)),
  }
}

const ViewEditScreen = ({route, navigation, addDataAction}:any) => {
  //const { title, body, createDate, editDate, url, toEdit } = route.params;
  const index = route.params.index;
  const [title, setTitle] = useState(route.params.title);
  const [body, setBody] = useState(route.params.body);
  const createDate = route.params.createDate;
  const [editDate, setEditDate] = useState(route.params.editDate);
  const [url, setUrl] = useState(route.params.url);
  const [isEdit, setIsEdit] = useState(route.params.isEdit);

  navigation.setOptions({
    headerRight: () => (
      <Button 
        onPress={() => {
          console.log('onpress:',title, body, createDate, editDate, url)
          if (isEdit) {
            setEditDate(moment().format("DD.MM.YYYY"));
            addDataAction(title, body, createDate, editDate, url, index)
          }
          setIsEdit(!isEdit)  
        }}
        title={isEdit ? 'Сохранить' : 'Править'} 
      />
    ),
    title: (isEdit ? 'Правка' : title)
  });
  console.log('!!!!!!!!!!!!!',title,'index:', index);  
  return (
      <SafeAreaView style={styles.container}> 
      <ScrollView>
      {isEdit&&<TextInput style={styles.header} placeholder='Название заметки' onChangeText={(text) => setTitle(text)} value={title}/>}
      {!isEdit&&
        <View style={styles.dates}>
          <Text>Дата создания:{"\n"}{createDate}</Text>
          <Text>Дата изменения:{"\n"}{editDate}</Text>
        </View>
      }
      
      <TextInput style={styles.body} multiline={true} placeholder='Текст заметки' editable={isEdit} onChangeText={(text) => setBody(text)} value={body}/>

      {isEdit 
        ? <TouchableOpacity style={styles.image}
            //onPress={() => addDataAction((data.length + 1) + ' Item','Body of '+(data.length + 1)+' Item')}
          >
            {!!url ? <Image style={styles.img} source={{uri: url}} /> : <Text>Добавить изображение</Text>}
          </TouchableOpacity>
        : !!url&&<View style={styles.image}>
            <Image style={styles.img} source={{uri: url}} />
          </View>
      }

      {/* <TouchableOpacity style={styles.image}
        //onPress={() => addDataAction((data.length + 1) + ' Item','Body of '+(data.length + 1)+' Item')}
      >
        {!!url&&<Image style={styles.img} source={{uri: url}} />}
        {!url&&<Text>Добавить изображение</Text>}
      </TouchableOpacity> */}
    </ScrollView>
    </SafeAreaView>
      
  );
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: '#f9c2ff',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold'
    },
    dates:{
      backgroundColor: '#f9c2ff',
      padding: 10,
      marginVertical: 8,
      //marginHorizontal: 16,
      borderRadius: 10,
      textAlign: 'left',
      fontSize: 20,
      flexDirection: 'row',
      justifyContent: "space-between",
      marginHorizontal: 20,
    },
    body: {
      backgroundColor: '#f9c2ff',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
      textAlign: 'left',
      fontSize: 20,
      //height: '50%'
      flex: 1
    },
    image: {
      backgroundColor: '#f9c2ff',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
      alignItems: 'center',
    },
    img: {
      height: 100,
      width: 100,
    }
  });
  
  export default connect(mapStateToViewEditScreenProps, mapDispatchToViewEditScreenProps)(ViewEditScreen);
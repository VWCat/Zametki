import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, TextInput, Button, Image, ScrollView} from 'react-native';
import React, { createRef, useState } from "react";
import { addData, removeData } from '../actions/dataAction';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToViewEditScreenProps = (store: { data: { data: any; }; }) => { 
  return {
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

  return (
      <SafeAreaView style={styles.container}> 
      <ScrollView>
      {isEdit&&<TextInput style={[styles.whiteBack,styles.header]} placeholder='Название заметки' onChangeText={(text) => setTitle(text)} value={title}/>}
      {!isEdit&&
        <View style={[styles.whiteBack,styles.dates]}>
          <Text>Дата создания:{"\n"}{createDate}</Text>
          <Text>Дата изменения:{"\n"}{editDate}</Text>
        </View>
      }
      <TextInput style={[styles.whiteBack,styles.body]} multiline={true} placeholder='Текст заметки' editable={isEdit} onChangeText={(text) => setBody(text)} value={body}/>
      {isEdit 
        ? <TouchableOpacity style={[styles.whiteBack,styles.image]}
            //onPress={() => addDataAction((data.length + 1) + ' Item','Body of '+(data.length + 1)+' Item')}
          >
            {!!url ? <Image style={styles.img} source={{uri: url}} /> : <Text>Добавить изображение</Text>}
          </TouchableOpacity>
        : !!url&&<View style={[styles.whiteBack,styles.image]}>
            <Image style={styles.img} source={{uri: url}} />
          </View>
      }
    </ScrollView>
    </SafeAreaView>
      
  );
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#fff',
    },
    whiteBack:{ 
      backgroundColor: '#fff',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
  },
    header: {
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold'
    },
    dates:{
      textAlign: 'left',
      fontSize: 20,
      flexDirection: 'row',
      justifyContent: "space-between",
      marginHorizontal: 20,
    },
    body: {
      textAlign: 'left',
      fontSize: 20,
      //height: '50%'
      flex: 1
    },
    image: {
      alignItems: 'center',
    },
    img: {
      height: 100,
      width: 100,
    }
  });
  
  export default connect(mapStateToViewEditScreenProps, mapDispatchToViewEditScreenProps)(ViewEditScreen);
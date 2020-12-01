import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, Image, Button } from 'react-native';
import ActionSheet from "react-native-actions-sheet";
import React, { createRef, useState } from "react";
import { connect } from 'react-redux';
import { setTitle } from '../actions/testAction';
import { addData, removeData } from '../actions/dataAction';
import moment from 'moment'; 
import { CheckBox } from 'react-native-elements';
//var now = moment().format();

const actionSheetRef = createRef();
var itemNumber: number;

const Item = ({ title, index, body, createDate, editDate, navigation, url, isChecking, setTitleAction }:any) => (
  isChecking
    ? <CheckBox checked={false} textStyle={styles.title} title={title} containerStyle={styles.item} />
    : <TouchableOpacity 
        style={styles.item} 
        onLongPress={() => {itemNumber = index, actionSheetRef.current?.setModalVisible()}}
        onPress={() => {
          navigation.navigate('ViewEdit', {
            //name: title,
            title: title,
            body: body,
            index: index,
            createDate: createDate,
            editDate: editDate,
            url: url,
            isEdit: false
          });
        }}
      >
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </TouchableOpacity>
);

const mapStateToHomeScreenProps = (store: { test: { title: any; }; data: { data: any; }; }) => { 
  
  return {
    title: store.test.title,
    data: store.data.data,
  }
};

const mapDispatchToHomeScreenProps = (dispatch: (arg0: { type: string; payload: any; }) => any) => {
  return {
    setTitleAction: (title: string) => dispatch(setTitle(title)),
    addDataAction: (title:string, body:string, createDate:Date, editDate:Date, url:string, index:number) => dispatch(addData(title, body, createDate, editDate, url, index)),
    removeDataAction: (id:number) => dispatch(removeData(id)),
  }
}

const HomeScreen = ({navigation, title, data, setTitleAction, addDataAction, removeDataAction}:any) => {
  const [isChecking, setIsChecking] = useState(false)
  const renderItem = ({ item, index}:any) => (
    <Item title={item.title}
    navigation={navigation}
    setTitleAction={setTitleAction}
    body={item.body}
    index={index}
    createDate={item.createDate}
    editDate={item.editDate}
    url={item.url}
    isChecking={isChecking}
    />
  );
  navigation.setOptions({
    headerRight: () => (
      isChecking 
      ? <Button 
          onPress={() => navigation.navigate('ViewEdit', {
            //name: 'Новая заметка',
            title: 'Новая заметка',
            body: '',
            index: data.length,
            createDate: moment().format("DD.MM.YYYY"),
            editDate: moment().format("DD.MM.YYYY"),
            url: '',
            isEdit: true
          })} 
          //onPress={() => navigation.navigate('ViewEdit')}
          title="Удалить" 
        />
      : <Button 
          onPress={() => navigation.navigate('ViewEdit', {
            //name: 'Новая заметка',
            title: 'Новая заметка',
            body: '',
            index: data.length,
            createDate: moment().format("DD.MM.YYYY"),
            editDate: moment().format("DD.MM.YYYY"),
            url: '',
            isEdit: true
          })} 
          //onPress={() => navigation.navigate('ViewEdit')}
          title="Создать" 
        />
    ),
    headerLeft: () => (
      isChecking&&<Button 
          onPress={() => setIsChecking(false)} 
          title="Отмена" 
        />
    )
  });
  //let actionSheet;
  
  return (
    <SafeAreaView style={styles.container}>
    {/* <TouchableOpacity style={styles.menuItem}><Text>{title}</Text></TouchableOpacity> */}
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.title + index}
      extraData={(index: any) => index}
      //columnWrapperStyle={styles.flatlist}
      //numColumns={2}
    />
    <TouchableOpacity style={styles.buttonAdd} 
    //onPress={() => navigation.navigate('Edit')}
    onPress={() => addDataAction((data.length + 1) + ' Item','Body of '+(data.length + 1)+' Item')}
    //onPress={() => setTitleAction('Some title')}
    >
      <Image style={styles.buttonAddImage} source={require('../../icon/add.png')} />
    </TouchableOpacity>
    <ActionSheet ref={actionSheetRef} containerStyle={styles.menu}>
      <View>
        <TouchableOpacity style={[styles.menuItem,{borderBottomWidth: 1}]}
          onPress={() => {setIsChecking(true), actionSheetRef.current?.setModalVisible(false)}}
        >
          <Text style={styles.menuText}>Выбрать несколько</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem,{borderBottomWidth: 1}]}><Text style={styles.menuText}>Редактировать</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}
          onPress={() => {removeDataAction(itemNumber), actionSheetRef.current?.setModalVisible(false)}
          }
        >
          <Text style={styles.menuText}>Удалить</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  </SafeAreaView> 
  );
};



  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    //flex: 0.5,
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    //justifyContent: 'space-between',
  },
  flatlist: {
    justifyContent: 'flex-start',
    //width: '100%',
  },
  title: {
    //flex:1,
    fontSize: 32,
    fontWeight: 'normal',
    
    //textAlignVertical: 'auto',
  },
  buttonAdd: {
    position: 'absolute',
    borderRadius: 50,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAddImage: {
    borderRadius: 50,
    width: 60,
    height: 60,
    
  },
  menu: {
    paddingHorizontal: 20, 
    width: '90%'
  },
  menuItem: {
    height: 50,
    // borderWidth: 1,
    // borderRadius: 5,
    // margin: 10,
    alignItems: 'center',
    justifyContent:'center',
  },
  menuText: {
    fontSize: 20,
  }
});
export default connect(mapStateToHomeScreenProps, mapDispatchToHomeScreenProps)(HomeScreen);

// export default HomeScreen
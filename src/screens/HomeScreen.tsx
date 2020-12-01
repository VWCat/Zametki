import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, Image, Button } from 'react-native';
import ActionSheet from "react-native-actions-sheet";
import React, { createRef, useState } from "react";
import { connect } from 'react-redux';
import { addData, removeData } from '../actions/dataAction';
import moment from 'moment'; 
import { CheckBox } from 'react-native-elements';

const actionSheetRef = createRef();

const Item = ({ title, index, body, createDate, editDate, navigation, url, isChecking, isItemCheck, onPressCheck, onLongPress }:any) => (
  isChecking
    ? <CheckBox checked={isItemCheck} textStyle={styles.title} title={title} containerStyle={styles.item} 
      onPress={onPressCheck}
    />
    : <TouchableOpacity 
        style={styles.item} 
        onLongPress={onLongPress}
        onPress={() => {
          navigation.navigate('ViewEdit', {
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
        <Text style={styles.textData}>{createDate}</Text>
      </TouchableOpacity>
);

const mapStateToHomeScreenProps = (store: { data: { data: any; }; }) => { 
  
  return {
    data: store.data.data,
  }
};

const mapDispatchToHomeScreenProps = (dispatch: (arg0: { type: string; payload: any; }) => any) => {
  return {
    addDataAction: (title:string, body:string, createDate:Date, editDate:Date, url:string, index:number) => dispatch(addData(title, body, createDate, editDate, url, index)),
    removeDataAction: (id:number) => dispatch(removeData(id)),
  }
}

const HomeScreen = ({navigation, data, removeDataAction}:any) => {
  const [isChecking, setIsChecking] = useState(false);
  const [checkedArr, setCheckedArr] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const isItemCheck = (index:number) => {
    if (checkedArr.indexOf(index)==-1) {return false} else {return true}
  }

  const changeItemCheckedStatus = (index:number) => {
    let id = checkedArr.indexOf(index);
    let newArr = checkedArr.slice();
    if (id==-1) {newArr.push(index)} else {newArr.splice(id, 1)};
    setCheckedArr(newArr.sort((a, b) => b - a));
  }

  const renderItem = ({ item, index}:any) => (
    <Item title={item.title}
    navigation={navigation}
    body={item.body}
    index={index}
    createDate={item.createDate}
    editDate={item.editDate}
    url={item.url}
    isChecking={isChecking}
    onPressCheck={()=>changeItemCheckedStatus(index)}
    onLongPress={()=> {
      setCurrentItem(item);
      setCurrentIndex(index)
      actionSheetRef.current?.setModalVisible();
      
    }}
    isItemCheck={isItemCheck(index)}
    />
  );
  navigation.setOptions({
    headerRight: () => (
      isChecking 
      ? <Button 
          onPress={() => {
            checkedArr.forEach((index) => removeDataAction(index));
            setCheckedArr([]);
            setIsChecking(false);
          }} 
          title="Удалить" 
        />
      : <Button 
          onPress={() => navigation.navigate('ViewEdit', {
            title: 'Новая заметка',
            body: '',
            index: data.length,
            createDate: moment().format("DD.MM.YYYY"),
            editDate: moment().format("DD.MM.YYYY"),
            url: '',
            isEdit: true
          })} 
          title="Создать" 
        />
    ),
    headerLeft: () => (
      isChecking&&<Button 
          onPress={() => {setIsChecking(false); setCheckedArr([])}} 
          title="Отмена" 
        />
    )
  });
  
  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.title + index}
      extraData={(index: any) => index}
    />
    <ActionSheet ref={actionSheetRef} containerStyle={styles.menu}>
        <TouchableOpacity style={[styles.menuItem,{borderBottomWidth: 1}]}
          onPress={() => {setIsChecking(true), actionSheetRef.current?.setModalVisible(false)}}
        >
          <Text style={styles.menuText}>Выбрать несколько</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem,{borderBottomWidth: 1}]}
          onPress={() => {navigation.navigate('ViewEdit', {
            title: currentItem.title,
            body: currentItem.body,
            index: currentIndex,
            createDate: currentItem.createDate,
            editDate: currentItem.editDate,
            url: currentItem.url,
            isEdit: true
          });
           actionSheetRef.current?.setModalVisible(false)}}
        >
          <Text style={styles.menuText}>Редактировать</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}
          onPress={() => {removeDataAction(currentIndex), actionSheetRef.current?.setModalVisible(false)}
          }
        >
          <Text style={styles.menuText}>Удалить</Text>
        </TouchableOpacity>
    </ActionSheet>
  </SafeAreaView> 
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    elevation:3,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal:10,
    paddingTop:20,
    paddingBottom:10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  flatlist: {
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight:'normal',
    fontSize: 24,
  },
  textData: {
    marginTop:8,
    fontSize: 12,
    color:'grey',
    textAlign:'right'
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
    alignItems: 'center',
    justifyContent:'center',
  },
  menuText: {
    fontSize: 20,
  }
});

export default connect(mapStateToHomeScreenProps, mapDispatchToHomeScreenProps)(HomeScreen);
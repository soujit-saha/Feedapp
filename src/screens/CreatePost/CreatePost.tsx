import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {COLORS} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../utils/helpers/constants';
import {useSelector} from 'react-redux';
import showAlert from '../../utils/helpers/Toast';
import {useNavigation} from '@react-navigation/native';

const CreatePost = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const {FeedResponse} = useSelector((i: any) => i.DataReducer);

  const onSubmit = async () => {
    let prev_post = await AsyncStorage.getItem(constants.LOCAL_POST);
    let posts: Array<any> = [];
    if (prev_post !== null) {
      posts = JSON.parse(prev_post);
      posts.push({
        id: FeedResponse?.length + 1 + posts?.length,
        title: title,
        body: des,
      });
    } else {
      posts.push({
        id: FeedResponse?.length + 1,
        title: title,
        body: des,
      });
    }
    AsyncStorage.setItem(constants.LOCAL_POST, JSON.stringify(posts))
      .then(() => {
        showAlert('Post Successful.');
        setDes('');
        setTitle('');
        navigation.goBack();
      })
      .catch(e => {
        console.log('POST FAILED', e);
      });
    // console.log(prev_post);
  };

  return (
    <View style={styles.maincon}>
      <Text style={styles.title}>Create Post</Text>

      <TextInput
        placeholder="Title"
        placeholderTextColor={'#aaa'}
        style={styles.input}
        // ref={inputRef}
        value={title}
        onChangeText={e => setTitle(e)}
      />
      <TextInput
        placeholder="Description"
        placeholderTextColor={'#aaa'}
        multiline={true}
        style={{...styles.input, height: normalize(120), verticalAlign: 'top'}}
        // ref={inputRef}
        value={des}
        onChangeText={e => setDes(e)}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={onSubmit}
        disabled={!title || !des}>
        <Text style={styles.txtw}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  maincon: {flex: 1, backgroundColor: COLORS.White},
  title: {
    color: COLORS.Black,
    fontSize: normalize(24),
    fontFamily: 'cursive',
    fontWeight: '700',
    padding: normalize(10),
  },
  input: {
    height: normalize(40),
    width: '90%',
    elevation: 10,
    shadowColor: COLORS.Primary,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0.9,
    backgroundColor: COLORS.White,
    borderRadius: normalize(6),
    alignSelf: 'center',
    marginTop: normalize(15),
    color: COLORS.Black,
    fontSize: normalize(12),
  },
  btn: {
    backgroundColor: COLORS.Primary,
    padding: normalize(10),
    borderRadius: normalize(10),
    elevation: 10,
    shadowColor: COLORS.Primary,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0.9,
    width: '90%',
    alignSelf: 'center',
    marginTop: 'auto',
    bottom: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtw: {
    color: COLORS.White,
    fontWeight: '500',
    fontSize: normalize(12),
  },
});

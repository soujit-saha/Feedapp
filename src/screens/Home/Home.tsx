import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFeedRequest} from '../../redux/reducer/DataReducer';
import {COLORS, ICONS} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../utils/helpers/constants';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const DataReducer = useSelector((i: any) => i.DataReducer);
  const [search, setSearch] = useState('');
  const [list, setList] = useState<Array<any>>();

  useEffect(() => {
    dispatch(fetchFeedRequest({}));
  }, []);
  //@ts-ignore
  const mergePostList = () => {
    AsyncStorage.getItem(constants.LOCAL_POST).then(prev_post => {
      if (prev_post !== null) {
        setList([
          ...DataReducer?.FeedResponse,
          ...JSON.parse(prev_post as string),
        ]);
      } else {
        setList([...DataReducer?.FeedResponse]);
      }
    });
  };
  useFocusEffect(
    React.useCallback(() => {
      mergePostList();
    }, [DataReducer]),
  );

  return (
    <View style={styles.maincon}>
      <View style={styles.headercon}>
        <Text style={styles.headertitle}>Feed</Text>
      </View>
      <View style={styles.input}>
        <Image style={styles.icon} source={ICONS.Search} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={'#aaa'}
          value={search}
          onChangeText={e => {
            setSearch(e);
          }}
          style={styles.search}
        />
      </View>

      <View
        style={{
          marginVertical: normalize(10),
        }}>
        <FlatList
          data={list?.sort((a, b) => b.id - a.id)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={{height: normalize(120)}} />}
          //@ts-ignore
          renderItem={({item, index}) => {
            if (search == '') {
              return (
                <View style={styles.itemcontainer}>
                  <Text style={styles.itemtitle}>{item?.title}</Text>
                  <Text style={styles.itemdes}>{item?.body}</Text>
                </View>
              );
            }
            if (
              item.title.toLowerCase().includes(search.toLowerCase()) ||
              item.body.toLowerCase().includes(search.toLowerCase())
            ) {
              return (
                <View style={styles.itemcontainer}>
                  <Text style={styles.itemtitle}>{item?.title}</Text>
                  <Text style={styles.itemdes}>{item?.body}</Text>
                </View>
              );
            }
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('CreatePost' as never)}
        style={styles.fltbtn}>
        <Image style={styles.Editicon} source={ICONS.Edit} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  maincon: {flex: 1, backgroundColor: COLORS.White},
  headercon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingTop: normalize(10),
  },
  headertitle: {
    color: COLORS.Black,
    fontSize: normalize(24),
    fontFamily: 'cursive',
    fontWeight: '700',
  },
  search: {
    height: normalize(40),
    width: '90%',
    marginLeft: normalize(10),
    fontSize: normalize(12),
    color: COLORS.Black,
  },
  icon: {
    height: normalize(15),
    width: normalize(15),
    resizeMode: 'contain',
  },
  Editicon: {
    height: normalize(25),
    width: normalize(25),
    resizeMode: 'contain',
    tintColor: COLORS.White,
  },
  fltbtn: {
    backgroundColor: COLORS.Primary,
    height: normalize(50),
    width: normalize(50),
    borderRadius: normalize(100),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: normalize(20),
    zIndex: 999,
    right: normalize(10),
    elevation: 10,
    shadowColor: COLORS.Primary,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0.9,
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
    color: COLORS.Black,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(10),
    marginTop: normalize(10),
  },
  itemcontainer: {
    width: Dimensions.get('window').width * 0.9,
    elevation: 10,
    shadowColor: COLORS.Primary,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0.9,
    borderRadius: normalize(10),
    padding: normalize(10),
    backgroundColor: COLORS.White,
    alignSelf: 'center',
    marginTop: normalize(15),
  },
  itemtitle: {
    color: COLORS.Black,
    fontWeight: '700',
    fontFamily: 'arial',
    fontSize: normalize(14.5),
    textTransform: 'capitalize',
  },
  itemdes: {
    color: COLORS.Black,
    fontWeight: '500',
    fontFamily: 'arial',
    fontSize: normalize(12),
    marginTop: normalize(5),
  },
  btntxt: {
    color: COLORS.White,
    fontWeight: '500',
    fontSize: normalize(12),
  },
});

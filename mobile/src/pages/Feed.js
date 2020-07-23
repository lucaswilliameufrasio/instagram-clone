import React, {useLayoutEffect, useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import api from '../services/api';
import io from 'socket.io-client';

import camera from '../assets/camera.png';
import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';

function Feed() {
  const [feed, setFeed] = useState([]);
  const [refreshingFeed, setRefreshingFeed] = useState(false);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 20}}
          hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
          onPress={() => navigation.navigate('New')}>
          <Image source={camera} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    registerToSocket();
    console.log('Olha, gerou outro usuário lá');
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const response = await api.get('posts');

    setFeed(response.data);
  }

  function handleRefreshFeed() {
    setRefreshingFeed(true);
    getPosts();
    setRefreshingFeed(false);
  }

  function registerToSocket() {
    const socket = io('http://192.168.7.79:7777');

    socket.removeAllListeners();

    socket.on('post', newPost => {
      setFeed(feeds => [newPost, ...feeds]);
    });

    socket.on('like', likedPost => {
      setFeed(feeds =>
        feeds.map(post => (post._id === likedPost._id ? likedPost : post)),
      );
    });
  }

  function handleLike(id) {
    api.post(`/posts/${id}/like`);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={feed}
        keyExtractor={post => post._id}
        onRefresh={handleRefreshFeed}
        refreshing={refreshingFeed}
        renderItem={({item}) => (
          <View style={styles.feedItem}>
            <View style={styles.feedItemHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.name}>{item.author}</Text>
                <Text style={styles.place}>{item.place}</Text>
              </View>

              <Image source={more} />
            </View>

            <Image
              style={styles.feedImage}
              source={{uri: `http://192.168.7.79:7777/files/${item.image}`}}
            />

            <View style={styles.feedItemFooter}>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.action}
                  onPress={() => handleLike(item._id)}>
                  <Image source={like} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={() => {}}>
                  <Image source={comment} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={() => {}}>
                  <Image source={send} />
                </TouchableOpacity>
              </View>

              <Text style={styles.likes}>{item.likes} curtidas</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.hashtags}>{item.hashtags}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default React.memo(Feed);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedItem: {
    marginTop: 20,
  },
  feedItemHeader: {
    paddingHorizontal: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    color: '#000',
  },
  place: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15,
  },

  feedItemFooter: {
    paddingHorizontal: 15,
  },

  actions: {
    flexDirection: 'row',
  },
  action: {
    marginRight: 8,
  },

  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  description: {
    lineHeight: 18,
    color: '#000',
  },

  hashtags: {
    color: '#7159c1',
  },
});

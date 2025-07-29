import { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function IntroScreen() {
  const video = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/');
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={
          Platform.OS === 'web'
            ? { uri: '/Intro_Expo.mp4' }
            : require('../assets/image/Intro_Expo.mp4')
        }
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isMuted
        isLooping={false}
        style={styles.video}
        onPlaybackStatusUpdate={(status) => {
          if (!status.isLoaded) return;

          if (status.didJustFinish) {
            router.replace('/');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    width: width,
    height: height,
  },
});

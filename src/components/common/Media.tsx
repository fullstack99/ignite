import React, { FC, useState, useRef } from 'react';
import { StyleProp, StyleSheet, Pressable, View } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import Video from 'react-native-video';
import { Play } from 'phosphor-react-native';
import { POST_URL } from 'react-native-dotenv';
import { Media as MediaType } from 'shared/graphql/fragments/post';

import { BLACK75, WHITE60 } from 'shared/src/colors';

interface MediaProps {
  media: MediaType;
  style?: StyleProp<ImageStyle>;
}

const SUPPORTED_EXTENSION = ['mp4'];

function isVideo(src: string): boolean {
  const ext = src.substring(src.lastIndexOf('.') + 1);
  return SUPPORTED_EXTENSION.includes(ext);
}

const Media: FC<MediaProps> = ({ media, style }) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const player = useRef<Video | null>(null);

  const playVideo = (): void => {
    if (!isFirstLoad) {
      return;
    }

    setIsFirstLoad(false);
  };

  const onVideoEnd = (): void => {
    player.current?.seek(0);
    setIsFirstLoad(true);
  };

  // TODO: Need to potentially validate the src url before feeding it to
  // react-native-video as an invalid source seems to crash the app
  return isVideo(media.url) ? (
    <Pressable onPress={playVideo}>
      <View
        style={[
          styles.videoContainer,
          style,
          { aspectRatio: media.aspectRatio },
        ]}>
        <Video
          ref={(ref) => (player.current = ref)}
          source={{ uri: `${POST_URL}/${media.url}` }}
          onError={(err) => console.log('error', err)}
          onEnd={onVideoEnd}
          style={styles.media}
          paused={isFirstLoad}
          controls={!isFirstLoad}
        />
        {isFirstLoad && (
          <View style={styles.overlay} pointerEvents="none">
            <View style={styles.playbackButton}>
              <Play color={WHITE60} size={24} />
            </View>
          </View>
        )}
      </View>
    </Pressable>
  ) : (
    <FastImage
      style={[styles.media, style, { aspectRatio: media.aspectRatio }]}
      source={{ uri: `${POST_URL}/${media.url}` }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLACK75,
  },
  playbackButton: {
    width: 80,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: WHITE60,
    borderRadius: 40,
  },
  media: {
    width: '100%',
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export default Media;

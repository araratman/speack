import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";

export default function MyVideo() {
  const [videoUri, setVideoUri] = useState(null);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.cancelled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {videoUri ? (
        <Video
          source={{ uri: videoUri }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
        />
      ) : (
        <Text>No video selected</Text>
      )}
      <Button title="Pick a video from gallery" onPress={pickVideo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 300,
  },
});

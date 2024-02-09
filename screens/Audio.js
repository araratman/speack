import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Audio } from "expo-av";

export default function MyAudio() {
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const pickMusic = async () => {
    sound && (await sound.stopAsync());
    setIsPlaying(false);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: false,
      });
      setSelectedMusic(result);
    } catch (error) {
      console.log("Error picking music:", error);
      Alert.alert("Error", "Failed to pick music");
    }
  };

  const togglePlay = async () => {
    if (!selectedMusic) {
      Alert.alert("Error", "Please select a music file first");
      return;
    }

    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: selectedMusic.assets[0].uri },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Selected Music</Text>
      {selectedMusic && (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={togglePlay}
            style={{ padding: 10, backgroundColor: "blue", borderRadius: 5 }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {isPlaying ? "Pause" : "Play"}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontWeight: 500, fontSize: 20 }}>
              Selected Music:
            </Text>
            <Text style={{ fontWeight: 500, fontSize: 20 }}>
              {" "}
              {selectedMusic.assets[0].name.length > 15
                ? selectedMusic.assets[0].name.replace(/^(.{15}).+/, "$1...")
                : selectedMusic.assets[0].name}
            </Text>
          </View>
        </View>
      )}
      <TouchableOpacity
        onPress={pickMusic}
        style={{
          padding: 10,
          backgroundColor: "green",
          borderRadius: 5,
          marginVertical: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Select Music</Text>
      </TouchableOpacity>
    </View>
  );
}

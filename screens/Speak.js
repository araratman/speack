import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as Speech from "expo-speech";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Speak() {
  const [inputText, setText] = useState("");
  const [speackData, setSpeackData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await AsyncStorage.getItem("speack");
    data && setSpeackData(JSON.parse(data));
  };

  const setItem = (text) => {
    const data = speackData;
    data.push(text);
    setSpeackData(data);
    AsyncStorage.setItem("speack", JSON.stringify(speackData));
    getData();
  };

  const speakText = (text, update) => {
    setText("");
    Speech.speak(text, { language: "en-US" });
    update && setItem(text);
  };

  const clearAll = () => {
    AsyncStorage.setItem("speack", JSON.stringify([]));
    getData();
  };

  const Delete = (item) => {
    const updatedData = speackData.filter((text) => text !== item);
    AsyncStorage.setItem("speack", JSON.stringify(updatedData));
    getData();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
        onChangeText={(inputText) => setText(inputText)}
        value={inputText}
        placeholder="Type text here"
      />
      <Button
        title="Speak"
        disabled={!inputText}
        onPress={() => inputText && speakText(inputText, true)}
      />
      <FlatList
        data={speackData}
        keyExtractor={(item, index) => index}
        renderItem={(item) => (
          <TouchableOpacity
            onPress={() => {
              speakText(item.item, false);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10,
              borderWidth: 0.5,
              borderColor: "silver",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ maxWidth: "70%" }}>{item.item}</Text>
            <TouchableOpacity onPress={() => Delete(item.item)}>
              <Ionicons name={"trash-outline"} size={24} color={"black"} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Clear"
        onPress={() => clearAll()}
        disabled={speackData.length == 0}
      />
    </View>
  );
}

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import TextAvatar from "react-native-text-avatar";
export function colorHash(inputString) {
  var sum = 0;

  for (var i in inputString) {
    sum += inputString.charCodeAt(i);
  }

  r = ~~(
    ("0." +
      Math.sin(sum + 1)
        .toString()
        .substr(6)) *
    256
  );
  g = ~~(
    ("0." +
      Math.sin(sum + 2)
        .toString()
        .substr(6)) *
    256
  );
  b = ~~(
    ("0." +
      Math.sin(sum + 3)
        .toString()
        .substr(6)) *
    256
  );

  var rgb = "rgb(" + r + ", " + g + ", " + b + ")";

  var hex = "#";

  hex += ("00" + r.toString(16)).substr(-2, 2).toUpperCase();
  hex += ("00" + g.toString(18)).substr(-2, 2).toUpperCase();
  hex += ("00" + b.toString(20)).substr(-2, 2).toUpperCase();

  return {
    r: r,
    g: g,
    b: b,
    rgb: rgb,
    hex: hex,
  };
}

export default function Register({ navigation }) {
  const [name, setName] = useState("");

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      paddingTop: 70,
    },
    input: {
      height: 50,
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderColor: "red",
      borderWidth: 1,
      borderRadius: 7,
      fontSize: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      textTransform: "uppercase",
      textAlign: "center",
      paddingVertical: 40,
      color: "red",
    },
    button: {
      backgroundColor: "red",
      height: 45,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    buttonView: {
      paddingVertical: 40,
      width: "20%",
      paddingHorizontal: 50,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <TextAvatar
        backgroundColor={colorHash(name).hex}
        textColor={"#fffff"}
        size={90}
        type={"circle"} // optional
      >
        {name}
      </TextAvatar>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <View style={styles.buttonView}>
        <Pressable
          disabled={name == ""}
          style={styles.button}
          onPress={() => navigation.navigate("Chat", { currUser: name })}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

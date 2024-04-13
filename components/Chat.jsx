import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import socket from "../utils/socket";
import { Button } from "@rneui/themed";
import TextAvatar from "react-native-text-avatar";
import { colorHash } from "./Register";

const Item = ({ item, isCurrUserMessage, isMsg }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 50,
      marginVertical: 10,
      borderWidth: 1, // Add border width
      borderColor: "lightgrey",
      borderRadius: 5,
      padding: 10,
      width: "30%",
      //backgroundColor: isCurrUserMessage ? "lightgreen" : "grey",

      backgroundColor: !isMsg
        ? "lightgrey"
        : isCurrUserMessage
        ? "lightgreen"
        : "grey",
      alignSelf: !isMsg
        ? "center"
        : isCurrUserMessage
        ? "flex-start"
        : "flex-end",
    }}
  >
    {isMsg && (
      <TextAvatar
        backgroundColor={colorHash(item.user).hex}
        textColor={"#fffff"}
        size={40}
        type={"circle"}
      >
        {item.user}
      </TextAvatar>
    )}
    <Text
      style={{
        marginLeft: 10,

        fontSize: 18,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {isMsg ? item.message : item.user + " " + item.message}
    </Text>
  </View>
);

export default function Chat({ route }) {
  const { currUser } = route.params;
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      paddingTop: 70,
    },
    input: {
      width: "80%",
      height: 50,
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
      backgroundColor: "green",
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
      width: "20%",
    },
    messageStyle: {},

    containerStyle: {
      height: 40,
      width: 200,
      marginHorizontal: 50,
      marginVertical: 10,
    },
  });

  useEffect(() => {
    socket.emit("message", { user: currUser, text: "Entered the chat" });

    socket.on("connect", () => {});

    socket.on("message", (arg1) => {
      setData((prevData) => [
        ...prevData,
        { user: arg1.user, text: arg1.text },
      ]);
    });
    socket.on("disconnect", () => {
      socket.emit("message", { user: currUser, text: "Left the chat" });
    });
  }, [socket]);

  return (
    <SafeAreaView style={{ display: "flex", flex: 1 }}>
      <ScrollView style={{ height: "88%" }}>
        <View style={{ flex: 1 }}>
          {data.map((d1) => (
            <Item
              key={d1.user}
              item={{ user: d1.user, message: d1.text }}
              isCurrUserMessage={d1.user == currUser}
              isMsg={
                d1.text != "Entered the chat" && d1.text != "Left the chat"
              }
            />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          display: "flex",
          padding: "15px",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          height: "12%",
          backgroundColor: "lightgray",
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Type your message here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          disabled={
            text == "" || text == "Entered the chat" || text == "Left the chat"
          }
          containerStyle={styles.containerStyle}
          style={styles.buttonStyle}
          title="send"
          onPress={() => {
            socket.emit("message", { user: currUser, text: text }), setText("");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

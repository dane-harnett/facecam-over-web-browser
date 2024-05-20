import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

export function HomeScreen({ navigation }) {
  const [currentUrl, setCurrentUrl] = useState("https://google.com");

  function textChangeHandler(value: string) {
    setCurrentUrl(value);
  }
  function onSubmit() {
    navigation.navigate("WebView", { uri: currentUrl });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.controlContainer}>
          <TextInput
            clearButtonMode="always"
            inputMode="url"
            onChangeText={textChangeHandler}
            onSubmitEditing={onSubmit}
            returnKeyType="go"
            style={styles.urlTextInput}
            value={currentUrl}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "stretch",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%",
    flex: 1,
  },
  controlContainer: {
    backgroundColor: "#777",
    bottom: 0,
    padding: 8,
    width: "100%",
    zIndex: 3,
  },
  urlTextInput: {
    borderRadius: 6,
    backgroundColor: "#aaa",
    color: "#fff",
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});

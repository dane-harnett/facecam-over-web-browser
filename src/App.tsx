import { useCameraPermissions } from "expo-camera";
import { WebView } from "react-native-webview";
import { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { DraggableCamera } from "./DraggableCamera";

export function App() {
  const [submittedUrl, setSubmittedUrl] = useState("https://google.com");
  const [currentUrl, setCurrentUrl] = useState("https://google.com");
  const [permission, requestPermission] = useCameraPermissions();
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function textChangeHandler(value: string) {
    setCurrentUrl(value);
  }
  function onSubmit() {
    setSubmittedUrl(currentUrl);
  }
  function onUrlInputBlur() {
    setIsEditingUrl(false);
  }
  function onUrlInputFocus() {
    setIsEditingUrl(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webViewContainer}>
        <WebView source={{ uri: submittedUrl }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={[
            styles.controlContainer,
            isEditingUrl ? undefined : styles.controlContainerUnfocused,
          ]}
        >
          <TextInput
            clearButtonMode="always"
            inputMode="url"
            onBlur={onUrlInputBlur}
            onChangeText={textChangeHandler}
            onFocus={onUrlInputFocus}
            onSubmitEditing={onSubmit}
            returnKeyType="go"
            style={styles.urlTextInput}
            value={currentUrl}
          />
        </View>
      </KeyboardAvoidingView>

      <View style={styles.dragAndDropCamContainer}>
        <DraggableCamera />
      </View>
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
  dragAndDropCamContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  controlContainer: {
    backgroundColor: "#777",
    bottom: 0,
    padding: 8,
    width: "100%",
    zIndex: 3,
  },
  controlContainerUnfocused: {
    position: "absolute",
  },
  urlTextInput: {
    borderRadius: 6,
    backgroundColor: "#aaa",
    color: "#fff",
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  webViewContainer: {
    flexGrow: 1,
  },
});

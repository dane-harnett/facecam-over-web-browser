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
import { FullHeightCamera } from "./FullHeightCamera";

const config = {
  cameraStyle: "FullHeight",
};

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
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.leftContainer}
      >
        <View style={styles.webViewContainer}>
          <WebView source={{ uri: submittedUrl }} />
        </View>
      </KeyboardAvoidingView>

      <View style={styles.rightContainer}>
        {config.cameraStyle === "FullHeight" ? (
          <FullHeightCamera />
        ) : (
          <DraggableCamera />
        )}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  leftContainer: {
    width: "70%",
  },
  rightContainer: {
    width: "30%",
  },
  controlContainer: {
    backgroundColor: "#777",
    width: "100%",
  },
  controlContainerUnfocused: {},
  urlTextInput: {
    borderRadius: 6,
    backgroundColor: "#aaa",
    color: "#fff",
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  webViewContainer: {
    height: "100%",
  },
});

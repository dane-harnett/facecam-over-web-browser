import { useCameraPermissions } from "expo-camera";
import { WebView } from "react-native-webview";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { DraggableCamera } from "./DraggableCamera";

export function WebViewScreen({ navigation, route }) {
  const [permission, requestPermission] = useCameraPermissions();

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webViewContainer}>
        <WebView source={{ uri: route.params.uri }} scalesPageToFit={true} />
      </View>

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
    width: "100%",
    flex: 1,
  },
  dragAndDropCamContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  webViewContainer: {
    flexGrow: 1,
  },
});

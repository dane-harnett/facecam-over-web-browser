import { useCameraPermissions } from "expo-camera";
import { WebView } from "react-native-webview";
import { Button, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { DraggableCamera } from "./DraggableCamera";
import { useCallback, useRef } from "react";

export function WebViewScreen({ route }) {
  const [permission, requestPermission] = useCameraPermissions();
  const webViewRef = useRef<WebView>();

  const triggerSkipStartAction = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`rpcontrol("skipstart")`);
    }
  }, []);
  const triggerPreviousAction = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`rpcontrol("prev")`);
    }
  }, []);
  const triggerPlayPauseAction = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(
        `rptexti=rptextstart;rpcontrol("pause")`,
      );
    }
  }, []);
  const triggerNextAction = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`rpcontrol("next")`);
    }
  }, []);
  const triggerSkipEndAction = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`rpcontrol("skipend")`);
    }
  }, []);

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

  const isPokerBankrollTracker = route.params.uri.includes(
    "pokerbankrolltracker",
  );

  return (
    <View style={styles.container}>
      <View style={styles.webViewContainer}>
        <WebView
          source={{ uri: route.params.uri }}
          scalesPageToFit={true}
          ref={webViewRef}
        />
      </View>

      <View style={styles.dragAndDropCamContainer}>
        <DraggableCamera />
      </View>

      {isPokerBankrollTracker ? (
        <View style={styles.buttonsContainer}>
          <Icon.Button
            iconStyle={styles.iconStyle}
            name="fast-backward"
            onPress={triggerSkipStartAction}
          />
          <Icon.Button
            iconStyle={styles.iconStyle}
            name="step-backward"
            onPress={triggerPreviousAction}
          />
          <Icon.Button
            iconStyle={styles.iconStyle}
            name="play"
            onPress={triggerPlayPauseAction}
          />
          <Icon.Button
            iconStyle={styles.iconStyle}
            name="step-forward"
            onPress={triggerNextAction}
          />
          <Icon.Button
            iconStyle={styles.iconStyle}
            name="fast-forward"
            onPress={triggerSkipEndAction}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "stretch",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    gap: 10,
  },
  dragAndDropCamContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  iconStyle: {
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  webViewContainer: {
    flexGrow: 1,
  },
});

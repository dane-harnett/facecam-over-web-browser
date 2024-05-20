import { CameraView } from "expo-camera";
import { StyleSheet, View } from "react-native";

export const FullHeightCamera = () => {
  return (
    <View style={styles.cameraContainer}>
      <CameraView style={[styles.camera]} facing="front"></CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
    backgroundColor: "blue",
  },
});

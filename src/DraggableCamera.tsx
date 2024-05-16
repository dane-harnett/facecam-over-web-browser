import { CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";

export const DraggableCamera = () => {
  const position = useRef(new Animated.ValueXY()).current;
  const [dragging, setDragging] = useState(false);

  // Create a pan responder to handle touch events
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDragging(true);
      },
      onPanResponderMove: (_evt, gestureState) => {
        position.x.setValue(gestureState.dx);
        position.y.setValue(gestureState.dy);
      },
      onPanResponderRelease: () => {
        setDragging(false);
        position.extractOffset();
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ translateX: position.x }, { translateY: position.y }],
          opacity: dragging ? 0.8 : 1,
          backgroundColor: dragging ? "blue" : "transparent",
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.cameraContainer}>
        <CameraView style={[styles.camera]} facing="front"></CameraView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    width: 150,
    height: 150,
    borderRadius: "100%",
    overflow: "hidden",
    backgroundColor: "red",
  },
  camera: {
    flex: 1,
    backgroundColor: "blue",
  },
  card: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "green",
  },
});

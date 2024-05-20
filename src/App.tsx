import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./HomeScreen";
import { WebViewScreen } from "./WebViewScreen";

const Stack = createNativeStackNavigator();

export function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Enter URL" }}
        />
        <Stack.Screen
          name="WebView"
          component={WebViewScreen}
          options={({ route }) => ({
            headerBackTitle: "Back",
            title: route.params.uri,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from "react";
import store from "./src/store";
import Home from "./src/views/Home";
import { LogBox } from "react-native";
import Login from "./src/views/Login";
import Admin from "./src/views/Admin";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import Loader from "./src/views/Loader";
import colors from "./src/utils/colors";
import Profile from "./src/views/Profile";
import Draws from "./src/component/Drawer";
import ResetPsw from "./src/views/ResetPsw";
import Register from "./src/views/Register";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

LogBox.ignoreAllLogs(true);

function TabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.silver,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === "Home") icon = "home";
          else if (route.name === "Topics") icon = "list";
          else if (route.name === "Profile") icon = "user-alt";
          return <FontAwesome5 name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Topics" component={Profile} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function AdminTab() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.silver,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === "Home") icon = "home";
          else if (route.name === "Topics") icon = "list";
          else if (route.name === "Profile") icon = "user-alt";
          return <FontAwesome5 name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Admin} />
      <Tab.Screen name="Topics" component={Profile} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function Dashboard() {
  return (
    <Drawer.Navigator drawerContent={(props) => <Draws {...props} />}>
      <Drawer.Screen name="Home" component={TabNav} />
    </Drawer.Navigator>
  );
}

function adminDashboard() {
  return (
    <Drawer.Navigator drawerContent={(props) => <Draws {...props} />}>
      <Drawer.Screen name="Home" component={AdminTab} />
    </Drawer.Navigator>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loader" component={Loader} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ResetPsw" component={ResetPsw} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="adminDashboard" component={adminDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

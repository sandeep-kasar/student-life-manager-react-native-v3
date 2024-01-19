import * as React from 'react';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Expense from './src/screens/Expense';
import Pin from './src/screens/Pin';
import Action from './src/screens/Action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable, View, StyleSheet, useColorScheme, SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from './src/screens/Colors';


const Tab = createBottomTabNavigator();

const MyTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

function App(): React.JSX.Element {
  const scheme = useColorScheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={COLORS.primaryColor}
      />
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string = "albums";

              if (route.name === 'Expense') {
                iconName = focused ? 'albums' : 'albums-outline';
              } else if (route.name === 'Pin') {
                iconName = focused ? 'location' : 'location-outline';
              } else if (route.name === 'Action') {
                iconName = focused ? 'list' : 'list-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: COLORS.primaryColor,
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
              fontSize: 13
            },
            tabBarStyle: {
              paddingBottom: 4,
              paddingTop: 4,
            },
            headerStyle: {
              backgroundColor: COLORS.primaryColor
            }

          })}

        >
          <Tab.Screen
            name="Expense"
            component={Expense}
            options={{
              title: "sdlm",
              headerTintColor: COLORS.white,
              tabBarLabel: "Expense",
              headerRight: () => (
                <View
                  style={[styles.container]}>
                  <Pressable
                    style={{ paddingRight: 5, flex: 1, backgroundColor: COLORS.primaryColor }}
                    onPressIn={() => console.log("Search")}
                  >
                    <Ionicons name="search" size={30} color={COLORS.white} />
                  </Pressable>
                  <Pressable
                    style={{ paddingRight: 5, flex: 1, backgroundColor: COLORS.primaryColor }}
                    onPressIn={() => console.log("Search")}
                  >
                    <Ionicons name="person-circle" size={30} color={COLORS.white} />
                  </Pressable>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Pin"
            component={Pin}
            options={{
              title: "sdlm",
              tabBarLabel: "Pin",
              headerRight: () => (
                <View
                  style={[styles.container]}>
                  <Pressable
                    style={{ paddingRight: 5, flex: 1, backgroundColor: COLORS.white }}
                    onPressIn={() => console.log("Search")}
                  >
                    <Ionicons name="search" size={30} />
                  </Pressable>
                  <Pressable
                    style={{ paddingRight: 5, flex: 1, backgroundColor: COLORS.white }}
                    onPressIn={() => console.log("Search")}
                  >
                    <Ionicons name="person-circle" size={30} />
                  </Pressable>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Action"
            component={Action}
            options={{
              title: "sdlm",
              tabBarLabel: "Action",
              headerRight: () => (
                <View
                  style={[styles.container]}>
                  <Pressable
                    style={{ paddingRight: 5, flex: 1, backgroundColor: COLORS.white }}
                    onPressIn={() => console.log("Search")}
                  >
                    <Ionicons name="search" size={30} />
                  </Pressable>
                  <Pressable
                    style={{ paddingRight: 5, flex: 1, backgroundColor: COLORS.white }}
                    onPressIn={() => console.log("Search")}
                  >
                    <Ionicons name="person-circle" size={30} />
                  </Pressable>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    direction: 'rtl',
    alignItems: 'center',
    width: 100,
    backgroundColor: COLORS.primaryColor
  },
  floatinBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
});


export default App;


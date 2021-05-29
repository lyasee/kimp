/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabLeaderBoardScreen from '../screens/TabLeaderBoardScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
  TabLeaderBoardParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Premium"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        labelStyle: {
          fontFamily: 'esamanru-medium',
        },
      }}>
      <BottomTab.Screen
        name="Premium"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="format-list-text" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Bitcoin"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="bitcoin" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="리더보드"
        component={TabLeaderBoardNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarMaterialIcon name="leaderboard" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={24} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarMaterialIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={24} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{
          headerTitle: 'Kimp',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'esamanru-medium',
            fontSize: 18,
          },
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{
          headerTitle: 'Bitcoin',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'esamanru-medium',
            fontSize: 18,
          },
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabLeaderBoardStack = createStackNavigator<TabLeaderBoardParamList>();

function TabLeaderBoardNavigator() {
  return (
    <TabLeaderBoardStack.Navigator>
      <TabLeaderBoardStack.Screen
        name="TabLeaderBoardScreen"
        component={TabLeaderBoardScreen}
        options={{
          headerTitle: 'LeaderBoard',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'esamanru-medium',
            fontSize: 18,
          },
        }}
      />
    </TabLeaderBoardStack.Navigator>
  );
}

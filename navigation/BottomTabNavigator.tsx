/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ReferralListScreen from '../screens/ReferralListScreen';
import TabLeaderBoardScreen from '../screens/TabLeaderBoardScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwitterScreen from '../screens/TabTwitterScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TradingViewBinanceBtcChartScreen from '../screens/TradingViewBinanceBtcChartScreen';
import TradingViewDominanceScreen from '../screens/TradingViewDominanceScreen';
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
  TabLeaderBoardParamList,
  TabTwitterParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <BottomTab.Navigator
      initialRouteName="Premium"
      tabBarOptions={{
        activeTintColor: colors.tint,
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
      <BottomTab.Screen
        name="twitter"
        component={TabTwitterNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="twitter" color={color} />,
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
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

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
          headerRightContainerStyle: {
            paddingRight: 16,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Settings');
              }}>
              <TabBarMaterialIcon name="settings" color={colors.tint} />
            </TouchableOpacity>
          ),
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
      <TabTwoStack.Screen
        name="TradingViewDominanceScreen"
        component={TradingViewDominanceScreen}
        options={{
          headerShown: false,
        }}
      />
      <TabTwoStack.Screen
        name="ReferralListScreen"
        component={ReferralListScreen}
        options={{
          headerShown: false,
        }}
      />
      <TabTwoStack.Screen
        name="TradingViewBinanceBtcChartScreen"
        component={TradingViewBinanceBtcChartScreen}
        options={{
          headerShown: false,
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

const TabTwitterStack = createStackNavigator<TabTwitterParamList>();

function TabTwitterNavigator() {
  return (
    <TabTwitterStack.Navigator>
      <TabTwitterStack.Screen
        name="TabTwitterScreen"
        component={TabTwitterScreen}
        options={{
          headerShown: false,
          // headerTitle: 'Twitter',
          // headerTitleAlign: 'left',
          // headerTitleStyle: {
          //   fontFamily: 'esamanru-medium',
          //   fontSize: 18,
          // },
        }}
      />
    </TabTwitterStack.Navigator>
  );
}

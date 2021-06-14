import * as React from 'react';
import { Linking, Platform, ScrollView, StyleSheet } from 'react-native';
import BackHeader from '../components/basic/BackHeader';
import { View, Text } from '../components/Themed';
import * as MailComposer from 'expo-mail-composer';
import { TouchableOpacity } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

const SettingsScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handlePressContactUs = () => {
    MailComposer.composeAsync({
      recipients: ['notice.rokgg@gmail.com'],
    });
  };

  const handlePressPrivacy = () => {
    Linking.openURL(
      'https://docs.google.com/document/d/1hoDN0441id_6REqND2L2oHPbVH9hQfZq-q0UQ016AM8/edit?usp=sharing',
    );
  };

  const handlePressReview = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('https://apps.apple.com/app/id1568439882?action=write-review');
      return;
    } else if (Platform.OS === 'android') {
      const androidPackageName = 'com.lyasee.kimp';
      Linking.openURL(
        `https://play.google.com/store/apps/details?id=${androidPackageName}&showAllReviews=true`,
      );
    }
  };

  return (
    <View style={styles.container}>
      <BackHeader />
      <ScrollView style={styles.scrollViewContainer}>
        <TouchableOpacity onPress={handlePressContactUs}>
          <View style={{ ...styles.menu, borderColor: colors.border }}>
            <Text style={styles.menuText}>Contact Us</Text>
            <Text style={{ ...styles.descriptionText, color: colors.description }}>
              오류 및 건의사항이 있다면 연락 주세요.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressReview}>
          <View style={{ ...styles.menu, borderColor: colors.border }}>
            <Text style={styles.menuText}>Review</Text>
            <Text style={{ ...styles.descriptionText, color: colors.description }}>
              도움이 되었다면 리뷰를 작성해 주세요.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressPrivacy}>
          <View style={{ ...styles.menu, borderColor: colors.border }}>
            <Text style={styles.menuText}>Privacy Policy</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    padding: 10,
  },
  menu: {
    padding: 20,
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 20,
    fontFamily: 'esamanru-light',
  },
  descriptionText: {
    fontSize: 12,
    marginTop: 8,
  },
});

import React from 'react';

import {SafeAreaView, ScrollView} from 'react-native';

import {useRoute, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../types/screens';

import {Column, Row, TextButton, Icon, Text, Heading} from '../../design-system';

import {theme} from '../../design-system/theme';

import {Team} from './Team';

export const ViewScoreboard: React.FunctionComponent = () => {
  // init route to get the params
  const route = useRoute();

  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // handle going back
  const handleBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Column>
        <Row horizontalAlign="between" padding="default">
          <TextButton.Root onPress={handleBackPress}>
            <TextButton.Icon>
              <Icon.Back color={theme.colors.text.default} height={20} width={20} />
            </TextButton.Icon>
            <TextButton.Text>back</TextButton.Text>
          </TextButton.Root>
        </Row>
        <Row padding="default" horizontalAlign="between" verticalAlign="top">
          <Column gap="none">
            <Heading>christmas 2021</Heading>
            <Text>euchure</Text>
          </Column>
          <Text styledAs="label">nov. 12</Text>
        </Row>
      </Column>
      <ScrollView style={{flex: 1}}>
        <Column padding="default">
          <Team name="hill beavers" score={12} />
          <Team name="team safari" score={12} />
        </Column>
      </ScrollView>
    </SafeAreaView>
  );
};

import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SafeAreaView, ScrollView} from 'react-native';

import {RootStackParamList} from '../types/screens';

import {DismissKeyboard, HeaderTitle, Scoreboard} from '../components';

import {Text, IconButton, Column, Row, Icon} from '../design-system';

import {theme} from '../design-system/theme';

export const Scoreboards: React.FunctionComponent = () => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1}}>
        <Column>
          <Row
            horizontalAlign="between"
            paddingHorizontal="default"
            verticalAlign="center"
            paddingVertical="default"
          >
            <IconButton backgroundColor="accentOrangeDefault" disabled>
              <Text>🐺</Text>
            </IconButton>
            <HeaderTitle>scoreboards</HeaderTitle>
            <IconButton onPress={() => navigation.navigate('CreateScoreboard')}>
              <Icon.Plus color={theme.colors.background.widget.default} width={20} height={20} />
            </IconButton>
          </Row>
          {/* TODO: Add support for this at a later date */}
          {/* <Box
            paddingHorizontal="default"
            backgroundColor="widgetDefault"
            paddingVertical="default"
          >
            <TextInput placeholder="search" />
          </Box> */}
        </Column>
        <ScrollView
        // TODO: add swipe to refresh on scoreboards
        // refreshControl={
        //   <RefreshControl
        //     refreshing={true}
        //     onRefresh={() => console.log("Refresh")}
        //   />
        // }
        >
          <Column paddingHorizontal="default" paddingTop="default">
            <Scoreboard
              name="christmas 2021"
              game="euchure"
              createdAt=""
              teams={[
                {
                  name: 'hill beavers',
                  score: 12,
                },
                {
                  name: 'arctic lions',
                  score: 10,
                },
              ]}
            />
            <Scoreboard
              name="christmas 2021"
              game="euchure"
              createdAt=""
              teams={[
                {
                  name: 'hill beavers',
                  score: 12,
                },
                {
                  name: 'arctic lions',
                  score: 10,
                },
              ]}
            />
            <Scoreboard
              name="christmas 2021"
              game="euchure"
              createdAt=""
              teams={[
                {
                  name: 'hill beavers',
                  score: 12,
                },
                {
                  name: 'arctic lions',
                  score: 10,
                },
              ]}
            />
          </Column>
        </ScrollView>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

import React from 'react';

import {SafeAreaView, ScrollView} from 'react-native';

import {useQuery} from 'react-query';

import {useRoute, useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../../types/screens';

import {Column, Row, TextButton, Icon, Text, Heading} from '../../design-system';
import {theme} from '../../design-system/theme';

import {Team} from './Team';
import {scoreboards} from '../../constants';
import {usePlatformApi} from '../../hooks';
import {formatDate} from '../../utils';

export const ViewScoreboard: React.FunctionComponent = () => {
  // init route to get the params
  const route = useRoute<RouteProp<RootStackParamList, 'ViewScoreboard'>>();

  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // handle going back
  const handleBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);

  // init api
  const api = usePlatformApi();

  // query for the specific scoreboard based on the scoreboard id
  const {data: scoreboard, isLoading} = useQuery(scoreboards(route.params.scoreboardId), () =>
    api.getScoreboard({
      scoreboardId: route.params.scoreboardId,
    }),
  );

  // format the date
  const formattedDate = React.useMemo(() => {
    if (scoreboard) {
      return formatDate(scoreboard.createdAt);
    }
  }, [scoreboard]);

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
          <Column gap="xsmall">
            <Heading numberOfLines={1}>{scoreboard?.name}</Heading>
            <Text>{scoreboard?.game}</Text>
            <Text styledAs="caption">{formattedDate}</Text>
          </Column>
        </Row>
      </Column>
      <ScrollView style={{flex: 1}}>
        <Column padding="default">
          {scoreboard?.teams.map(t => {
            return <Team key={t.teamId} name={t.name} score={t.score} />;
          })}
        </Column>
      </ScrollView>
    </SafeAreaView>
  );
};

import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Pressable, Row, Column, Text, Heading} from '../design-system';

import {RootStackParamList} from '../types/screens';

interface Team {
  name: string;
  score: number;
}

interface ScoreboardProps {
  name: string;
  game: string;
  createdAt: string;
  teams: Team[];
}

export const Scoreboard: React.FunctionComponent<ScoreboardProps> = ({
  name,
  game,
  createdAt,
  teams,
}) => {
  // init navigation
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ViewScoreboard', {
          scoreboardId: 1,
        })
      }
    >
      <Column
        backgroundColor="widgetSecondary"
        padding="default"
        borderRadius="default"
      >
        <Row horizontalAlign="between">
          <Column gap="none">
            <Heading level="3">{name}</Heading>
            <Text styledAs="label">{game}</Text>
          </Column>
          <Column gap="none" horizontalAlign="center">
            <Heading>12</Heading>
            <Text styledAs="caption">nov</Text>
          </Column>
        </Row>
        <Column gap="small">
          {teams.map((t, i) => {
            return (
              <Row key={i} horizontalAlign="between">
                <Text styledAs="caption">{t.name}</Text>
                <Heading>{t.score}</Heading>
              </Row>
            );
          })}
        </Column>
      </Column>
    </Pressable>
  );
};

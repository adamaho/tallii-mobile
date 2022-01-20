import React from 'react';

import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/screens';

import {GradientHeading} from '../components';
import {Row, Column, Text, Heading} from '../design-system';
import {formatDate} from '../utils';

import type {TeamModel} from '../apiClient';

interface ScoreboardProps {
  scoreboardId: number;
  name: string;
  game: string;
  updatedAt: Date;
  teams: TeamModel[];
}

export const Scoreboard: React.FunctionComponent<ScoreboardProps> = ({
  scoreboardId,
  name,
  game,
  updatedAt,
  teams,
}) => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // sort the teams by score
  const sortedTeams = React.useMemo(() => {
    return [...teams].sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      } else if (a.score < b.score) {
        return 1;
      }
      return 0;
    });
  }, [teams]);

  // format the date
  const formattedDate = React.useMemo(() => {
    return formatDate(updatedAt);
  }, [updatedAt]);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ViewScoreboard', {
          scoreboardId,
        })
      }
    >
      <Column backgroundColor="widgetSecondary" padding="default" borderRadius="default">
        <Row horizontalAlign="between" verticalAlign="top">
          <Column gap="none" style={{flex: 0.9}}>
            <Heading level="3" numberOfLines={1}>
              {name}
            </Heading>
            <Text styledAs="label" numberOfLines={1}>
              {game}
            </Text>
          </Column>
          <Text styledAs="label">{formattedDate.toLocaleLowerCase()}</Text>
        </Row>
        <Column gap="small">
          {sortedTeams.map((t, i) => {
            return (
              <Row key={i} horizontalAlign="between" padding="none">
                <Text styledAs="caption" style={{flex: 0.9}} numberOfLines={1}>
                  {t.name}
                </Text>
                {i === 0 ? (
                  <GradientHeading>{t.score.toString()}</GradientHeading>
                ) : (
                  <Heading level="3" color="secondary">
                    {t.score}
                  </Heading>
                )}
              </Row>
            );
          })}
        </Column>
      </Column>
    </Pressable>
  );
};

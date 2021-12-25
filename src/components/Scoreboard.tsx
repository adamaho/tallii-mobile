import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Header} from '../components';
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
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // sort the teams by score
  const sortedTeams = React.useMemo(() => {
    return teams.sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      } else if (a.score < b.score) {
        return 1;
      }

      return 0;
    });
  }, [teams]);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ViewScoreboard', {
          scoreboardId: 1,
        })
      }
    >
      <Column backgroundColor="widgetSecondary" padding="default" borderRadius="default">
        <Row horizontalAlign="between" verticalAlign="top">
          <Column gap="none">
            <Heading level="3">{name}</Heading>
            <Text styledAs="label">{game}</Text>
          </Column>
          <Text styledAs="label">nov. 12</Text>
          {/* <Column gap="none" horizontalAlign="center">
            <Heading>12</Heading>
            <Text styledAs="caption">nov</Text>
          </Column> */}
        </Row>
        <Column gap="small">
          {sortedTeams.map((t, i) => {
            return (
              <Row key={i} horizontalAlign="between" padding="none">
                <Text styledAs="caption">{t.name}</Text>
                {i === 0 ? (
                  <Header.Title>{t.score.toString()}</Header.Title>
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

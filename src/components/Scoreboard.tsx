import React from 'react';

import {Pressable, Box, Row, Column, Text, Heading} from '../design-system';

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
  return (
    <Pressable>
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
            <Text styledAs="label">12</Text>
            <Text styledAs="label">nov</Text>
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

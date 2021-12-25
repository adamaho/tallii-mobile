import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../types/screens';

import {Pressable, Heading, Text, Row} from '../../design-system';

interface TeamProps {
  name: string;
  score: number;
}

export const Team: React.FunctionComponent<TeamProps> = ({name, score}) => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable onPress={() => navigation.navigate('ViewTeam', {teamId: 1})}>
      <Row
        horizontalAlign="between"
        backgroundColor="widgetSecondary"
        padding="default"
        borderRadius="default"
      >
        <Text>{name}</Text>
        <Heading>{score}</Heading>
      </Row>
    </Pressable>
  );
};

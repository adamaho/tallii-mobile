import React from 'react';

import {useRoute} from '@react-navigation/native';

import {View, Text} from 'react-native';

export const ViewScoreboard: React.FunctionComponent = () => {
  const route = useRoute();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>View Scoreboard</Text>
    </View>
  );
};

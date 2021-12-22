import React from 'react';

import {View, Text, Button} from 'react-native';

export const Scoreboards: React.FunctionComponent = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>Scoreboards</Text>
      <Button
        title="Create Scoreboard"
        onPress={() => navigation.navigate('CreateScoreboard')}
      />
      <Button
        title="View Scoreboard"
        onPress={() => navigation.navigate('ViewScoreboard')}
      />
    </View>
  );
};

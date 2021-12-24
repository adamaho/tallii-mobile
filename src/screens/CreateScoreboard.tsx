import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {View, Text, Button} from 'react-native';

export const CreateScoreboard: React.FunctionComponent = () => {
  const {navigate} = useNavigation();

  React.useEffect(() => {
    console.log('mounted');

    return () => {
      console.log('unmounted');
    };
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>Create Scoreboard</Text>
      <Button title="Create Team" onPress={() => navigate('CreateTeam')} />
    </View>
  );
};

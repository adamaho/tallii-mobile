import React from "react";

import { View, Text } from "react-native";

export const ViewScoreboard: React.FunctionComponent = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>View Scoreboard</Text>
    </View>
  );
};
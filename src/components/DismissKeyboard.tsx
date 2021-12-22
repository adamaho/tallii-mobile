import React from 'react';

import {Keyboard, TouchableWithoutFeedback} from 'react-native';

export const DismissKeyboard: React.FunctionComponent = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

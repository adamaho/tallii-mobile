import React from 'react';

import {TextInput as NativeTextInput} from 'react-native';

import type {TextInputProps} from 'react-native';

export const TextInput: React.FunctionComponent<TextInputProps> = props => {
  return (
    <NativeTextInput
      {...props}
      style={{
        backgroundColor: 'black',
        borderRadius: 8,
        color: 'white',
        height: 42,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'red',
        width: '100%',
      }}
    />
  );
};

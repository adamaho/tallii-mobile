import React from 'react';

import {TextInput as NativeTextInput} from 'react-native';

import type {TextInputProps} from 'react-native';

import {theme} from '../theme';
import {atoms} from '../atoms';

export const TextInput: React.FunctionComponent<TextInputProps> = props => {
  return (
    <NativeTextInput
      {...props}
      selectionColor={theme.colors.text.default}
      style={[
        atoms({
          backgroundColor: 'widgetDefault',
          borderWidth: 'default',
          borderColor: 'default',
          borderRadius: 'default',
          color: 'default',
          fontFamily: 'default',
          fontSize: 'default',
          paddingHorizontal: 'default',
          paddingVertical: 'small',
          width: 'full',
        }),
        {
          height: 42,
        },
      ]}
    />
  );
};

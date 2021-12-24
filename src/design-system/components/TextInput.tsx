import React from 'react';

import {TextInput as NativeTextInput} from 'react-native';

import type {TextInputProps as NativeTextInputProps} from 'react-native';

import {theme} from '../theme';
import {atoms} from '../atoms';
import {useFieldContext} from '../components/Field';

export interface TextInputProps extends NativeTextInputProps {}

export const TextInput: React.FunctionComponent<TextInputProps> = props => {
  const context = useFieldContext();

  return (
    <NativeTextInput
      {...props}
      selectionColor={theme.colors.text.default}
      placeholderTextColor={theme.colors.text.secondary}
      style={[
        atoms({
          backgroundColor: 'widgetDefault',
          borderWidth: 'default',
          borderColor: context.appearance === 'danger' ? 'danger' : 'default',
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

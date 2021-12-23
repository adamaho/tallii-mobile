import React from 'react';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import type {PressableProps} from 'react-native';

import {Pressable} from './Pressable';
import {Row} from './Row';
import {Text} from './Text';
import {atoms} from '../atoms';

interface ButtonProps extends PressableProps {}

export const Button = React.forwardRef<any, ButtonProps>(
  ({children, style, ...props}, forwardedRef) => {
    return (
      <Pressable
        {...props}
        ref={forwardedRef}
        style={[
          atoms({
            backgroundColor: 'widgetAction',
            paddingHorizontal: 'default',
            borderRadius: 'round',
          }),
          {
            height: 42,
          },
        ]}
      >
        <Row verticalAlign="center" horizontalAlign="center" height="full">
          <Text styledAs="action">{children}</Text>
        </Row>
      </Pressable>
    );
  },
);

import React from 'react';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {Pressable} from 'react-native';
import type {PressableProps} from 'react-native';

import {Row} from './Row';
import {Text} from './Text';
import {atoms} from '../atoms';

interface ButtonProps extends PressableProps {}

export const Button = React.forwardRef<any, ButtonProps>(
  ({children, style, onPress, ...props}, forwardedRef) => {
    const handlePress = React.useCallback(
      e => {
        ReactNativeHapticFeedback.trigger('impactLight', {
          enableVibrateFallback: true,
        });
        onPress?.(e);
      },
      [onPress],
    );

    return (
      <Pressable
        {...props}
        ref={forwardedRef}
        onPress={handlePress}
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

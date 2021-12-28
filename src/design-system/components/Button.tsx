import React from 'react';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import type {PressableProps} from 'react-native';

import {Pressable} from './Pressable';
import {Box} from './Box';
import {Row} from './Row';
import {Text} from './Text';
import {atoms} from '../atoms';

/** ----------------------------------------------------------
 * ButtonIcon
 * -----------------------------------------------------------*/
const ButtonIcon: React.FunctionComponent = ({children}) => {
  return <Box>{children}</Box>;
};

/** ----------------------------------------------------------
 * ButtonText
 * -----------------------------------------------------------*/
interface ButtonTextProps {
  children: string;
}

const ButtonText: React.FunctionComponent<ButtonTextProps> = ({children}) => {
  return <Text styledAs="action">{children}</Text>;
};

/** ----------------------------------------------------------
 * ButtonRoot
 * -----------------------------------------------------------*/
interface ButtonProps extends PressableProps {}

const ButtonRoot = React.forwardRef<any, ButtonProps>(
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
          {children}
        </Row>
      </Pressable>
    );
  },
);

export const Button = {
  Root: ButtonRoot,
  Icon: ButtonIcon,
  Text: ButtonText,
};

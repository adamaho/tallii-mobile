import React from 'react';

import {Pressable} from './Pressable';
import type {PressableProps} from './Pressable';

import {Text} from './Text';
import {TextProps} from './Text';

import {Box} from './Box';
import type {BoxProps} from './Box';

import {Row} from './Row';

/** ----------------------------------------------------------
 * TextButtonIcon
 * -----------------------------------------------------------*/
export const TextButtonIcon: React.FunctionComponent<BoxProps> = ({children, ...props}) => {
  return <Box {...props}>{children}</Box>;
};

/** ----------------------------------------------------------
 * TextButtonText
 * -----------------------------------------------------------*/
export const TextButtonText: React.FunctionComponent<TextProps> = props => {
  return <Text {...props} />;
};

/** ----------------------------------------------------------
 * TextButtonRoot
 * -----------------------------------------------------------*/
export interface TextButtonProps extends PressableProps {}

export const TextButtonRoot: React.FunctionComponent<TextButtonProps> = ({children, ...props}) => {
  return (
    <Pressable {...props}>
      <Row verticalAlign="center" gap="xsmall">
        {children}
      </Row>
    </Pressable>
  );
};

export const TextButton = {
  Root: TextButtonRoot,
  Text: TextButtonText,
  Icon: TextButtonIcon,
};

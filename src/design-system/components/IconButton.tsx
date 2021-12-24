import React from 'react';

import {atoms} from '../atoms';

import {Pressable} from './Pressable';
import type {PressableProps} from './Pressable';

import type {Atoms} from '../atoms';
import {Box} from './Box';

export interface IconButtonProps extends PressableProps {
  backgroundColor?: Atoms['backgroundColor'];
}

export const IconButton: React.FunctionComponent<IconButtonProps> = ({
  backgroundColor = 'widgetAction',
  children,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      style={[
        atoms({
          backgroundColor,
          borderRadius: 'round',
        }),
        {
          height: 30,
          width: 30,
        },
      ]}
    >
      <Box flex={1} alignItems="center" justifyContent="center">
        {children}
      </Box>
    </Pressable>
  );
};

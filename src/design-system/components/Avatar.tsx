import React from 'react';

import {Text} from 'react-native';

import {Column} from './Column';
import type {ColumnProps} from './Column';

import type {Atoms} from '../atoms';

/** ----------------------------------------------------------
 * AvatarContext
 * -----------------------------------------------------------*/

/** ----------------------------------------------------------
 * AvatarRoot
 * -----------------------------------------------------------*/
export interface AvatarRootProps extends ColumnProps {
  backgroundColor?: Atoms['backgroundColor'];
  size?: 'small' | 'large';
}

const AvatarRoot = React.forwardRef<any, AvatarRootProps>(
  ({backgroundColor = 'accentOrangeDefault', children, ...props}, forwardedRef) => {
    return (
      <Column
        {...props}
        verticalAlign="center"
        horizontalAlign="center"
        backgroundColor={backgroundColor}
        borderRadius="round"
        style={{height: 80, width: 80}}
      >
        {children}
      </Column>
    );
  },
);

/** ----------------------------------------------------------
 * AvatarEmoji
 * -----------------------------------------------------------*/
export interface AvatarEmojiProps {}

const AvatarEmoji = React.forwardRef<any, AvatarEmojiProps>(
  ({children, ...props}, forwardedRef) => {
    return (
      <Text {...props} style={{fontSize: 40}}>
        {children}
      </Text>
    );
  },
);

export const Avatar = {
  Root: AvatarRoot,
  Emoji: AvatarEmoji,
};

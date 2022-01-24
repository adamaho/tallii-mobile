import React from 'react';

import {Text} from 'react-native';

import {Column} from './Column';
import type {ColumnProps} from './Column';

import {Pressable} from './Pressable';

/** ----------------------------------------------------------
 * AvatarContext
 * -----------------------------------------------------------*/
interface AvatarContextProps {
  size: 'small' | 'default' | 'large';
}

const AvatarContext = React.createContext<AvatarContextProps>({
  size: 'default',
});

const useAvatarContext = () => {
  return React.useContext(AvatarContext);
};

/** ----------------------------------------------------------
 * AvatarRoot
 * -----------------------------------------------------------*/
type AvatarRooteComponentProps = Omit<ColumnProps, 'backgroundColor'>;

export interface AvatarRootProps extends AvatarRooteComponentProps {
  backgroundColor?: string;
  size?: 'small' | 'default' | 'large';
  onPress?: () => void;
  isDisabled?: boolean;
}

const AvatarRoot = React.forwardRef<any, AvatarRootProps>(
  (
    {
      backgroundColor = 'accentOrangeDefault',
      size = 'default',
      isDisabled,
      children,
      onPress,
      ...props
    },
    forwardedRef,
  ) => {
    const sizeStyle = React.useMemo(() => {
      switch (size) {
        case 'default': {
          return {
            height: 50,
            width: 50,
          };
        }
        case 'small': {
          return {
            height: 30,
            width: 30,
          };
        }
        case 'large': {
          return {
            height: 80,
            width: 80,
          };
        }
      }
    }, [size]);

    return (
      <AvatarContext.Provider value={{size}}>
        <Pressable onPress={onPress} disabled={isDisabled}>
          <Column
            {...props}
            verticalAlign="center"
            horizontalAlign="center"
            borderRadius="round"
            ref={forwardedRef}
            style={[sizeStyle, {backgroundColor}]}
          >
            {children}
          </Column>
        </Pressable>
      </AvatarContext.Provider>
    );
  },
);

/** ----------------------------------------------------------
 * AvatarEmoji
 * -----------------------------------------------------------*/
export interface AvatarEmojiProps {}

const AvatarEmoji = React.forwardRef<any, AvatarEmojiProps>(
  ({children, ...props}, forwardedRef) => {
    const {size} = useAvatarContext();

    const sizeStyle = React.useMemo(() => {
      switch (size) {
        case 'default': {
          return {
            fontSize: 24,
          };
        }
        case 'small': {
          return {
            fontSize: 12,
          };
        }
        case 'large': {
          return {
            fontSize: 40,
          };
        }
      }
    }, [size]);

    return (
      <Text {...props} ref={forwardedRef} style={sizeStyle}>
        {children}
      </Text>
    );
  },
);

export const Avatar = {
  Root: AvatarRoot,
  Emoji: AvatarEmoji,
};

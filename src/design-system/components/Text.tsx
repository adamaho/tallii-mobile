import React from 'react';

import {Text as NativeText, TextProps as NativeTextProps} from 'react-native';

import {atoms} from '../atoms';

export interface TextProps extends NativeTextProps {
  styledAs?: 'text' | 'caption' | 'label' | 'action';
  align?: 'left' | 'center' | 'right';
}

export const Text = React.forwardRef<TextProps, any>(
  ({children, align, styledAs = 'text', ...props}, forwardedRef) => {
    const style = React.useMemo(() => {
      switch (styledAs) {
        case 'text': {
          return atoms({
            fontSize: 'default',
            color: 'default',
            fontFamily: 'default',
          });
        }
        case 'caption': {
          return atoms({
            fontSize: 'small',
            color: 'default',
            fontFamily: 'default',
          });
        }
        case 'label': {
          return atoms({
            fontSize: 'default',
            color: 'secondary',
            fontFamily: 'default',
          });
        }
        case 'action': {
          return atoms({
            fontSize: 'default',
            color: 'onAction',
            fontFamily: 'default',
          });
        }
      }
    }, [styledAs]);

    return (
      <NativeText
        {...props}
        style={[{textAlign: align, ...props.style}, style]}
        ref={forwardedRef}
      >
        {children}
      </NativeText>
    );
  },
);

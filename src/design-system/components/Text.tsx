import React from 'react';

import {Text as NativeText, TextProps as NativeTextProps} from 'react-native';

import {atoms} from '../atoms';
import type {Atoms} from '../atoms';

export interface TextProps extends NativeTextProps {
  styledAs?: 'text' | 'caption' | 'label' | 'action';
  align?: 'left' | 'center' | 'right';
  textColor?: Atoms['color'];
}

export const Text = React.forwardRef<TextProps, any>(
  ({children, align, textColor, styledAs = 'text', ...props}, forwardedRef) => {
    const style = React.useMemo(() => {
      switch (styledAs) {
        case 'text': {
          return atoms({
            fontSize: 'default',
            color: textColor ?? 'default',
            fontFamily: 'default',
          });
        }
        case 'caption': {
          return atoms({
            fontSize: 'small',
            color: textColor ?? 'default',
            fontFamily: 'default',
          });
        }
        case 'label': {
          return atoms({
            fontSize: 'default',
            color: textColor ?? 'secondary',
            fontFamily: 'default',
          });
        }
        case 'action': {
          return atoms({
            fontSize: 'default',
            color: textColor ?? 'onAction',
            fontFamily: 'default',
          });
        }
      }
    }, [styledAs, textColor]);

    return (
      <NativeText {...props} style={[{textAlign: align, ...props.style}, style]} ref={forwardedRef}>
        {children}
      </NativeText>
    );
  },
);

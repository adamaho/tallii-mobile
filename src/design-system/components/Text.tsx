import React from 'react';

import {Text as NativeText, TextProps as NativeTextProps} from 'react-native';

import {atoms} from '../atoms';

export interface TextProps extends NativeTextProps {
  styledAs: 'text' | 'caption' | 'label';
}

export const Text = React.forwardRef<TextProps, any>(
  ({children, styledAs = 'text', ...props}, forwardedRef) => {
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
            color: 'secondary',
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
      }
    }, [styledAs]);

    return (
      <NativeText {...props} style={[props.style, style]} ref={forwardedRef}>
        {children}
      </NativeText>
    );
  },
);

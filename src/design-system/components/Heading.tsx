import React from 'react';

import {Text as NativeText, TextProps} from 'react-native';

import {theme} from '../theme';

interface HeadingProps extends TextProps {
  level: '1' | '2' | '3' | '4';
}

export const Heading = React.forwardRef<HeadingProps, any>(
  ({children, level, ...props}, forwardedRef) => {
    // compute the font size based on the level
    const fontSize = React.useMemo(() => {
      switch (level) {
        case '1': {
          return 24;
        }
        case '2': {
          return 20;
        }
        case '3': {
          return 18;
        }
        case '4': {
          return 16;
        }
      }
    }, [level]);

    return (
      <NativeText
        {...props}
        style={{
          fontSize,
          color: theme.colors.text.default,
          fontFamily: 'Nunito-Black',
        }}
        ref={forwardedRef}
      >
        {children}
      </NativeText>
    );
  },
);

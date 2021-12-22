import React from 'react';

import {Text as NativeText, TextProps} from 'react-native';

import {atoms} from '../atoms';
import {theme} from '../theme';

interface HeadingProps extends TextProps {
  level?: '1' | '2' | '3' | '4';
  align?: 'left' | 'center' | 'right';
}

export const Heading = React.forwardRef<HeadingProps, any>(
  ({children, align = 'left', level = '1', ...props}, forwardedRef) => {
    // compute the font size based on the level
    const fontSize = React.useMemo(() => {
      switch (level) {
        case '0': {
          return 48;
        }
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
        style={[
          atoms({
            color: 'default',
            fontFamily: 'black',
          }),
          {
            fontSize,
            textAlign: align,
          },
        ]}
        ref={forwardedRef}
      >
        {children}
      </NativeText>
    );
  },
);

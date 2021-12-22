import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

import {Heading, Column} from '../design-system';
import {theme} from '../design-system/theme';

export const Logo: React.FunctionComponent = () => {
  return (
    <Column gap="xsmall">
      <Heading level="0">tallii</Heading>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#22D3EE', '#3B82F6']}
        style={{height: 10, borderRadius: theme.border.radius.large}}
      />
    </Column>
  );
};

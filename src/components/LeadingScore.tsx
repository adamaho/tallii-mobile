import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

import {Heading, Column} from '../design-system';
import {theme} from '../design-system/theme';

interface LeadingScoreProps {
  children: string;
}

export const LeadingScore: React.FunctionComponent<LeadingScoreProps> = ({children}) => {
  return (
    <Column gap="none">
      <Heading level="3">{children}</Heading>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#22D3EE', '#3B82F6']}
        style={{height: 4, borderRadius: theme.border.radius.large}}
      />
    </Column>
  );
};

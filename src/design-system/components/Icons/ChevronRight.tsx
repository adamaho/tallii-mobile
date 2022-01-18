import React from 'react';
import Svg, {Path} from 'react-native-svg';

import type {SvgProps} from 'react-native-svg';

import {theme} from '../../theme';

interface ChevronRightProps extends SvgProps {
  color: keyof typeof theme.colors.text;
}

const ChevronRight: React.FunctionComponent<ChevronRightProps> = ({color, ...props}) => (
  <Svg viewBox="0 0 24 24" fill="none" stroke={theme.colors.text[color]} {...props}>
    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" />
  </Svg>
);

export default ChevronRight;

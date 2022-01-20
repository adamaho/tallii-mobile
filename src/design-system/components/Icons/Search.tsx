import React from 'react';
import Svg, {Path} from 'react-native-svg';

import type {SvgProps} from 'react-native-svg';

import {theme} from '../../theme';

interface SeaerchIconProps extends SvgProps {
  color: keyof typeof theme.colors.text;
}

const Seaerch: React.FunctionComponent<SeaerchIconProps> = ({color, ...props}) => (
  <Svg viewBox="0 0 24 24" fill="none" stroke={theme.colors.text[color]} {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
    />
  </Svg>
);

export default Seaerch;

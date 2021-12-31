import React from 'react';
import Svg, {Path} from 'react-native-svg';

import type {SvgProps} from 'react-native-svg';

export interface PlusProps extends SvgProps {}

const Minus: React.FunctionComponent<PlusProps> = props => (
  <Svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <Path
      fillRule="evenodd"
      d="M3 10a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Minus;

import React from 'react';
import Svg, {Path} from 'react-native-svg';

import type {SvgProps} from 'react-native-svg';

const Times: React.FunctionComponent<SvgProps> = props => (
  <Svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <Path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Times;

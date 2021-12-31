import React from 'react';
import Svg, {Path} from 'react-native-svg';

import type {SvgProps} from 'react-native-svg';

export interface PlusProps extends SvgProps {}

const Plus: React.FunctionComponent<PlusProps> = props => (
  <Svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <Path
      fillRule="evenodd"
      d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Plus;

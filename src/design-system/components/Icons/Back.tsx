import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

import type {SvgProps} from 'react-native-svg';

export interface BackProps extends SvgProps {}

const Back: React.FunctionComponent<BackProps> = props => (
  <Svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
  </Svg>
);

export default Back;

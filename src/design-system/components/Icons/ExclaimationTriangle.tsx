import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

import {theme} from '../../theme';

interface ExclamationIconProps extends SvgProps {
  color: keyof typeof theme.colors.text;
}

const ExclamationTriangle: React.FunctionComponent<ExclamationIconProps> = ({color, ...props}) => (
  <Svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      stroke={theme.colors.text[color]}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </Svg>
);

export default ExclamationTriangle;

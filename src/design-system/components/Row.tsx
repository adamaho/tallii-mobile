import React, {Children, isValidElement} from 'react';

import flattenChildren from 'react-flatten-children';

import {Box} from './Box';
import type {BoxProps} from './Box';
import type {Atoms} from '../atoms';

type VerticalAlign = 'top' | 'center' | 'bottom';
type HorizontalAlign = 'left' | 'center' | 'right' | 'between' | 'around' | 'evenly';

/**
 * Converts a human readable vertical alignment style to flex
 */
const verticalAlignToStyle = (value?: VerticalAlign): Atoms['alignItems'] | undefined => {
  switch (value) {
    case 'top': {
      return 'flex-start';
    }
    case 'center': {
      return 'center';
    }
    case 'bottom': {
      return 'flex-end';
    }
    default: {
      return undefined;
    }
  }
};

/**
 * Converts a human readable horizontal alignment style to flex
 */
const horizontalAlignToStyle = (value?: HorizontalAlign): Atoms['justifyContent'] | undefined => {
  switch (value) {
    case 'left': {
      return 'flex-start';
    }
    case 'center': {
      return 'center';
    }
    case 'right': {
      return 'flex-end';
    }
    case 'between': {
      return 'space-between';
    }
    case 'around': {
      return 'space-around';
    }
    case 'evenly': {
      return 'space-evenly';
    }
    default: {
      return undefined;
    }
  }
};

const noPaddingStyles = new Set(['between', 'around', 'evenly']);

export interface RowProps
  extends Omit<BoxProps, 'display' | 'flexDirection' | 'alignItems' | 'justifyContent'> {
  horizontalAlign?: HorizontalAlign;
  verticalAlign?: VerticalAlign;
  gap?: Atoms['paddingTop'];
}

export const Row: React.FunctionComponent<RowProps> = ({
  horizontalAlign,
  verticalAlign = 'center',
  gap = 'default',
  children,
  ...props
}) => {
  // horizontal alignment
  const justifyContent = React.useMemo(() => {
    return horizontalAlignToStyle(horizontalAlign);
  }, [horizontalAlign]);

  // vertical alignment
  const alignItems = React.useMemo(() => {
    return verticalAlignToStyle(verticalAlign);
  }, [verticalAlign]);

  return (
    <Box {...props} flexDirection="row" alignItems={alignItems} justifyContent={justifyContent}>
      {Children.map(flattenChildren(children), (child, index) => {
        return gap && index > 0 ? (
          <Box paddingLeft={noPaddingStyles.has(horizontalAlign ?? '') ? undefined : gap}>
            {child}
          </Box>
        ) : (
          child
        );
      })}
    </Box>
  );
};

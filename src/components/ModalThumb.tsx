import React from 'react';

import {Row, Box} from '../design-system';

export const ModalThumb: React.FunctionComponent = () => {
  return (
    <Row horizontalAlign="center" padding="default">
      <Box style={{height: 4, width: 60}} borderRadius="round" backgroundColor="widgetTertiary" />
    </Row>
  );
};

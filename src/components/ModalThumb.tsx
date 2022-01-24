import React from 'react';

import {Row, Box} from '../design-system';

export const ModalThumb: React.FunctionComponent = () => {
  return (
    <Row horizontalAlign="center" paddingTop="small">
      <Box style={{height: 5, width: 40}} borderRadius="round" backgroundColor="widgetTertiary" />
    </Row>
  );
};

import React from 'react';

import {SafeAreaView, ScrollView} from 'react-native';
import {HeaderTitle} from '../components';

import {Column, Row} from '../design-system';

export const Scoreboards: React.FunctionComponent = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Column>
          <Row horizontalAlign="center">
            <HeaderTitle>scoreboards</HeaderTitle>
          </Row>
        </Column>
      </ScrollView>
    </SafeAreaView>
  );
};

import React from 'react';
import emoji from 'emoji-datasource';

import {SafeAreaView, ScrollView} from 'react-native';

import {Avatar, Column, Button, Row, Text, Heading} from '../design-system';

const parseUnicode = (utf16: string) =>
  // @ts-ignore
  String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));

export const EditAvatar: React.FunctionComponent = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Avatar.Root>
        <Avatar.Emoji>{parseUnicode(emoji[500].unified)}</Avatar.Emoji>
      </Avatar.Root>
      {/* <Row style={{ flexWrap: "wrap"}}>
        {emoji.filter((e) => e.category === "People & Body").map((e, i) => (
          <Text key={i}>{parseUnicode(e.unified)}</Text>
        ))}
      </Row> */}
    </SafeAreaView>
  );
};

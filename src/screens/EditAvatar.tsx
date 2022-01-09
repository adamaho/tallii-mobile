import React from 'react';
import emoji from 'emoji-datasource';
import chunk from 'lodash.chunk';

import {SafeAreaView, ScrollView} from 'react-native';

import {Avatar, Box, Row, Column, Heading, Button} from '../design-system';

import {Header} from '../components';

import type {Atoms} from '../design-system/atoms';

const parseUnicode = (utf16: string) => {
  // @ts-ignore
  return String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));
};

interface EditAvatarProps {
  onSave: (emoji: string, backgroundColor: string) => void;
  defaultBackgroundColor: Atoms['backgroundColor'];
  defaultEmoji: string;
}

export const EditAvatar: React.FunctionComponent<EditAvatarProps> = ({
  onSave,
  defaultBackgroundColor = 'accentOrangeSecondary',
  defaultEmoji,
}) => {
  // init the current category
  const [currentCategory, setCurrentCategory] = React.useState('Smileys & Emotion');

  // group the emojis by category
  const allEmojis = React.useMemo(() => {
    let emojis: {[key: string]: string[]} = {};

    for (const emo of emoji) {
      const uni = parseUnicode(emo.unified);
      const category = emo.category;

      if (emo.category in emojis) {
        emojis[category] = [...emojis[category], uni];
      } else {
        emojis[category] = [uni];
      }
    }
    return emojis;
  }, []);

  // get the categories
  const categories = React.useMemo(() => {
    return Object.keys(allEmojis);
  }, [allEmojis]);

  console.log(categories);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header.Root horizontalAlign="right">
        <Header.Exit />
      </Header.Root>
      <Column padding="default" gap="large">
        <Row horizontalAlign="center">
          <Avatar.Root size="large" backgroundColor={defaultBackgroundColor}>
            <Avatar.Emoji>{parseUnicode(emoji[500].unified)}</Avatar.Emoji>
          </Avatar.Root>
        </Row>
        <Box
          backgroundColor="widgetSecondary"
          borderRadius="large"
          padding="default"
          style={{height: 300}}
        >
          <ScrollView style={{height: 300}}>
            <Column gap="small" horizontalAlign="center">
              {chunk(allEmojis[currentCategory], 8).map((emoRow: string[], i) => {
                return (
                  <Row
                    key={i}
                    verticalAlign="top"
                    horizontalAlign="left"
                    gap="default"
                    style={{flexWrap: 'wrap'}}
                  >
                    {emoRow.map((emo: string, j) => {
                      return <Heading key={j}>{emo}</Heading>;
                    })}
                  </Row>
                );
              })}
            </Column>
          </ScrollView>
          <Row
            backgroundColor="widgetTertiary"
            horizontalAlign="center"
            paddingHorizontal="default"
            style={{width: '100%', height: 36}}
            borderRadius="round"
          ></Row>
        </Box>
        <Button.Root>
          <Button.Text>save</Button.Text>
        </Button.Root>
      </Column>
      {/* <Row style={{ flexWrap: "wrap"}}>
        {emoji.filter((e) => e.category === "People & Body").map((e, i) => (
          <Text key={i}>{parseUnicode(e.unified)}</Text>
        ))}
      </Row> */}
    </SafeAreaView>
  );
};

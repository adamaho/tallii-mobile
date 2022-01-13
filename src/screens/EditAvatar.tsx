import React from 'react';
import emoji from 'emoji-datasource';
import chunk from 'lodash.chunk';

import {SafeAreaView, ScrollView} from 'react-native';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types/screens';

import {Avatar, Box, Pressable, Row, Column, Heading, Button, Icon} from '../design-system';
import {theme} from '../design-system/theme';

import {Header} from '../components';

/** ----------------------------------------------------------
 * cateogories
 * -----------------------------------------------------------*/
const categories = {
  'Smileys & Emotion': Icon.EmojiSmileys,
  'Animals & Nature': Icon.EmojiAnimals,
  'Food & Drink': Icon.EmojiFood,
  Activities: Icon.EmojiActivities,
  'Travel & Places': Icon.EmojiTravel,
  Objects: Icon.EmojiObjects,
  Symbols: Icon.EmojiSymbols,
  Flags: Icon.EmojiFlags,
};

/** ----------------------------------------------------------
 * parse unicode emoji
 * -----------------------------------------------------------*/
const parseUnicode = (utf16: string) => {
  // @ts-ignore
  return String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));
};

/** ----------------------------------------------------------
 * Color Bubble
 * -----------------------------------------------------------*/
interface ColorBubbleProps {
  backgroundColor: string;
  isSelected: boolean;
  onPress: () => void;
}

const ColorBubble: React.FunctionComponent<ColorBubbleProps> = ({
  backgroundColor,
  isSelected = false,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Column
        style={{position: 'relative'}}
        verticalAlign="center"
        horizontalAlign="center"
        gap="none"
      >
        {isSelected && (
          <Box
            borderRadius="round"
            borderWidth="large"
            borderColor="secondary"
            style={{height: 36, width: 36, position: 'absolute'}}
          />
        )}
        <Box style={{height: 20, width: 20, backgroundColor}} borderRadius="round" />
      </Column>
    </Pressable>
  );
};

/** ----------------------------------------------------------
 * Edit Avatar Screen
 * -----------------------------------------------------------*/
export const EditAvatar: React.FunctionComponent = () => {
  // init the current category
  const [currentCategory, setCurrentCategory] = React.useState('Smileys & Emotion');

  // init ref to scroll view
  const scrollRef = React.useRef<ScrollView>(null);

  // init route to get the params
  const route = useRoute<RouteProp<RootStackParamList, 'EditAvatar'>>();

  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init the current backgroundColor
  const [currentBackgroundColor, setCurrentBackgroundColor] = React.useState(
    route.params.backgroundColor,
  );

  // init current emoji
  const [currentEmoji, setCurrentEmoji] = React.useState(route.params.emoji);

  // group the emojis by category
  const allEmojis = React.useMemo(() => {
    let emojis: {[key: string]: string[]} = {};

    for (const emo of emoji) {
      const uni = parseUnicode(emo.unified);
      const category = emo.category;

      if (category === 'People & Body') {
        if ('Smileys & Emotion' in emojis) {
          emojis['Smileys & Emotion'] = [...emojis['Smileys & Emotion'], uni];
        } else {
          emojis['Smileys & Emotion'] = [uni];
        }
      } else {
        if (category in emojis) {
          emojis[category] = [...emojis[category], uni];
        } else {
          emojis[category] = [uni];
        }
      }
    }
    return emojis;
  }, [emoji]);

  // when the selected category changes, scroll to top
  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
  }, [currentCategory]);

  // handle saving the backgroundColor and emoji
  const handleSave = React.useCallback(() => {
    navigation.navigate('ViewProfile', {
      backgroundColor: currentBackgroundColor,
      emoji: currentEmoji,
    });
  }, [currentBackgroundColor, currentEmoji]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header.Root horizontalAlign="right">
        <Header.Exit />
      </Header.Root>
      <Column padding="default" gap="large">
        <Row horizontalAlign="center">
          <Avatar.Root size="large" backgroundColor={currentBackgroundColor}>
            <Avatar.Emoji>{currentEmoji}</Avatar.Emoji>
          </Avatar.Root>
        </Row>
        <Row horizontalAlign="center" gap="medium">
          {Object.entries(theme.colors.background.accent).map(([key, value]) => {
            return (
              <ColorBubble
                key={key}
                backgroundColor={value.secondary}
                isSelected={currentBackgroundColor === value.secondary}
                onPress={() => setCurrentBackgroundColor(value.secondary)}
              />
            );
          })}
        </Row>
        <Column
          backgroundColor="widgetSecondary"
          borderRadius="large"
          padding="small"
          gap="small"
          style={{height: 300}}
        >
          <ScrollView style={{height: 300}} ref={scrollRef}>
            <Column gap="small" horizontalAlign="center">
              {chunk(allEmojis[currentCategory], 8).map((emoRow: string[], i) => {
                return (
                  <Row
                    key={i}
                    verticalAlign="top"
                    horizontalAlign="evenly"
                    style={{flexWrap: 'wrap'}}
                  >
                    {emoRow.map((emo: string, j) => {
                      return (
                        <Pressable key={j} onPress={() => setCurrentEmoji(emo)}>
                          <Heading padding="default">{emo}</Heading>
                        </Pressable>
                      );
                    })}
                  </Row>
                );
              })}
            </Column>
          </ScrollView>
          <Box backgroundColor="widgetTertiary" padding="xsmall" borderRadius="round" width="full">
            <Row horizontalAlign="between" verticalAlign="center" gap="none" width="full">
              {Object.entries(categories).map(([c, Icon], i) => {
                const isSelected = currentCategory === c;
                return (
                  <Pressable key={i} onPress={() => setCurrentCategory(c)}>
                    <Box
                      borderRadius="round"
                      padding="xsmall"
                      backgroundColor={isSelected ? 'widgetAction' : undefined}
                    >
                      <Icon height={26} width={26} color={isSelected ? 'onAction' : 'default'} />
                    </Box>
                  </Pressable>
                );
              })}
            </Row>
          </Box>
        </Column>
        <Button.Root onPress={handleSave}>
          <Button.Text>save</Button.Text>
        </Button.Root>
      </Column>
    </SafeAreaView>
  );
};

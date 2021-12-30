import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types/screens';

import {theme} from '../design-system/theme';
import {
  Heading,
  TextButton,
  Column,
  Row,
  Icon,
  IconButton,
  Text,
  TextButtonProps,
} from '../design-system';

import type {RowProps} from '../design-system';

/** ----------------------------------------------------------
 * Header Root
 * -----------------------------------------------------------*/
const HeaderRoot: React.FunctionComponent<RowProps> = ({children, ...props}) => {
  return (
    <Row {...props} padding="default" width="full">
      {children}
    </Row>
  );
};

/** ----------------------------------------------------------
 * Header Title
 * -----------------------------------------------------------*/
interface HeaderTitleProps {
  children: string;
}

const HeaderTitle: React.FunctionComponent<HeaderTitleProps> = ({children}) => {
  return (
    <Column gap="xsmall">
      <Heading level="3">{children}</Heading>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#22D3EE', '#3B82F6']}
        style={{height: 4, borderRadius: theme.border.radius.large}}
      />
    </Column>
  );
};

/** ----------------------------------------------------------
 * HeaderBack
 * -----------------------------------------------------------*/
interface HeaderBackProps {
  children: string;
}

const HeaderBack: React.FunctionComponent = ({children = 'back'}) => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TextButton.Root onPress={() => navigation.goBack()}>
      <TextButton.Icon>
        <Icon.Back height={20} width={20} color={theme.colors.text.default} />
      </TextButton.Icon>
      <TextButton.Text>{children}</TextButton.Text>
    </TextButton.Root>
  );
};

/** ----------------------------------------------------------
 * HeaderExit
 * -----------------------------------------------------------*/
const HeaderExit: React.FunctionComponent = () => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <IconButton onPress={() => navigation.goBack()}>
      <Icon.Times height={20} width={20} color={theme.colors.background.widget.default} />
    </IconButton>
  );
};

/** ----------------------------------------------------------
 * HeaderCancelButton
 * -----------------------------------------------------------*/
const HeaderCancel: React.FunctionComponent = () => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TextButton.Root onPress={() => navigation.goBack()}>
      <TextButton.Text>cancel</TextButton.Text>
    </TextButton.Root>
  );
};

/** ----------------------------------------------------------
 * HeaderActionButton
 * -----------------------------------------------------------*/
const HeaderAction: React.FunctionComponent<TextButtonProps> = ({children, ...props}) => {
  return (
    <TextButton.Root {...props}>
      <TextButton.Text>{children}</TextButton.Text>
    </TextButton.Root>
  );
};

export const Header = {
  Root: HeaderRoot,
  Back: HeaderBack,
  Cancel: HeaderCancel,
  Action: HeaderAction,
  Title: HeaderTitle,
  Exit: HeaderExit,
};

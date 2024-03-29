import React from 'react';

import debounce from 'lodash.debounce';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlatList, SafeAreaView, Keyboard} from 'react-native';
import {useQuery} from 'react-query';
import ContentLoader, {Rect} from 'react-content-loader/native';

import {SearchStackParamList} from '../types/screens';
import type {UserModel} from '../apiClient';
import {Header, ModalThumb} from '../components';
import {search} from '../constants';
import {
  Avatar,
  Box,
  Row,
  Column,
  TextInput,
  Heading,
  Icon,
  Text,
  Pressable,
} from '../design-system';

import {usePlatformApi} from '../hooks';

import {theme} from '../design-system/theme';
import type {Atoms} from '../design-system/atoms';

const contentStyles: Partial<Atoms> = {
  backgroundColor: 'widgetSecondary',
  borderRadius: 'large',
  padding: 'default',
};

/** ----------------------------------------------------------
 * User Search Result
 * -----------------------------------------------------------*/
interface UserSearchResultProps {
  user: UserModel;
}

const UserSearchResult: React.FunctionComponent<UserSearchResultProps> = ({user}) => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<SearchStackParamList>>();

  return (
    <Pressable
      disableHaptics
      onPress={() => navigation.navigate('ViewUserProfileScreen', {userId: user.userId})}
    >
      <Row
        horizontalAlign="between"
        paddingHorizontal="default"
        borderRadius="default"
        marginTop="xsmall"
        marginBottom="xsmall"
        padding="default"
        backgroundColor="widgetSecondary"
      >
        <Row>
          <Avatar.Root isDisabled size="small" backgroundColor={user.avatarBackground}>
            <Avatar.Emoji>{user.avatarEmoji}</Avatar.Emoji>
          </Avatar.Root>
          <Heading level="4">{user.username}</Heading>
        </Row>
        <Icon.ChevronRight width={20} height={20} color="default" />
      </Row>
    </Pressable>
  );
};

/** ----------------------------------------------------------
 * Search Screen
 * -----------------------------------------------------------*/
export const ViewSearchScreen: React.FunctionComponent = () => {
  // init state to track in the input text
  const [query, setQuery] = React.useState<string | undefined>();

  // init callback to handle setting the search term with a debounce
  const handleSetQuery = React.useCallback(
    debounce((text: string) => setQuery(text), 300),
    [],
  );

  // init api
  const api = usePlatformApi();

  // init the query
  const {
    data: results,
    isLoading,
    isError,
  } = useQuery(search(query), () => api.getSearch({query}), {enabled: !!query});

  // content of the search screen
  const content = React.useMemo(() => {
    if (isError) {
      return (
        <Column gap="small" horizontalAlign="center" {...contentStyles}>
          <Icon.ExclamationTriangle height={40} width={40} color="default" />
          <Text align="center" styledAs="caption">
            something went wrong when we were looking for your m8s
          </Text>
        </Column>
      );
    }

    if (isLoading) {
      return (
        <ContentLoader
          width={'100%'}
          height={150}
          viewBox="0 0 358 150"
          style={{paddingVertical: 16}}
          backgroundColor={theme.colors.background.widget.secondary}
          foregroundColor={theme.colors.background.widget.highlight}
        >
          <Rect x="0" y="0" rx="16" ry="16" width="100%" height="150" />
        </ContentLoader>
      );
    }

    if ((results == null && query == null) || query === '') {
      return (
        <Column horizontalAlign="center" gap="small" {...contentStyles}>
          <Heading align="center">🔎</Heading>
          <Text align="center" styledAs="caption">
            start typing to look for your m8s
          </Text>
        </Column>
      );
    }

    if (results && results.users.length === 0) {
      return (
        <Column horizontalAlign="center" gap="small" {...contentStyles}>
          <Heading level="3" align="center">
            😢
          </Heading>
          <Heading level="3" align="center">
            couldn't find that person bed.
          </Heading>
          <Text align="center" styledAs="caption">
            try searching again using a different spelling or keyword
          </Text>
        </Column>
      );
    }

    if (results) {
      return (
        <FlatList
          data={results.users}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          keyExtractor={item => item.userId.toString()}
          contentInset={{bottom: 116}}
          renderItem={({item}) => {
            return <UserSearchResult user={item} />;
          }}
        />
      );
    }
  }, [isLoading, isError, results, query]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ModalThumb />
      <Header.Root horizontalAlign="right">
        <Header.Exit />
      </Header.Root>
      <Header.Root>
        <Header.Title>search</Header.Title>
      </Header.Root>
      <Box padding="default">
        <TextInput
          placeholder="type here bud"
          onChangeText={handleSetQuery}
          autoCapitalize="none"
        />
      </Box>
      <Box paddingHorizontal="default">{content}</Box>
    </SafeAreaView>
  );
};

import React from 'react';

import {SafeAreaView, ScrollView, Pressable} from 'react-native';
import {useQuery} from 'react-query';

import debounce from 'lodash.debounce';

import {UserModel} from '../apiClient';
import {DismissKeyboard, Header} from '../components';
import {search} from '../constants';
import {Avatar, Box, Row, Column, TextInput, Heading, Icon} from '../design-system';
import {usePlatformApi} from '../hooks';

/** ----------------------------------------------------------
 * User Search Result
 * -----------------------------------------------------------*/
interface UserSearchResultProps {
  user: UserModel;
}

const UserSearchResult: React.FunctionComponent<UserSearchResultProps> = ({user}) => {
  return (
    <Pressable>
      <Row horizontalAlign="between">
        <Row>
          <Avatar.Root size="small" backgroundColor={user.avatarBackground}>
            <Avatar.Emoji>{user.avatarEmoji}</Avatar.Emoji>
          </Avatar.Root>
          <Heading level="4">{user.username}</Heading>
        </Row>
        <Icon.ChevronRight width={20} height={20} color="default" />
      </Row>
    </Pressable>
  );
};

export const SearchScreen: React.FunctionComponent = () => {
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
    // if (isError) {
    //   return (xqc

    //   )
    // }

    // if (isLoading) {
    //   return (

    //   )
    // }

    // if (results.length === 0) {
    //   return (

    //   )
    // }

    if (results) {
      return results.users.map((u, i) => {
        return <UserSearchResult key={i} user={u} />;
      });
    }
  }, [isLoading, isError, results]);

  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1}}>
        <Header.Root>
          <Header.Back />
        </Header.Root>
        <ScrollView style={{flex: 1}}>
          <Column horizontalAlign="left" padding="default">
            <Header.Title>search</Header.Title>
          </Column>
          <Box padding="default" flex={1}>
            <TextInput
              placeholder="find users"
              onChangeText={handleSetQuery}
              autoCapitalize="none"
            />
          </Box>
          <Box padding="default">
            <Column
              gap="large"
              padding="default"
              backgroundColor="widgetSecondary"
              borderRadius="large"
            >
              {content}
            </Column>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

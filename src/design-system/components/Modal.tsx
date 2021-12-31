import React from 'react';

import {Modal as NativeModal, Pressable} from 'react-native';
import type {ModalProps as NativeModalProps} from 'react-native';

import {Column} from './Column';
import {Box} from './Box';

interface ModalProps extends NativeModalProps {}

const ModalRoot: React.FunctionComponent<ModalProps> = ({children, ...props}) => {
  // init modal visiblity
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <NativeModal {...props} animationType="slide" transparent={true} visible={isVisible}>
      <Pressable onPressOut={() => setIsVisible(false)} style={{flex: 1}}>
        <Column verticalAlign="bottom" flex={1}>
          <Box
            margin="small"
            borderRadius="default"
            backgroundColor="widgetSecondary"
            padding="default"
            style={{bottom: 16}}
          >
            {children}
          </Box>
        </Column>
      </Pressable>
    </NativeModal>
  );
};

export const Modal = {
  Root: ModalRoot,
};

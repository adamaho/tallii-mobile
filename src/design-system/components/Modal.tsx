import React from 'react';

import {Modal as NativeModal, Pressable} from 'react-native';
import type {ModalProps as NativeModalProps} from 'react-native';

import {Column} from './Column';
import {Box} from './Box';
import {TextButton} from './TextButton';

/** ----------------------------------------------------------
 * ModalContext
 * -----------------------------------------------------------*/

interface ModalContextProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = React.createContext<ModalContextProps>({
  isVisible: false,
  setIsVisible: () => {
    return;
  },
});

const ModalContextProvider: React.FunctionComponent = ({children}) => {
  // init modal visiblity
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <ModalContext.Provider value={{isVisible, setIsVisible}}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return React.useContext(ModalContext);
};

/** ----------------------------------------------------------
 * ModalTextTrigger
 * -----------------------------------------------------------*/
const ModalTextTrigger: React.FunctionComponent = ({children}) => {
  // init modal state from
  const {setIsVisible} = useModalContext();

  return (
    <TextButton.Root onPress={() => setIsVisible(true)}>
      <TextButton.Text>{children}</TextButton.Text>
    </TextButton.Root>
  );
};

/** ----------------------------------------------------------
 * ModalRoot
 * -----------------------------------------------------------*/
interface ModalProps extends NativeModalProps {}

const ModalRoot: React.FunctionComponent<ModalProps> = ({children, ...props}) => {
  // init context
  const {isVisible, setIsVisible} = useModalContext();

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
  Context: ModalContextProvider,
  Root: ModalRoot,
  TextTrigger: ModalTextTrigger,
};

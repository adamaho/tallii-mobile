import React from 'react';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import type {PressableProps} from 'react-native';

import {Pressable} from './Pressable';
import {Box} from './Box';
import {Row} from './Row';
import {Text} from './Text';
import {Atoms, atoms} from '../atoms';

/** ----------------------------------------------------------
 * ButtonContext
 * -----------------------------------------------------------*/
const ButtonContext = React.createContext({
  appearance: 'primary',
});

const useButtonContext = () => {
  return React.useContext(ButtonContext);
};

/** ----------------------------------------------------------
 * ButtonIcon
 * -----------------------------------------------------------*/
const ButtonIcon: React.FunctionComponent = ({children}) => {
  return <Box>{children}</Box>;
};

/** ----------------------------------------------------------
 * ButtonText
 * -----------------------------------------------------------*/
interface ButtonTextProps {
  children: string;
}

const ButtonText: React.FunctionComponent<ButtonTextProps> = ({children}) => {
  const {appearance} = useButtonContext();

  return <Text styledAs={appearance === 'danger' ? 'text' : 'action'}>{children}</Text>;
};

/** ----------------------------------------------------------
 * ButtonRoot
 * -----------------------------------------------------------*/
interface ButtonProps extends PressableProps {
  variant?: 'primary';
  appearance?: 'default' | 'danger';
}

const ButtonRoot = React.forwardRef<any, ButtonProps>(
  ({children, style, variant = 'primary', appearance = 'default', ...props}, forwardedRef) => {
    const buttonStyles = React.useMemo(() => {
      const styles: Partial<Atoms> = {
        paddingHorizontal: 'default',
        borderRadius: 'round',
      };

      switch (variant) {
        case 'primary': {
          switch (appearance) {
            case 'default': {
              styles.backgroundColor = 'widgetAction';
              break;
            }
            case 'danger': {
              styles.backgroundColor = 'accentRedDefault';
            }
          }
        }
      }

      return atoms(styles);
    }, [variant, appearance]);

    return (
      <ButtonContext.Provider value={{appearance}}>
        <Pressable
          {...props}
          ref={forwardedRef}
          style={[
            buttonStyles,
            {
              height: 42,
            },
          ]}
        >
          <Row verticalAlign="center" horizontalAlign="center" height="full">
            {children}
          </Row>
        </Pressable>
      </ButtonContext.Provider>
    );
  },
);

export const Button = {
  Root: ButtonRoot,
  Icon: ButtonIcon,
  Text: ButtonText,
};

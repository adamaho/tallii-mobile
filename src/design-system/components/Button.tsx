import React from 'react';

import {Text} from 'react-native';
import type {PressableProps} from 'react-native';

import {Pressable} from './Pressable';
import {Box} from './Box';
import {Row} from './Row';
import {Atoms, atoms} from '../atoms';

/** ----------------------------------------------------------
 * ButtonContext
 * -----------------------------------------------------------*/
const ButtonContext = React.createContext({
  appearance: 'default',
  variant: 'primary',
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
  const {variant, appearance} = useButtonContext();

  const textStyles = React.useMemo(() => {
    const styles: Partial<Atoms> = {
      fontFamily: 'default',
      fontSize: 'default',
    };

    switch (variant) {
      case 'primary': {
        switch (appearance) {
          case 'default': {
            styles.color = 'onAction';
            break;
          }
          case 'danger': {
            styles.color = 'default';
            break;
          }
        }
        break;
      }
      case 'secondary': {
        switch (appearance) {
          case 'default': {
            styles.color = 'default';
            break;
          }
          case 'danger': {
            styles.color = 'accentRedDefault';
          }
        }
      }
    }

    return atoms(styles);
  }, [variant, appearance]);

  return <Text style={[textStyles]}>{children}</Text>;
};

/** ----------------------------------------------------------
 * ButtonRoot
 * -----------------------------------------------------------*/
interface ButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary';
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
              break;
            }
          }
          break;
        }
        case 'secondary': {
          switch (appearance) {
            case 'default': {
              styles.backgroundColor = 'widgetTertiary';
              break;
            }
            case 'danger': {
              styles.backgroundColor = 'widgetTertiary';
            }
          }
        }
      }

      return atoms(styles);
    }, [variant, appearance]);

    return (
      <ButtonContext.Provider value={{appearance, variant}}>
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

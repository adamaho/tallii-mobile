import React, {forwardRef} from 'react';

import {Animated} from 'react-native';
import type {TextProps} from 'react-native';

import {Text} from './Text';

import {Column} from './Column';
import type {ColumnProps} from './Column';

import {Atoms, atoms} from '../atoms';

/** ----------------------------------------------------------
 * Field Context
 * -----------------------------------------------------------*/
interface FieldContextProps {
  appearance?: 'danger';
}

const FieldContext = React.createContext<FieldContextProps>({});

const FieldContextProvider: React.FunctionComponent<FieldContextProps> = ({
  appearance,
  children,
}) => {
  return (
    <FieldContext.Provider value={{appearance}}>
      {children}
    </FieldContext.Provider>
  );
};

export const useFieldContext = () => {
  return React.useContext(FieldContext);
};

/** ----------------------------------------------------------
 * Field Root
 * -----------------------------------------------------------*/
interface FieldRootProps extends ColumnProps {
  appearance?: 'danger';
}

const FieldRoot = React.forwardRef<FieldRootProps, any>(
  ({appearance, children, ...props}, forwardedRef) => {
    return (
      <FieldContextProvider appearance={appearance}>
        <Column {...props} gap="small" ref={forwardedRef}>
          {children}
        </Column>
      </FieldContextProvider>
    );
  },
);

/** ----------------------------------------------------------
 * Field Label
 * -----------------------------------------------------------*/
interface FieldLabelProps extends TextProps {}

const FieldLabel = React.forwardRef<FieldLabelProps, any>(
  ({children, ...props}, forwardedRef) => {
    return (
      <Text {...props} styledAs="label" ref={forwardedRef}>
        {children}
      </Text>
    );
  },
);

/** ----------------------------------------------------------
 * Field Message
 * -----------------------------------------------------------*/
interface FieldMessageProps extends TextProps {}

const FieldMessage = React.forwardRef<FieldMessageProps, any>(
  ({children, ...props}, forwardedRef) => {
    const context = useFieldContext();

    const style = React.useMemo(() => {
      let atomStyles: Partial<Atoms> = {
        fontSize: 'small',
        color: 'default',
        fontFamily: 'default',
      };

      switch (context.appearance) {
        case 'danger': {
          atomStyles.color = 'danger';
          break;
        }
        default: {
          atomStyles.color = 'default';
          break;
        }
      }

      return atoms(atomStyles);
    }, [context]);

    const slide = React.useRef(new Animated.Value(-20)).current;
    const fade = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      if (context.appearance) {
        Animated.parallel([
          Animated.spring(slide, {
            toValue: 0,
            speed: 20,
            bounciness: 12,
            useNativeDriver: true,
          }),
          Animated.timing(fade, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(slide, {
            toValue: -20,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(fade, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [slide, fade, context]);

    return (
      <Animated.Text
        {...props}
        style={[style, {opacity: fade, transform: [{translateY: slide}]}]}
        ref={forwardedRef}
      >
        {children}
      </Animated.Text>
    );
  },
);

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Message: FieldMessage,
};

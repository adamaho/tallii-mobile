import React from 'react';

import {Animated} from 'react-native';

import {Icon} from './Icons';
import {Text} from './Text';
import {Row} from './Row';
import {Column} from '.';

/** ----------------------------------------------------------
 * ToastContext
 * -----------------------------------------------------------*/
type Toast = {
  type?: 'danger';
  label: string;
};

interface ToastContextProps {
  toast?: Toast;
  addToast: (toast: Toast) => void;
}

const ToastContext = React.createContext<ToastContextProps>({
  addToast: () => {
    return;
  },
});

export const useToastContext = () => {
  return React.useContext(ToastContext);
};

export const ToastContextProvider: React.FunctionComponent = ({children}) => {
  // init toast state
  const [toast, setToast] = React.useState<Toast | undefined>();

  // handle adding a toast
  const addToast = React.useCallback((toast: Toast) => {
    setToast(toast);
  }, []);

  return <ToastContext.Provider value={{toast, addToast}}>{children}</ToastContext.Provider>;
};

/** ----------------------------------------------------------
 * Toaster
 * -----------------------------------------------------------*/
export const Toaster: React.FunctionComponent = () => {
  // init the state
  const [isVisible, setIsVisible] = React.useState(false);

  // init the context
  const context = useToastContext();

  // init timeout ref
  const timeout = React.useRef<NodeJS.Timeout | undefined>();

  // manages when the toast is visible
  React.useEffect(() => {
    // cancel the current timer if there is one
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    // render the toast
    if (context.toast) {
      setIsVisible(true);
      timeout.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  }, [context, timeout]);

  return (
    <Column horizontalAlign="center" width="full" style={{position: 'absolute', bottom: 0}}>
      {isVisible && <Toast label={context?.toast?.label ?? ''} type={context?.toast?.type} />}
    </Column>
  );
};

/** ----------------------------------------------------------
 * Toast
 * -----------------------------------------------------------*/
interface ToastProps {
  label: string;
  type?: 'danger';
}

export const Toast: React.FunctionComponent<ToastProps> = ({type, label}) => {
  const slide = React.useRef(new Animated.Value(30)).current;
  const fade = React.useRef(new Animated.Value(0)).current;

  // render the icon based on the type
  const icon = React.useMemo(() => {
    switch (type) {
      case 'danger': {
        return <Icon.ExclamationTriangle height={20} width={20} color="default" />;
      }
      default: {
        return <Icon.ExclamationTriangle height={20} width={20} color="default" />;
      }
    }
  }, [type]);

  // when the toast renders animate it in
  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(slide, {
        toValue: -60,
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

    return () => {
      Animated.parallel([
        Animated.spring(slide, {
          toValue: 0,
          speed: 20,
          bounciness: 12,
          useNativeDriver: true,
        }),
        Animated.timing(fade, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    };
  }, []);

  return (
    <Animated.View style={{opacity: fade, transform: [{translateY: slide}]}}>
      <Row
        gap="small"
        paddingHorizontal="default"
        paddingVertical="small"
        borderRadius="round"
        backgroundColor="widgetTertiary"
      >
        {icon}
        <Text styledAs="caption">{label}</Text>
      </Row>
    </Animated.View>
  );
};

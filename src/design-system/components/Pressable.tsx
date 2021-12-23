import React from 'react';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {Animated, Pressable as NativePressable} from 'react-native';
import type {PressableProps as NativePressableProps} from 'react-native';

interface PressableProps extends NativePressableProps {}

export const Pressable = React.forwardRef<any, PressableProps>(
  ({children, ...props}, forwardedRef) => {
    // init animation ref
    const scale = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = React.useCallback(() => {
      // provide haptic feedback
      ReactNativeHapticFeedback.trigger('impactLight', {
        enableVibrateFallback: true,
      });

      // scale the button to denote a press
      Animated.timing(scale, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }, []);

    const handlePressOut = React.useCallback(() => {
      // scale the button to denote a press
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={{
          transform: [{scale}],
        }}
      >
        <NativePressable
          {...props}
          ref={forwardedRef}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          {children}
        </NativePressable>
      </Animated.View>
    );
  },
);

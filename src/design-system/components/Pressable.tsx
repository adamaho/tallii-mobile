import React from 'react';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {Animated, Pressable as NativePressable} from 'react-native';
import type {PressableProps as NativePressableProps} from 'react-native';

export interface PressableProps extends NativePressableProps {
  disableHaptics?: boolean;
  isDisabled?: boolean;
}

export const Pressable = React.forwardRef<any, PressableProps>(
  ({children, disableHaptics = false, isDisabled, ...props}, forwardedRef) => {
    // init animation ref
    const scale = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = React.useCallback(() => {
      if (isDisabled) {
        return;
      }

      // scale the button to denote a press
      Animated.timing(scale, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }, [disableHaptics, isDisabled]);

    const handlePressOut = React.useCallback(() => {
      if (isDisabled) {
        return;
      }

      // provide haptic feedback
      if (!disableHaptics) {
        ReactNativeHapticFeedback.trigger('impactLight', {
          enableVibrateFallback: true,
        });
      }

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
          disabled={isDisabled}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          {children}
        </NativePressable>
      </Animated.View>
    );
  },
);

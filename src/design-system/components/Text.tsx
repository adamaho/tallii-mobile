import React from "react";

import { Text as NativeText, TextProps } from "react-native";

export const Text = React.forwardRef<TextProps>((props, forwardedRef) => {
    return (
        <Text {...props} ref={forwardedRef} />
    );
});
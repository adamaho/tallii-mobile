import React from "react";

import { Text as NativeText, TextProps } from "react-native";

import { theme } from "../theme";

export const Text = React.forwardRef<TextProps, any>(({children, ...props}, forwardedRef) => {
    return (
        <NativeText {...props} style={{ fontSize: 16, color: theme.colors.text.default, fontFamily: "Nunito-Bold" }} ref={forwardedRef}>
            {children}
        </NativeText>
    );
});
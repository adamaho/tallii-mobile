import React from "react";

import { View, ViewProps } from "react-native";
import { Slot } from "@radix-ui/react-slot";

import { baseStyles, atoms } from "../atoms";
import type { Atoms } from "../atoms";

/** ----------------------------------------------------------
 * Determines if a prop is an atoms prop
 * -----------------------------------------------------------*/
const isAtomsProp = (key: string): key is keyof Atoms  => {
    return baseStyles.properties.hasOwnProperty(key as keyof Atoms);
}

/** ----------------------------------------------------------
 * Gets all of the atoms props and native props
 * -----------------------------------------------------------*/
const getAtomsProps = <T extends {[key: string ]: any}>(props: T) => {
    const atomStyles: { [key: string]: unknown } = {};
    const nativeProps: { [key: string]: unknown } = {};

    for (const key in props) {
        if (isAtomsProp(key)) {
            atomStyles[key] = props[key];
        } else {
            nativeProps[key] = props[key];
        }
    }

    return {
        atomStyles: atoms(atomStyles),
        nativeProps
    }
}

/** ----------------------------------------------------------
 * Box
 * -----------------------------------------------------------*/
type AtomsAndViewProps = Partial<Atoms> & ViewProps;

interface BoxProps extends AtomsAndViewProps {}

export const Box = React.forwardRef(({style, ...props}: BoxProps, forwardedRef: any) => {

    // separate the native props from the atom props
    const { nativeProps, atomStyles } = React.useMemo(() => {
        return getAtomsProps(props);
    }, [props]);

    // compute the styles
    const styles = React.useMemo(() => {
        let stylesArray = [];

        if (atomStyles) {
            stylesArray.push(atomStyles);
        }

        if (style) {
            stylesArray.push(style);
        }

        return stylesArray
    }, [atomStyles, style]);

    return (
        <View {...nativeProps} style={styles} ref={forwardedRef} />
    );
});
import React from "react";

import { View, ViewProps } from "react-native";

import type { StyleProp } from "react-native";

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
 * Primitive
 * -----------------------------------------------------------*/
type AtomsAndViewProps = Partial<Atoms> & ViewProps;

interface PrimitiveProps extends AtomsAndViewProps {}

export const Primitive = React.forwardRef(({ style, ...props}: PrimitiveProps, forwardedRef: any) => {

    const { nativeProps, atomStyles } = React.useMemo(() => {
        return getAtomsProps(props);
    }, [props]);

    const styles = React.useMemo(() => {
        const stylesArray = [atomStyles, style];

        return stylesArray
    }, [atomStyles, style]);

    return (
        <View {...nativeProps} style={styles} ref={forwardedRef} />
    );
});
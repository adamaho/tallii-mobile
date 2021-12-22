import React, { Children, isValidElement } from "react";

import flattenChildren from "react-flatten-children";

import { Box } from "./Box";
import type { BoxProps } from "./Box";
import type { Atoms } from "../atoms";

type HorizontalAlign = "left" | "center" | "right";
type VerticalAlign = "top" | "center" | "bottom" | "between" | "around" | "evenly";

/**
 * Converts a human readable horizontal alignment style to flex
 */
const horizontalAlignToStyle = (value?: HorizontalAlign): Atoms['alignItems'] | undefined => {
    switch (value) {
        case "left": {
            return "flex-start";
        }
        case "center": {
            return "center";
        }
        case "right": {
            return "flex-end";
        }
        default: {
            return undefined;
        }
    }
}

/**
 * Converts a human readable vertical alignment style to flex
 */
const verticalAlignToStyle = (value?: VerticalAlign): Atoms["justifyContent"] | undefined => {
    switch (value) {
        case "top": {
            return "flex-start";
        }
        case "center": {
            return "center";
        }
        case "bottom": {
            return "flex-end";
        }
        case "between": {
            return "space-between";
        }
        case "around": {
            return "space-around";
        }
        case "evenly": {
            return "space-evenly";
        }
        default: {
            return undefined;
        }
    }
}

interface ColumnProps extends Omit<BoxProps, "display" | "flexDirection" | "alignItems" | "justifyContent"> {
    horizontalAlign?: HorizontalAlign;
    verticalAlign?: VerticalAlign;
    gap?: Atoms['paddingTop'];
}

export const Column: React.FunctionComponent<ColumnProps> = ({ horizontalAlign, verticalAlign, gap = "default", children, ...props }) => {
    
    // vertical alignment
    const justifyContent = React.useMemo(() => {
        return verticalAlignToStyle(verticalAlign);
    }, [verticalAlign]);

    // horizontal alignment
    const alignItems = React.useMemo(() => {
        return horizontalAlignToStyle(horizontalAlign);
    }, [horizontalAlign]);

    return (
        <Box
            {...props}
            flexDirection="column"
            alignItems={alignItems}
            justifyContent={justifyContent}
        >
            {Children.map(flattenChildren(children), (child, index) => {
                return gap && index > 0 ? <Box paddingTop={gap}>{child}</Box> : child
            })}
        </Box>
    )
}
import { theme } from "./theme";

export const baseStyles = {
    properties: {
        marginTop: {
            ...theme.margin
        },
        marginBottom: {
            ...theme.margin
        },
        marginLeft: {
            ...theme.margin
        },
        marginRight: {
            ...theme.margin
        },
        margin: {
            ...theme.margin
        },
        padding: {
            ...theme.padding
        },
        paddingTop: {
            ...theme.padding
        },
        paddingBottom: {
            ...theme.padding
        },
        paddingLeft: {
            ...theme.padding
        },
        paddingRight: {
            ...theme.padding
        },
        backgroundColor: {
            brandDefault: theme.colors.background.brand.default,
            widgetDefault: theme.colors.background.widget.default,
            widgetSecondary: theme.colors.background.widget.secondary
        },
        borderRadius: {
            ...theme.border.radius
        },
        borderColor: {
            default: theme.colors.border.default,
            secondary: theme.colors.border.secondary
        },
        borderWidth: {
            ...theme.border.width
        },
        color: {
            default: theme.colors.text.default,
            secondary: theme.colors.text.secondary,
            onAction: theme.colors.text.onAction
        }
    },
}

export type Atoms = {
    margin: keyof typeof baseStyles.properties.margin,
    marginTop: keyof typeof baseStyles.properties.marginTop,
    marginBottom: keyof typeof baseStyles.properties.marginBottom,
    marginLeft: keyof typeof baseStyles.properties.marginLeft,
    marginRight: keyof typeof baseStyles.properties.marginRight,
    padding: keyof typeof baseStyles.properties.padding,
    paddingTop: keyof typeof baseStyles.properties.paddingTop,
    paddingBottom: keyof typeof baseStyles.properties.paddingBottom,
    paddingLeft: keyof typeof baseStyles.properties.paddingLeft,
    paddingRight: keyof typeof baseStyles.properties.paddingRight,
    backgroundColor: keyof typeof baseStyles.properties.backgroundColor,
    borderRadius: keyof typeof baseStyles.properties.borderRadius,
    borderColor: keyof typeof baseStyles.properties.borderColor,
    borderWidth: keyof typeof baseStyles.properties.borderWidth,
    color: keyof typeof baseStyles.properties.color 
};

type AtomKeys = keyof typeof baseStyles.properties;

export const atoms = (properties: Partial<Atoms>) => {
    let styles: {[key in AtomKeys]?: any} = {};

    for (const [key, value] of Object.entries(properties)) {

        // @ts-ignore
        styles[key as AtomKeys] = baseStyles.properties[key as any][value];
    }

    return styles;
}
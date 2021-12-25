import {theme} from './theme';

export const baseStyles = {
  properties: {
    marginTop: {
      ...theme.margin,
    },
    marginBottom: {
      ...theme.margin,
    },
    marginLeft: {
      ...theme.margin,
    },
    marginRight: {
      ...theme.margin,
    },
    margin: {
      ...theme.margin,
    },
    padding: {
      ...theme.padding,
    },
    paddingTop: {
      ...theme.padding,
    },
    paddingBottom: {
      ...theme.padding,
    },
    paddingLeft: {
      ...theme.padding,
    },
    paddingRight: {
      ...theme.padding,
    },
    paddingHorizontal: {
      ...theme.padding,
    },
    paddingVertical: {
      ...theme.padding,
    },
    flex: {
      1: 1,
    },
    flexDirection: {
      row: 'row',
      column: 'column',
    },
    display: {
      flex: 'flex',
    },
    height: {
      full: '100%',
    },
    justifyContent: {
      ['flex-start']: 'flex-start',
      ['center']: 'center',
      ['flex-end']: 'flex-end',
      ['space-between']: 'space-between',
      ['space-around']: 'space-around',
      ['space-evenly']: 'space-evenly',
    },
    alignItems: {
      ['flex-start']: 'flex-start',
      ['center']: 'center',
      ['flex-end']: 'flex-end',
      ['space-between']: 'space-between',
      ['space-around']: 'space-around',
      ['space-evenly']: 'space-evenly',
    },
    backgroundColor: {
      brandDefault: theme.colors.background.brand.default,
      widgetDefault: theme.colors.background.widget.default,
      widgetSecondary: theme.colors.background.widget.secondary,
      widgetAction: theme.colors.background.widget.action,
      accentRedDefault: theme.colors.background.accent.red.default,
      accentOrangeDefault: theme.colors.background.accent.orange.default,
    },
    borderRadius: {
      ...theme.border.radius,
    },
    borderColor: {
      default: theme.colors.border.default,
      secondary: theme.colors.border.secondary,
      danger: theme.colors.border.danger,
    },
    borderWidth: {
      ...theme.border.width,
    },
    color: {
      default: theme.colors.text.default,
      secondary: theme.colors.text.secondary,
      danger: theme.colors.text.danger,
      onAction: theme.colors.text.onAction,
      accentRedDefault: theme.colors.background.accent.red.default,
      accentOrangeDefault: theme.colors.background.accent.orange.default,
    },
    fontFamily: {
      black: 'Nunito-Black',
      default: 'Nunito-Bold',
      thin: 'Nunito-Regular',
    },
    fontSize: {
      small: 14,
      default: 16,
      medium: 18,
      large: 20,
      xlarge: 24,
      xxlarge: 44,
    },
    width: {
      full: '100%',
    },
  },
} as const;

export type Atoms = {
  alignItems: keyof typeof baseStyles.properties.alignItems;
  backgroundColor: keyof typeof baseStyles.properties.backgroundColor;
  borderRadius: keyof typeof baseStyles.properties.borderRadius;
  borderColor: keyof typeof baseStyles.properties.borderColor;
  borderWidth: keyof typeof baseStyles.properties.borderWidth;
  color: keyof typeof baseStyles.properties.color;
  display: keyof typeof baseStyles.properties.display;
  fontFamily: keyof typeof baseStyles.properties.fontFamily;
  fontSize: keyof typeof baseStyles.properties.fontSize;
  flex: keyof typeof baseStyles.properties.flex;
  flexDirection: keyof typeof baseStyles.properties.flexDirection;
  height: keyof typeof baseStyles.properties.height;
  justifyContent: keyof typeof baseStyles.properties.justifyContent;
  margin: keyof typeof baseStyles.properties.margin;
  marginTop: keyof typeof baseStyles.properties.marginTop;
  marginBottom: keyof typeof baseStyles.properties.marginBottom;
  marginLeft: keyof typeof baseStyles.properties.marginLeft;
  marginRight: keyof typeof baseStyles.properties.marginRight;
  padding: keyof typeof baseStyles.properties.padding;
  paddingHorizontal: keyof typeof baseStyles.properties.paddingHorizontal;
  paddingVertical: keyof typeof baseStyles.properties.paddingVertical;
  paddingTop: keyof typeof baseStyles.properties.paddingTop;
  paddingBottom: keyof typeof baseStyles.properties.paddingBottom;
  paddingLeft: keyof typeof baseStyles.properties.paddingLeft;
  paddingRight: keyof typeof baseStyles.properties.paddingRight;
  width: keyof typeof baseStyles.properties.width;
};

type AtomKeys = keyof typeof baseStyles.properties;

export const atoms = (properties: Partial<Atoms>) => {
  let styles: {[key in AtomKeys]?: any} = {};

  for (const [key, value] of Object.entries(properties)) {
    // @ts-ignore
    styles[key as AtomKeys] = baseStyles.properties[key as any][value];
  }

  return styles;
};

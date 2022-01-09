const spacing = {
  none: 0,
  xsmall: 4,
  small: 8,
  default: 16,
  medium: 24,
  large: 32,
  xlarge: 40,
  xxlarge: 48,
  xxxlarge: 64,
};

export const theme = {
  margin: spacing,
  padding: spacing,
  colors: {
    background: {
      brand: {
        default: '#3B82F6',
      },
      widget: {
        default: '#151515',
        secondary: '#242424',
        tertiary: '#525252',
        highlight: '#353535',
        action: '#FFFFFF',
      },
      accent: {
        red: {
          default: '#ED213A',
          secondary: '#F39393',
        },
        orange: {
          default: '#FFA44F',
          secondary: '#F6B67A',
        },
        yellow: {
          default: '#FFE55F',
          secondary: '#F9E893',
        },
        green: {
          default: '#90FC8E',
          secondary: '#C7FEC6',
        },
        blue: {
          default: '#78B6FF',
          secondary: '#AECFF7',
        },
        purple: {
          default: '#C483F8',
          secondary: '#D8B4F3',
        },
        pink: {
          default: '#FF96F4',
          secondary: '#FFCBFA',
        },
      },
    },
    border: {
      default: '#9D9D9D',
      secondary: '#3E3E3E',
      danger: '#FF8D8D',
    },
    text: {
      default: '#FFFFFF',
      secondary: '#AEAEAE',
      danger: '#FF8D8D',
      onAction: '#000000',
    },
  },
  border: {
    radius: {
      small: 4,
      default: 8,
      large: 12,
      round: 100,
    },
    width: {
      default: 1,
      medium: 2,
      large: 4,
      xlarge: 6,
    },
  },
};

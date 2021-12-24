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
        default: '#000000',
        secondary: '#242424',
        action: '#FFFFFF',
      },
      accent: {
        red: {
          default: 'red',
        },
        orange: {
          default: '#F6B67A',
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

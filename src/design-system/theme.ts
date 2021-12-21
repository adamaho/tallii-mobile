
const spacing = {
    xsmall: 4,
    small: 8,
    default: 16,
    medium: 24,
    large: 32,
    xlarge: 40,
    xxlarge: 48
};

export const theme = {
    margin: spacing,
    padding: spacing,
    colors: {
        background: {
            brand: {
                default: "#3B82F6"
            },
            widget: {
                default: "#000000",
                secondary: "#0E0E0E"
            }
        },
        border: {
            default: "#9D9D9D",
            secondary: "#3E3E3E"
        },
        text: {
            default: "#FFFFFF",
            secondary: "#AEAEAE",
            onAction: "#000000",
        }
    },
    border: {
        radius: {
            small: 4,
            default: 8,
            large: 12
        },
        width: {
            default: 1,
            medium: 2,
            large: 4,
            xlarge: 6
        }
    }
}
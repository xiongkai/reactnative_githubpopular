import Types from "../types";

export function onThemeChanged(theme) {
    return {
        type: Types.ThemeChanged,
        theme: theme,
    };
}
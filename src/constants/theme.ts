/**
 * Wandr application theme.
 * Soft lilac and blue colour palette.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Main text
    text: '#434f61',

    // Main app background - icy blue
    background: '#eaf2f7',

    // Cards and text inputs
    backgroundElement: '#eaf2f7',

    // Selected tabs / highlighted elements
    backgroundSelected: '#BFD7ED',

    // Secondary / supporting text
    textSecondary: '#667484',

    // Main buttons and accents - soft lilac
    primary: '#eae7f1',

    link: '#5786ad',

    // Secondary buttons / progress backgrounds
    primaryLight: '#BAD0E7',

    // Borders and dividers
    border: '#A9CCE3',

    // Delete / warning actions
    destructive: '#B65353',
  },

  dark: {
    // Main text
    text: '#F3F5F8',

    // Dark blue-grey background
    background: '#1D2630',

    // Cards
    backgroundElement: '#293540',

    // Selected elements
    backgroundSelected: '#46576A',

    link: '#C8BFE7',

    // Secondary text
    textSecondary: '#B9C6D2',

    // Soft lilac accent
    primary: '#c1bece',

    // Darker secondary accent
    primaryLight: '#56677A',

    // Borders
    border: '#526576',

    // Delete / warning
    destructive: '#E27D7D',
  },
} as const;

export type ThemeColor =
  keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',

    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',

    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',

    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },

  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },

  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset =
  Platform.select({
    ios: 50,
    android: 80,
  }) ?? 0;

export const MaxContentWidth = 800;
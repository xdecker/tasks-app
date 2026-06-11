import { MD3LightTheme, MD3DarkTheme, type MD3Theme } from 'react-native-paper';

const lightColors = {
  primary: '#3B82F6',
  primaryContainer: '#EFF6FF',
  secondary: '#8B5CF6',
  secondaryContainer: '#F5F3FF',
  tertiary: '#10B981',
  tertiaryContainer: '#ECFDF5',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceVariant: '#F9FAFB',
  error: '#EF4444',
  errorContainer: '#FEF2F2',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onTertiary: '#FFFFFF',
  onBackground: '#111827',
  onSurface: '#111827',
  onSurfaceVariant: '#6B7280',
  outline: '#E5E7EB',
  outlineVariant: '#F3F4F6',
  elevation: {
    ...MD3LightTheme.colors.elevation,
    level0: 'transparent',
    level1: '#FFFFFF',
    level2: '#F9FAFB',
    level3: '#F3F4F6',
  },
};

const darkColors = {
  primary: '#60A5FA',
  primaryContainer: '#1E3A5F',
  secondary: '#A78BFA',
  secondaryContainer: '#3B2F6F',
  tertiary: '#34D399',
  tertiaryContainer: '#064E3B',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceVariant: '#334155',
  error: '#F87171',
  errorContainer: '#7F1D1D',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onTertiary: '#FFFFFF',
  onBackground: '#F8FAFC',
  onSurface: '#F8FAFC',
  onSurfaceVariant: '#94A3B8',
  outline: '#334155',
  outlineVariant: '#1E293B',
  elevation: {
    ...MD3DarkTheme.colors.elevation,
    level0: 'transparent',
    level1: '#1E293B',
    level2: '#1E293B',
    level3: '#334155',
  },
};

export const LightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...lightColors,
  },
};

export const DarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkColors,
  },
};

import { useState } from 'react';
import { HalfMoon, SunLight } from 'iconoir-react';
import { Button, Tooltip, useMantineColorScheme } from '@mantine/core';

export function ToggleTheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [resolvedColorScheme, setResolvedColorScheme] = useState(
    colorScheme === 'auto'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : colorScheme
  );
  const toTheme = resolvedColorScheme === 'dark' ? 'light' : 'dark';
  return (
    <Tooltip position="bottom" label={`Switch to ${toTheme} mode`} withArrow>
      <Button
        variant="outline"
        onClick={() => {
          toggleColorScheme();
          setResolvedColorScheme(toTheme);
        }}
      >
        {resolvedColorScheme === 'dark' ? <SunLight /> : <HalfMoon />}
      </Button>
    </Tooltip>
  );
}

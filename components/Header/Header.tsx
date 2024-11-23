'use client';

import { useState } from 'react';
import { Airplane as Logo } from 'iconoir-react';
import { Button, Center, Container, Group, SegmentedControl } from '@mantine/core';
import { ToggleTheme } from '../ToggleTheme/ToggleTheme';
import classes from './Header.module.css';

type Link = {
  link: string;
  label: string;
};

const links: Link[] = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export function mapForSegmentedControl(items: Link[]) {
  return items.map(({ label, link }) => ({
    label: <Center key={label}>{label}</Center>,
    value: link,
  }));
}

export function Header() {
  const [active, setActive] = useState(links[0].link);

  return (
    <header className={classes.header}>
      <Container fluid size="md" className={classes.inner}>
        <Logo width="3vw" height="3vw" />
        <SegmentedControl
          value={active}
          onChange={setActive}
          data={mapForSegmentedControl(links)}
        />
        <Group>
          <ToggleTheme />
          <Button variant="default">Log in</Button>
          <Button
            variant="gradient"
            gradient={{
              from: 'blue',
              to: 'cyan',
              deg: 90,
            }}
          >
            Sign up
          </Button>
        </Group>
      </Container>
    </header>
  );
}

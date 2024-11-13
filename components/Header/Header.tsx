import { useState } from 'react';
import { Airplane as Logo } from 'iconoir-react';
import { Button, Center, Container, Group, SegmentedControl } from '@mantine/core';
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
    label: (
      <Center key={label} className={classes.link}>
        {label}
      </Center>
    ),
    value: link,
  }));
}

export function Header() {
  const [active, setActive] = useState(links[0].link);

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Logo width="3rem" height="3rem" />
        <SegmentedControl
          value={active}
          onChange={setActive}
          data={mapForSegmentedControl(links)}
        />
        <Group>
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

import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { Airplane as Logo } from 'iconoir-react';
import { ActionIcon, Container, Group, rem } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Logo width="3rem" height="3rem" />
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

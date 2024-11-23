import { Inter } from 'next/font/google';
import { Text } from '@mantine/core';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import classes from '@/styles/Page.module.css';
import { HeroSearch } from '../components/HeroSearch/HeroSearch';

const font = Inter({
  subsets: ['latin'],
});

export default function HomePage() {
  return (
    <div className={font.className}>
      <Header />
      <Text className={classes.text}>Let's get you seated</Text>
      <HeroSearch />
      <Footer />
    </div>
  );
}

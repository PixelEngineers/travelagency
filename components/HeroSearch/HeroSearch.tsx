'use client';

import '@mantine/dates/styles.css';

import { createRef, useEffect, useState } from 'react';
import { Airplane, DotArrowRight, MapPin, TowerCheck, User, WhiteFlag } from 'iconoir-react';
import {
  Anchor,
  Button,
  Center,
  CloseButton,
  Combobox,
  ComboboxStore,
  Flex,
  Input,
  Rating,
  Stack,
  Text,
  Title,
  useCombobox,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import classes from './HeroSearch.module.css';

import './HeroSearch.css';

import { IconPlus } from '@tabler/icons-react';

type Port = {
  name: string;
  city: string;
  country: string;
  code: string;
};

type Travel = {
  from: Port;
  to: Port;
  date: Date;
};

type PassangersData = {
  adults: number;
  children: number;
  infants: number;
};

const PASSANGER_LIMIT = 9;

export function Port({
  name,
  country,
  code,
  triggerDropDown,
}: Port & { triggerDropDown: () => void }) {
  return (
    <div className={classes.port_display} onClick={triggerDropDown}>
      <Anchor href={`https://www.google.com/maps/search/${name} ${country}`} target="_blank">
        <Title order={3}>{name}</Title>
      </Anchor>
      <Text c="dimmed">{country}</Text>
    </div>
  );
}

const ports: Port[] = [
  { name: 'New Delhi International Airport', city: 'Delhi', country: 'India', code: 'DEL' },
  {
    name: 'Los Angeles International Airport',
    city: 'Los Angeles',
    country: 'United States',
    code: 'LAX',
  },
  { name: 'Heathrow Airport', city: 'London', country: 'United Kingdom', code: 'LHR' },
  { name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', code: 'CDG' },
  { name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany', code: 'FRA' },
];

export function findPort(code: string): Port | undefined {
  return ports.find((port) => port.code === code);
}

export function max(a: number, b: number): number {
  return a > b ? a : b;
}

export function PortDisplay({ name, country, city, invalid }: Port & { invalid: boolean }) {
  return (
    <div className={classes.port_display}>
      <Anchor
        style={{
          color: invalid ? 'var(--mantine-color-red-6)' : undefined,
        }}
        underline="hover"
        href={`https://www.google.com/maps/search/${name} ${country}`}
        target="_blank"
      >
        <Title order={3}>{city}</Title>
      </Anchor>
      <Text c="dimmed">{country}</Text>
    </div>
  );
}

export function TravelPicker({
  date,
  from,
  setDate,
  setFrom,
  setTo,
  to,
}: {
  from: Port;
  setFrom: (from: Port) => void;
  to: Port;
  setTo: (to: Port) => void;
  date: Date;
  setDate: (date: Date) => void;
}) {
  const [search, setSearch] = useState('');
  const combox = useCombobox({});
  const [mode, setMode] = useState<'from' | 'to'>('from');

  const triggerDropDown = (mode: 'from' | 'to') => () => {
    setMode(mode);
    combox.toggleDropdown();
  };

  let portsToShow: Port[];
  if (search.length == 0) {
    portsToShow = ports;
  } else {
    portsToShow = ports.filter(
      ({ city, name, code, country }) =>
        city.toLowerCase().includes(search) ||
        name.toLowerCase().includes(search) ||
        code.toLowerCase().includes(search) ||
        country.toLowerCase().includes(search)
    );
  }
  const PortOptions = () => {
    return portsToShow.map(({ name, code, city, country }) => (
      <Combobox.Option
        className={classes.option}
        value={code}
        key={`${name}, ${country} (${code})`}
      >
        <Airplane />
        <Text className={classes.option_info}>
          <Text fw={700}>
            {city}({code})
          </Text>
          <Text c="dimmed">{name}</Text>
        </Text>
        <Text className={classes.country}>{country}</Text>
      </Combobox.Option>
    ));
  };
  return (
    <>
      <Flex direction="column">
        <Flex>
          <Button
            onClick={triggerDropDown('from')}
            variant="default"
            className={classes.portbutton}
          >
            From
            <PortDisplay invalid={from.code == to.code} {...from} />
          </Button>
          <Button onClick={triggerDropDown('to')} variant="default" className={classes.portbutton}>
            To
            <PortDisplay invalid={from.code == to.code} {...{ triggerDropDown }} {...to} />
          </Button>
        </Flex>
        <DateInput minDate={new Date()} />
      </Flex>
      <Combobox
        store={combox}
        onOptionSubmit={(key) => {
          setSearch('');
          if (mode === 'from') {
            setFrom(findPort(key)!);
          } else {
            setTo(findPort(key)!);
          }
          combox.toggleDropdown();
        }}
      >
        <Combobox.Target>
          <div className={classes.target}></div>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.currentTarget.value.toLowerCase());
            }}
            className={classes.search}
            placeholder="Search for a port"
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setSearch('')}
                style={{ display: search ? undefined : 'none' }}
              />
            }
          />
          <Combobox.Options>{<PortOptions />}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}

export function TravelSeperator({ invalid }: { invalid: boolean }) {
  const arrow = createRef<SVGSVGElement>();
  useEffect(() => {
    if (invalid) {
      arrow.current?.classList.remove(classes.red);
      return;
    }
    arrow.current?.classList.add(classes.red);
  }, [invalid]);
  return <DotArrowRight className={classes.dotarrowright} ref={arrow} width="4rem" height="4rem" />;
}

export function TravelPickers({
  travels,
  setTravels,
}: {
  travels: Travel[];
  setTravels: (travels: Travel[]) => void;
}) {
  const [froms, setFroms] = useState<Port[]>(travels.map(({ from }) => from));
  const [tos, setTos] = useState<Port[]>(travels.map(({ to }) => to));
  const [dates, setDates] = useState<Date[]>(travels.map(({ date }) => date));
  function combine(): Travel[] {
    const output = [];
    for (let i = 0; i < froms.length; i++) {
      output.push({ from: froms[i], to: tos[i], date: dates[i] });
    }
    return output;
  }
  function setAtIndex<T>(setArr: (array: T[]) => void, array: T[], value: T, index: number) {
    setArr(array.map((x, j) => (j == index ? value : x)));
  }
  useEffect(() => {
    setTravels(combine());
  }, [froms, tos, dates]);
  return combine().map(({ from, to, date }, i) => (
    <>
      <TravelPicker
        key={i}
        date={date}
        setDate={(date) => setAtIndex(setDates, dates, date, i)}
        from={from}
        setFrom={(from) => setAtIndex(setFroms, froms, from, i)}
        to={to}
        setTo={(to) => setAtIndex(setTos, tos, to, i)}
      />
      {i < froms.length - 1 && <TravelSeperator invalid={from.code === to.code} />}
    </>
  ));
}

export function PassangersSelect({
  setNumOfPassangers,
}: {
  setNumOfPassangers: (numOfPassangers: PassangersData) => void;
}) {
  const [adults, setAdults] = useState(1);
  const [infants, setInfants] = useState(0);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    setNumOfPassangers({
      adults,
      infants,
      children,
    });
  }, [adults, infants, children]);

  return (
    <>
      <Flex gap="md" direction="column">
        <Flex justify="space-between" className={classes.row} gap="lg">
          <Text className={classes.col} size="lg">
            Adults
          </Text>
          <Rating
            className={classes.rate}
            count={PASSANGER_LIMIT}
            value={adults}
            onChange={setAdults}
            emptySymbol={<User />}
            fullSymbol={
              <User
                style={{
                  color: 'var(--mantine-color-blue-text)',
                }}
              />
            }
          />
          <CloseButton
            className={classes.close}
            aria-label="Clear input"
            onClick={() => setAdults(1)}
            style={{ opacity: adults > 1 ? 100 : 0 }}
          />
        </Flex>
        <Flex justify="space-between" className={classes.row} gap="lg">
          <Text className={classes.col} size="lg">
            Infants
          </Text>
          <Rating
            className={classes.rate}
            count={adults}
            value={infants}
            onChange={setInfants}
            emptySymbol={<User />}
            fullSymbol={
              <User
                style={{
                  color: 'var(--mantine-color-blue-text)',
                }}
              />
            }
          />
          <CloseButton
            className={classes.close}
            aria-label="Clear input"
            onClick={() => setInfants(0)}
            style={{ opacity: infants > 0 ? 100 : 0 }}
          />
        </Flex>
        <Flex justify="space-between" className={classes.row} gap="lg">
          <Text className={classes.col} size="lg">
            Children
          </Text>
          <Rating
            className={classes.rate}
            count={PASSANGER_LIMIT - adults}
            value={children}
            onChange={setChildren}
            emptySymbol={<User />}
            fullSymbol={
              <User
                style={{
                  color: 'var(--mantine-color-blue-text)',
                }}
              />
            }
          />
          <CloseButton
            className={classes.close}
            aria-label="Clear input"
            onClick={() => setChildren(0)}
            style={{ opacity: children > 0 ? 100 : 0 }}
          />
        </Flex>
      </Flex>
    </>
  );
}

export function HeroSearch() {
  const [travels, setTravels] = useState<Travel[]>([
    {
      from: ports[0],
      to: ports[1],
      date: new Date(),
    },
  ]);
  const [numOfPassangers, setNumOfPassangers] = useState<PassangersData>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  function areValidPorts() {
    return travels.every(({ from, to }) => from.code !== to.code);
  }

  return (
    <>
      <Flex gap="lg">
        <TravelPickers {...{ travels, setTravels }} />
        <Button
          leftSection={<IconPlus />}
          variant="outline"
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            height: '5vw',
          }}
        >
          Add City
        </Button>
      </Flex>
      <Stack align="center" gap="lg">
        <PassangersSelect {...{ setNumOfPassangers }} />
        <Button
          className={classes.submit}
          disabled={!areValidPorts()}
          size="lg"
          variant="filled"
          radius="xl"
        >
          Search
        </Button>
      </Stack>
    </>
  );
}

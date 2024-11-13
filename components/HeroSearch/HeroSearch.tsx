'use client';

import '@mantine/dates/styles.css';

import { createRef, useEffect, useState } from 'react';
import {
  Airplane,
  DotArrowRight,
  HorizDistributionLeft,
  MapPin,
  User,
  WhiteFlag,
} from 'iconoir-react';
import {
  Anchor,
  Button,
  Center,
  CloseButton,
  Combobox,
  ComboboxStore,
  Flex,
  Grid,
  Input,
  Rating,
  Slider,
  Stack,
  Text,
  Title,
  useCombobox,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import classes from './HeroSearch.module.css';

import './HeroSearch.css';

type Port = {
  name: string;
  city: string;
  country: string;
  code: string;
};

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

export function PortPickers({
  fromCombox,
  fromPort,
  setFromPort,
  toCombox,
  toPort,
  setToPort,
  search,
  setSearch,
  portsToShow,
}: {
  fromCombox: ComboboxStore;
  toCombox: ComboboxStore;
  fromPort: Port;
  setFromPort: (port: Port) => void;
  toPort: Port;
  setToPort: (port: Port) => void;
  search: string;
  setSearch: (search: string) => void;
  portsToShow: Port[];
}) {
  const transitionArrow = createRef<SVGSVGElement>();
  useEffect(() => {
    if (fromPort.code !== toPort.code) {
      transitionArrow.current?.classList.remove(classes.red);
      return;
    }
    transitionArrow.current?.classList.add(classes.red);
  }, [fromPort, toPort]);
  const closeDropdown = (combox: ComboboxStore) => {
    return () => {
      combox.toggleDropdown();
    };
  };

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
    <div className={classes.fromto}>
      <Center className={classes.port}>
        <div>
          <Port triggerDropDown={closeDropdown(fromCombox)} {...fromPort} />
          <Combobox
            store={fromCombox}
            onOptionSubmit={(key) => {
              setSearch('');
              setFromPort(findPort(key)!);
              fromCombox.toggleDropdown();
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
                rightSectionPointerEvents="all"
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
        </div>
      </Center>
      <>
        <WhiteFlag width={'4rem'} height={'4rem'} />
        <DotArrowRight
          className={classes.dotarrowright}
          ref={transitionArrow}
          width={'4rem'}
          height={'4rem'}
        />
        <MapPin width={'4rem'} height={'4rem'} />
      </>
      <Center className={classes.port}>
        <div>
          <Port triggerDropDown={closeDropdown(toCombox)} {...toPort} />
          <Combobox
            store={toCombox}
            onOptionSubmit={(key) => {
              setSearch('');
              setToPort(findPort(key)!);
              toCombox.toggleDropdown();
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
        </div>
      </Center>
    </div>
  );
}

type PassangersData = {
  adults: number;
  children: number;
  infants: number;
};

const PASSANGER_LIMIT = 9;

export function PassangersSelect({
  numOfPassangers,
  setNumOfPassangers,
}: {
  numOfPassangers: PassangersData;
  setNumOfPassangers: (numOfPassangers: PassangersData) => void;
}) {
  const [adults, setAdults] = useState(0);
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
            onClick={() => setAdults(0)}
            style={{ opacity: adults > 0 ? 100 : 0 }}
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
  const [fromPort, setFromPort] = useState<Port>(ports[0]);
  const [toPort, setToPort] = useState<Port>(ports[1]);
  const [date, setDate] = useState<Date>(new Date());
  const [search, setSearch] = useState<string>('');
  const [numOfPassangers, setNumOfPassangers] = useState<PassangersData>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const fromCombox = useCombobox({});
  const toCombox = useCombobox({});

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
  return (
    <>
      <PortPickers
        {...{
          fromCombox,
          fromPort,
          setFromPort,
          toCombox,
          toPort,
          setToPort,
          search,
          setSearch,
          portsToShow,
        }}
      />
      <Stack align="center" gap="lg">
        <DatePicker
          onDateChange={(date) => setDate(date)}
          minDate={new Date()}
          defaultValue={new Date()}
          size="lg"
        />
        <PassangersSelect {...{ numOfPassangers, setNumOfPassangers }} />
        <Button
          className={classes.submit}
          disabled={fromPort.code === toPort.code}
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

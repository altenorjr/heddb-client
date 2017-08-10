import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Theme from '../components/Theme';
import Band from '../components/Band';
import Bands from '../components/Bands';
import BrazilianBlues from '../components/BrazilianBlues';
import Event from '../components/Event';
import Events from '../components/Events';
import Calendar, { CalendarConnected } from '../components/Calendar';
import MasterPage from '../components/MasterPage';

import { bands, states, events, months, cities } from '../data';

import setup from '../setup';

setup();

const lookDecorator = (story) => (
  <MuiThemeProvider>
    {story()}
  </MuiThemeProvider>
);

const MasterPageDecorator = (story) => (
  <MasterPage>
    {lookDecorator(story)}
  </MasterPage>
)

const agenda = storiesOf('Agenda').addDecorator(MasterPageDecorator);

agenda.add('Geral', () => <CalendarConnected />);

cities.forEach(city => {
  months.forEach(month => {
    agenda.add(`${city.text} - ${month.text}`, () => <CalendarConnected selectedMonth={month.value} selectedCity={city.value} />)
  })
  // agenda.add(``)
});

// .add('Geral', () => <CalendarWrapped />)

// storiesOf('Master Page', module)
//   .addDecorator(lookDecorator)
//   .add('View', () => <MasterPage><Calendar months={months} cities={cities} /></MasterPage>)

storiesOf('Banda', module)
  .addDecorator(lookDecorator)
  .add('View', () => <Band width="80vw" band={bands[0]} />);

storiesOf('Bandas', module)
  .addDecorator(lookDecorator)
  .add('View', () => <Bands bands={bands} />);

storiesOf('Blueseiros Brasileiros', module)
  .addDecorator(lookDecorator)
  .add('View', () => <BrazilianBlues states={states} />);

storiesOf('Evento', module)
  .addDecorator(lookDecorator)
  .add('View', () => <Event event={events[0]} />)
  .add('Without fromNow', () => <Event event={events[0]} showMonth={false} fromNow={false} />)
  .add('Show Month', () => <Event event={events[0]} showMonth={true} />)
  .add('Show Month & Without fromNow', () => <Event event={events[0]} showMonth={true} fromNow={false} />);

storiesOf('Eventos', module)
  .addDecorator(lookDecorator)
  .add('View', () => <Events events={events} />)
  .add('Without fromNow', () => <Events showMonth={false} fromNow={false} events={events} />)
  .add('Show Month', () => <Events showMonth={true} fromNow={true} events={events} />)
  .add('Show Month && Without fromNow', () => <Events showMonth={true} fromNow={false} events={events} />)

// const styles = StyleSheet.create({
//   outerContainer: {
//     // width: '100%',
//     // minHeight: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });
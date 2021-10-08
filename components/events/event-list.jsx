import React from 'react';
import EventItem from './event-item';

import classes from './event-list.module.css'

const EventList = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          image={event.image}
          location={event.location}
        />
      ))}
    </ul>
  );
};

export default EventList;

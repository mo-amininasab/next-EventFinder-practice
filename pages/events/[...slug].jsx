import React, { Fragment } from 'react';
import Head from 'next/head';
import { getFilteredEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';

const FilteredEventsPage = ({ hasError, events }) => {
  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="Error occurred" />
    </Head>
  );

  if (hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <p>Invalid filter, Please adjust your values!</p>
      </Fragment>
    );
  }

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="WTF" />
    </Head>
  );

  if (!events || events.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <p>No events found for the chosen filter!</p>
      </Fragment>
    );
  }

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="All events for month/year" />
    </Head>
  );

  return (
    <div>
      {pageHeadData}
      <EventList items={events} />
    </div>
  );
};

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const filteredData = params.slug;

  const year = +filteredData[0];
  const month = +filteredData[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return {
      props: { hadError: true },
      // notFound: true,    // Alternative way
      // redirect: { destination: '/error' },   // Alternative way
    };
  }

  const filteredEvents = await getFilteredEvents({ year, month });

  return {
    props: {
      events: filteredEvents,
    },
  };
}

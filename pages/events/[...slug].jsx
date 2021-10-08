import React from 'react';
import { getFilteredEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';

const FilteredEventsPage = ({ hasError, events }) => {
  // const router = useRouter();

  // const filteredData = router.query.slug;

  // if (!filteredData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const year = +filteredData[0];
  // const month = +filteredData[1];

  if (hasError) {
    return <p>Invalid filter, Please adjust your values!</p>;
  }

  // const filteredEvents = getFilteredEvents({ year, month });

  if (!events || events.length === 0) {
    return <p>No events found for the chosen filter!</p>;
  }

  return (
    <div>
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

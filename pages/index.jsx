import React from 'react';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../dummy-data';
import Layout from '../components/layout/layout'

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();
  
  return (
    <div>
      <Layout>
      <EventList items={featuredEvents}/>

      </Layout>
    </div>
  )
}

export default HomePage

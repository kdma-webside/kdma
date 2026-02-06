import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Heritage from "@/components/Heritage";
import Stats from "@/components/Stats";
import Events, { defaultEventsData } from "@/components/Events";
import Footer from "@/components/Footer";
import { getContent } from "@/app/actions/content";
import { getEvents } from "@/app/actions/events";

export default async function Home() {
  console.log('[Home] Starting data fetch...');
  const [heroContent, events] = await Promise.all([
    getContent('Hero'),
    getEvents()
  ]);
  console.log('[Home] Data fetch complete', { heroContentLength: heroContent.length, eventsLength: events.length });

  const heroData = heroContent.reduce((acc: Record<string, string>, curr: any) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  const now = new Date();
  const sortedEvents = [...events].sort((a: any, b: any) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  const upcomingEvents = sortedEvents.filter((e: any) => new Date(e.eventDate) >= now);

  // Use the nearest upcoming event from DB, or fallback to the first item from defaultEventsData
  const nearestEvent = upcomingEvents[0] || defaultEventsData[0];

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      <Hero
        headline={heroData['hero.headline']}
        subheadline={heroData['hero.subheadline']}
        upcomingEvent={nearestEvent}
      />
      <Benefits />
      <Heritage />
      <Stats />
      <Events initialEvents={sortedEvents} />
      <Footer />
    </main>
  );
}

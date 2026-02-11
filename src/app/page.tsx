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

      {/* SEO-optimized content section */}
      <section className="bg-black border-t border-white/5 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">
              Mallakhamb Training in Kanyakumari | Traditional Indian Sport & Martial Arts
            </h2>
            <div className="text-neutral-400 space-y-4 text-sm leading-relaxed">
              <p>
                <strong className="text-white">KDMA (Kanyakumari District Mallakhamb Association)</strong> is the official association for <strong className="text-orange-500">Mallakhamb in Kanyakumari</strong>, Tamil Nadu. We offer professional training in this ancient Indian sport that combines elements of gymnastics, yoga, and martial arts on a vertical wooden pole or rope.
              </p>
              <p>
                Mallakhamb (also spelled Mallakhambam or Malkhamb) is a traditional Indian sport that originated in the 12th century. Our academy in <strong className="text-orange-500">Kanyakumari district</strong> provides comprehensive training programs for beginners to advanced practitioners, focusing on strength, flexibility, balance, and mental discipline.
              </p>
              <p>
                We organize regular <strong className="text-white">Mallakhamb competitions</strong>, workshops, and <strong className="text-white">sporting events in Tamil Nadu</strong>. Our training covers pole Mallakhamb, rope Mallakhamb, and hanging Mallakhamb techniques. Join us to learn this UNESCO-recognized traditional sport and become part of India's rich martial arts heritage.
              </p>
              <p className="text-xs text-neutral-600">
                <strong>Keywords:</strong> Mallakhamb Kanyakumari, Mallakhamb training Tamil Nadu, pole gymnastics India, traditional Indian sports, martial arts Kanyakumari, yoga pole, gymnastics training, sports academy Kanyakumari, KDMA, Mallakhamb classes, Indian sports federation, traditional sports Tamil Nadu
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

"use client";

import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';

const groups = [
  {
    id: 'digital-products', title: 'Digital products', description: 'From the first idea to the everyday experience.',
    image: '/images/services/web_dev.jpg', alt: 'Website development and digital product design',
    services: [
      { title: 'Website development', description: 'Fast, accessible websites that introduce your business and make the next step simple.', includes: ['Business websites & storefronts', 'Content management', 'Performance & accessibility'] },
      { title: 'Mobile app development', description: 'Useful, intuitive apps built around your customers and the way they work.', includes: ['iOS & Android applications', 'API integration', 'Offline experiences'] },
      { title: 'Low-code & automation', description: 'Launch an idea quickly or connect the tools your team already uses.', includes: ['MVP development', 'Webflow & low-code tools', 'Workflow automation'] },
    ],
  },
  {
    id: 'engineering', title: 'Engineering & expertise', description: 'The systems, people, and direction to move forward.',
    image: '/strategy-meets-craft-vibrant.jpg', alt: 'Digital product creators collaborating on software architecture and design',
    services: [
      { title: 'Custom software development', description: 'Purpose-built software for your operations, customers, and next stage of growth.', includes: ['Business platforms', 'APIs & integrations', 'Testing & maintenance'] },
      { title: 'IT consulting', description: 'Make informed technology decisions with a clear assessment and practical roadmap.', includes: ['Architecture reviews', 'Technology roadmaps', 'Modernization planning'] },
      { title: 'Engineering teams', description: 'Extend your team with engineers who fit your workflow and delivery goals.', includes: ['Dedicated developers', 'Flexible team support', 'Delivery collaboration'] },
    ],
  },
  {
    id: 'connected-systems', title: 'Cloud, AI & connected systems', description: 'Turn infrastructure and data into useful capabilities.',
    image: '/images/case-studies/cloud.png', alt: 'Illustrative cloud infrastructure dashboard',
    services: [
      { title: 'Cloud infrastructure', description: 'Build a reliable foundation for your applications and simplify day-to-day operations.', includes: ['Cloud migration', 'Infrastructure automation', 'Monitoring & DevOps'] },
      { title: 'AI-powered software', description: 'Bring useful intelligence into your products and internal workflows.', includes: ['AI assistants', 'Knowledge search', 'Data-driven workflows'] },
      { title: 'IoT & connected devices', description: 'Connect devices, collect operational data, and make it easier to act on what matters.', includes: ['Device integration', 'Real-time dashboards', 'Data pipelines'] },
    ],
  },
];

export function ServicesDirectory({ onContact }: { onContact: () => void }) {
  return (
    <div className="w-full px-5 pb-12 pt-28 text-[#121D50] sm:px-8 sm:pt-32 lg:px-12 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#1F45E4] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[#1F45E4]">
      <header className="grid items-center gap-8 border-b border-[#EDF0F3] pb-10 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <p className="mb-3 text-sm font-medium text-[#0E33CB]">Our services</p>
          <h1 className="text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">Technology built around your business.</h1>
          <p className="mt-5 max-w-lg text-sm leading-7 sm:text-base">Design, development, and engineering support for your next product or a better way of working. Find the expertise you need, from planning to launch.</p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <button type="button" onClick={onContact} className="inline-flex cursor-pointer items-center gap-3 rounded-lg bg-[#EC4621] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0E33CB]">Discuss your project <ArrowUpRight size={17} aria-hidden="true" /></button>
            <a href="#service-directory" className="inline-flex items-center gap-2 text-sm font-medium">Explore services <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#EDF0F3]">
          <Image src="/full_screen_it_team_bg.jpg" alt="Team working together in a technology office" fill sizes="(max-width: 1023px) 90vw, 48vw" className="object-cover" priority />
        </div>
      </header>
      <nav aria-label="Service categories" className="flex flex-wrap gap-3 border-b border-[#EDF0F3] py-5">
        {groups.map(group => <a key={group.id} href={`#${group.id}`} className="rounded-full border border-[#EDF0F3] px-4 py-2 text-xs font-medium hover:border-[#1F45E4] hover:text-[#0E33CB]">{group.title}</a>)}
      </nav>
      <div id="service-directory" className="scroll-mt-28">
        {groups.map(group => (
          <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="grid scroll-mt-28 gap-7 border-b border-[#EDF0F3] py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-12">
            <div>
              <h2 id={`${group.id}-title`} className="text-2xl font-semibold tracking-tight sm:text-3xl">{group.title}</h2>
              <p className="mb-5 mt-2 text-sm leading-relaxed">{group.description}</p>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#EDF0F3]">
                <Image src={group.image} alt={group.alt} fill sizes="(max-width: 1023px) 90vw, 43vw" className="object-cover" />
              </div>
            </div>
            <div className="divide-y divide-[#EDF0F3]">
              {group.services.map(service => (
                <article key={service.title} className="py-6 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold tracking-tight text-[#0E33CB] sm:text-xl">{service.title}</h3>
                    <button type="button" onClick={onContact} aria-label={`Discuss ${service.title}`} className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#EDF0F3] text-[#EC4621] hover:bg-[#EDF0F3]"><ArrowUpRight size={18} aria-hidden="true" /></button>
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-6">{service.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {service.includes.map(item => <li key={item} className="flex items-center gap-2 text-xs leading-5"><Check size={13} className="shrink-0 text-[#0E33CB]" aria-hidden="true" />{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <section aria-labelledby="delivery-heading" className="py-10 lg:py-14">
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <h2 id="delivery-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">From idea to delivery</h2>
          <p className="max-w-md text-sm leading-6">A clear scope, regular feedback, and a shared view of what comes next.</p>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Understand', 'We discuss your goals, users, existing systems, and constraints to define the problem worth solving.'],
            ['Plan & design', 'We agree on priorities and shape the experience, technical approach, and delivery milestones.'],
            ['Build & review', 'We develop in manageable stages, share working progress, and use your feedback to refine the product.'],
            ['Launch & hand over', 'We test, prepare the release, and walk your team through the product and its ongoing needs.'],
          ].map(([title, description], index) => <li key={title} className="border-t-2 border-[#EDF0F3] pt-5"><span className="text-sm font-semibold text-[#EC4621]">0{index + 1}</span><h3 className="mb-2 mt-4 text-lg font-semibold">{title}</h3><p className="text-sm leading-6">{description}</p></li>)}
        </ol>
      </section>
      <section aria-labelledby="engagement-heading" className="rounded-2xl bg-[#121D50] p-6 text-white sm:p-8 lg:p-10">
        <h2 id="engagement-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Work with us your way</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#EDF0F3]">Choose a starting point that fits your project. We will agree on the scope and working arrangement together.</p>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {[
            ['A defined project', 'For a website, application, or system with a clear goal.', 'An agreed scope, delivery milestones, and a focused build.'],
            ['An extension of your team', 'For teams that need additional engineering capacity.', 'Developers working alongside your people and existing processes.'],
            ['Ongoing improvements', 'For products that need to keep moving after launch.', 'Prioritized enhancements, maintenance, and support tailored to your needs.'],
          ].map(([title, fit, detail]) => <article key={title} className="border-t border-[#1F45E4] pt-5"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6">{fit}</p><p className="mt-2 text-sm leading-6 text-[#EDF0F3]">{detail}</p><button type="button" onClick={onContact} className="mt-5 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold underline decoration-[#EC4621] underline-offset-8 hover:decoration-white">Talk through your needs <ArrowUpRight size={16} aria-hidden="true" /></button></article>)}
        </div>
      </section>
      <section aria-labelledby="service-faq-heading" className="grid gap-7 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-14">
        <div>
          <h2 id="service-faq-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Before we get started</h2>
          <p className="mt-3 max-w-sm text-sm leading-6">A few practical answers to help you plan your next step.</p>
        </div>
        <div className="divide-y divide-[#EDF0F3] border-y border-[#EDF0F3]">
          {[
            ['Can you help us choose the right service?', 'Yes. Tell us what you want to achieve and where you are today. We can help identify the right starting point, whether that is a discovery discussion, a focused build, or support for your existing team.'],
            ['Can you work with our existing software?', 'We can review your current code, architecture, and integrations before proposing changes. That review helps us understand what can be retained and what needs attention.'],
            ['How are cost and timelines decided?', 'They depend on scope, complexity, integrations, and the availability of content and feedback. We discuss these inputs first and agree on an estimate and milestones before starting the build.'],
            ['What should we prepare for the first conversation?', 'Bring your goals, any existing website or software, the main challenges you face, and any budget or timing constraints. A detailed specification is helpful, but you do not need one to start.'],
            ['What happens after launch?', 'We discuss handover, documentation, and any ongoing maintenance or support you need. The responsibilities and support scope are agreed as part of the engagement.'],
          ].map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F45E4] [&::-webkit-details-marker]:hidden">{question}<span aria-hidden="true" className="text-xl font-normal text-[#EC4621] group-open:hidden">+</span><span aria-hidden="true" className="hidden text-xl font-normal text-[#EC4621] group-open:inline">&minus;</span></summary><p className="mt-3 max-w-2xl pr-6 text-sm leading-7">{answer}</p></details>)}
        </div>
      </section>
    </div>
  );
}

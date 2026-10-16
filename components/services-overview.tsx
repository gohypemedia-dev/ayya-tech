'use client';

import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { THREE_SECTIONS } from '@/components/agency-services-section';

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EE461F]';

export function ServicesOverview({ onContact }: { onContact: () => void }) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#F1F4FA] px-6 pb-14 pt-36 sm:pb-20 sm:pt-44">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/3 border-l border-[#121A50]/5 bg-white/40" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-[#121A50]/70">
              <span className="h-0.5 w-8 bg-[#EE461F]" /> Our services
            </p>
            <h1 className="max-w-xl text-[clamp(2.6rem,4.8vw,4.5rem)] font-extrabold leading-[1.06] tracking-[-0.055em]">
              Great ideas.<br />Expertly engineered.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              From your first product to the systems behind your business. We design, build, and evolve the technology that takes you forward.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button onClick={onContact} className={`inline-flex items-center gap-3 rounded-full bg-[#EE461F] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#CE3714] ${focus}`}>
                Discuss your project <ArrowUpRight size={18} />
              </button>
              <a href="#service-directory" className={`inline-flex items-center gap-2 py-3 text-sm font-bold ${focus}`}>
                Explore services <ArrowDown size={16} />
              </a>
            </div>
          </div>

          <nav aria-label="Service categories" className="relative rounded-3xl bg-[#121A50] p-6 text-white shadow-[0_24px_60px_-30px_rgba(18,26,80,0.5)] sm:p-8">
            <div className="mb-6 flex items-center justify-between border-b border-white/15 pb-5">
              <span className="text-lg font-semibold">Your next move starts here.</span>
              <ArrowDown className="shrink-0 text-[#FF916E]" size={20} />
            </div>
            {THREE_SECTIONS.map((group) => {
              const Icon = group.icon;
              return (
                <a key={group.id} href={`#${group.id}`} className={`group flex items-center gap-4 rounded-xl px-2 py-5 transition-colors hover:bg-white/5 ${focus}`}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 text-[#FF916E]"><Icon className="h-[22px] w-[22px]" /></span>
                  <span className="flex-1">
                    <span className="block text-base font-semibold">{group.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-300">{group.services.map(service => service.title.replace(' Development', '')).join(' · ')}</span>
                  </span>
                  <ArrowUpRight size={18} className="shrink-0 text-white/50 transition-colors group-hover:text-white" />
                </a>
              );
            })}
            <p className="mt-5 border-t border-white/15 pt-5 text-xs text-slate-300">Strategy, engineering, and delivery. One technology partner.</p>
          </nav>
        </div>
      </section>

      <div id="service-directory" className="mx-auto max-w-6xl scroll-mt-28 px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#121A50]/10 py-7 text-sm">
          <p className="font-semibold">Expertise across your entire technology stack</p>
          <p className="text-slate-500">Web & mobile / Software & talent / Cloud & AI</p>
        </div>
        {THREE_SECTIONS.map((group) => {
          const Icon = group.icon;
          return (
            <section key={group.id} id={group.id} className="grid scroll-mt-28 gap-8 border-b border-[#121A50]/10 py-14 sm:py-20 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
              <div>
                <Icon className="mb-5 h-[30px] w-[30px] text-[#EE461F]" />
                <h2 className="max-w-sm text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{group.title}</h2>
                <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">{group.description}</p>
                <button onClick={onContact} className={`mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#D63B15] hover:text-[#121A50] ${focus}`}>
                  Let’s talk about your project <ArrowRight size={16} />
                </button>
              </div>
              <div className="divide-y divide-[#121A50]/10">
                {group.services.map((service) => {
                  const ServiceIcon = service.icon;
                  return (
                    <article key={service.id} className="group py-6 first:pt-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <ServiceIcon className="mt-1 h-5 w-5 shrink-0 text-[#121A50]/60" />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-bold sm:text-xl">{service.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                            {service.tags.map(tag => <li key={tag} className="flex items-center gap-1.5 text-xs text-slate-500"><Check size={12} className="text-[#D63B15]" />{tag}</li>)}
                          </ul>
                        </div>
                        <button onClick={onContact} aria-label={`Discuss ${service.title}`} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#121A50]/15 transition-colors hover:border-[#EE461F] hover:bg-[#EE461F] hover:text-white ${focus}`}><ArrowUpRight size={17} /></button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-[#F1F4FA] p-7 sm:p-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What are you building next?</h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600">Bring us the challenge. We’ll help you find the right technology and a clear path to delivery.</p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-4">
            <button onClick={onContact} className={`inline-flex items-center gap-3 rounded-full bg-[#121A50] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#EE461F] ${focus}`}>Start a conversation <ArrowUpRight size={18} /></button>
            <Link href="/case-studies" className={`inline-flex items-center gap-2 text-sm font-semibold ${focus}`}>Explore our case studies <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

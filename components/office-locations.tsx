'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import styles from './contact-tools.module.css';
import map from '@/lib/uk-office-map.json';

const offices = [
  { name: 'UK', id: '826', query: 'Gatcombe House, Copnor Road, Hilsea, Portsmouth PO3 5EJ, UK' },
];

export function OfficeLocations() {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const office = offices[selected];

  useEffect(() => {
    if (offices.length < 2 || hovered || focused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setSelected(current => (current + 1) % offices.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [hovered, focused, selected]);

  function selectOffice(index: number) {
    setSelected(index);
  }
  return <div className={styles.offices} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className={styles.officeMap}>
      <svg viewBox="0 0 600 420" aria-hidden="true">
        {/* Natural Earth map units preserve the borders of the four UK countries. */}
        {map.countries.map(country => <path key={country.name} d={country.path} className={country.id === office.id ? styles.selectedCountry : styles.country}><title>{country.name}</title></path>)}
      </svg>
      {offices.map((item, index) => <button key={item.name} type="button" className={styles.mapMarker} style={{ left: `${map.markers[index][0] / 6}%`, top: `${map.markers[index][1] / 4.2}%` }} aria-pressed={selected === index} aria-label={`Show ${item.name} location details`} onClick={() => selectOffice(index)}><span className={styles.markerDot} /></button>)}
      <div className={styles.mapAddress} style={{ '--marker-x': `${map.markers[0][0] / 6}%`, '--marker-y': `${map.markers[0][1] / 4.2}%` } as React.CSSProperties}>
        <h4>Portsmouth, UK</h4>
        <address>F10B, Gatcombe House<br />Copnor Road, Hilsea<br />Portsmouth, PO3 5EJ, UK</address>
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.query)}`} target="_blank" rel="noopener noreferrer">Open in Google Maps <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </div>

  </div>;
}

export function OfficeAddresses() {
  return (
    <div className={styles.officeAddresses} aria-label="Office addresses">
      {offices.map((location, index) => <div key={location.id} className={styles.locationDetails}>
        <span className={styles.addressIcon}><MapPin size={20} aria-hidden="true" /></span>
        <div><div className={styles.officeAddressHeading}><h4>{index === 0 ? 'UK office' : `${location.name} office`}</h4><a className={styles.mapLink} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.query)}`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${location.name} in Google Maps`}><ArrowUpRight size={20} /></a></div>
          {index === 0 ? <address>F10B, Gatcombe House, Copnor Road, Hilsea<br />Portsmouth, PO3 5EJ, UK</address> : <address>{location.query}</address>}
        </div>
      </div>)}
    </div>
  );
}

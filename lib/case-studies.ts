import { defaultSlidesData, type StorySlide } from './story-slides';

const artwork = ['payments', 'cloud', 'ai', 'commerce', 'booking', 'operations'];
const headings = ['Payment platforms', 'Cloud foundations', 'Intelligent systems', 'Connected commerce', 'Appointments made simple', 'A connected team workspace'];
const categories = ['Enterprise software', 'Infrastructure & migration', 'AI & real-time insights', 'Website & e-commerce development', 'Booking website · Concept', 'Business software · Concept'];
const projects: StorySlide[] = [
  ...defaultSlidesData,
  {
    tag: 'booking-concept', category: 'Website development',
    title: 'Forma: a wellness website and appointment booking concept',
    description: 'A welcoming service website with treatment discovery, a clear appointment calendar, and a simple path from choosing a service to booking a visit.',
    metrics: 'Service discovery and appointment scheduling',
    impact: 'Concept approach: bring services, availability, and booking into one flow so visitors can plan a visit without switching between tools.',
    stack: ['Service pages', 'Booking calendar', 'Time selection', 'Responsive design'],
    image: '/images/case-studies/booking-concept.png',
  },
  {
    tag: 'operations-concept', category: 'Software development',
    title: 'Orbit: a project planning and team operations concept',
    description: 'A shared workspace for planning projects, assigning tasks, and understanding team capacity, with a clear project board and workload overview.',
    metrics: 'Project planning and team visibility',
    impact: 'Concept approach: connect task ownership, project status, and capacity in one workspace to help teams coordinate their next steps.',
    stack: ['Project boards', 'Task ownership', 'Team workload', 'Reporting'],
    image: '/images/case-studies/operations-concept.png',
  },
];


export const caseStudies = projects.map((project, index) => ({ ...project, slug: artwork[index], heading: headings[index], service: categories[index], concept: !project.metricValue }));

export const caseStudyNarratives: Record<string, { challenge: string; approach: string[] }> = {
  payments: {
    challenge: 'Payment systems need to stay responsive while transaction volumes grow. The core challenge was supporting high throughput and dependable availability across global banking endpoints.',
    approach: ['Re-architect distributed microservices around transaction processing.', 'Use event streaming and caching to support high-volume workloads.', 'Support global banking integrations with a focus on latency and availability.'],
  },
  cloud: {
    challenge: 'Moving a live platform between cloud environments requires careful coordination of data, deployments, and service availability across regions.',
    approach: ['Automate infrastructure provisioning with reusable configuration.', 'Coordinate multi-region database replication for continuity.', 'Use containerized deployments to support consistent delivery across environments.'],
  },
  ai: {
    challenge: 'Fraud detection must identify suspicious activity while events are still relevant. The challenge was combining high-volume streaming with low-latency machine learning decisions.',
    approach: ['Process incoming events through a real-time streaming pipeline.', 'Apply machine learning to isolate anomalous activity.', 'Connect detection outputs to downstream services with low-latency communication.'],
  },
  commerce: {
    challenge: 'Flash-sale traffic puts pressure on product browsing, cart updates, and checkout. The commerce experience needed to remain responsive as shopper demand increased.',
    approach: ['Separate the storefront experience from core commerce services.', 'Use edge delivery and caching to support fast browsing.', 'Connect checkout and payment flows while reducing infrastructure overhead.'],
  },
  booking: {
    challenge: 'This concept explores how a wellness business could make service discovery and appointment booking feel like one experience, without sending visitors to disconnected tools.',
    approach: ['Present treatments with clear descriptions and a welcoming visual identity.', 'Let visitors select a date and available time within the website.', 'Design the booking journey for small screens as well as desktop.'],
  },
  operations: {
    challenge: 'This concept explores a common coordination problem: tasks, ownership, and team capacity are often spread across different tools, making priorities difficult to see.',
    approach: ['Organize work into planned, in-progress, and completed stages.', 'Show task ownership alongside project information.', 'Bring workload and team availability into the same overview.'],
  },
};

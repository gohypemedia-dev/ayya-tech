type CaseStudyDetail = {
  context: string;
  priorities: string[];
  decisions: { title: string; text: string }[];
  takeaway: string;
};

export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  payments: {
    context: 'For a global payments provider, transaction processing is the connection between customer activity and banking services. The project focused on re-architecting distributed microservices to support more than 25 million daily transactions. Throughput, response time, and availability needed to be considered together: improving one measure would offer little value if the payment journey became less dependable elsewhere.',
    priorities: ['Support sustained transaction volume across global banking endpoints.', 'Keep the processing path responsive while handling work asynchronously where appropriate.', 'Maintain a clear separation between transaction data, event distribution, and fast-access data.'],
    decisions: [
      { title: 'Define the transaction-processing boundaries', text: 'The approach centred on distributed microservices rather than a single processing unit. Separating responsibilities makes it possible to reason about the work on the critical payment path and the supporting work around it. This distinction is particularly important when an external banking endpoint responds more slowly than the rest of the platform.' },
      { title: 'Connect services through events', text: 'Kafka provides the event-streaming layer in the project stack. Event-driven communication supports the movement of transaction information between services without requiring every downstream activity to complete inside one synchronous request. The design focus was high-volume processing while preserving a coherent flow of information.' },
      { title: 'Give storage and caching different jobs', text: 'PostgreSQL and Redis sit alongside Go services deployed on AWS EKS. Persistent transaction data and fast-access information have different responsibilities; caching supports responsiveness, while the database remains part of the durable data layer. The architecture brings these components together around the latency and availability requirements.' },
    ],
    takeaway: 'The project summary reports more than 25 million daily transactions and sub-50ms latency, alongside a 99.99% availability SLA. These describe different aspects of the platform: processing volume, response time, and an availability commitment. The broader value is a foundation that can support demanding payment workloads across multiple banking integrations.',
  },
  cloud: {
    context: 'The enterprise SaaS platform needed a coordinated approach to infrastructure and data across AWS and GCP. A cloud migration affects more than where applications run: deployment configuration, database continuity, regional access, and operating cost all shape the result. The project brought infrastructure automation and multi-region replication into the same migration programme.',
    priorities: ['Keep services available while changing the underlying environment.', 'Make infrastructure repeatable across regions and deployments.', 'Support global delivery while controlling ongoing infrastructure costs.'],
    decisions: [
      { title: 'Make infrastructure reproducible', text: 'Terraform provides an infrastructure-as-code foundation. Expressing environments as configuration reduces dependence on manual setup and gives teams a consistent way to understand what should exist. This supports the project’s focus on automated provisioning across the cloud estate.' },
      { title: 'Treat data continuity as part of migration', text: 'The migration approach combines multi-region database replication with the movement of application workloads. Application deployment alone cannot establish continuity if the required data is unavailable or out of step. PostgreSQL replication is therefore a central part of the architecture described in the project.' },
      { title: 'Standardise application delivery', text: 'Docker and GCP Cloud Run form part of the delivery stack, alongside BigQuery and Terraform. Containerised workloads provide a consistent application packaging model, while infrastructure configuration establishes the environments around them. Together, these choices support repeatable delivery as the platform evolves.' },
    ],
    takeaway: 'The project summary describes a zero-downtime cutover and a reduction in cloud infrastructure spend of $180,000 per year. The significance extends beyond the migration window: repeatable environments and coordinated replication provide a clearer foundation for subsequent deployments and regional growth.',
  },
  ai: {
    context: 'The risk platform needed to interpret incoming activity quickly enough for a decision to remain useful. Its focus was real-time fraud detection at a reported processing volume of 100,000 events per second. Streaming, model inference, and delivery of the resulting decision therefore had to be considered as one connected system.',
    priorities: ['Process high-volume event streams without losing the value of timely decisions.', 'Connect anomaly detection to downstream systems with low communication overhead.', 'Consider detection quality alongside processing speed.'],
    decisions: [
      { title: 'Build around a streaming pipeline', text: 'Apache Flink provides the stream-processing component of the project stack. The approach processes incoming events as an ongoing flow rather than waiting for a later batch. This supports the requirement to identify suspicious activity while the underlying transaction or event is still relevant.' },
      { title: 'Connect machine learning to the event flow', text: 'Python-based machine learning supplies the anomaly-detection component. A model’s prediction becomes useful only when it is connected to the surrounding system: incoming information must reach the model, and its output must reach the service that acts on it. The project treats this connection as part of the latency requirement.' },
      { title: 'Support fast communication and analysis', text: 'The supporting stack includes Kubernetes, ClickHouse, and gRPC. These address workload deployment, analytical data access, and service communication respectively. Their role is to support the streaming and decision path, rather than treating model inference as an isolated feature.' },
    ],
    takeaway: 'The project summary reports decision latency below 12ms, model precision of 99.4%, and $4.2 million in prevented fraudulent transactions over 90 days. Precision and latency measure different things; a fast decision still needs to be useful. The case illustrates the importance of connecting model quality with the engineering of the surrounding event pipeline.',
  },
  commerce: {
    context: 'Flash sales create concentrated demand across a storefront. Browsing, cart activity, and checkout can all rise together, placing pressure on both the customer experience and the services behind it. This project modernised a headless commerce architecture to support peak traffic while improving checkout speed and infrastructure efficiency.',
    priorities: ['Keep product browsing responsive during traffic surges.', 'Connect the storefront, commerce data, and payments in a coherent checkout journey.', 'Improve performance without allowing infrastructure overhead to grow unchecked.'],
    decisions: [
      { title: 'Separate the storefront from commerce services', text: 'Next.js and GraphQL form part of the headless architecture. Separating presentation from core commerce services gives the storefront a distinct delivery layer while retaining access to the data needed for browsing and purchasing. This supports work on the customer experience without treating every part of the platform as one coupled application.' },
      { title: 'Use edge delivery and caching deliberately', text: 'Cloudflare Workers and Redis support the project’s delivery and caching approach. Frequently accessed information can be handled differently from customer-specific or transaction-sensitive activity. That distinction matters during flash sales, when many shoppers request similar content but each checkout must still follow its own transaction flow.' },
      { title: 'Keep checkout part of the performance work', text: 'The Stripe API connects payments to the commerce journey. The project addresses checkout alongside browsing rather than stopping at page-load performance. A fast storefront needs a similarly clear path through cart updates and payment to avoid moving the bottleneck to the final stage of a purchase.' },
    ],
    takeaway: 'The project summary reports a 3.4× checkout speed improvement, 40% lower infrastructure costs, and support for 1.2 million concurrent shoppers during peak sales. The architectural theme is consistent across those measures: deliver common content efficiently while giving transaction-sensitive work the attention it requires.',
  },
  booking: {
    context: 'Forma is an independent design concept for a wellness business. It explores the journey from discovering a treatment to selecting an appointment, with the service information and booking flow presented as one experience. The emphasis is on helping a visitor understand the next step without switching between disconnected pages or tools.',
    priorities: ['Make treatments easy to discover and compare.', 'Keep date and time selection within the same journey.', 'Make the booking experience understandable on a small screen.'],
    decisions: [
      { title: 'Start with service discovery', text: 'Treatment pages establish what a visitor is choosing before asking them to select an appointment. Clear descriptions and a welcoming visual direction give the booking flow context. The concept treats this content as part of the experience, rather than assuming every visitor already knows which service they need.' },
      { title: 'Bring availability into the journey', text: 'The proposed calendar and time selection connect the chosen service to the next available step. Keeping those decisions together makes the transition from browsing to booking easier to follow. A production implementation would need to connect this interface to an authoritative scheduling system.' },
      { title: 'Carry the flow onto mobile', text: 'Responsive layouts are part of the concept scope. Service information, calendar navigation, and time choices need to remain readable and usable when horizontal space is limited. The design direction prioritises a clear sequence of decisions rather than presenting every control at once.' },
    ],
    takeaway: 'This is a design exploration, so it does not claim live booking results or conversion improvements. Its value is a concrete direction for a connected service-and-scheduling experience. Before launch, availability rules, booking confirmation, cancellations, and accessibility would need to be implemented and validated with the business.',
  },
  operations: {
    context: 'Orbit is an independent concept for a shared project and team workspace. It explores how task status, ownership, and capacity can be understood together. The intended audience is a team coordinating several pieces of work, where knowing what is in progress is only useful if responsibilities and available capacity are also clear.',
    priorities: ['Make project status and task ownership visible together.', 'Connect immediate priorities with a view of team workload.', 'Keep the workspace understandable as work moves between stages.'],
    decisions: [
      { title: 'Organise work around its current stage', text: 'The concept uses planned, in-progress, and completed stages to make the state of work visible. A shared board gives team members a common reference when discussing priorities. The purpose is to support coordination, rather than require people to reconstruct project status from separate conversations.' },
      { title: 'Keep responsibility beside the task', text: 'Task ownership appears with the project information it relates to. This gives a viewer a direct connection between a piece of work and the person responsible for it. In a production system, assignment rules and permissions would need to reflect the organisation’s actual working practices.' },
      { title: 'Add capacity to the planning conversation', text: 'Workload and availability are explored alongside the project board. The aim is to help teams consider whether a plan is practical, rather than looking only at the number of tasks. Reporting provides a broader view of the same work without replacing the detail needed for day-to-day decisions.' },
    ],
    takeaway: 'Orbit demonstrates a proposed way to bring project planning and team visibility into one workspace. It is not presented as a deployed client system or a measured productivity result. The next validation step would be to test the board, ownership model, and workload views against representative team workflows.',
  },
};

import type React from 'react';

export interface StorySlide {
  tag: string;
  category: string;
  title: string;
  description: string;
  metrics: string;
  metricValue?: string;
  metricLabel?: string;
  stack: string[];
  image: string;
  client?: string;
  impact?: string;
  icon?: React.ReactNode;
}

export const defaultSlidesData: StorySlide[] = [
  {
    category: 'FINTECH INFRASTRUCTURE',
    tag: 'Case Study 01',
    client: 'Global Payments Provider',
    title: 'Enterprise High-Throughput Payment Engine',
    description:
      'Re-architected distributed microservices handling 25M+ daily transactions with 99.99% uptime SLA and sub-50ms latency across global banking endpoints.',
    metrics: '25M+ Daily Transactions • Sub-50ms Latency',
    metricValue: '99.99%',
    metricLabel: 'Platform Availability SLA',
    impact: 'Handled 25M+ daily transactions with zero packet drop',
    stack: ['AWS EKS', 'PostgreSQL', 'Kafka', 'Go', 'Redis'],
    image:
      '/images/case-studies/payments.png',
  },
  {
    category: 'CLOUD MODERNIZATION',
    tag: 'Case Study 02',
    client: 'Enterprise SaaS Provider',
    title: 'Multi-Region Enterprise Cloud Architecture & Migration',
    description:
      'Automated zero-downtime multi-region database replication and infrastructure-as-code deployments across AWS & GCP for low-latency global delivery.',
    metrics: 'Multi-Region Replication • Zero Downtime Cutover',
    metricValue: '100%',
    metricLabel: 'Zero-Downtime Migration',
    impact: 'Reduced cloud infrastructure spend by $180,000/year',
    stack: ['GCP Cloud Run', 'Terraform', 'BigQuery', 'Docker', 'PostgreSQL'],
    image:
      '/images/case-studies/cloud.png',
  },
  {
    category: 'AI & STREAMING SYSTEMS',
    tag: 'Case Study 03',
    client: 'Algorithmic Risk Platform',
    title: 'Real-Time AI Fraud Detection & Event Streaming Pipeline',
    description:
      'Engineered an ultra-low latency event processing engine processing 100,000 events/sec with real-time machine learning anomaly isolation.',
    metrics: '100,000 Events/sec • 99.4% Model Precision',
    metricValue: '<12ms',
    metricLabel: 'End-to-End Decision Latency',
    impact: 'Prevented $4.2M in fraudulent transactions in 90 days',
    stack: ['Apache Flink', 'Python ML', 'Kubernetes', 'ClickHouse', 'gRPC'],
    image:
      '/images/case-studies/ai.png',
  },
  {
    category: 'HIGH-CONCURRENCY COMMERCE',
    tag: 'Case Study 04',
    client: 'D2C Retail Unicorn',
    title: 'Next-Gen Headless E-Commerce & Checkout Engine',
    description:
      'Modernized core e-commerce architecture to withstand 10x peak traffic surges during flash sales with sub-second page loads and instant checkouts.',
    metrics: '3.4x Faster Checkout • 40% Lower Infra Costs',
    metricValue: '3.4x',
    metricLabel: 'Checkout Speed Improvement',
    impact: 'Handled 1.2M concurrent shoppers during peak flash sales',
    stack: ['Next.js', 'GraphQL', 'Stripe API', 'Cloudflare Workers', 'Redis'],
    image:
      '/images/case-studies/commerce.png',
  },
];


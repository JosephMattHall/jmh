import React from 'react';
import { getSiteContent } from '@/lib/siteContent';
import AboutContent from '@/components/AboutContent';

export const dynamic = "force-dynamic";

const AboutPage = async () => {
  const siteContent = await getSiteContent('about');

  const defaultContent = `
    <p>My passion lies in most anything hardware and/or software, bridging the gap between physical constraints and digital possibilities.</p>
    <p>Im a customer service consultant at Americas largest and oldest tellecommunications company as a day job, and inbetween that and raising a young family I spend time making generally pointless things.</p>
  `;

  return <AboutContent content={siteContent?.content || defaultContent} />;
};

export default AboutPage;

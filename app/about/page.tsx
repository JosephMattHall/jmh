import React from 'react';
import { siteContent } from "@/lib/siteContent";
import AboutContent from '@/components/AboutContent';

export const dynamic = "force-dynamic";

const AboutPage = async () => {




  return <AboutContent content={siteContent.about} />;
};

export default AboutPage;

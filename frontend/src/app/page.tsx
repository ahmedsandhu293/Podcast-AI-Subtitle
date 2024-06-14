"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/custom/HeroSection";
import { FeatureSection } from "@/components/custom/FeatureSection";
import { getHomePageData } from "@/data/loaders";

type Image = {
  id: number;
  url: string;
  alternativeText: string | null;
};

type Link = {
  id: number;
  url: string;
  text: string;
};

type Block = {
  id: number;
  __component: string;
  heading: string;
  subHeading: string;
  image: Image;
  link: Link;
};

type StrapiResponse = {
  blocks: Block[];
};

type FlattenedStrapiResponse = {
  blocks: Block[];
};
function blockRenderer(block: any) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection key={block.id} data={block} />;
    case "layout.features-section":
      return <FeatureSection key={block.id} data={block} />;
    default:
      return null;
  }
}

const Home: React.FC = () => {
  const [strapiData, setStrapiData] = useState<FlattenedStrapiResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getHomePageData();
      if (data) {
        setStrapiData(data);
      } else {
        setError("Failed to load data");
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!strapiData) {
    return <div>No data available</div>;
  }

  const { blocks } = strapiData;

  if (!blocks) return <p>No sections found</p>;

  return <main>{blocks.map(blockRenderer)}</main>;
};

export default Home;

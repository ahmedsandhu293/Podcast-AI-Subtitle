"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface StrapiAttributes {
  title: string;
  description: string;
}

interface StrapiData {
  data: {
    attributes: StrapiAttributes;
  };
}

async function getStrapiData(path: string): Promise<StrapiData | null> {
  const baseURL = "http://localhost:1337";
  try {
    const response = await fetch(baseURL + path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: StrapiData = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching error:", error);
    return null;
  }
}

const Home: React.FC = () => {
  const [strapiData, setStrapiData] = useState<StrapiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getStrapiData("/api/home-page");
      if (data) {
        setStrapiData(data);
      } else {
        setError("Failed to fetch data");
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!strapiData || !strapiData.data) {
    return (
      <main className="container mx-auto py-6">
        <p>Error loading data</p>
      </main>
    );
  }

  const { title, description } = strapiData.data.attributes;

  return (
    <main className="container mx-auto py-6">
      <h1>{title}</h1>
      <p>{description}</p>
      <Button>Hello</Button>
    </main>
  );
};

export default Home;

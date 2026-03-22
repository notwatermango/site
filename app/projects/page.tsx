"use client";
import { useState } from "react";

export default function Portfolio() {
  const [worldline, setWorldline] = useState<"ALL" | "PROJECTS" | "EXPERIMENTS">("ALL");
  const [isGlitching, setIsGlitching] = useState(false);

  const projects = [
    {
      id: "PROJECT-006",
      name: "Personal Site (name subject to change)",
      description: "Personal website and blog.",
      link: "https://github.com/notwatermango/site",
      tech: ["TypeScript", "Next.js"],
      year: 2026,
    },
    {
      id: "PROJECT-005",
      name: "Split Bill App",
      description: "Free application for splitting multiple bills and calculating payments.",
      link: "https://github.com/notwatermango/split-bill-app",
      tech: ["TypeScript", "Next.js"],
      year: 2026,
    },
    {
      id: "PROJECT-004",
      name: "untoldstudio.id",
      description: "Website for Untold Studio, a photo studio based in Jakarta, Indonesia.",
      link: "https://untoldstudio.id/",
      tech: ["TypeScript", "Next.js", "cPanel"],
      year: 2025,
    },
    {
      id: "EXPERIMENT-005",
      name: "Financial News Scraper",
      description: "Scrape news from Benzinga.com and sentiment analysis using open-source FinBERT.",
      tech: ["Python", "Playwright", "FinBERT"],
      link: "https://github.com/notwatermango/benzinga-financial-news-scraper-and-sentiment-analysis",
      year: 2025,
      archived: true,
    },
    {
      id: "PROJECT-003",
      name: "Mimicri: Color Mixing Assistant",
      description: "Color mixing formula finder for beginner painters and artists.",
      tech: ["Swift", "iOS", "UIKit"],
      link: "https://github.com/notwatermango/mimicri",
      year: 2024,
      archived: true,
    },
    {
      id: "EXPERIMENT-004",
      name: "Nekoma: Roguelite Dungeon Game",
      description: "A roguelite challenge game where a brave cat embarks on a quest to rescue his brother.",
      tech: ["Swift", "iOS", "SpriteKit"],
      link: "https://github.com/notwatermango/nekoma",
      year: 2024,
      archived: true,
    },
    {
      id: "EXPERIMENT-003",
      name: "Pixelmon Go",
      description: "A watchOS game to catch and collect pixelmon using a compass directing to a nearby pixelmon.",
      tech: ["Swift", "watchOS", "SwiftUI"],
      link: "https://github.com/notwatermango/PixelmonGo",
      year: 2024,
      archived: true,
    },
    {
      id: "EXPERIMENT-002",
      name: "Visualization of employees income in Indonesia",
      description: "Choropleth map of 'Monthly average income of employees in Indonesia by province' using D3.",
      tech: ["HTML", "JavaScript", "D3"],
      link: "https://github.com/notwatermango/choropleth-map-of-average-employee-income-in-indonesia",
      year: 2023,
    },
    {
      id: "EXPERIMENT-001",
      name: "ngantri-web",
      description:
        "A simple queue-management web app for customers and merchants, built with modern technologies and a serverless-first approach.",
      tech: ["TypeScript", "Next.js"],
      link: "https://github.com/notwatermango/ngantri-web",
      year: 2023,
      archived: true,
    },
    {
      id: "PROJECT-002",
      name: "Hide Binusmaya Popup",
      description: "A browser extension to automatically hide the popup on campus academic student site.",
      tech: ["JavaScript", "CSS", "Chrome Extension"],
      link: "https://chromewebstore.google.com/detail/hide-binusmaya-pop-up/ccfdjmgabbgpcklkmegeiepcinehlpmc",
      year: 2023,
      archived: true,
    },
    {
      id: "PROJECT-001",
      name: "vjudge.net Dark Theme",
      description: "A user script to modify vjudge.net theme colors inspired by GitHub colors.",
      tech: ["JavaScript", "Tampermonkey"],
      link: "https://github.com/notwatermango/vjudge-dark-theme",
      year: 2022,
    },
  ];

  const handleToggle = (newLine: "ALL" | "PROJECTS" | "EXPERIMENTS") => {
    if (newLine === worldline) return;
    setIsGlitching(true);
    setWorldline(newLine);
    setTimeout(() => setIsGlitching(false), 200); // Glitch duration
  };

  const filteredProjects = projects.filter((p) => {
    if (worldline === "PROJECTS") return p.id.startsWith("PROJECT");
    if (worldline === "EXPERIMENTS") return p.id.startsWith("EXPERIMENT");
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto mt-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-heading text-accent uppercase tracking-widest mb-3 text-shadow">
          Projects & Experiments
        </h1>
        <p className="font-mono opacity-70 tracking-widest text-sm md:text-base mb-8">
          {"// PUBLIC INVENTIONS AND SCHEMATICS"}
        </p>

        {/* Divergence Meter Toggle */}
        <div className="flex border border-primary/30 max-w-lg mx-auto p-1 bg-background shadow-[0_0_15px_rgba(255,176,0,0.05)]">
          <button
            onClick={() => handleToggle("ALL")}
            className={`flex-1 py-2 font-heading tracking-widest text-lg transition-all duration-200 uppercase ${
              worldline === "ALL"
                ? "bg-primary/20 text-accent nixie-glow border border-primary/50"
                : "text-primary/70 hover:text-primary hover:bg-primary/5"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleToggle("PROJECTS")}
            className={`flex-1 py-2 font-heading tracking-widest text-lg transition-all duration-200 uppercase ${
              worldline === "PROJECTS"
                ? "bg-primary/20 text-accent nixie-glow border border-primary/50"
                : "text-primary/70 hover:text-primary hover:bg-primary/5"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => handleToggle("EXPERIMENTS")}
            className={`flex-1 py-2 font-heading tracking-widest text-lg transition-all duration-200 uppercase ${
              worldline === "EXPERIMENTS"
                ? "bg-primary/20 text-accent nixie-glow border border-primary/50"
                : "text-primary/70 hover:text-primary hover:bg-primary/5"
            }`}
          >
            Experiments
          </button>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-200 ${
          isGlitching ? "opacity-30 translate-x-[2px] blur-[1px]" : "opacity-100"
        }`}
      >
        {filteredProjects.map((p) => {
          const isExperiment = p.id.startsWith("EXPERIMENT");
          const isArchived = p.archived;

          return (
            <div
              key={p.id}
              className={`border transition-all duration-300 p-6 md:p-8 flex flex-col group cursor-pointer relative overflow-hidden ${
                isExperiment
                  ? "border-dashed border-gray-500/40 bg-gray-500/[0.02] hover:bg-gray-500/5 hover:border-gray-400"
                  : "border-primary/30 bg-primary/[0.02] hover:bg-primary/5 hover:border-accent shadow-[0_0_10px_rgba(255,176,0,0)] hover:shadow-[0_0_15px_rgba(255,176,0,0.15)]"
              } ${isArchived ? "" : ""}`}
            >
              <div
                className={`absolute top-0 right-0 p-3 text-xs font-mono tracking-widest transition-colors ${
                  isExperiment ? "text-gray-500 group-hover:text-gray-400" : "text-primary/30 group-hover:text-accent"
                }`}
              >
                {p.id}
              </div>

              <h2
                className={`text-2xl md:text-3xl font-heading tracking-wider mb-2 mt-4 transition-colors ${
                  isExperiment ? "text-gray-300 group-hover:text-white" : "text-primary group-hover:text-accent"
                }`}
              >
                {p.name}
              </h2>

              <div
                className={`font-mono text-xs opacity-50 mb-3 tracking-widest ${
                  isExperiment ? "text-gray-300 group-hover:text-white" : ""
                }`}
              >
                YEAR: {p.year}
              </div>

              <p
                className={`font-mono text-sm md:text-base leading-relaxed mb-8 grow opacity-80 group-hover:opacity-100 transition-opacity ${
                  isExperiment ? "text-gray-300 group-hover:text-white" : ""
                }`}
              >
                {p.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-auto relative z-10">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className={`text-xs md:text-sm font-mono px-3 py-1 bg-background border transition-colors ${
                      isExperiment
                        ? "border-gray-500/20 text-gray-400 group-hover:border-gray-500/50"
                        : "border-primary/20 text-primary group-hover:border-primary/50"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {isArchived && (
                <div className="z-10 absolute bottom-0 right-0 md:-bottom-6 md:-right-10 border-2 bg-black/70 border-red-500/50 text-red-500/50 text-xs md:text-sm font-bold uppercase font-mono px-3 py-1 rotate-[-15deg] md:group-hover:bottom-6 md:group-hover:right-4 transition-opacity tracking-widest pointer-events-none">
                  ARCHIVED
                </div>
              )}

              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0">
                  <span className="sr-only">View {p.name}</span>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

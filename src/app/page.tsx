import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components/ui/marquee";
import { StructuredData } from "@/components/structured-data";
import { SkillsLeaderboard } from "@/components/skills-leaderboard";
import { CopyInstallCommandButton } from "@/components/copy-install-command-button";
import { getAllSkills } from "@/lib/skills";
import { absoluteUrl, buildPageMetadata, siteDescription, siteName, topSkillTags } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const skills = await getAllSkills();

  return buildPageMetadata({
    title: "Solana Protocol Skills",
    description: `Browse ${skills.length} implementation-ready Solana protocol skills for agents and developers.`,
    path: "/",
    keywords: topSkillTags(skills),
  });
}

export default async function Home() {
  const skills = await getAllSkills();
  const protocols = [
    { name: "helius", logo: "/protocols/helius.png" },
    { name: "Dflow", logo: "/protocols/dflow.jpeg" },
    { name: "Jupiter", logo: "/protocols/jup.svg" },
    { name: "Kamino", logo: "/protocols/kamino-blue.jpg" },
    { name: "Raydium", logo: "/protocols/ray.svg" },
    { name: "Orca", logo: "/protocols/orca.svg" },
  ];

  const installCommand = "npx skillsadd your-org/sol-skills";
  const topSkills = skills.slice(0, 10);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${siteName} Registry`,
    description: siteDescription,
    url: absoluteUrl("/"),
    about: "Solana protocol implementation skills",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: topSkills.map((skill, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/skills/${skill.slug}`),
        name: skill.title,
        description: skill.summary,
      })),
    },
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <StructuredData data={collectionSchema} />
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-violet-600/15 blur-3xl" />

        <div className="relative lg:grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:gap-12 flex flex-wrap">
          {/* Left — copy */}
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" />
              Open-source skill registry
            </span>

            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Skills Published by{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Solana Protocols
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Protocol teams publish implementation-ready skills so developers
              integrate faster and teach their agents exactly how each protocol
              works.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/submit"
                className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_8px_24px_rgba(124,58,237,0.35)] transition hover:bg-violet-500 hover:shadow-[0_0_0_1px_rgba(196,181,253,0.6),0_10px_28px_rgba(139,92,246,0.45)]"
              >
                Submit a Skill
              </Link>
              <Link
                href="/docs"
                className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
              >
                Read the Docs
              </Link>
            </div>
          </div>

          {/* Right — quick-start card */}
          <div className="flex w-full flex-col gap-4 lg:w-80 justify-between">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Quick start
              </p>
              <div className="mt-3 flex items-center justify-between gap-2 rounded-lg bg-zinc-900 px-3 py-2.5">
                <code className="truncate font-mono text-sm text-zinc-100">
                  {installCommand}
                </code>
                <CopyInstallCommandButton command={installCommand} />
              </div>
            </div>
            <div>
            <h4 className="text-sm font-medium text-zinc-300">Best in class protocols</h4>
            <Marquee
                  pauseOnHover
                  className="py-4 [--duration:20s] [--gap:2rem]"
                >
                  {protocols.map((protocol) => (
                    <div
                      key={protocol.name}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-950"
                      title={protocol.name}
                    >
                      <Image
                        src={protocol.logo}
                        alt={protocol.name}
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain overflow-hidden rounded-full"
                      />
                    </div>
                  ))}
                </Marquee>
                </div>
          </div>
       
        </div>

   
      </section>

      <SkillsLeaderboard skills={skills} />

      {skills.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-zinc-700 p-5 text-sm text-zinc-300">
          No skills yet. Be the first to submit one.
        </p>
      ) : null}
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Shield, Globe, CheckCircle2, ArrowRight, GraduationCap, Award, Users } from "lucide-react";
import heroImg from "@/assets/hero-instructor.jpg";
import labImg from "@/assets/lab.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OMOS Technologies | Cybersecurity Training Admission Open" },
      {
        name: "description",
        content:
          "Admission in progress at OMOS Technologies. Comprehensive cybersecurity training: ethical hacking, cloud security, GRC, networking. Earn recognized certifications.",
      },
      { property: "og:title", content: "OMOS Technologies | Cybersecurity Training" },
      {
        property: "og:description",
        content:
          "Build practical skills in a high-demand field. Enrollment is ongoing for our full cybersecurity course catalog.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const catalog = [
  {
    title: "Beginner Courses",
    items: [
      "Introduction to Cybersecurity",
      "Cybersecurity Fundamentals",
      "Digital Safety and Cyber Hygiene",
      "Internet Security Basics",
      "Password Security and MFA",
      "Safe Web Browsing and Email Security",
      "Cybersecurity Awareness for Employees",
      "Introduction to Networking",
      "Computer Hardware and OS Security",
      "Cybersecurity Careers and Certs",
    ],
  },
  {
    title: "Ethical Hacking & Penetration Testing",
    items: [
      "Ethical Hacking Fundamentals",
      "Penetration Testing Methodology",
      "Web App Penetration Testing",
      "Wireless Penetration Testing",
      "Vulnerability Assessment",
      "Reconnaissance and Info Gathering",
      "Exploitation Techniques",
      "Post-Exploitation and Reporting",
      "Bug Bounty Fundamentals",
      "Kali Linux for Ethical Hackers",
    ],
  },
  {
    title: "Networking & Infrastructure Security",
    items: [
      "Network Security Fundamentals",
      "TCP/IP and Network Protocols",
      "Firewalls and VPNs",
      "Wireless Network Security",
      "Network Monitoring and Traffic Analysis",
      "Secure Network Design",
      "IDS/IPS",
      "NAC",
    ],
  },
  {
    title: "Operating System Security",
    items: [
      "Windows Security Administration",
      "Linux Security Essentials",
      "macOS Security Basics",
      "Active Directory Security",
      "System Hardening",
      "Endpoint Security",
    ],
  },
  {
    title: "Cloud Security",
    items: [
      "Cloud Security Fundamentals",
      "AWS Security",
      "Microsoft Azure Security",
      "Google Cloud Security",
      "Cloud IAM",
      "Cloud Compliance and Governance",
    ],
  },
  {
    title: "Governance, Risk & Compliance (GRC)",
    items: [
      "Information Security Management",
      "Risk Assessment and Management",
      "Security Policies and Procedures",
      "ISO 27001 Fundamentals",
      "NIST Cybersecurity Framework",
      "GDPR and Data Privacy",
      "Business Continuity and Disaster Recovery",
      "Security Auditing",
    ],
  },
  {
    title: "Specialized Tracks",
    items: [
      "Application Security (SSDLC, OWASP)",
      "Cryptography (Basics, PKI)",
      "Malware and Threat Intelligence",
      "Identity and Access Management (IAM)",
      "Industrial and Emerging Tech (IoT, OT, ICS, AI, Blockchain)",
      "IT Risk Management",
    ],
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="sticky top-0 z-50 border-b-4 border-secondary bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-2">
            <Shield className="size-6 text-secondary" />
            <span className="font-display text-lg font-extrabold tracking-tight">
              OMOS TECHNOLOGIES
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold uppercase tracking-wide md:flex">
            <a href="#programs" className="hover:text-secondary">
              Programs
            </a>
            <a href="#catalog" className="hover:text-secondary">
              Catalog
            </a>
            <a href="#enroll" className="hover:text-secondary">
              Enrollment
            </a>
          </nav>
          <a
            href="#apply"
            className="rounded-sm bg-secondary px-4 py-2 font-display text-sm font-bold uppercase text-secondary-foreground transition-colors hover:bg-secondary/85"
          >
            Apply now
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-card">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">
                OMOS Technologies presents
              </p>
              <h1 className="mt-4 font-display text-5xl font-extrabold leading-[0.92] tracking-tight text-primary sm:text-6xl lg:text-7xl">
                ADMISSION
                <span className="mt-1 block text-crimson">IN PROGRESS!</span>
              </h1>
              <div className="mt-7 inline-block border-b-4 border-secondary bg-primary px-5 py-3">
                <h2 className="font-display text-base font-bold uppercase tracking-wide text-primary-foreground sm:text-lg">
                  Comprehensive cybersecurity
                  <br className="hidden sm:block" /> training programs
                </h2>
              </div>
              <ul className="mt-7 space-y-2 text-lg text-foreground/80">
                <li>Build practical skills in a high-demand field.</li>
                <li>Earn recognized certifications.</li>
                <li>Launch your cybersecurity career with confidence.</li>
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#apply"
                  className="inline-flex items-center gap-2 bg-primary px-7 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Apply now <ArrowRight className="size-5" />
                </a>
                <div className="bg-secondary px-5 py-3.5 font-display text-sm font-bold uppercase leading-tight text-secondary-foreground">
                  Admission
                  <br /> is ongoing!
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -right-6 -top-6 hidden size-40 bg-secondary md:block" />
              <img
                src={heroImg}
                alt="Cybersecurity instructor reviewing a security operations dashboard"
                width={1024}
                height={1280}
                className="relative w-full object-cover shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section id="programs" className="border-b border-border bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
            {[
              { icon: GraduationCap, t: "Hands-on labs", d: "Practise on real tools: Kali Linux, SIEM, cloud consoles." },
              { icon: Award, t: "Certification ready", d: "Courses mapped to ISO 27001, NIST and industry exams." },
              { icon: Users, t: "Mentored cohorts", d: "Small groups guided by practising security professionals." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t}>
                <Icon className="size-8 text-secondary" />
                <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-wide">{t}</h3>
                <p className="mt-2 text-sm text-primary-foreground/75">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Catalog */}
        <section id="catalog" className="mx-auto max-w-6xl px-5 py-16">
          <div className="inline-block border-b-4 border-secondary bg-primary px-5 py-3">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-primary-foreground">
              Cybersecurity course catalog
            </h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.map((group) => (
              <div key={group.title} className="border-t-4 border-primary bg-card p-5 shadow-sm">
                <h3 className="font-display text-base font-bold uppercase tracking-wide text-primary">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Enrollment */}
        <section id="enroll" className="border-y border-border bg-accent">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
            <img
              src={labImg}
              alt="OMOS Technologies computer training laboratory"
              width={1280}
              height={720}
              loading="lazy"
              className="w-full object-cover shadow-xl"
            />
            <div>
              <div className="inline-block bg-emerald px-5 py-3">
                <h2 className="font-display text-xl font-bold uppercase leading-tight text-primary-foreground">
                  Cybersecurity enrollment
                  <span className="block text-secondary">is ongoing</span>
                </h2>
              </div>
              <p className="mt-6 text-lg text-foreground/80">
                Join today and be part of the future of cybersecurity.
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold uppercase text-crimson">
                Don&apos;t wait — apply now!
              </p>
              <p className="mt-2 text-foreground/70">Your future starts with the right choice.</p>
            </div>
          </div>
        </section>

        {/* Apply */}
        <section id="apply" className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-primary">
            Secure your seat
          </h2>
          <p className="mt-3 text-foreground/70">
            Registration is open for the current cohort. Reach out and our admissions team will guide
            you through course selection and payment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.omostechnologies.com"
              className="inline-flex items-center gap-2 bg-primary px-8 py-4 font-display text-lg font-bold uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Register online <ArrowRight className="size-5" />
            </a>
            <a
              href="mailto:admissions@omostechnologies.com"
              className="inline-flex items-center gap-2 border-2 border-primary px-8 py-4 font-display text-lg font-bold uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Email admissions
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-primary py-10 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 text-center">
          <div className="flex items-center gap-2">
            <Globe className="size-5 text-secondary" />
            <span className="font-display text-lg font-bold">www.omostechnologies.com</span>
          </div>
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} OMOS Technologies. Cybersecurity training and certification.
          </p>
        </div>
      </footer>
    </div>
  );
}

export type Instructor = {
  id: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
};

export const instructors: Record<string, Instructor> = {
  adeyemi: {
    id: "adeyemi",
    name: "Adeyemi Okonkwo",
    title: "Lead Instructor, Security Foundations",
    credentials: "CISSP, CompTIA Security+, Network+",
    bio: "Fifteen years across enterprise IT support and security operations. Adeyemi specialises in taking complete beginners to their first security role.",
  },
  chiamaka: {
    id: "chiamaka",
    name: "Chiamaka Eze",
    title: "Offensive Security Lead",
    credentials: "OSCP, CEH, Burp Suite Certified Practitioner",
    bio: "Full-time penetration tester and bug bounty hunter. Chiamaka runs the lab-heavy offensive security track and reviews every student report personally.",
  },
  tunde: {
    id: "tunde",
    name: "Tunde Bakare",
    title: "Network & Infrastructure Security Instructor",
    credentials: "CCNP Security, Fortinet NSE 5, JNCIS-SEC",
    bio: "Former ISP network engineer who has designed and defended carrier-grade networks. Teaches firewalls, segmentation and traffic analysis.",
  },
  fatima: {
    id: "fatima",
    name: "Fatima Yusuf",
    title: "Systems & Endpoint Security Instructor",
    credentials: "Microsoft SC-200, RHCE, GCUX",
    bio: "Blue-team engineer focused on Windows, Linux and Active Directory hardening in mixed enterprise estates.",
  },
  emeka: {
    id: "emeka",
    name: "Emeka Nwosu",
    title: "Cloud Security Architect",
    credentials: "AWS Security Specialty, AZ-500, Google Professional Cloud Security Engineer",
    bio: "Designs multi-cloud landing zones and identity models. Emeka's classes are built around live cloud consoles, not slides.",
  },
  aisha: {
    id: "aisha",
    name: "Aisha Bello",
    title: "GRC & Audit Lead",
    credentials: "CISA, CISM, ISO 27001 Lead Implementer",
    bio: "Has led ISO 27001 and NDPR/GDPR programmes for banks and fintechs. Teaches risk, policy and audit with real evidence packs.",
  },
  daniel: {
    id: "daniel",
    name: "Daniel Adeleke",
    title: "Application & Emerging Tech Security Instructor",
    credentials: "CSSLP, GWAPT, Certified Blockchain Security Professional",
    bio: "Application security engineer working across secure SDLC, cryptography, IAM and OT/IoT security programmes.",
  },
};

export type Course = {
  slug: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  hoursPerWeek: string;
  instructor: string;
  summary: string;
  topics: string[];
};

export type Category = {
  slug: string;
  title: string;
  blurb: string;
};

export const categories: Category[] = [
  {
    slug: "beginner",
    title: "Beginner Courses",
    blurb: "Start from zero: core concepts, safe habits and the vocabulary of the industry.",
  },
  {
    slug: "offensive",
    title: "Ethical Hacking & Penetration Testing",
    blurb: "Attack systems legally, document findings and think like an adversary.",
  },
  {
    slug: "network",
    title: "Networking & Infrastructure Security",
    blurb: "Design, monitor and defend the networks everything else runs on.",
  },
  {
    slug: "os",
    title: "Operating System Security",
    blurb: "Harden Windows, Linux, macOS and Active Directory estates.",
  },
  {
    slug: "cloud",
    title: "Cloud Security",
    blurb: "Secure AWS, Azure and Google Cloud workloads, identity and governance.",
  },
  {
    slug: "grc",
    title: "Governance, Risk & Compliance",
    blurb: "Frameworks, risk registers, policy and audit evidence that stands up.",
  },
  {
    slug: "specialized",
    title: "Specialized Tracks",
    blurb: "AppSec, cryptography, threat intelligence, IAM and emerging technology.",
  },
];

function c(
  category: string,
  instructor: string,
  level: Course["level"],
  duration: string,
  hoursPerWeek: string,
  title: string,
  summary: string,
  topics: string[],
): Course {
  return {
    slug: title
      .toLowerCase()
      .replace(/[()/,.]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    title,
    category,
    level,
    duration,
    hoursPerWeek,
    instructor,
    summary,
    topics,
  };
}

export const courses: Course[] = [
  // Beginner
  c("beginner", "adeyemi", "Beginner", "3 weeks", "6 hrs/week", "Introduction to Cybersecurity",
    "The map of the field: threats, defenders, careers and how attacks actually unfold.",
    ["Threat actors, motives and the modern threat landscape", "CIA triad and core security principles", "Anatomy of a real breach, step by step", "Security roles, teams and career paths", "Building a personal security lab"]),
  c("beginner", "adeyemi", "Beginner", "4 weeks", "6 hrs/week", "Cybersecurity Fundamentals",
    "The foundational controls every practitioner is expected to know cold.",
    ["Authentication, authorisation and accounting", "Encryption in transit and at rest", "Malware families and delivery routes", "Security controls: preventive, detective, corrective", "Incident response in five phases"]),
  c("beginner", "adeyemi", "Beginner", "2 weeks", "4 hrs/week", "Digital Safety and Cyber Hygiene",
    "Practical habits that stop the majority of everyday compromises.",
    ["Device and account hygiene checklist", "Backups and recovery drills", "Social engineering red flags", "Safe use of public networks", "Personal incident playbook"]),
  c("beginner", "adeyemi", "Beginner", "2 weeks", "4 hrs/week", "Internet Security Basics",
    "How the web works and where it breaks.",
    ["DNS, HTTP and TLS in plain terms", "Certificates and what warnings mean", "Trackers, cookies and browser privacy", "Router and home network basics", "Recognising malicious sites"]),
  c("beginner", "adeyemi", "Beginner", "2 weeks", "4 hrs/week", "Password Security and MFA",
    "Credential attacks and the controls that defeat them.",
    ["Password cracking demonstrated", "Password managers in practice", "TOTP, push and hardware keys", "Passkeys and passwordless flows", "Rolling out MFA to a small team"]),
  c("beginner", "adeyemi", "Beginner", "2 weeks", "4 hrs/week", "Safe Web Browsing and Email Security",
    "Phishing, business email compromise and browser defence.",
    ["Dissecting phishing emails and headers", "SPF, DKIM and DMARC explained", "Attachment and link analysis", "Browser hardening and extensions", "Reporting and containment workflow"]),
  c("beginner", "adeyemi", "Beginner", "2 weeks", "3 hrs/week", "Cybersecurity Awareness for Employees",
    "Corporate awareness training you can deliver to your own organisation.",
    ["Human risk and why training fails", "Clean desk, data handling and BYOD", "Simulated phishing programmes", "Reporting culture without blame", "Measuring awareness maturity"]),
  c("beginner", "tunde", "Beginner", "4 weeks", "6 hrs/week", "Introduction to Networking",
    "The networking grounding every security role depends on.",
    ["OSI and TCP/IP models", "IP addressing and subnetting practice", "Switching, routing and NAT", "Common ports, protocols and services", "Packet capture with Wireshark"]),
  c("beginner", "fatima", "Beginner", "3 weeks", "5 hrs/week", "Computer Hardware and OS Security",
    "Secure the machine itself, from firmware to user accounts.",
    ["BIOS/UEFI, Secure Boot and TPM", "Disk encryption on Windows and Linux", "Users, groups and least privilege", "Patch and update management", "Malware removal and recovery"]),
  c("beginner", "adeyemi", "Beginner", "2 weeks", "3 hrs/week", "Cybersecurity Careers and Certs",
    "Choose a track, build a portfolio, pass your first exam.",
    ["Mapping roles to skills", "Certification roadmap and costs", "CV, LinkedIn and portfolio review", "Home lab projects that impress", "Interview drills and mock questions"]),

  // Offensive
  c("offensive", "chiamaka", "Intermediate", "5 weeks", "8 hrs/week", "Ethical Hacking Fundamentals",
    "Legal, structured hacking from reconnaissance to reporting.",
    ["Rules of engagement and scoping", "Attack lifecycle and MITRE ATT&CK", "Scanning and enumeration labs", "Exploitation basics with Metasploit", "Writing your first findings report"]),
  c("offensive", "chiamaka", "Intermediate", "4 weeks", "8 hrs/week", "Penetration Testing Methodology",
    "PTES and OWASP-aligned method that produces repeatable results.",
    ["Engagement phases and deliverables", "Threat modelling the target", "Evidence capture discipline", "Risk rating with CVSS", "Client debrief and retest"]),
  c("offensive", "chiamaka", "Advanced", "6 weeks", "10 hrs/week", "Web App Penetration Testing",
    "Hands-on OWASP Top 10 exploitation in a purpose-built lab.",
    ["Burp Suite proxy and intruder workflow", "Injection: SQL, NoSQL, command", "Broken auth and session attacks", "Access control and IDOR testing", "SSRF, XXE and deserialisation"]),
  c("offensive", "chiamaka", "Advanced", "4 weeks", "8 hrs/week", "Wireless Penetration Testing",
    "Attack and defend Wi-Fi, from WPA2 handshakes to rogue access points.",
    ["802.11 frames and monitor mode", "WPA2/WPA3 handshake attacks", "Evil twin and captive portals", "Enterprise Wi-Fi and RADIUS testing", "Wireless survey and remediation"]),
  c("offensive", "chiamaka", "Intermediate", "4 weeks", "7 hrs/week", "Vulnerability Assessment",
    "Run credible scans and turn noise into a prioritised remediation plan.",
    ["Scanner setup: Nessus, OpenVAS", "Credentialed vs uncredentialed scans", "False positive validation", "Risk-based prioritisation", "Remediation tracking and metrics"]),
  c("offensive", "chiamaka", "Intermediate", "3 weeks", "6 hrs/week", "Reconnaissance and Info Gathering",
    "OSINT and active discovery that shapes every engagement.",
    ["Passive OSINT sources and tooling", "Subdomain and asset discovery", "Employee and credential exposure", "Active fingerprinting techniques", "Building an attack surface map"]),
  c("offensive", "chiamaka", "Advanced", "5 weeks", "9 hrs/week", "Exploitation Techniques",
    "From public exploit to reliable, controlled compromise.",
    ["Service and application exploitation", "Payloads, shells and encoders", "Password attacks and hash cracking", "Client-side and phishing payloads", "Evading basic detection"]),
  c("offensive", "chiamaka", "Advanced", "4 weeks", "8 hrs/week", "Post-Exploitation and Reporting",
    "What professionals do after access — and how they write it up.",
    ["Privilege escalation on Windows and Linux", "Credential harvesting and pivoting", "Persistence and cleanup ethics", "Impact-driven report writing", "Executive summaries that land"]),
  c("offensive", "chiamaka", "Intermediate", "3 weeks", "6 hrs/week", "Bug Bounty Fundamentals",
    "Hunt on live programmes without breaking the rules.",
    ["Choosing programmes and scope reading", "Recon at bounty scale", "High-signal bug classes", "Writing a report that gets paid", "Duplicate avoidance and triage"]),
  c("offensive", "chiamaka", "Beginner", "3 weeks", "6 hrs/week", "Kali Linux for Ethical Hackers",
    "Operate the standard offensive toolkit with confidence.",
    ["Kali setup, VMs and snapshots", "Linux command line for testers", "Core tool walkthroughs", "Scripting repetitive tasks", "Lab targets and safe practice"]),

  // Network
  c("network", "tunde", "Intermediate", "4 weeks", "7 hrs/week", "Network Security Fundamentals",
    "Defence-in-depth for real network topologies.",
    ["Trust zones and segmentation", "Access control lists in practice", "VPN and remote access models", "Attack detection at the perimeter", "Hardening switches and routers"]),
  c("network", "tunde", "Beginner", "3 weeks", "6 hrs/week", "TCP/IP and Network Protocols",
    "Read traffic like a defender: what normal and abnormal look like.",
    ["Encapsulation and the packet walk", "TCP handshakes, flags and resets", "DNS, DHCP, ARP abuse", "TLS session analysis", "Wireshark investigation labs"]),
  c("network", "tunde", "Intermediate", "4 weeks", "7 hrs/week", "Firewalls and VPNs",
    "Build, tune and audit firewall and tunnel configurations.",
    ["Stateful vs next-gen firewalls", "Rule base design and review", "IPsec and WireGuard tunnels", "Zero-trust remote access", "Logging and change control"]),
  c("network", "tunde", "Intermediate", "3 weeks", "6 hrs/week", "Wireless Network Security",
    "Secure enterprise wireless from design to monitoring.",
    ["Wi-Fi security standards compared", "802.1X and certificate-based auth", "Guest and IoT SSID isolation", "Rogue detection and containment", "Site survey and RF hygiene"]),
  c("network", "tunde", "Intermediate", "4 weeks", "7 hrs/week", "Network Monitoring and Traffic Analysis",
    "Turn packets and flows into detections that fire.",
    ["NetFlow, Zeek and full packet capture", "Baselining normal traffic", "Detecting beaconing and exfiltration", "SIEM ingestion and dashboards", "Alert tuning and triage"]),
  c("network", "tunde", "Advanced", "4 weeks", "7 hrs/week", "Secure Network Design",
    "Architect networks that contain an incident instead of amplifying it.",
    ["Segmentation and micro-segmentation", "DMZ, jump hosts and bastions", "High availability without shortcuts", "Cloud and on-prem interconnect", "Design review workshop"]),
  c("network", "tunde", "Intermediate", "3 weeks", "6 hrs/week", "IDS/IPS",
    "Deploy and tune intrusion detection and prevention systems.",
    ["Signature vs anomaly detection", "Snort and Suricata deployment", "Writing and testing rules", "Inline prevention risk management", "Measuring detection coverage"]),
  c("network", "tunde", "Intermediate", "2 weeks", "5 hrs/week", "NAC",
    "Control which devices get on the network, and where they can go.",
    ["NAC architectures and enforcement points", "802.1X, MAB and posture checks", "Dynamic VLAN and ACL assignment", "BYOD and guest onboarding", "Rollout without breaking production"]),

  // OS
  c("os", "fatima", "Intermediate", "4 weeks", "7 hrs/week", "Windows Security Administration",
    "Secure Windows clients and servers the way defenders do.",
    ["Group Policy security baselines", "Windows event logging and Sysmon", "Credential protection and LAPS", "Defender, ASR and AppLocker", "Patch and configuration management"]),
  c("os", "fatima", "Intermediate", "4 weeks", "7 hrs/week", "Linux Security Essentials",
    "Harden and monitor Linux servers in production.",
    ["Users, sudo and file permissions", "SSH hardening and key management", "SELinux/AppArmor basics", "auditd and log pipelines", "Package, service and kernel hygiene"]),
  c("os", "fatima", "Beginner", "2 weeks", "5 hrs/week", "macOS Security Basics",
    "Manage and secure a fleet of Macs.",
    ["FileVault, Gatekeeper and XProtect", "MDM and configuration profiles", "Privacy and TCC permissions", "Logging and forensic artefacts", "Common macOS malware patterns"]),
  c("os", "fatima", "Advanced", "5 weeks", "8 hrs/week", "Active Directory Security",
    "Find and fix the attack paths that own most enterprises.",
    ["AD structure, trusts and delegation", "Kerberoasting and AS-REP attacks", "BloodHound path analysis", "Tiered administration model", "Detection and hardening plan"]),
  c("os", "fatima", "Intermediate", "3 weeks", "6 hrs/week", "System Hardening",
    "Apply benchmarks and prove the configuration held.",
    ["CIS Benchmarks and STIGs", "Service and attack surface reduction", "Automated hardening scripts", "Drift detection and remediation", "Documenting exceptions"]),
  c("os", "fatima", "Intermediate", "3 weeks", "6 hrs/week", "Endpoint Security",
    "Run EDR the way a SOC does.",
    ["EDR/XDR capabilities compared", "Telemetry, detections and hunting", "Isolation and response actions", "Ransomware containment drill", "Reporting endpoint risk"]),

  // Cloud
  c("cloud", "emeka", "Intermediate", "4 weeks", "7 hrs/week", "Cloud Security Fundamentals",
    "Shared responsibility, identity and the failure modes unique to cloud.",
    ["Service models and responsibility split", "Identity as the new perimeter", "Data protection and key management", "Logging across cloud services", "Top cloud breach patterns"]),
  c("cloud", "emeka", "Intermediate", "5 weeks", "8 hrs/week", "AWS Security",
    "Secure AWS accounts, workloads and data with native tooling.",
    ["IAM policies, roles and SCPs", "VPC design and security groups", "GuardDuty, Config and Security Hub", "KMS, S3 and data protection", "Incident response in AWS"]),
  c("cloud", "emeka", "Intermediate", "5 weeks", "8 hrs/week", "Microsoft Azure Security",
    "Entra ID, defender services and Azure network controls.",
    ["Entra ID and conditional access", "RBAC and privileged identity", "NSGs, Firewall and Front Door", "Defender for Cloud and Sentinel", "Key Vault and data security"]),
  c("cloud", "emeka", "Intermediate", "4 weeks", "7 hrs/week", "Google Cloud Security",
    "Secure GCP projects, IAM and workloads.",
    ["Resource hierarchy and org policy", "IAM, service accounts, workload identity", "VPC Service Controls", "Security Command Center", "Cloud KMS and secrets"]),
  c("cloud", "emeka", "Advanced", "3 weeks", "7 hrs/week", "Cloud IAM",
    "Design least-privilege identity across cloud providers.",
    ["Identity federation and SSO", "Least privilege and permission mining", "Machine and workload identity", "Break-glass and privileged access", "Access reviews and automation"]),
  c("cloud", "aisha", "Intermediate", "3 weeks", "6 hrs/week", "Cloud Compliance and Governance",
    "Prove your cloud estate meets policy and regulation.",
    ["Control frameworks mapped to cloud", "Guardrails and policy-as-code", "Continuous compliance monitoring", "Evidence collection for audit", "Multi-account governance model"]),

  // GRC
  c("grc", "aisha", "Intermediate", "4 weeks", "6 hrs/week", "Information Security Management",
    "Run a security programme, not a pile of tools.",
    ["Building an ISMS scope", "Roles, RACI and governance forums", "Security strategy and roadmap", "Metrics and board reporting", "Third-party risk management"]),
  c("grc", "aisha", "Intermediate", "4 weeks", "6 hrs/week", "Risk Assessment and Management",
    "Quantify, treat and communicate risk credibly.",
    ["Asset and threat identification", "Qualitative and quantitative methods", "Risk register in practice", "Treatment plans and acceptance", "Reporting risk to executives"]),
  c("grc", "aisha", "Beginner", "3 weeks", "5 hrs/week", "Security Policies and Procedures",
    "Write documents people actually follow.",
    ["Policy hierarchy and ownership", "Drafting core policy set", "Standards vs procedures", "Approval and review cycles", "Awareness and enforcement"]),
  c("grc", "aisha", "Intermediate", "4 weeks", "6 hrs/week", "ISO 27001 Fundamentals",
    "Implement and prepare for certification with confidence.",
    ["Clauses 4-10 walkthrough", "Annex A controls and applicability", "Statement of Applicability", "Internal audit programme", "Certification audit preparation"]),
  c("grc", "aisha", "Intermediate", "3 weeks", "5 hrs/week", "NIST Cybersecurity Framework",
    "Assess and improve maturity with a framework executives understand.",
    ["Functions, categories, subcategories", "Current vs target profile", "Maturity assessment workshop", "Prioritised improvement plan", "Mapping to other frameworks"]),
  c("grc", "aisha", "Intermediate", "3 weeks", "5 hrs/week", "GDPR and Data Privacy",
    "Privacy obligations, including NDPR, applied to real systems.",
    ["Lawful bases and data subject rights", "Data mapping and records of processing", "DPIAs in practice", "Breach notification timelines", "Cross-border transfer controls"]),
  c("grc", "aisha", "Intermediate", "3 weeks", "5 hrs/week", "Business Continuity and Disaster Recovery",
    "Plan, test and prove you can keep operating.",
    ["Business impact analysis", "RTO, RPO and recovery strategies", "Continuity and DR plan writing", "Tabletop and failover exercises", "Post-incident improvement"]),
  c("grc", "aisha", "Advanced", "4 weeks", "6 hrs/week", "Security Auditing",
    "Plan and execute audits that produce defensible findings.",
    ["Audit planning and sampling", "Control testing techniques", "Evidence quality and working papers", "Findings, ratings and follow-up", "Auditee relationship management"]),

  // Specialized
  c("specialized", "daniel", "Advanced", "5 weeks", "8 hrs/week", "Application Security (SSDLC, OWASP)",
    "Build security into the software lifecycle instead of bolting it on.",
    ["Threat modelling with STRIDE", "Secure coding patterns and pitfalls", "SAST, DAST and dependency scanning", "CI/CD pipeline security gates", "Vulnerability management for dev teams"]),
  c("specialized", "daniel", "Intermediate", "4 weeks", "7 hrs/week", "Cryptography (Basics, PKI)",
    "Use cryptography correctly — and recognise when it is misused.",
    ["Symmetric and asymmetric primitives", "Hashing, HMAC and signatures", "TLS handshake in detail", "PKI, CAs and certificate lifecycle", "Key management and rotation"]),
  c("specialized", "daniel", "Advanced", "4 weeks", "8 hrs/week", "Malware and Threat Intelligence",
    "Analyse malicious code and turn intel into detections.",
    ["Static and dynamic analysis lab", "Ransomware and loader behaviour", "IOC and YARA rule writing", "Intel sources and ATT&CK mapping", "Threat briefing production"]),
  c("specialized", "daniel", "Intermediate", "4 weeks", "7 hrs/week", "Identity and Access Management (IAM)",
    "Fundamentals through SSO, MFA, PAM and zero trust.",
    ["Identity lifecycle and provisioning", "SAML, OAuth 2.0 and OIDC", "MFA and adaptive authentication", "PAM and secrets management", "Zero-trust access design"]),
  c("specialized", "daniel", "Advanced", "4 weeks", "7 hrs/week", "Industrial and Emerging Technologies",
    "IoT, OT/ICS, AI security, blockchain and post-quantum readiness.",
    ["OT/ICS architectures and Purdue model", "IoT device and firmware weaknesses", "AI/LLM abuse and prompt injection", "Blockchain and smart contract risk", "Post-quantum migration planning"]),
  c("specialized", "aisha", "Intermediate", "3 weeks", "5 hrs/week", "IT Risk Management",
    "Connect technology risk to business decisions.",
    ["Risk taxonomy and appetite", "Control mapping and gap analysis", "Key risk indicators", "Vendor and cloud risk", "Risk committee reporting"]),
];

export const courseBySlug = (slug: string) => courses.find((course) => course.slug === slug);
export const coursesByCategory = (category: string) =>
  courses.filter((course) => course.category === category);
export const categoryBySlug = (slug: string) => categories.find((cat) => cat.slug === slug);

export const enrollmentStatuses: Record<string, { label: string; description: string }> = {
  submitted: {
    label: "Application received",
    description: "We have your application and it is queued for review by the admissions team.",
  },
  in_review: {
    label: "Under review",
    description: "An advisor is confirming your course fit and the next available cohort.",
  },
  accepted: {
    label: "Offer issued",
    description: "You have a seat offer. Check your email for payment and onboarding details.",
  },
  enrolled: {
    label: "Enrolled",
    description: "You are confirmed on the cohort. Class details and lab access have been sent.",
  },
  declined: {
    label: "Not proceeding",
    description: "This application is closed. You are welcome to apply for another cohort.",
  },
};

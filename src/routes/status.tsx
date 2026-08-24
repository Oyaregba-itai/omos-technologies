import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";
import { Loader2, Search } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { enrollmentStatuses, statusMeta } from "@/lib/courses";
import { getEnrollmentStatus } from "@/lib/enrollments.functions";

const searchSchema = z.object({
  ref: z.string().optional(),
});

type Application = {
  reference: string;
  full_name: string;
  course_title: string;
  mode: string;
  status: string;
  status_message: string | null;
  created_at: string;
  updated_at: string;
};

export const Route = createFileRoute("/status")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Track Your Application | OMOS Technologies" },
      {
        name: "description",
        content:
          "Check the status of your OMOS Technologies enrollment application with your reference code and email address.",
      },
      { property: "og:title", content: "Track Your Application | OMOS Technologies" },
      {
        property: "og:description",
        content: "Check your enrollment application status with your reference code.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StatusPage,
});

function StatusPage() {
  const { ref } = Route.useSearch();
  const lookup = useServerFn(getEnrollmentStatus);

  const [reference, setReference] = useState(ref ?? "");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setApplication(null);
    setPending(true);
    try {
      const result = await lookup({ data: { reference, email } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setApplication(result.application as Application);
    } catch (err) {
      console.error(err);
      setError("Lookup failed. Please try again.");
    } finally {
      setPending(false);
    }
  };

  const currentMeta = application
    ? statusMeta[application.status] ?? statusMeta.submitted
    : null;

  return (
    <SiteShell>
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
            Track your application
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Enter your reference code and the email you applied with to see the latest status update
            from admissions.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 py-14">
        <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-[2fr_2fr_1fr]">
          <div>
            <label
              htmlFor="reference"
              className="font-display text-sm font-bold uppercase tracking-wide text-primary"
            >
              Reference code
            </label>
            <input
              id="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="OMOS-XXXXXX"
              required
              maxLength={20}
              className="mt-2 w-full border-2 border-border bg-background px-3 py-2.5 uppercase outline-none transition-colors focus:border-primary"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="font-display text-sm font-bold uppercase tracking-wide text-primary"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
              className="mt-2 w-full border-2 border-border bg-background px-3 py-2.5 outline-none transition-colors focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center gap-2 self-end bg-primary px-5 py-3 font-display font-bold uppercase text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {pending ? <Loader2 className="size-5 animate-spin" /> : <Search className="size-5" />}
            Check
          </button>
        </form>

        {error && (
          <p className="mt-6 border-l-4 border-destructive bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {application && currentMeta && (
          <div className="mt-10 border-t-4 border-primary bg-card shadow-sm">
            <div className="border-b border-border p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {application.reference}
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-primary">
                    {application.course_title}
                  </p>
                  <p className="text-sm text-foreground/70">
                    {application.full_name} · {application.mode}
                  </p>
                </div>
                <span className={`border px-3 py-1.5 font-display text-sm font-bold uppercase ${currentMeta.badgeClass}`}>
                  {currentMeta.label}
                </span>
              </div>
              <p className="mt-4 text-foreground/80">
                {application.status_message ?? currentMeta.description}
              </p>
            </div>

            <ol className="p-6">
              {enrollmentStatuses.map((status, index) => {
                const currentIndex = enrollmentStatuses.indexOf(application.status);
                const reached = index <= currentIndex;
                const isCurrent = index === currentIndex;
                return (
                  <li key={status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex size-8 items-center justify-center rounded-full font-display text-sm font-bold ${
                          isCurrent
                            ? "bg-secondary text-secondary-foreground"
                            : reached
                              ? "bg-primary text-primary-foreground"
                              : "border-2 border-border text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </span>
                      {index < enrollmentStatuses.length - 1 && (
                        <span
                          className={`w-0.5 flex-1 ${index < currentIndex ? "bg-primary" : "bg-border"}`}
                        />
                      )}
                    </div>
                    <div className="pb-6">
                      <p
                        className={`font-display text-sm font-bold uppercase ${
                          isCurrent ? "text-crimson" : reached ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {statusMeta[status].label}
                      </p>
                      <p className="mt-0.5 text-sm text-foreground/70">{statusMeta[status].description}</p>
                      {isCurrent && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Updated {new Date(application.updated_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </SiteShell>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { categories, courses, coursesByCategory } from "@/lib/courses";
import { submitEnrollment } from "@/lib/enrollments.functions";

const searchSchema = z.object({
  course: z.string().optional(),
});

export const Route = createFileRoute("/enroll")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Enroll in a Cybersecurity Course | OMOS Technologies" },
      {
        name: "description",
        content:
          "Apply for an OMOS Technologies cybersecurity cohort. Submit your application in two minutes and track its status with your reference code.",
      },
      { property: "og:title", content: "Enroll in a Cybersecurity Course | OMOS Technologies" },
      {
        property: "og:description",
        content: "Submit your enrollment application and track its status with a reference code.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EnrollPage,
});

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Enter a reachable phone number").max(30),
  courseSlug: z.string().min(1, "Select a course"),
  mode: z.enum(["online", "onsite", "hybrid"]),
  notes: z.string().trim().max(1000, "Keep notes under 1000 characters").optional(),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>;

function EnrollPage() {
  const { course: preselected } = Route.useSearch();
  const navigate = useNavigate();
  const submit = useServerFn(submitEnrollment);

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseSlug: courses.some((c) => c.slug === preselected) ? preselected! : "",
    mode: "online" as "online" | "onsite" | "hybrid",
    notes: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const selectedCourse = courses.find((c) => c.slug === values.courseSlug);

  const set = (key: keyof typeof values) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setPending(true);
    try {
      const result = await submit({
        data: {
          fullName: parsed.data.fullName,
          email: parsed.data.email,
          phone: parsed.data.phone,
          courseSlug: parsed.data.courseSlug,
          courseTitle: selectedCourse?.title ?? parsed.data.courseSlug,
          mode: parsed.data.mode,
          notes: parsed.data.notes ?? "",
        },
      });
      if (!result.ok) {
        setFormError(result.error);
        return;
      }
      setReference(result.reference);
    } catch (error) {
      console.error(error);
      setFormError("Something went wrong submitting your application. Please try again.");
    } finally {
      setPending(false);
    }
  };

  if (reference) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-2xl px-5 py-20 text-center">
          <CheckCircle2 className="mx-auto size-14 text-emerald" />
          <h1 className="mt-6 font-display text-3xl font-extrabold uppercase tracking-tight text-primary">
            Application received
          </h1>
          <p className="mt-3 text-foreground/70">
            Thank you, {values.fullName.split(" ")[0]}. Your application for{" "}
            <strong>{selectedCourse?.title}</strong> is with the admissions team. A confirmation is on
            its way to {values.email}.
          </p>
          <div className="mt-8 border-t-4 border-secondary bg-card p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Your reference code
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold tracking-widest text-primary">
              {reference}
            </p>
            <p className="mt-3 text-sm text-foreground/70">
              Keep this code — you need it plus your email to check your status.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate({ to: "/status", search: { ref: reference } })}
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 font-display font-bold uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Track my application
            </button>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 border-2 border-primary px-6 py-3 font-display font-bold uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Back to catalog
            </Link>
          </div>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
            Enrollment application
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Two minutes to apply. You get a reference code immediately, a confirmation email, and
            status updates as admissions reviews your application.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 lg:grid-cols-[3fr_2fr]">
        <form onSubmit={onSubmit} noValidate className="space-y-6">
          <Field label="Full name" error={errors.fullName} htmlFor="fullName">
            <input
              id="fullName"
              value={values.fullName}
              onChange={(e) => set("fullName")(e.target.value)}
              maxLength={100}
              autoComplete="name"
              className={inputClass}
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Email address" error={errors.email} htmlFor="email">
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={(e) => set("email")(e.target.value)}
                maxLength={255}
                autoComplete="email"
                className={inputClass}
              />
            </Field>
            <Field label="Phone number" error={errors.phone} htmlFor="phone">
              <input
                id="phone"
                type="tel"
                value={values.phone}
                onChange={(e) => set("phone")(e.target.value)}
                maxLength={30}
                autoComplete="tel"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Course" error={errors.courseSlug} htmlFor="courseSlug">
            <select
              id="courseSlug"
              value={values.courseSlug}
              onChange={(e) => set("courseSlug")(e.target.value)}
              className={inputClass}
            >
              <option value="">Select a course…</option>
              {categories.map((category) => (
                <optgroup key={category.slug} label={category.title}>
                  {coursesByCategory(category.slug).map((course) => (
                    <option key={course.slug} value={course.slug}>
                      {course.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Field>

          <fieldset>
            <legend className="font-display text-sm font-bold uppercase tracking-wide text-primary">
              Study mode
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {(["online", "onsite", "hybrid"] as const).map((mode) => (
                <label
                  key={mode}
                  className={`cursor-pointer border-2 px-4 py-2 font-display text-sm font-bold uppercase transition-colors ${
                    values.mode === mode
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground/70 hover:border-primary"
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value={mode}
                    checked={values.mode === mode}
                    onChange={() => set("mode")(mode)}
                    className="sr-only"
                  />
                  {mode}
                </label>
              ))}
            </div>
          </fieldset>

          <Field label="Anything we should know? (optional)" error={errors.notes} htmlFor="notes">
            <textarea
              id="notes"
              value={values.notes}
              onChange={(e) => set("notes")(e.target.value)}
              maxLength={1000}
              rows={4}
              className={inputClass}
            />
          </Field>

          {formError && (
            <p className="border-l-4 border-destructive bg-destructive/10 p-3 text-sm text-destructive">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 bg-primary px-8 py-4 font-display text-lg font-bold uppercase text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {pending ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-5" />}
            {pending ? "Submitting…" : "Submit application"}
          </button>
        </form>

        <aside className="h-fit border-t-4 border-primary bg-card p-6 shadow-sm">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
            {selectedCourse ? "Selected course" : "How it works"}
          </h2>
          {selectedCourse ? (
            <>
              <p className="mt-3 font-display text-lg font-bold text-primary">
                {selectedCourse.title}
              </p>
              <p className="mt-2 text-sm text-foreground/70">{selectedCourse.summary}</p>
              <p className="mt-4 text-sm font-semibold text-crimson">
                {selectedCourse.duration} · {selectedCourse.hoursPerWeek} · {selectedCourse.level}
              </p>
              <Link
                to="/courses/$slug"
                params={{ slug: selectedCourse.slug }}
                className="mt-4 inline-block text-sm font-bold uppercase text-primary underline"
              >
                View syllabus
              </Link>
            </>
          ) : (
            <ol className="mt-4 space-y-3 text-sm text-foreground/75">
              <li>1. Pick a course and submit this form.</li>
              <li>2. Get a reference code and confirmation email instantly.</li>
              <li>3. Admissions reviews and issues your seat offer.</li>
              <li>4. Track every status change on the status page.</li>
            </ol>
          )}
        </aside>
      </div>
    </SiteShell>
  );
}

const inputClass =
  "mt-2 w-full border-2 border-border bg-background px-3 py-2.5 text-foreground outline-none transition-colors focus:border-primary";

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error: string | undefined;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="font-display text-sm font-bold uppercase tracking-wide text-primary"
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}

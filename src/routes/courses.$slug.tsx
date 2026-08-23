import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, GaugeCircle, CalendarDays, ArrowRight, ArrowLeft, Award } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { categoryBySlug, courseBySlug, coursesByCategory, instructors } from "@/lib/courses";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = courseBySlug(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Course not found | OMOS Technologies" }, { name: "robots", content: "noindex" }],
      };
    }
    const { course } = loaderData;
    const title = `${course.title} | OMOS Technologies`;
    return {
      meta: [
        { title },
        { name: "description", content: `${course.summary} ${course.duration}, ${course.level} level.` },
        { property: "og:title", content: title },
        { property: "og:description", content: course.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CourseDetail,
  notFoundComponent: CourseNotFound,
});

function CourseNotFound() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold uppercase text-primary">Course not found</h1>
        <p className="mt-3 text-foreground/70">This course is not in the current catalog.</p>
        <Link
          to="/courses"
          className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 font-display font-bold uppercase text-primary-foreground"
        >
          Browse the catalog
        </Link>
      </div>
    </SiteShell>
  );
}

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const instructor = instructors[course.instructor]!;
  const category = categoryBySlug(course.category);
  const related = coursesByCategory(course.category)
    .filter((c) => c.slug !== course.slug)
    .slice(0, 3);

  return (
    <SiteShell>
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-secondary"
          >
            <ArrowLeft className="size-4" /> {category?.title ?? "Catalog"}
          </Link>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
            {course.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">{course.summary}</p>
          <dl className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="border-l-4 border-secondary pl-4">
              <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary-foreground/60">
                <Clock className="size-4" /> Duration
              </dt>
              <dd className="mt-1 font-display text-xl font-bold">{course.duration}</dd>
              <dd className="text-sm text-primary-foreground/70">{course.hoursPerWeek}</dd>
            </div>
            <div className="border-l-4 border-secondary pl-4">
              <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary-foreground/60">
                <GaugeCircle className="size-4" /> Level
              </dt>
              <dd className="mt-1 font-display text-xl font-bold">{course.level}</dd>
              <dd className="text-sm text-primary-foreground/70">Certificate on completion</dd>
            </div>
            <div className="border-l-4 border-secondary pl-4">
              <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary-foreground/60">
                <CalendarDays className="size-4" /> Delivery
              </dt>
              <dd className="mt-1 font-display text-xl font-bold">Online or on-site</dd>
              <dd className="text-sm text-primary-foreground/70">Evening and weekend cohorts</dd>
            </div>
          </dl>
          <Link
            to="/enroll"
            search={{ course: course.slug }}
            className="mt-9 inline-flex items-center gap-2 bg-secondary px-7 py-3.5 font-display text-lg font-bold uppercase text-secondary-foreground transition-colors hover:bg-secondary/85"
          >
            Enroll in this course <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-primary">
            Syllabus
          </h2>
          <ol className="mt-6 space-y-4">
            {course.topics.map((topic, index) => (
              <li key={topic} className="flex gap-4 border-l-4 border-secondary bg-card p-4 shadow-sm">
                <span className="font-display text-lg font-extrabold text-crimson">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-sm font-bold uppercase text-muted-foreground">
                    Module {index + 1}
                  </p>
                  <p className="mt-1 text-foreground/85">{topic}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="mt-12 font-display text-2xl font-bold uppercase tracking-wide text-primary">
            What you leave with
          </h2>
          <ul className="mt-5 space-y-2 text-foreground/80">
            <li className="flex gap-2">
              <Award className="mt-0.5 size-4 shrink-0 text-emerald" /> An OMOS certificate of
              completion for {course.title}.
            </li>
            <li className="flex gap-2">
              <Award className="mt-0.5 size-4 shrink-0 text-emerald" /> Lab evidence and reports you
              can show in interviews.
            </li>
            <li className="flex gap-2">
              <Award className="mt-0.5 size-4 shrink-0 text-emerald" /> A study plan for the matching
              industry certification exam.
            </li>
          </ul>
        </div>

        <aside>
          <div className="border-t-4 border-primary bg-card p-6 shadow-sm">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Your instructor
            </h2>
            <p className="mt-3 font-display text-xl font-bold text-primary">{instructor.name}</p>
            <p className="text-sm font-semibold text-crimson">{instructor.title}</p>
            <p className="mt-3 text-sm text-foreground/70">{instructor.bio}</p>
            <p className="mt-4 border-t border-border pt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {instructor.credentials}
            </p>
          </div>

          {related.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
                Also in {category?.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to="/courses/$slug"
                      params={{ slug: item.slug }}
                      className="block border-l-2 border-secondary py-1 pl-3 text-sm font-semibold text-primary hover:text-crimson"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </SiteShell>
  );
}

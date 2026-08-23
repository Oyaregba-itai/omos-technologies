import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, User, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { categories, coursesByCategory, instructors } from "@/lib/courses";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Cybersecurity Course Catalog | OMOS Technologies" },
      {
        name: "description",
        content:
          "Browse every OMOS Technologies cybersecurity course: beginner tracks, ethical hacking, networking, cloud security, GRC and specialised programs with duration and instructor details.",
      },
      { property: "og:title", content: "Cybersecurity Course Catalog | OMOS Technologies" },
      {
        property: "og:description",
        content: "Duration, syllabus and instructor details for every OMOS cybersecurity course.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CourseCatalog,
});

function CourseCatalog() {
  return (
    <SiteShell>
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
            Cybersecurity course catalog
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            {categories.length} tracks, every course with its own syllabus, duration and instructor.
            Admission is open for the current cohort.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-14">
        {categories.map((category) => (
          <section key={category.slug} className="mb-14">
            <div className="inline-block border-b-4 border-secondary bg-primary px-4 py-2">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-primary-foreground">
                {category.title}
              </h2>
            </div>
            <p className="mt-4 max-w-2xl text-foreground/70">{category.blurb}</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {coursesByCategory(category.slug).map((course) => (
                <Link
                  key={course.slug}
                  to="/courses/$slug"
                  params={{ slug: course.slug }}
                  className="group flex flex-col border-t-4 border-primary bg-card p-5 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <h3 className="font-display text-base font-bold uppercase leading-snug text-primary">
                    {course.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm text-foreground/70">{course.summary}</p>
                  <dl className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="size-3.5 text-emerald" />
                      <span>
                        {course.duration} · {course.hoursPerWeek} · {course.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="size-3.5 text-emerald" />
                      <span>{instructors[course.instructor]?.name}</span>
                    </div>
                  </dl>
                  <span className="mt-4 inline-flex items-center gap-1 font-display text-sm font-bold uppercase text-crimson">
                    View course
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SiteShell>
  );
}

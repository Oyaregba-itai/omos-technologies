import { StrictMode, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  Clock,
  GaugeCircle,
  Globe,
  GraduationCap,
  Loader2,
  Search,
  Send,
  Shield,
  User,
  Users,
} from 'lucide-react';
import { z } from 'zod';
import { categories, courseBySlug, courses, coursesByCategory, enrollmentStatuses, instructors } from './lib/courses';

const formSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name').max(100, 'Name is too long'),
  email: z.string().trim().email('Enter a valid email address').max(255),
  phone: z.string().trim().min(7, 'Enter a reachable phone number').max(30),
  courseSlug: z.string().min(1, 'Select a course'),
  mode: z.enum(['online', 'onsite', 'hybrid']),
  notes: z.string().trim().max(1000, 'Keep notes under 1000 characters').optional(),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>;

function App() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect && redirect.startsWith('/')) {
      navigate(redirect, { replace: true });
    }
  }, [navigate, redirect]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<CourseCatalogPage />} />
      <Route path="/courses/:slug" element={<CourseDetailPage />} />
      <Route path="/enroll" element={<EnrollPage />} />
      <Route path="/status" element={<StatusPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/enroll', label: 'Enroll' },
    { to: '/status', label: 'Status' },
  ] as const;

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <header className="sticky top-0 z-50 border-b-4 border-secondary bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="size-6 text-secondary" />
            <span className="font-display text-base font-extrabold tracking-tight sm:text-lg">
              OMOS TECHNOLOGIES
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold uppercase tracking-wide md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => (isActive ? 'text-secondary' : 'hover:text-secondary')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/enroll"
            className="rounded-sm bg-secondary px-4 py-2 font-display text-sm font-bold uppercase text-secondary-foreground transition-colors hover:bg-secondary/85"
          >
            Apply now
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-primary py-10 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 text-center">
          <div className="flex items-center gap-2">
            <Globe className="size-5 text-secondary" />
            <span className="font-display text-lg font-bold">www.omostechnologies.com</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-5 text-sm font-semibold uppercase tracking-wide">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-secondary">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} OMOS Technologies. Cybersecurity training and certification.
          </p>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <AppShell>
      <main id="top">
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
                src="/hero-instructor.jpg"
                alt="Cybersecurity instructor reviewing a security operations dashboard"
                width={1024}
                height={1280}
                className="relative w-full object-cover shadow-2xl"
              />
            </div>
          </div>
        </section>

        <section id="programs" className="border-b border-border bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
            {[
              { icon: GraduationCap, t: 'Hands-on labs', d: 'Practise on real tools: Kali Linux, SIEM, cloud consoles.' },
              { icon: Award, t: 'Certification ready', d: 'Courses mapped to ISO 27001, NIST and industry exams.' },
              { icon: Users, t: 'Mentored cohorts', d: 'Small groups guided by practising security professionals.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t}>
                <Icon className="size-8 text-secondary" />
                <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-wide">{t}</h3>
                <p className="mt-2 text-sm text-primary-foreground/75">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="catalog" className="mx-auto max-w-6xl px-5 py-16">
          <div className="inline-block border-b-4 border-secondary bg-primary px-5 py-3">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-primary-foreground">
              Cybersecurity course catalog
            </h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((group) => (
              <div key={group.slug} className="border-t-4 border-primary bg-card p-5 shadow-sm">
                <h3 className="font-display text-base font-bold uppercase tracking-wide text-primary">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {coursesByCategory(group.slug).map((course) => (
                    <li key={course.slug} className="flex gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald" />
                      <Link to={`/courses/${course.slug}`} className="hover:text-crimson hover:underline">
                        {course.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="enroll" className="border-y border-border bg-accent">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
            <img
              src="/lab.jpg"
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

        <section id="apply" className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-primary">
            Secure your seat
          </h2>
          <p className="mt-3 text-foreground/70">
            Registration is open for the current cohort. Reach out and our admissions team will guide
            you through course selection and payment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/enroll"
              className="inline-flex items-center gap-2 bg-primary px-8 py-4 font-display text-lg font-bold uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Register online <ArrowRight className="size-5" />
            </Link>
            <a
              href="mailto:admissions@omostechnologies.com"
              className="inline-flex items-center gap-2 border-2 border-primary px-8 py-4 font-display text-lg font-bold uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Email admissions
            </a>
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function CourseCatalogPage() {
  return (
    <AppShell>
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
                  to={`/courses/${course.slug}`}
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
    </AppShell>
  );
}

function CourseDetailPage() {
  const { slug } = useParams();
  const course = slug ? courseBySlug(slug) : undefined;

  if (!course) {
    return (
      <AppShell>
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
      </AppShell>
    );
  }

  const instructor = instructors[course.instructor]!;
  const category = categories.find((item) => item.slug === course.category);
  const related = coursesByCategory(course.category).filter((item) => item.slug !== course.slug).slice(0, 3);

  return (
    <AppShell>
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-secondary"
          >
            <ArrowLeft className="size-4" /> {category?.title ?? 'Catalog'}
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
            state={{ course: course.slug }}
            className="mt-9 inline-flex items-center gap-2 bg-secondary px-7 py-3.5 font-display text-lg font-bold uppercase text-secondary-foreground transition-colors hover:bg-secondary/85"
          >
            Enroll in this course <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-primary">Syllabus</h2>
          <ol className="mt-6 space-y-4">
            {course.topics.map((topic, index) => (
              <li key={topic} className="flex gap-4 border-l-4 border-secondary bg-card p-4 shadow-sm">
                <span className="font-display text-lg font-extrabold text-crimson">
                  {String(index + 1).padStart(2, '0')}
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
              <Award className="mt-0.5 size-4 shrink-0 text-emerald" /> An OMOS certificate of completion for {course.title}.
            </li>
            <li className="flex gap-2">
              <Award className="mt-0.5 size-4 shrink-0 text-emerald" /> Lab evidence and reports you can show in interviews.
            </li>
            <li className="flex gap-2">
              <Award className="mt-0.5 size-4 shrink-0 text-emerald" /> A study plan for the matching industry certification exam.
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
                      to={`/courses/${item.slug}`}
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
    </AppShell>
  );
}

function EnrollPage() {
  const navigate = useNavigate();
  const location = window.location; // kept simple for static route state fallback
  const preselected = (location as Location & { state?: { course?: string } }).state?.course ?? '';

  const [values, setValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    courseSlug: courses.some((course) => course.slug === preselected) ? preselected : '',
    mode: 'online' as 'online' | 'onsite' | 'hybrid',
    notes: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const selectedCourse = useMemo(() => courses.find((course) => course.slug === values.courseSlug), [values.courseSlug]);

  const setValue = (key: keyof typeof values) => (value: string) => {
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
      const referenceCode = `OMOS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      setReference(referenceCode);
    } catch (error) {
      console.error(error);
      setFormError('Something went wrong submitting your application. Please try again.');
    } finally {
      setPending(false);
    }
  };

  if (reference) {
    return (
      <AppShell>
        <div className="mx-auto max-w-2xl px-5 py-20 text-center">
          <CheckCircle2 className="mx-auto size-14 text-emerald" />
          <h1 className="mt-6 font-display text-3xl font-extrabold uppercase tracking-tight text-primary">
            Application received
          </h1>
          <p className="mt-3 text-foreground/70">
            Thank you, {values.fullName.split(' ')[0]}. Your application for <strong>{selectedCourse?.title}</strong> is with the admissions team. We will contact you at {values.email} as your application progresses.
          </p>
          <div className="mt-8 border-t-4 border-secondary bg-card p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Your reference code</p>
            <p className="mt-2 font-display text-3xl font-extrabold tracking-widest text-primary">{reference}</p>
            <p className="mt-3 text-sm text-foreground/70">
              Keep this code — you need it plus your email to check your status.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate(`/status?ref=${encodeURIComponent(reference)}`)}
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
      </AppShell>
    );
  }

  return (
    <AppShell>
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
              onChange={(event) => setValue('fullName')(event.target.value)}
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
                onChange={(event) => setValue('email')(event.target.value)}
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
                onChange={(event) => setValue('phone')(event.target.value)}
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
              onChange={(event) => setValue('courseSlug')(event.target.value)}
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
              {(['online', 'onsite', 'hybrid'] as const).map((mode) => (
                <label
                  key={mode}
                  className={`cursor-pointer border-2 px-4 py-2 font-display text-sm font-bold uppercase transition-colors ${
                    values.mode === mode
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-foreground/70 hover:border-primary'
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value={mode}
                    checked={values.mode === mode}
                    onChange={() => setValue('mode')(mode)}
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
              onChange={(event) => setValue('notes')(event.target.value)}
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
            {pending ? 'Submitting…' : 'Submit application'}
          </button>
        </form>

        <aside className="h-fit border-t-4 border-primary bg-card p-6 shadow-sm">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
            {selectedCourse ? 'Selected course' : 'How it works'}
          </h2>
          {selectedCourse ? (
            <>
              <p className="mt-3 font-display text-lg font-bold text-primary">{selectedCourse.title}</p>
              <p className="mt-2 text-sm text-foreground/70">{selectedCourse.summary}</p>
              <p className="mt-4 text-sm font-semibold text-crimson">
                {selectedCourse.duration} · {selectedCourse.hoursPerWeek} · {selectedCourse.level}
              </p>
              <Link to={`/courses/${selectedCourse.slug}`} className="mt-4 inline-block text-sm font-bold uppercase text-primary underline">
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
    </AppShell>
  );
}

const statusOrder = ['submitted', 'in_review', 'accepted', 'enrolled', 'declined'] as const;

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

function StatusPage() {
  const [searchParams] = useSearchParams();
  const prefilledRef = searchParams.get('ref') ?? '';

  const [reference, setReference] = useState(prefilledRef);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setApplication(null);
    setPending(true);
    try {
      const fallback = {
        reference: reference.trim().toUpperCase(),
        full_name: 'Demo Student',
        course_title: 'Cybersecurity Fundamentals',
        mode: 'online',
        status: 'submitted',
        status_message: 'Your application has been received and is under review.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (!reference || !email) {
        setError('Please enter both your reference code and email address.');
        return;
      }

      setApplication(fallback as Application);
    } catch (err) {
      console.error(err);
      setError('Lookup failed. Please try again.');
    } finally {
      setPending(false);
    }
  };

  const currentMeta = application ? (enrollmentStatuses[application.status] ?? enrollmentStatuses.submitted) : null;

  return (
    <AppShell>
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
            <label htmlFor="reference" className="font-display text-sm font-bold uppercase tracking-wide text-primary">
              Reference code
            </label>
            <input
              id="reference"
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              placeholder="OMOS-XXXXXX"
              required
              maxLength={20}
              className="mt-2 w-full border-2 border-border bg-background px-3 py-2.5 uppercase outline-none transition-colors focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-display text-sm font-bold uppercase tracking-wide text-primary">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
                <span className="border-2 border-primary bg-primary/5 px-3 py-1.5 font-display text-sm font-bold uppercase text-primary">
                  {currentMeta.label}
                </span>
              </div>
              <p className="mt-4 text-foreground/80">
                {application.status_message ?? currentMeta.description}
              </p>
            </div>

            <ol className="p-6">
              {statusOrder.map((status, index) => {
                const currentIndex = statusOrder.indexOf((application.status as (typeof statusOrder)[number]) ?? 'submitted');
                const reached = index <= currentIndex;
                const isCurrent = index === currentIndex;
                return (
                  <li key={status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex size-8 items-center justify-center rounded-full font-display text-sm font-bold ${
                          isCurrent
                            ? 'bg-secondary text-secondary-foreground'
                            : reached
                              ? 'bg-primary text-primary-foreground'
                              : 'border-2 border-border text-muted-foreground'
                        }`}
                      >
                        {index + 1}
                      </span>
                      {index < statusOrder.length - 1 && (
                        <span
                          className={`w-0.5 flex-1 ${index < currentIndex ? 'bg-primary' : 'bg-border'}`}
                        />
                      )}
                    </div>
                    <div className="pb-6">
                      <p
                        className={`font-display text-sm font-bold uppercase ${
                          isCurrent ? 'text-crimson' : reached ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        {enrollmentStatuses[status]?.label}
                      </p>
                      <p className="mt-0.5 text-sm text-foreground/70">
                        {enrollmentStatuses[status]?.description}
                      </p>
                      {isCurrent && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Updated {new Date(application.updated_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
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
    </AppShell>
  );
}

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
      <label htmlFor={htmlFor} className="font-display text-sm font-bold uppercase tracking-wide text-primary">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}

const inputClass =
  'mt-2 w-full border-2 border-border bg-background px-3 py-2.5 text-foreground outline-none transition-colors focus:border-primary';

export function renderApp() {
  const root = document.getElementById('root');

  if (!root) {
    return;
  }

  ReactDOM.createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
}

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const applySchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  courseSlug: z.string().trim().min(2).max(120),
  courseTitle: z.string().trim().min(2).max(160),
  mode: z.enum(["online", "onsite", "hybrid"]),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

const lookupSchema = z.object({
  reference: z.string().trim().min(4).max(20),
  email: z.string().trim().email().max(255),
});

function makeReference() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `OMOS-${code}`;
}

export const submitEnrollment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => applySchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const reference = makeReference();

    const { error } = await supabaseAdmin.from("enrollments").insert({
      reference,
      full_name: data.fullName,
      email: data.email.toLowerCase(),
      phone: data.phone,
      course_slug: data.courseSlug,
      course_title: data.courseTitle,
      mode: data.mode,
      notes: data.notes || null,
      status: "submitted",
    });

    if (error) {
      console.error("enrollment insert failed", error.message);
      return { ok: false as const, error: "We could not save your application. Please try again." };
    }

    return { ok: true as const, reference };
  });

export const getEnrollmentStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => lookupSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("enrollments")
      .select("reference, full_name, course_title, mode, status, status_message, created_at, updated_at")
      .eq("reference", data.reference.trim().toUpperCase())
      .eq("email", data.email.trim().toLowerCase())
      .maybeSingle();

    if (error) {
      console.error("enrollment lookup failed", error.message);
      return { ok: false as const, error: "Lookup failed. Please try again." };
    }
    if (!row) {
      return { ok: false as const, error: "No application matches that reference and email." };
    }
    return { ok: true as const, application: row };
  });

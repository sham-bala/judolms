"use server";

import { z } from "zod";
import { insertAttendance } from "./attendance.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  lessonId: z.string(),
});

const CreateAttendance = FormSchema.omit({ id: true });

export async function createAttendance(
  rawLessonId: string,
  rawStudentId: string
) {
  const { studentId, lessonId } = CreateAttendance.parse({
    studentId: rawStudentId,
    lessonId: rawLessonId,
  });

  await insertAttendance({ studentId, lessonId });
  revalidatePath("/attendances/" + lessonId);
  redirect("/attendances/" + lessonId);
}

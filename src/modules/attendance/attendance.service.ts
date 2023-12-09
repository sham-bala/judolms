import { sql } from "@vercel/postgres";

import { unstable_noStore as noStore } from "next/cache";
import { AttendanceWithStudents, NewAttendance } from "./attendance.type";

export async function insertAttendance(
  attendance: NewAttendance
): Promise<boolean> {
  noStore();

  const { studentId, lessonId } = attendance;

  try {
    const result = await sql`
      SELECT *
      FROM attendances
      WHERE student_id = ${studentId} AND lesson_id = ${lessonId};
    `;
    console.log("result", result);
    if (result.rowCount) {
      await sql`
      DELETE FROM attendances
      WHERE student_id = ${studentId} AND lesson_id = ${lessonId};
      `;
      return true;
    }
    await sql`
      INSERT INTO attendances (student_id, lesson_id)
      VALUES (${studentId}, ${lessonId});
    `;
    return true;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to insert new attendance");
  }
}

export async function getAttendance(
  id: string
): Promise<AttendanceWithStudents> {
  noStore();
  console.log("Fetching Attendances data...");
  try {
    const data = await sql<AttendanceWithStudents>`    
    SELECT
        g.name AS "groupName",
        g.id AS "groupId",
        s.id AS "lessonId",
        s.start_time AS "lessonStart",
        s.end_time AS "lessonEnd",
        array_agg(
            jsonb_build_object(
                'id', st.id,
                'name', st.name,
                'surname', st.surname,
                'image_source', st.image_source,
                'age', st.age,
                'isPresent', CASE WHEN al.student_id IS NOT NULL THEN true ELSE false END
            )
        ) AS students
    FROM
        schedules s
    LEFT JOIN student_group sg ON s.group_id = sg.group_id
    LEFT JOIN students st ON sg.student_id = st.id
    LEFT JOIN groups g ON s.group_id = g.id
    LEFT JOIN attendances al ON st.id = al.student_id AND s.id = al.lesson_id
    LEFT JOIN (
        SELECT DISTINCT sg.student_id
        FROM student_group sg
        WHERE sg.group_id IN (
            SELECT DISTINCT group_id
            FROM schedules
            WHERE id = ${id}
        )
    ) AS StudentsInGroup ON st.id = StudentsInGroup.student_id
    WHERE
        s.id = ${id}
    GROUP BY
        g.name, s.start_time, s.end_time, g.id, s.id;
    ;
      `;
    const attendances = data.rows[0];
    return attendances;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch students by group id.");
  }
}

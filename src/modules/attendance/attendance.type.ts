import { Student } from "../student/student.type";

type AttendanceStudent = Pick<
  Student,
  "id" | "image_source" | "name" | "surname" | "age"
> & {
  isPresent: boolean;
};

export type Attendance = {
  id: string;
  studentId: string;
  lessonId: string;
};

export type AttendanceWithStudents = {
  id: string;
  groupId: string;
  groupName: string;
  lessonId: string;
  lessonStart: string;
  lessonEnd: boolean;
  students: AttendanceStudent[];
};

export type NewAttendance = Omit<Attendance, "id">;

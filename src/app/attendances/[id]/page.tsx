import { getAttendance } from "@/modules/attendance/attendance.service";
import { List } from "@/shared/ui/components/List";
import ListItem from "@/shared/ui/components/ListItem";
import { notFound } from "next/navigation";
import { FC } from "react";

type PageProps = {
  params: { id: string };
  searchParams: {};
};

const Page: FC<PageProps> = async ({ params: { id } }) => {
  const attendance = await getAttendance(id);

  if (!attendance) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4">
      <List title={attendance.groupName} />
      {attendance.students.length ? (
        <div className="space-y-4 rounded-xl p-6 border bg-card text-card-foreground">
          {attendance.students.map((student) => {
            return (
              <ListItem
                isPresent={student.isPresent}
                lessonId={attendance.lessonId}
                studentId={student.id}
                key={student.id}
                fullName={`${student.name} ${student.surname}`}
                age={student.age}
                imageSrc={student.image_source}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Page;

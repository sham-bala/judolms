import { ReactNode } from "react";
import { notFound } from "next/navigation";
import ScheduleRepository from "@/modules/schedule/schedule.service";
import { DayTitle, Card } from "@/shared/ui/components/Card";

export default async function Page() {
  const repository = new ScheduleRepository();
  const schedules = await repository.getScheduleByRange(
    new Date("2024-01-01T00:00:00Z").toISOString(),
    new Date("2024-01-31T00:00:00Z").toISOString()
  );

  if (!schedules.length) {
    notFound();
  }
  return (
    <main className="container mx-auto px-4">
      {schedules.map((day) => {
        return (
          <div key={new Date(day.datetime).getTime()}>
            <DayTitle datetime={day.datetime} />
            {day.lessons.map((lesson) => {
              return (
                <Card
                  key={lesson.groupId}
                  title={lesson.groupName}
                  start={lesson.startTime}
                  end={lesson.endTime}
                  lessonId={lesson.id}
                />
              );
            })}
          </div>
        );
      })}
    </main>
  );
}

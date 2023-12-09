import { createAttendance } from "@/modules/attendance/attendance.action";
import Image from "next/image";
import HoldPressButton from "./HoldPressButton";

type ListItemProps = {
  fullName: string;
  age: number;
  imageSrc: string;
  lessonId: string;
  studentId: string;
  isPresent: boolean;
};
const ListItem: React.FC<ListItemProps> = ({
  fullName,
  age,
  imageSrc,
  isPresent,
  lessonId,
  studentId,
}) => {
  const createAttendanceWithId = createAttendance.bind(
    null,
    lessonId,
    studentId
  );

  return (
    <div className="flex items-center">
      <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
        <Image
          className="aspect-square h-full w-full"
          fill
          alt={`image of ${fullName}`}
          src={imageSrc}
        />
      </span>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{fullName}</p>
        <p className="text-sm text-muted-foreground">{age}</p>
      </div>
      <div className="ml-auto">
        <HoldPressButton
          isChecked={isPresent}
          callback={createAttendanceWithId}
        />
      </div>
    </div>
  );
};

export default ListItem;

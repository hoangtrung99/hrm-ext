import { useAuthStore } from "@src/lib/store";
import { UserType } from "@src/lib/types";
import { dayMapping } from "@src/lib/utils";
import { getDate, getMonth, getYear } from "date-fns";

const Welcome: React.FC = () => {
  const user = useAuthStore((state) => state?.user) as UserType;
  const personalInfo = user.employee.personal_information;
  const n = new Date();

  return (
    <div className="prose">
      <h4 className="mb-1">
        {dayMapping[n.getDay() as 0]}, {getDate(n)} tháng {getMonth(n) + 1},{" "}
        {getYear(n)}
      </h4>
      <h3>Xin chào {personalInfo.last_name + " " + personalInfo.first_name}</h3>
    </div>
  );
};

export { Welcome };

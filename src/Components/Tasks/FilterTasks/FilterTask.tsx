import { UseFormRegister } from "react-hook-form";
import "./FilterTask.css";
import { FilterElement } from "../../Types/Tasks/types";
import { useGeneral } from "../GeneralProvider";

type RegisterType = {
  register: UseFormRegister<FilterElement>;
};

export const FilterTask: React.FC<RegisterType> = ({ register }) => {
  const { generalData } = useGeneral();
  return (
    <div
      className={
        generalData.darkMode ? "filter-section" : "filter-section-light"
      }
    >
      <input
        type="text"
        {...register("searchByTitle")}
        className={generalData.darkMode ? "input" : "input-light-filter"}
        placeholder="Search By Title"
      />
      <input
        type="text"
        {...register("searchByDescription")}
        className={generalData.darkMode ? "input" : "input-light-filter"}
        placeholder="Search By Description"
      />
      <input
        type="text"
        className={generalData.darkMode ? "input" : "input-light-filter"}
        {...register("searchByBoth")}
        placeholder="Search By Title and Description"
      />
      <label className="status-filter">
        Filter By Status:
        <select
          {...register("filterStatus")}
          className={generalData.darkMode ? "input" : "input-light-filter"}
        >
          <option value={""}>All Task</option>
          <option value={`Todo`}>Todo</option>
          <option value={`In Progress`}>In Progress</option>
          <option value={`Done`}>Done</option>
        </select>
      </label>
    </div>
  );
};

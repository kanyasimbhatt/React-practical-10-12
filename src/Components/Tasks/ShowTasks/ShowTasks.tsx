import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./showTasks.css";
import { useForm } from "react-hook-form";
import { useGeneral } from "../GeneralProvider";
import { FilterTask } from "../FilterTasks/FilterTask";
import { Task, FilterElement, TodoStatus } from "../../Types/Tasks/types";

export const ShowTasks: React.FC = () => {
  const statusOptions = ["Done", "In Progress", "Todo"];
  const { generalData, dispatch } = useGeneral();
  const { register, watch } = useForm<FilterElement>({
    defaultValues: {
      searchByTitle: "",
      searchByDescription: "",
      searchByBoth: "",
      filterStatus: "",
    },
  });
  const filterContent = watch();
  const navigate = useNavigate();

  const filteredTasks = generalData.tasks.filter((t: Task) => {
    const searchedTitle = filterContent.searchByTitle
      ? searchTheGiven(t.title, filterContent.searchByTitle)
      : true;

    const searchedDescription = filterContent.searchByDescription
      ? searchTheGiven(t.description, filterContent.searchByDescription)
      : true;

    const searchedBoth = filterContent.searchByBoth
      ? searchTheGiven(t.title, filterContent.searchByBoth) &&
        searchTheGiven(t.description, filterContent.searchByBoth)
      : true;

    const searchByStatus = filterContent.filterStatus
      ? t.status === filterContent.filterStatus
      : true;

    return (
      searchedTitle && searchedDescription && searchedBoth && searchByStatus
    );
  });

  function searchTheGiven(taskValue: string, filterContentValue: string) {
    return taskValue.toLowerCase().includes(filterContentValue.toLowerCase());
  }

  const handleTaskEdit = (id: string) => {
    navigate(`/edit-task/${id}`);
  };

  const handleTaskDelete = (id: string) => {
    const newFilteredArray = generalData.tasks.filter((t: Task) => t.id !== id);
    dispatch({ type: "MODIFY_TASKS", payload: newFilteredArray });
  };

  const handleChangeOnStatus = (event: React.ChangeEvent, id: string) => {
    const newTasksArray = generalData.tasks.map((t: Task) => {
      if (t.id === id && "value" in event.target) {
        t.status = event.target.value as TodoStatus;
      }
      return t;
    });
    dispatch({ type: "MODIFY_TASKS", payload: newTasksArray });
  };

  useEffect(() => {
    localStorage.setItem("tasks-array", JSON.stringify(generalData.tasks));
  }, [generalData.tasks]);

  return (
    <>
      <FilterTask register={register} />
      <div className="show-task">
        {filteredTasks.length === 0 && (
          <div
            className={
              generalData.darkMode ? "header-wrapper" : "header-wrapper-light"
            }
          >
            <h3>No Tasks yet!</h3>
          </div>
        )}

        {filteredTasks.length !== 0 &&
          filteredTasks.map((task: Task) => (
            <div className={`card-wrapper ${task.status}`} key={task.id}>
              <div className="tasks-title">{task.title}</div>
              <div className="tasks-description">{task.description}</div>
              <select
                className="options-select"
                value={task.status}
                onChange={(event: React.ChangeEvent) =>
                  handleChangeOnStatus(event, task.id)
                }
              >
                <option disabled>{task.status}</option>
                <option>
                  {statusOptions[0] === task.status
                    ? statusOptions[1]
                    : statusOptions[0]}
                </option>
                <option>
                  {statusOptions[2] === task.status
                    ? statusOptions[1]
                    : statusOptions[2]}
                </option>
              </select>
              <div className="edit-delete-button">
                <button
                  className="edit-button"
                  onClick={() => handleTaskEdit(task.id)}
                >
                  Edit
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleTaskDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

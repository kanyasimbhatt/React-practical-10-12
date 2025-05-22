import { Navbar } from "../Navbar/Navbar";
import { AddEditForm } from "./AddEditForm";
import "./AddEditForm.css";

export const AddEditTaskWrapper: React.FC = () => {
  return (
   
      <AddEditTask />
   
  );
};

const AddEditTask: React.FC = () => {
  return (
    <>
      <Navbar buttonName={"View All Task"} />
      <div className="add-edit-form-wrapper">
        <AddEditForm />
      </div>
    </>
  );
};

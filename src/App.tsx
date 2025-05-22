import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ViewAllTaskWrapper } from "./Components/Tasks/ViewAllTasks/ViewAllTasks";
import { AddEditTaskWrapper } from "./Components/Tasks/AddOrEditTask/AddEditTask";
import { NotFound } from "./Components/Tasks/NotFound/NotFound";
import { useGeneral } from "./Components/Tasks/GeneralProvider";
import "./App.css";

function App() {
  const { generalData } = useGeneral();
  return (
    <div className={generalData.darkMode ? "" : "light-styles"}>
      <Router>
        <Routes>
          <Route path="/" element={<ViewAllTaskWrapper />}></Route>
          <Route path="/add-task" element={<AddEditTaskWrapper />}></Route>
          <Route
            path="/edit-task/:taskId"
            element={<AddEditTaskWrapper />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

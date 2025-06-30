import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ViewAllTask } from "./Components/Tasks/ViewAllTasks/ViewAllTasks";
import { AddEditTask } from "./Components/Tasks/AddOrEditTask/AddEditTask";
import { NotFound } from "./Components/Tasks/NotFound/NotFound";
import { useGeneral } from "./Components/Tasks/GeneralProvider";
import "./App.css";

function App() {
  const { generalData } = useGeneral();
  return (
    <div className={generalData.darkMode ? "" : "light-styles"}>
      <Router>
        <Routes>
          <Route path="/" element={<ViewAllTask />}></Route>
          <Route path="/add-task" element={<AddEditTask />}></Route>
          <Route path="/edit-task/:taskId" element={<AddEditTask />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import "./App.css";
import "@radix-ui/themes/styles.css";
import { Route, Routes } from "react-router-dom";
import { TaskListPage } from "./pages/TaskListPage";

function App() {
  return (
    <Routes>
      <Route path="/" Component={TaskListPage} />
    </Routes>
  );
}

export default App;

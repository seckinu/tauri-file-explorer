import { Route, Routes, useLocation, useNavigate } from "@solidjs/router";
import "./App.css";
import FileViewer from "./components/FileViewer";

function App() {
  const navigate = useNavigate();
  navigate(window.start_path);

  return (
    <div>
      <h1>Files</h1>
      <br />

      <div class="ml-1">
        <Routes>
          <Route path="*path" component={FileViewer} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import StreamPage from "./pages/StreamPage";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/stream" element={<StreamPage />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;

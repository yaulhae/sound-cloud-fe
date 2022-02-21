import { Route, Routes } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import StreamPage from "./pages/StreamPage";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Header from "./common/Header";

import Test from "./pages/Test";
import PlayBar from "./common/PlayBar";
import { useSelector } from "react-redux";
export const history = createBrowserHistory();

function App() {
  const now_playing = useSelector(({ track }) => track.now_playing);
  return (
    <HistoryRouter history={history}>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/stream" element={<StreamPage />} />
      </Routes>
      {now_playing && <PlayBar />}
    </HistoryRouter>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import StreamPage from "./pages/StreamPage";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Header from "./common/Header";
import music1 from "./static/빈지노(beezino) - Aqua Man(아쿠아맨) 가사ㅣLyricㅣsmay.mp3";
import music2 from "./static/SURAN (수란) - 1+1=0 (Feat.DEAN) Lyrics [Color Coded_Han_Rom_Eng].mp3";
import music3 from "./static/Amy Winehouse - Valerie.mp3";
import music4 from "./static/기타샘플과제.mp3";
import music5 from "./static/폴킴( Paul Kim) - 모든 날, 모든 순간 [키스 먼저 할까요#` OST] 가사.mp3";
import Test from "./pages/Test";
import PlayBar from "./common/PlayBar";
import { useSelector } from "react-redux";
import { useState } from "react";
export const history = createBrowserHistory();

function App() {
  const now_playing = useSelector(({ track }) => track.now_playing);
  // const [streamList, setStreamList] = useState([
  //   {
  //     userName: "야울해",
  //     content: "빈지노는 빈집털이",
  //     musicId: 1,
  //     musicTitle: "아쿠아맨",
  //     artistName: "빈지노",
  //     imageUrl: "https://ifh.cc/g/tIjE7w.jpg",
  //     musicUrl: music1,
  //     playCnt: 23,
  //   },
  //   {
  //     userName: "야울해",
  //     content: "청각의 쾌감",
  //     musicId: 2,
  //     musicTitle: "원플러스원",
  //     artistName: "수란",
  //     imageUrl: "https://ifh.cc/g/e14DnE.jpg",
  //     musicUrl: music2,
  //     playCnt: 23,
  //   },
  //   {
  //     userName: "야울해",
  //     content: "우아우아 우아해~",
  //     musicId: 3,
  //     musicTitle: "발레리",
  //     artistName: "에이미와인하우스",
  //     imageUrl: "https://ifh.cc/g/b7nNRH.jpg",
  //     musicUrl: music3,
  //     playCnt: 14,
  //   },
  //   {
  //     userName: "야울해",
  //     content: "빈지노는 빈집털이",
  //     musicId: 4,
  //     musicTitle: "아쿠아맨",
  //     artistName: "빈지노",
  //     imageUrl: "https://ifh.cc/g/tIjE7w.jpg",
  //     musicUrl: music4,
  //     playCnt: 23,
  //   },
  //   {
  //     userName: "야울해",
  //     content: "빈지노는 빈집털이",
  //     musicId: 4,
  //     musicTitle: "아쿠아맨",
  //     artistName: "빈지노",
  //     imageUrl: "https://ifh.cc/g/tIjE7w.jpg",
  //     musicUrl: music4,
  //     playCnt: 23,
  //   },
  // ]);
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

import { Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import StreamPage from './pages/StreamPage';
import Upload from './pages/Upload';

import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from './common/Header';
import PlayBar from './common/PlayBar';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const history = createBrowserHistory();

function App() {
    //const now_playing = useSelector(({ track }) => track.now_playing);
    const audio_player = useSelector(({ track }) => track.audio_player);

    return (
        <HistoryRouter history={history}>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/detail" element={<DetailPage />}>
                    <Route path="/detail:musicId" element={<DetailPage />} />
                </Route>
                <Route path="/stream" element={<StreamPage />} />
                <Route path="/upload" element={<Upload history={history} />} />
            </Routes>
            {audio_player && <PlayBar />}
        </HistoryRouter>
    );
}

export default App;

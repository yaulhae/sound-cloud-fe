import { Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import StreamPage from './pages/StreamPage';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from './common/Header';

import Test from './pages/Test';
export const history = createBrowserHistory();

function App() {
    return (
        <HistoryRouter history={history}>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/detail" element={<DetailPage />} />
                <Route path="/stream" element={<StreamPage />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </HistoryRouter>
    );
}

export default App;

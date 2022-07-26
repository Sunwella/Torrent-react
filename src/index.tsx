import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { HomePage } from './HomePage/HomePage';
import { SearchPage } from './SearchPage/SearchPage';
import { TrackersProvider } from './context/trackers';
import { MediaPage } from './MediaPage/MediaPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <TrackersProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path=":trackerId/:mediaId" element={<MediaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </TrackersProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

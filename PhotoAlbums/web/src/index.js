import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../src/App.css';
import {IntlProvider} from 'react-intl';
import English from './lang/en.json';
import Greek from './lang/gr.json';

const messages = {
  en: English,
  gr: Greek,
};


function Main() {
  const [locale, setLocale] = useState(navigator.language.split(/[-_]/)[0]);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <BrowserRouter>
        <App setLocale={setLocale} />
      </BrowserRouter>
    </IntlProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Main/>
);
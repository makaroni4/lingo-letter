import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import enTranslations from "./i18n/en.json"
import deTranslations from "./i18n/de.json"
import esTranslations from "./i18n/es.json"
import ptTranslations from "./i18n/pt.json"
import itTranslations from "./i18n/it.json"
import frTranslations from "./i18n/fr.json"

i18next
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: enTranslations,
      de: deTranslations,
      es: esTranslations,
      pt: ptTranslations,
      it: itTranslations,
      fr: frTranslations
    }
  });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

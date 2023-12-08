import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { I18nextProvider } from "react-i18next"
import i18next from "./i18n"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)

root.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
)

reportWebVitals()

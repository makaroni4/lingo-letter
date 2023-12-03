import './App.css';
import { useAppStore } from './store';
import { useEffect } from 'react';
import OpenAI from 'openai';
import { splitIntoSentences } from './utils/split-into-sentences';
import Settings from "./components/Settings"
import Navbar from './components/Navbar';
import { verifyEmailSubmission } from './utils/verify-email-submission';
import { useTranslation } from "react-i18next";
import WelcomeBanner from './components/WelcomeBanner';
import Footer from './components/Footer';
import Button from './components/Button';
import WelcomePopup from './components/WelcomePopup';
import TextareaAutosize from 'react-textarea-autosize';
import Markdownify from './components/Markdownify';
import VerifiedSubmission from './components/VerifiedSubmission';

function App() {
  const { t } = useTranslation();

  const {
    openAIAPIKey,
    letter, setLetter,
    incomingEmail, setIncomingEmail,
    responseTopics, setResponseTopics,
    settingsVisible, setSettingsVisible,
    originalSentences, setOriginalSentences,
    verifiedSentences, setVerifiedSentences,
    welcomeBannerCopy, setWelcomeBannerCopy,
    userLanguage,
    emailLanguage,
    showWelcomeBanner,
    showWelcomePopup
  } = useAppStore();

  let openai: any;

  if (openAIAPIKey) {
    openai = new OpenAI({
      apiKey: openAIAPIKey,
      dangerouslyAllowBrowser: true
    });
  }

  const handleFormSubmit = async () => {
    if(!letter) {
      console.log("--> empty handleFormSubmit")
      return;
    }

    setOriginalSentences([])
    setVerifiedSentences([])

    setOriginalSentences(splitIntoSentences(letter))

    verifyEmailSubmission({
      apiKey: openAIAPIKey,
      letter,
      emailLanguage: t(`languages.${emailLanguage}`)
    }).then(verifiedEmail => {
      const fixedSentences = splitIntoSentences(verifiedEmail)
      setVerifiedSentences(fixedSentences)
    })
  }

  useEffect(() => {
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLAnchorElement;
      const hash = target.hash;

      if (hash === '#settings') {
        event.preventDefault();
        setSettingsVisible(true);
      }
    })
  }, [])

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/i18n/welcome_banner/${userLanguage}.md`);
        const markdown = await response.text();

        setWelcomeBannerCopy(markdown);
      } catch (error) {
        console.error('Error loading translations', error);
      }
    };

    loadTranslations();
  }, [userLanguage]);

  return (
    <div className={`App ${showWelcomePopup && 'fixed'}`}>
      { settingsVisible && (
        <Settings />
      )}

      { showWelcomePopup && (
        <WelcomePopup />
      )}

      <Navbar />

      <div className="pb-24 px-12">
        { showWelcomeBanner && (
          <div className="mb-12">
            <WelcomeBanner />
          </div>
        ) }

        <div className='mb-12'>
          <h1 className="text-3xl font-bold mb-3 mt-8">{ t("writing_test") }</h1>

          <div className="mb-8 text-lg">
            { t("you_have_received_an_email") }
          </div>

          <div className="text-lg p-8 leading-8 bg-slate-100 rounded-md font-serif mb-8">
            <Markdownify>
              { incomingEmail }
            </Markdownify>
          </div>

          <div className="mb-5 text-lg">
            { t("answer_the_email_and_cover_topics") }
          </div>

          <div className='mb-10'>
            <ul className='list-disc list-inside'>
              { responseTopics.map((topic) => {
                return (
                  <li
                    className="text-lg mb-4 last:mb-0"
                    key={topic}>
                    { topic }
                  </li>
                )
              }) }
            </ul>
          </div>

          <div className='text-lg'>
            { t("writing_instructions") }
          </div>
        </div>


        <div className='mb-12'>
          <TextareaAutosize
            className="mb-3 p-4 text-lg w-full shadow-sm leading-10 focus:outline-none focus:ring-2 focus:ring-sky-500 ring-1 ring-gray-300 rounded-md font-serif"
            value={letter}
            minRows={8}
            onChange={(e) => setLetter(e.target.value) } />

          <div className='flex justify-end'>
            <Button
              onClick={handleFormSubmit}>
              { t("submit") }
            </Button>
          </div>
        </div>

        <VerifiedSubmission />
      </div>

      <Footer />
    </div>
  );
}

export default App;

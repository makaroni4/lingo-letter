import { useAppStore } from '../store';
import { useTranslation } from "react-i18next";
import Markdownify from './Markdownify';
import ExampleExamBadge from './ExampleExamBadge';

export default function Assignment() {
  const { t } = useTranslation();

  const {
    incomingEmail,
    responseTopics,
    showExampleExamBadge
  } = useAppStore();

  return (
    <div className='mb-12'>
      <h1 className="text-3xl font-bold mb-3 mt-8">{ t("writing_test") }</h1>

      <div className="mb-8 text-lg">
        { t("you_have_received_an_email") }
      </div>

      <div className="relative text-lg p-8 leading-8 bg-slate-100 rounded-md font-serif mb-8">
        { showExampleExamBadge && (<div className="absolute top-4 -right-8 rotate-[30deg]">
          <ExampleExamBadge />
        </div>)}

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
  )
}

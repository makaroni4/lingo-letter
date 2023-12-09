import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import EmojiCountryCodes from "../data/interface"
import { useTranslation } from "react-i18next"
import Twemoji from "./Twemoji"

export default function DropdownMenu({
  excludeLanguage,
  languageSelected
}: {
  excludeLanguage: keyof EmojiCountryCodes
  languageSelected: (language: keyof EmojiCountryCodes) => void
}) {
  const { t } = useTranslation()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ">
          <Twemoji className="mr-3" countryCode={excludeLanguage} />
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="">
            {Object.keys(t("languages", { returnObjects: true }))
              .filter((l) => l !== excludeLanguage)
              .map((languageCode) => (
                <Menu.Item key={languageCode}>
                  {({ active }) => (
                    <div
                      className="flex items-center justify-center px-3 py-2 cursor-pointer hover:bg-slate-100"
                      onClick={() => {
                        languageSelected(
                          languageCode as keyof EmojiCountryCodes
                        )
                      }}>
                      <Twemoji
                        countryCode={languageCode as keyof EmojiCountryCodes}
                      />
                    </div>
                  )}
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

import * as countryCodesJSON from "../data/flag_twemoji_codes.json"
import EmojiCountryCodes from "../data/interface"
import { MouseEventHandler } from "react"

const countryCodes: EmojiCountryCodes = countryCodesJSON

const getEmojiCode = (key: keyof EmojiCountryCodes): any => {
  return countryCodes[key]
}

export default function CountryTwemoji({
  countryCode,
  className = "",
  onClick = () => {}
}: {
  countryCode: keyof EmojiCountryCodes
  className?: string
  onClick?: MouseEventHandler
}) {
  const emojiCode = getEmojiCode(countryCode)

  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${emojiCode}.svg`}
      alt={`Flag ${countryCode.toUpperCase()}`}
      className={`w-8 ${className}`}
      onClick={onClick}
    />
  )
}

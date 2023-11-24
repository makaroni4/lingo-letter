import * as countryCodesJSON from "../data/flag_twemoji_codes.json"
import EmojiCountryCodes from '../data/interface';

const countryCodes: EmojiCountryCodes = countryCodesJSON;

const getEmojiCode = (key: keyof EmojiCountryCodes): any => {
  return countryCodes[key];
}

export default function Twemoji({
  countryCode, className = ""
}: {
  countryCode: keyof EmojiCountryCodes,
  className?: string
}) {
  const emojiCode = getEmojiCode(countryCode)

  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${emojiCode}.svg`}
      alt={`Flag ${countryCode.toUpperCase()}`}
      className={`w-8 ${className}`}
    />
  )
}

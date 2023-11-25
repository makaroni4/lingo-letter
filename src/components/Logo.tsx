export default function Logo({ emailLanguage }: { emailLanguage: string }) {
  return (
    <div className="relative -rotate-12">
      <img className="block w-12 z-10" src="./logo_bg.svg" alt="Email Simulator" />
      <img className="block w-12 absolute top-0 left-0 z-20 opacity-70" src={`./logo_flag_${emailLanguage}.svg`} alt="Email Simulator" />
    </div>
  )
}

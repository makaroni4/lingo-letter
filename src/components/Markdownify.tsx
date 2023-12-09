import twemoji from "twemoji"
import rehypeRaw from "rehype-raw"
import Markdown from "react-markdown"

export default function Markdownify({
  children,
  className
}: {
  className?: string
  children: any
}) {
  const stripIndent = (str: string): string => {
    try {
      return str
        .split("\n")
        .map((l) => l.trim())
        .join("\n")
    } catch {
      return str
    }
  }

  const twemojify = (str: string): string => {
    const htmlWithEmojis = twemoji.parse(str, {
      folder: "svg",
      ext: ".svg"
    })

    return htmlWithEmojis
  }

  return (
    <Markdown
      rehypePlugins={[rehypeRaw]}
      className={`markdown-copy ${className}`}
    >
      {twemojify(stripIndent(children))}
    </Markdown>
  )
}

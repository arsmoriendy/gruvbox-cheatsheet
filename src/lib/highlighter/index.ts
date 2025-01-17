import {
  CodeToHastOptions,
  createHighlighterCore,
  createJavaScriptRegexEngine,
} from "shiki";

const highliter = await createHighlighterCore({
  themes: [import("./dark-gruvbox-theme"), import("./light-gruvbox-theme")],
  langs: [import("@shikijs/langs/json")],
  engine: createJavaScriptRegexEngine(),
});

export const highlightJson = (
  jsonString: string,
  opts?: Partial<
    CodeToHastOptions<string, string> & {
      theme: "Gruvbox Dark Medium" | "Gruvbox Light Medium";
    }
  >,
) =>
  highliter.codeToHtml(jsonString, {
    lang: "json",
    theme: opts?.theme ?? "Gruvbox Dark Medium",
    ...opts,
  });

export default highliter;

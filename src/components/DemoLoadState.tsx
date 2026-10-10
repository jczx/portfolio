import type { Language } from "../i18n/content";

type DemoLoadStateProps = {
  status: "loading" | "error";
  language: Language;
  kind: "dataset" | "monitor";
  onRetry: () => void;
};

const DemoLoadState = ({ status, language, kind, onRetry }: DemoLoadStateProps) => {
  const isGerman = language === "de";
  const message = status === "loading"
    ? kind === "dataset"
      ? isGerman ? "Sanktionsliste wird geladen…" : "Loading the sanctions list…"
      : isGerman ? "Gespeicherter Pipeline-Status wird geladen…" : "Loading saved pipeline status…"
    : kind === "dataset"
      ? isGerman ? "Die Sanktionsliste konnte nicht geladen werden. Bitte erneut versuchen." : "The sanctions list could not be loaded. Please try again."
      : isGerman ? "Der gespeicherte Pipeline-Status konnte nicht geladen werden. Bitte erneut versuchen." : "The saved pipeline status could not be loaded. Please try again.";
  return (
    <div className="demoState" role={status === "error" ? "alert" : "status"}>
      <p>{message}</p>
      {status === "error" && <button type="button" onClick={onRetry}>{isGerman ? "Erneut versuchen" : "Try again"}</button>}
    </div>
  );
};

export default DemoLoadState;

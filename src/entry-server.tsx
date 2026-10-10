import App from "./App";
import type { SitePage } from "./data/siteMetadata";
export { getSiteMetadata, pageFiles } from "./data/siteMetadata";

export const createPage = (page: SitePage) => <App initialLanguage="en" initialPage={page} />;

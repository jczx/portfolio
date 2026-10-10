import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./styles/main.scss";
import "./styles/redesign.scss";
import { getPageFromLocation } from './data/siteMetadata';

const container = document.getElementById('root')!;
const page = getPageFromLocation(window.location);
const prerenderedPage = container.dataset.page;
const initialLanguage = document.documentElement.lang === 'de' ? 'de' : 'en';
const app = <StrictMode><App initialPage={page} initialLanguage={prerenderedPage ? initialLanguage : undefined} /></StrictMode>;

if (prerenderedPage === page && container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

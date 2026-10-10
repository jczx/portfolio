import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CaesarGuitarLab from './CaesarGuitarLab';
import '../styles/caesar-guitar-lab.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode><CaesarGuitarLab portfolioHref="../#case-studies" brandHref="./" /></StrictMode>,
);

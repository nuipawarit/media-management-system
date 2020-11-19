/* eslint-disable import/prefer-default-export */
import { ReactElement } from 'react';
import ReactDOMServer from 'react-dom/server';

export function renderHTML(value: ReactElement) {
  return ReactDOMServer.renderToStaticMarkup(value);
}

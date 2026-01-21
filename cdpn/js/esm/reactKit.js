const loadScripts = ({ ui, tailwind = true, urls = [] } = {}) => {
  const load = (url, type = 'js') => new Promise(resolve => {
    let el;
    if (type === 'js') {
      el = document.createElement('script');
      el.src = url;
      el.onload = resolve;
      document.head.appendChild(el);
    } else {
      el = document.createElement('link');
      el.rel = 'stylesheet';
      el.href = url;
      el.onload = resolve;
      document.head.appendChild(el);
    }
  });

  const tasks = [];

  if (tailwind) tasks.push(load('https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'));

  if (ui === 'react') {
    const reactUrls = [
    'https://unpkg.com/react@18/umd/react.development.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.development.js'];

    reactUrls.forEach(url => tasks.push(load(url)));
  }

  if (Array.isArray(urls)) urls.forEach(url => tasks.push(load(url)));else
  load(urls);

  return Promise.all(tasks);
};

const reactKit = App => {
  loadScripts({ ui: 'react' }).then(() => {
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render( /*#__PURE__*/React.createElement(App, null));
  });
};

export {loadScripts, reactKit}
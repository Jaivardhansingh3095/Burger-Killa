import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './main.css';
import { Provider } from 'react-redux';
import store from './store.js';
import { saveCart } from './utils/cartLocalStorage.js';

store.subscribe(() => {
  saveCart(store.getState());
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

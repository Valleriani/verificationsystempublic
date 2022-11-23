import React from 'react';
import styles from './styles.css';

const qs = (key) => {
  key = key.replace(/[*+?^$.[\]{}()|\\/]/g, '\\$&'); // escape RegEx meta chars
  const match = window.location.search.match(new RegExp(`[?&]${key}=([^&]+)(&|$)`));
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

const App = () => (
  <div className={styles.block}>
    <div className={styles.block__header}>
      Wallet Linker
    </div>
    <div className={styles.block__body}>
      {(qs('token') &&
        <div className={styles.success}>
          <div className={styles.success__header}>
            Token (Debug)
          </div>
          <div className={styles.success__data}>
            {qs('token')}
            This is where I will add the wallet login.
          </div>
        </div>
      )
      ||
        <a
          href="/api/discord/login"
          className={styles.login_button}
        >
          Login through Discord
        </a>
      }
    </div>
  </div>
);

export default App;

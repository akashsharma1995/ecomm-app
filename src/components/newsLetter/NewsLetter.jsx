import React from 'react';

import SendIcon from '@mui/icons-material/Send';
import styles from './newsLetter.module.css';

const Newsletter = () => {
  return (
    <div className={styles.container}>
      <h1>Newsletter</h1>
      <div className={styles.subheading}>Get timely updates of your favourite products!</div>
      <div className={styles['input-container']}>
        <input placeholder="Your Email"/>
        <button> <SendIcon/> </button>
      </div>
    </div>
  )
}

export default Newsletter

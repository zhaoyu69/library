import React from 'react';
import { Ripple } from 'library';
import styles from './demo.less';

export default () => <Ripple color={"red"} opacity={0.1} spead={0.5} >
  <div className={styles.test}>Ripple</div>
</Ripple>;

import React  from 'react';
import { Toast } from 'library';

export default () => {
 function showLoading() {
    Toast.loading('加载中...');
    setTimeout(() => {
      Toast.destroy();
    }, 3000);
  }

  return <button onClick={showLoading}>showLoading</button>
}


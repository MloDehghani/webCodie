/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react';

const useConstructor: any = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) {
    return;
  }
  callBack();
  setHasBeenCalled(true);
};
export {useConstructor};

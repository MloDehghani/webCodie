/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from './api';

class Bots extends Api {
  static getBots(
    data: any,
    submit: (res: any) => void,
    catc: (res: any) => void,
  ) {
    this.post('/get_bot_data', data)
      .then(res => {
        submit(res);
      })
      .catch(err => catc(err));
  }
}
export default Bots;

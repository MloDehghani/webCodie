/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from './api';

class Bots extends Api {
  static getBots(
    data: any,
    submit: (res: any) => void,
    catc: (res: any) => void,
  ) {
    this.post('/get_bot_data_temp', data)
      .then(res => {
        submit(res);
      })
      .catch(err => catc(err));
  }

  static getCategories(
    submit: (res: any) => void,
    catc: (res: any) => void,    
  ){
    this.post('/get_bot_data_select_category',null)
      .then(res => {
        submit(res);
      })
      .catch(err => catc(err));
  }

  static getLangs(data:any,submit:(res:any) => void){
    this.post('/check_bot_languages',data).then(res => {
      submit(res)
    })
  }
}
export default Bots;

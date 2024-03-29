/* eslint-disable @typescript-eslint/no-explicit-any */
class Api {
  protected static baseUrl = 'https://vercel-backend-one-roan.vercel.app/mobile';

  protected static async post(url: string, data: any) {
    const response = await fetch(this.baseUrl + url, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + (localStorage.getItem('accessToken')),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
    // console.log(response);
    return response.json();
  }
}
export default Api;

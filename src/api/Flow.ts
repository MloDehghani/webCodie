/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./api";

class Flow extends Api {
    static async chat(data: any) {
        let response = await fetch(
        'https://vercel-backend-one-roan.vercel.app/mobile/flow_uni',
        {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Credentials': 'true',
            // 'Access-Control-Allow-Origin': '*',
            Authorization:
                'Bearer ' + localStorage.getItem('accessToken'),
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        },
        );
        return response.json();
    }
}

export default Flow;
const checkBotId = async (apiKey: string,lan?:string) => {
  console.log(apiKey);
  const response = await fetch(
    'https://vercel-backend-one-roan.vercel.app/mobile/check_bot_id',
    {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        apikey: apiKey,
        language:lan
      }),
    },
  );
  // console.log(JSON.stringify(response));
  return response.json();
};

export {checkBotId};

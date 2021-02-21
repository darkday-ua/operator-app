export const httpPost = async (url: string, data: string, token: string) => {
   
    try {
        const body = JSON.parse(data);
        body.token=token||null;
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        console.log (url,options);
        const response = await fetch(url, options);        
        const json = await response.json();
        return json;

    }
    catch (error) {
        console.log(`fetch error ${error}`);
    }


}

// if (response.status == 200) {
//     response.json().then((result) => {
//         if (result.code >= 0) {
//             clearTimeout(timeout);
//             resolve(result);
//         } else {
//             clearTimeout(timeout);
//             reject({ code: result.code, message: result.message });
//         }
//     })
// } else {
//     clearTimeout(timeout);
//     reject({ code: -response.status, message: I18n.t('ALERT.BODY.SERVER_ERROR') });
// }
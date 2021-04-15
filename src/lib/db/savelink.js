import * as api from '$lib/api.js';
import {v4 as uuidv4 } from "uuid"

export async function saveLink(url, userToken) {
    const id = uuidv4()
    const data = {
        "id": id,
        "url":url
	}
    const path = 'data/embeds'
    const token = userToken
    const response = await api.post(path, data, token);
    console.log(response)
    let responseStatus = response && response.status === 200 && response.statusText === 'OK';
	return { status: responseStatus, body: await response };
}

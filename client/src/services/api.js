import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;
const token = localStorage.getItem("token");
axios.defaults.headers = token ? {"Authorization" : "Bearer "+token} : {};

export const get = (url, params={}, config={}) => {
    return new Promise(async (resolve, reject) => {
        try {
            await axios.get(url, {params: params}, config).then((response) => {
                resolve(response);
            }).catch((error) => {
                if(error.response){
                    reject(error.response);
                }
                reject(error);
            });
        } catch(error){
            reject(error);
        }
    })
}

export const post = (url, data, config={}) => {
    return new Promise(async (resolve, reject) => {
        try {
            await axios.post(url, data, config).then((response) => {
                resolve(response);
            }).catch((error) => {
                if(error.response){
                    reject(error.response);
                }
                reject(error);
            });
        } catch(error){
            reject(error);
        }
    });
}

export const signUp = async (data) => {
    return await axios.post('user/register', data);
}

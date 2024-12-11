import CryptoJS from "crypto-js";

const ADMIN_TOKEN_KEY = 'ff591090-0805-4282-8493-e9435a4d3d67';
const secretKey = 'b3a3f72ad8a00b91edb28bfcf81f88ac9c46609bbab60d347139db62c5c2673b';

const set_admin_logged = (data) => {
    const temp = JSON.stringify(data);
    var enc = encrypt(temp);
    localStorage.setItem(ADMIN_TOKEN_KEY, enc);
    return enc
};

const admin_logged_data = () => {
    var session_data = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (session_data && session_data.length > 0) {
        var decrypted = decrypt(session_data);
        var data = JSON.parse(decrypted);
        if (data && data.accessToken != '') {
            return data;
        }
    }
    return null;
};

const admin_logged_clear = () => {
    localStorage.setItem(ADMIN_TOKEN_KEY, '');
    localStorage.removeItem(ADMIN_TOKEN_KEY);
};
const generateRandAlphaNumStr = (len) => {
    var rdmString = '';
    for (
        ;
        rdmString.length < len;
        rdmString += Math.random().toString(36).substring(2)
    );
    return rdmString.substring(0, len);
};
const encrypt = (param) => {
    var key = generateRandAlphaNumStr(32);
    var iv = generateRandAlphaNumStr(16);
    var encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(param),
        CryptoJS.enc.Utf8.parse(key),
        {
            keySize: 128 / 8,
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );
    return btoa(key + iv + encrypted.toString());
};

const decrypt = (param) => {
    try {
        param = atob(param);
        param = param.replace(' ', '+');
        var key = CryptoJS.enc.Utf8.parse(param.substring(0, 32));
        var iv = CryptoJS.enc.Utf8.parse(param.substring(32, 32 + 16));
        var encryptedText = param.substring(32 + 16);
        var decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch {
        return '';
    }
};

const EncryptData = (data) => {
    if (typeof data === 'object') {
        data = JSON.stringify(data);
    }
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
        encrypted += String.fromCharCode(data.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length));
    }
    return btoa(encrypted);
};

const DecryptData = (encryptedData) => {
    encryptedData = atob(encryptedData);
    let decryptedData = '';
    for (let i = 0; i < encryptedData.length; i++) {
        decryptedData += String.fromCharCode(encryptedData.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length));
    }
    return decryptedData;
};

export {
    set_admin_logged,
    admin_logged_data,
    admin_logged_clear,
    encrypt,
    decrypt,
    EncryptData,
    DecryptData
};
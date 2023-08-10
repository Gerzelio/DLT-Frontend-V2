// const URL = "https://prod.dreams.co.mz/dlt-api-0.1/"
// const URL = "http://172.105.133.124:8080/dlt-api-0.1"
const URL = "http://10.10.12.50:8083/dlt-api-0.1"
export const LOGIN_API_URL = `${URL}/api/login`;
export const VERIFY_USER_API_URL = `${URL}/api/users/username`;
export const SYNC_API_URL = `${URL}/sync`;
export const SYNC_API_URL_PREFIX = `${URL}/sync/prefix`;
export const CHANGE_PASSWORD_URL = `${URL}/api/users/change-password`;
export const UPDATE_PASSWORD_URL = `${URL}/users/update-password`;
export const BENEFICIARY_TO_SYNC_URL = `${URL}/api/beneficiaries/findByNui`;
export const CUSTOM_SYNC_URL = `${URL}/custom/sync`;
export const PING_URL = `${URL}/ping`;

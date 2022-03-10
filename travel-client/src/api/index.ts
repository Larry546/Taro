export function login(target, loginInfo) {
    return target.http.post("/user/login", loginInfo);
}

export function getUserInfo(target, uid) {
    return target.http.get(`/user/find/${uid}`);
}

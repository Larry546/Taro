export function login(target, loginInfo) {
    return target.http.post("/user/login", loginInfo);
}

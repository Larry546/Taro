import React from "react";
import { push, pop, getCurrentInstance } from "../system/router";
import httpRequest from "../system/http";
import toast from "./base-component/toast";
import confirm from "./base-component/confirm";
import { debounce } from "lodash";

export default class Component<T> extends React.Component<T> {
    http: any;
    instance: any;

    constructor(props: T) {
        super(props);
        this.http = httpRequest;
        this.instance = getCurrentInstance;
    }
    push = debounce(push, 200);
    pop = debounce(pop, 200);
    toast = toast;
    confirm = confirm;
}

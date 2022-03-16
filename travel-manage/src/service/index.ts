import axios from "axios";
import { get, post } from "./tools";

export const npmDependencies = () =>
    axios
        .get("./npm.json")
        .then(res => res.data)
        .catch(err => console.log(err));

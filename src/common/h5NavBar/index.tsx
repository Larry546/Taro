import PureComponent from "../pure-component";
import { View } from "@tarojs/components";
import { AtNavBar } from "taro-ui";
import getEnv from "../../system/tools/environment";

import "./index.scss";

export default class Index extends PureComponent<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { title } = this.props;
        return (
            <View>
                {getEnv() === "H5" ? (
                    <View className="h5NavBar">
                        <AtNavBar
                            fixed={true}
                            border={false}
                            title={title || ""}
                            onClickLeftIcon={this.pop}
                            leftIconType={{ value: "left", prefixClass: "icon", color: "#000000" }}
                        ></AtNavBar>
                    </View>
                ) : null}
            </View>
        );
    }
}

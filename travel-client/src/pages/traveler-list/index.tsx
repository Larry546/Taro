import PureComponent from "../../common/pure-component";
import { View, ScrollView } from "@tarojs/components";
import TravelerList from "../../common/traveler/list";
import H5NavBar from "../../common/h5NavBar";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "出行人列表",
});

export default class Index extends PureComponent<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View className="travelerlist">
                <H5NavBar />
                <ScrollView scrollY>
                    <TravelerList />
                </ScrollView>
            </View>
        );
    }
}

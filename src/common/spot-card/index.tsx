import PureComponent from "../pure-component";
import { View, Text } from "@tarojs/components";
import { ISpotCard } from "./interface";

import Image from "../base-component/image";
import Icon from "../base-component/icon";

import "./index.scss";

export default class Index extends PureComponent<ISpotCard> {
    constructor(props: ISpotCard) {
        super(props);
    }

    goToDetail = () => {
        this.push("/pages/spot-detail/index");
    };

    render() {
        const { index, deleteFav, spotInfo, fromFav = false } = this.props;
        const { spotImageURL, spotName, spotRateScore, spotRateNum, spotType, ticketList } =
            spotInfo;
        return (
            <View className="spotcard" key={index}>
                <View className="spotcard_left" onClick={this.goToDetail}>
                    <Image
                        classWrap={"spotcard_left_image"}
                        url={spotImageURL}
                        width={"100%"}
                        height={"100%"}
                    />
                    <View className="spotcard_left_text">
                        <View className="spotcard_left_text_title">
                            <Text>{spotName}</Text>
                        </View>
                        <View className="spotcard_left_text_score">
                            <Text>
                                {spotRateScore}分 {spotRateNum}
                                人评价
                            </Text>
                        </View>
                        {spotType && spotType?.length >= 1 ? (
                            <View className="spotcard_left_text_type">
                                <Text>{spotType[0]}</Text>
                            </View>
                        ) : null}
                    </View>
                </View>
                {fromFav ? (
                    <View className="spotcard_right" onClick={deleteFav}>
                        <Icon type={"cuowuguanbiquxiao"} size={24} color={"red"} />
                    </View>
                ) : (
                    ticketList?.length && (
                        <View className="spotcard_price">
                            <Text className="spotcard_price_currency">￥</Text>
                            <Text className="spotcard_price_number">
                                {ticketList[0].ticketPrice}
                            </Text>
                        </View>
                    )
                )}
            </View>
        );
    }
}

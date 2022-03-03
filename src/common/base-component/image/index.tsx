import React from "react";
import { Image as _Image, View } from "@tarojs/components";
import PureComponent from "../../pure-component";
import { IImageProps } from "./interface";

export default class Image extends PureComponent<any> {
    constructor(props: IImageProps) {
        super(props);
    }

    render() {
        const { url, width, height, classWrap } = this.props;
        return (
            <View className={classWrap}>
                <_Image src={url} style={{ width: width, height: height }} />
            </View>
        );
    }
}

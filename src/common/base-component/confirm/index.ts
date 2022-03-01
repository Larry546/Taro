import Taro from "@tarojs/taro";
import { IConfirmProps } from "./interface";

/**
 * 基于taro的showModal
 * taro文档为 https://taro-docs.jd.com/taro/docs/apis/ui/interaction/showModal
 */
export default {
    show: (data: IConfirmProps) => {
        if (data) {
            let cancelText = "";
            let confirmText = "";
            let showCancel = data.btnOK && data.btnOK.length == 2 ? true : false;
            let cancel = () => {};
            let confirm = () => {};
            // 按钮文案处理
            if (data.btnOK && data.btnOK.length > 0) {
                const btnOK = data.btnOK;
                if (btnOK.length === 1) {
                    confirmText = btnOK[0];
                } else {
                    cancelText = btnOK[0];
                    confirmText = btnOK[1];
                }
            }
            // 按钮回调处理
            if (data.btnCallBack && data.btnCallBack.length > 0) {
                const btnCallBack = data.btnCallBack;
                if (btnCallBack.length === 1) {
                    confirm = btnCallBack[0];
                } else {
                    cancel = btnCallBack[0];
                    confirm = btnCallBack[1];
                }
            }
            Taro.showModal({
                title: data.title || "",
                content: data.content || "",
                cancelText: cancelText || "取消",
                confirmText: confirmText || "确认",
                showCancel,
                success: function (res) {
                    if (res.confirm) {
                        confirm();
                    } else if (res.cancel) {
                        cancel();
                    }
                },
            });
        }
    },
};

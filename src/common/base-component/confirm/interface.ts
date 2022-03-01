export interface IConfirmProps {
    title?: string; // 标题
    content?: string; // 内容
    btnOK?: Array<string>; // 按钮文案，按钮个数和数组length对应，不传默认两个按钮
    btnCallBack?: Array<() => void>; // 按钮回调事件
}

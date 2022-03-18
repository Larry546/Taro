import Loadable from "react-loadable";
import Loading from "./basic-component/widget/Loading";
import Echarts from "./basic-component/charts/Echarts";
import Recharts from "./basic-component/charts/Recharts";
import Icons from "./basic-component/ui/Icons";
import Buttons from "./basic-component/ui/Buttons";
import Spins from "./basic-component/ui/Spins";
import Modals from "./basic-component/ui/Modals";
import Notifications from "./basic-component/ui/Notifications";
import Tabs from "./basic-component/ui/Tabs";
import Banners from "./basic-component/ui/banners";
import Drags from "./basic-component/ui/Draggable";
import Dashboard from "./dashboard/Dashboard";
import Gallery from "./basic-component/ui/Gallery";
import Env from "./extension/env";

import SpotList from "./spot/list";
import OrderList from "./order/list";
import UserList from "./user/list";

import SpotEdit from "./spot/edit";
import OrderEdit from "./order/edit";

const WysiwygBundle = Loadable({
    // 按需加载富文本配置
    loader: () => import("./basic-component/ui/Wysiwyg"),
    loading: Loading,
});

export default {
    SpotList,
    OrderList,
    UserList,
    SpotEdit,
    OrderEdit,
    Echarts,
    Recharts,
    Icons,
    Buttons,
    Spins,
    Modals,
    Notifications,
    Tabs,
    Banners,
    Drags,
    Dashboard,
    Gallery,
    WysiwygBundle,
    Env,
} as any;

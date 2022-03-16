import Loadable from "react-loadable";
import Loading from "./widget/Loading";
import BasicTable from "./tables/BasicTables";
import AdvancedTable from "./tables/AdvancedTables";
import AsynchronousTable from "./tables/AsynchronousTable";
import Echarts from "./charts/Echarts";
import Recharts from "./charts/Recharts";
import Icons from "./ui/Icons";
import Buttons from "./ui/Buttons";
import Spins from "./ui/Spins";
import Modals from "./ui/Modals";
import Notifications from "./ui/Notifications";
import Tabs from "./ui/Tabs";
import Banners from "./ui/banners";
import Drags from "./ui/Draggable";
import Dashboard from "./dashboard/Dashboard";
import Gallery from "./ui/Gallery";
import BasicAnimations from "./animation/BasicAnimations";
import ExampleAnimations from "./animation/ExampleAnimations";
import Env from "./extension/env";

const WysiwygBundle = Loadable({
    // 按需加载富文本配置
    loader: () => import("./ui/Wysiwyg"),
    loading: Loading,
});

export default {
    BasicTable,
    AdvancedTable,
    AsynchronousTable,
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
    BasicAnimations,
    ExampleAnimations,
    WysiwygBundle,
    Env,
} as any;

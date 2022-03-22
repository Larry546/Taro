import React from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";

const option = {
    title: {
        text: "最近7天用户访问量",
        left: "50%",
        show: false,
        textAlign: "center",
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            lineStyle: {
                color: "#ddd",
            },
        },
        backgroundColor: "rgba(255,255,255,1)",
        padding: [5, 10],
        textStyle: {
            color: "#7588E4",
        },
        extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
    },
    legend: {
        right: 20,
        orient: "vertical",
    },
    xAxis: {
        type: "category",
        data: [
            "2022-04-01",
            "2022-04-02",
            "2022-04-03",
            "2022-04-04",
            "2022-04-05",
            "2022-04-06",
            "2022-04-07",
        ],
        boundaryGap: false,
        splitLine: {
            show: true,
            interval: "auto",
            lineStyle: {
                color: ["#D4DFF5"],
            },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            lineStyle: {
                color: "#609ee9",
            },
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 10,
            },
        },
    },
    yAxis: {
        type: "value",
        splitLine: {
            lineStyle: {
                color: ["#D4DFF5"],
            },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            lineStyle: {
                color: "#609ee9",
            },
        },
        axisLabel: {
            margin: 0,
            textStyle: {
                fontSize: 8,
            },
        },
    },
    series: [
        {
            type: "line",
            smooth: true,
            showSymbol: false,
            symbol: "circle",
            symbolSize: 6,
            data: ["200", "300", "103", "222", "158", "488", "89"],
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: "rgba(216, 244, 247,1)",
                            },
                            {
                                offset: 1,
                                color: "rgba(216, 244, 247,1)",
                            },
                        ],
                        false
                    ),
                },
            },
            itemStyle: {
                normal: {
                    color: "#58c8da",
                },
            },
            lineStyle: {
                normal: {
                    width: 3,
                },
            },
        },
    ],
};

const EchartsViews = () => (
    <ReactEcharts
        option={option}
        style={{ height: "350px", width: "100%" }}
        className={"react_for_echarts"}
    />
);

export default EchartsViews;

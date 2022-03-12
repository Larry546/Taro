export let getDateString = function (
    myDate: Date | string | number,
    separator: string = "-"
): string {
    let years: number, month: number, day: number;
    if (typeof myDate === "string") {
        let list = myDate.split("-");
        years = parseInt(list[0], 10);
        month = parseInt(list[1], 10);
        day = parseInt(list[2], 10);
    } else {
        let date = new Date(myDate);
        years = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
    }

    return (
        years +
        separator +
        (month < 10 ? "0" + month : month) +
        separator +
        (day < 10 ? "0" + day : day)
    );
};

// 计算周几
export let weekDay = function (date) {
    console.log("🚀 ~ file: date.ts ~ line 29 ~ weekDay ~ date", date);
    let d1 = new Date(date.replace(/-/g, "/"));
    console.log("🚀 ~ file: date.ts ~ line 30 ~ weekDay ~ d1", d1);
    let weekDay = ["日", "一", "二", "三", "四", "五", "六"];
    return weekDay[d1.getDay()];
};

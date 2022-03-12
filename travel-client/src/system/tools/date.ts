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

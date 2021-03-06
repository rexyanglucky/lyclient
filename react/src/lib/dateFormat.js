

//指定时间，自定义转换为字符串
const dateHelper = {
    ctime: (function () {
        Date.prototype.toCustomRegString = function (format) {
            format = format || "yyyy-MM-dd HH:mm:ss";
            var yf = "y", Mf = "M", df = "d", Hf = "H", mf = "m", sf = "s";
            var yreg = /(y)/g, Mreg = /(M)/g, dreg = /(d)/g, Hreg = /(H)/g, mreg = /(m)/g, sreg = /(s)/g;
            var t = this;
            var fareg = /(?:y*(y[^yMdHms]{0,1}))*(?:M*(M[^yMdHms]{0,1}))*(?:d*(d[^yMdHms]{0,1}))*(?:H*(H[^yMdHms]{0,1}))*(?:m*(m[^yMdHms]{0,1}))*s*/;
            var a = undefined, yl = 0, Ml = 0, dl = 0, Hl = 0, ml = 0, sl = 0,
                ysplit = undefined, Msplit = undefined, dsplit = undefined, Hsplit = undefined,
                msplit = undefined;
            
            a = format.match(yreg);
            yl = a ? a.length : 0;
            a = format.match(Mreg);
            Ml = a ? a.length : 0;
            a = format.match(dreg);
            dl = a ? a.length : 0;
            a = format.match(Hreg);
            Hl = a ? a.length : 0;
            a = format.match(mreg);
            ml = a ? a.length : 0;
            a = format.match(sreg);
            sl = a ? a.length : 0;

            //split
            a = format.match(fareg);
            console.log(a);
            for (var k = 1; k < a.length; k++) {
                if (a[k]) {
                    if (a[k].indexOf(yf) > -1) {
                        ysplit = a[k].replace(yf, "");
                    }
                    else if (a[k].indexOf(Mf) > -1) {
                        Msplit = a[k].replace(Mf, "");
                    }
                    else if (a[k].indexOf(df) > -1) {
                        dsplit = a[k].replace(df, "");
                    }
                    else if (a[k].indexOf(Hf) > -1) {
                        Hsplit = a[k].replace(Hf, "");
                    }
                    else if (a[k].indexOf(mf) > -1) {
                        msplit = a[k].replace(mf, "");
                    }
                }
            }
            var ystr = Mstr = dstr = Hstr = mstr = sstr = "";
            var yt = t.getFullYear().toString();
            var Mt = ((t.getMonth() + 1 < 10 && Ml >= 2) ? "0" + (t.getMonth() + 1) : t.getMonth() + 1).toString();
            var dt = ((t.getDate() < 10 && dl >= 2) ? "0" + t.getDate() : t.getDate()).toString();
            var Ht = ((t.getHours() < 10 && Hl >= 2) ? "0" + t.getHours() : t.getHours()).toString();
            var mt = ((t.getMinutes() < 10 && ml >= 2) ? "0" + t.getMinutes() : t.getMinutes()).toString();
            var st = ((t.getSeconds() < 10 && sl >= 2) ? "0" + t.getSeconds() : t.getSeconds()).toString();
            var ystr = (yl == 0 ? "" : yt.substring(yt.length - yl, yt.length)) + (ysplit ? ysplit : "");
            var Mstr = (Ml == 0 ? "" : Mt) + (Msplit ? Msplit : "");
            var dstr = (dl == 0 ? "" : dt) + (dsplit ? dsplit : "");
            var Hstr = (Hl == 0 ? "" : Ht) + (Hsplit ? Hsplit : "");
            var mstr = (ml == 0 ? "" : mt) + (msplit ? msplit : "");
            var sstr = sl == 0 ? "" : st;
            return ystr + Mstr + dstr + Hstr + mstr + sstr;


        }
    })(),
    //时间格式化
    convertTime: function (s) {
        if (s < 60) {
            return (s * 1).toFixed(2);
        }
        var h = parseInt(s / 3600);
        var m = parseInt((s - h * 3600) / 60);
        var s = parseInt(s - h * 3600 - m * 60);
        var r = h > 0 ? h : "";
        r += h > 0 && (m > 0 || s > 0) ? ":" : "";
        r += m > 0 ? ((m < 10 && h > 0) ? "0" + m : m) : "";
        r += (m > 0 || h > 0) && s > 0 ? ":" : "";
        r += s > 0 ? (s > 9 ? s : "0" + s) : "";
        return r;
    },
    //获取当前日期所在周,指定(周一到周日)的日期 1 2 3 4 5 6 7
    getWeekDay: function (t, d) {
        var r = new Date(t.toString());
        if (r.getDay() === 0) {
            r.setDate((r.getDate() - (7 - d)));

        }
        r.setDate((r.getDate() - r.getDay() + d));
        return r;
    },
    //获取月份的第一天
    getMonthOneDay: function (t) {
        var r = new Date(t.toString());
        r.setDate(1);
        return r;
    },
    //获取月份的最后一天
    getMonthLastDay: function (t) {
        var r = new Date(t.toString());
        var marr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        //闰年的2月是29天
        if (this.isLeapYear(r)) {
            marr[1] = 29;
        }
        var ldate = marr[r.getMonth()];
        r.setDate(ldate);
        return r;
    },
    //是否是获取闰年
    isLeapYear: function (t) {
        var y = t.getFullYear();
        var r = false;
        r = (y % 400 == 0 || (y % 4 == 0 && y % 100 > 0)) ? true : false;
        return r;
    },
    //获取年份的第一天
    getYearOneDay: function (t) {
        var r = new Date(t.toString());
        r.setMonth(0);
        r.setDate(1);
        return r;
    },
    //获取年份的最后一天
    getYearLastDay: function (t) {
        var r = new Date(t.toString());
        r.setMonth(12);
        r.setDate(31);
        return r;
    },
    //获取昨天
    getYesterday: function (t) {
        var r = new Date(t.toString());
        r.setDate(r.getDate() - 1);
        return r;
    },
    getTomorrowday: function (t) {
        var r = new Date(t.toString());
        r.setDate(r.getDate() + 1);
        return r;
    },
    //获取指定时间凌晨
    getZeroDay: function (t) {
        var r = new Date(t.toString());
        r.setHours(0);
        r.setMinutes(0);
        r.setSeconds(0);
        return r;
    },
    //获取上周 {monday:md,sunday:sd}
    getPrevWeek: function (t) {
        var r = new Date(t.toString());

        r.setDate(r.getDate() - 7);
        var md = this.getWeekDay(r, 1);
        var sd = this.getWeekDay(r, 7);
        return { firstday: md, lastday: sd };
    },
    getNextWeek: function (t) {
        var r = new Date(t.toString());

        r.setDate(r.getDate() + 7);
        var md = this.getWeekDay(r, 1);
        var sd = this.getWeekDay(r, 7);
        return { firstday: md, lastday: sd };
    },
    getPrevMonth: function (t) {
        var r = new Date(t.toString());
        r.setDate(0);
        var md = this.getMonthOneDay(r);
        var sd = this.getMonthLastDay(r);
        return { firstday: md, lastday: sd };
    },
    getNextMonth: function (t) {
        var r = new Date(t.toString());
        r.setMonth(r.getMonth() + 1);
        var md = this.getMonthOneDay(r);
        var sd = this.getMonthLastDay(r);
        return { firstday: md, lastday: sd };
    },
    getPrevYear: function (t) {
        var r = new Date(t.toString());
        r.setMonth(-1);
        var md = this.getYearOneDay(r);
        var sd = this.getYearLastDay(r);
        return { firstday: md, lastday: sd };
    },
    getNextYear: function (t) {
        var r = new Date(t.toString());
        r.setYear(r.getYear() + 1);
        var md = this.getYearOneDay(r);
        var sd = this.getYearLastDay(r);
        return { firstday: md, lastday: sd };
    }
}
// var d=new Date();
// console.log(d.toCustomRegString("yyyy-MM-dd HH:mm:ss"));
export default dateHelper;
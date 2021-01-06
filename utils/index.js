import store from '../store';

// 禁止页面滚动
export function disableScroll() {
    let m = function(e) {
        e.preventDefault();
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', m, {
        passive: false
    });
}

// 开启页面滚动
export function openScroll() {
    let m = function(e) {
        e.preventDefault();
    };
    document.body.style.overflow = '';
    document.removeEventListener('touchmove', m, {
        passive: true
    });
}

//将编码后的八进制的emoji表情重新解码成十六进制的表情字符
export function entitiesToUtf16(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
        let H = Math.floor((dec - 0x10000) / 0x400) + 0xd800;
        let L = (Math.floor(dec - 0x10000) % 0x400) + 0xdc00;
        return String.fromCharCode(H, L);
    });
}

// 把utf16的emoji表情字符进行转码成八进制的字符
export function utf16toEntities(str) {
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
    return str.replace(patt, function(char) {
        var H, L, code;
        if (char.length === 2) {
            H = char.charCodeAt(0); // 取出高位
            L = char.charCodeAt(1); // 取出低位
            code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
            return '&#' + code + ';';
        } else {
            return char;
        }
    });
}

/**
 * 异常处理
 * @param {boolean} condition
 * @param {string} msg
 */
export function assert(condition, msg) {
    if (!condition) throw new Error(`[Apior] ${msg}`);
}

// 过滤日期格式，传入时间戳，根据参数返回不同格式
export function formatTimer(val, hours) {
    if (val) {
        const dateTimer = new Date(val * 1000);
        const y = dateTimer.getFullYear();
        let M = dateTimer.getMonth() + 1;
        let d = dateTimer.getDate();
        let h = dateTimer.getHours();
        let m = dateTimer.getMinutes();
        M = M >= 10 ? M : '0' + M;
        d = d >= 10 ? d : '0' + d;
        h = h >= 10 ? h : '0' + h;
        m = m >= 10 ? m : '0' + m;
        if (hours == 'YYMMDDHHMM') {
            return y + '-' + M + '-' + d + ' ' + h + ':' + m;
        } else if (hours == 'YYMMDD') {
            return y + '-' + M + '-' + d;
        } else if (hours == 'MM/DD') {
            return M + '/' + d;
        }
    }
}

/**
 * @param {number} timestamp
 * @param {string} option
 * @returns {string}
 */
export function timestampFormat(timestamp) {
    function zeroize(num) {
        return (String(num).length == 1 ? '0' : '') + num;
    }

    var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
    var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

    var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
    var tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象

    var Y = tmDate.getFullYear(),
        m = tmDate.getMonth() + 1,
        d = tmDate.getDate();
    var H = tmDate.getHours(),
        i = tmDate.getMinutes(),
        s = tmDate.getSeconds();

    if (timestampDiff < 60) {
        // 一分钟以内
        return '刚刚';
    } else if (timestampDiff < 3600) {
        // 一小时前之内
        return Math.floor(timestampDiff / 60) + '分钟前';
    } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
        return '今天' + zeroize(H) + ':' + zeroize(i);
    } else {
        var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
        if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
            return '昨天' + zeroize(H) + ':' + zeroize(i);
        } else if (curDate.getFullYear() == Y) {
            return zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
        } else {
            return Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
        }
    }
}

// export function dateFilter(time) {
//     let date = new Date();
//     let now = date.getTime();
//     let diffS = Math.ceil((now - time) / 1000);
//     let s = 60;
//     let m = 60 * 60;
//     let h = 60 * 60 * 24;
//     let d = 60 * 60 * 24 * 3;
//     let unit = {
//         s: '秒前',
//         m: '分钟前',
//         h: '小时前',
//         d: '天前'
//     };
//     if (diffS < s) {
//         return `${Math.ceil(diffS)}${unit['s']}`;
//     }
//     if (s < diffS && diffS < m) {
//         return `${Math.floor(diffS / s)}${unit['m']}`;
//     }
//     if (m < diffS && diffS < h) {
//         return `${Math.floor(diffS / m)}${unit['h']}`;
//     }
//     if (h < diffS && diffS < d) {
//         return `${Math.floor(diffS / h)}${unit['d']}`;
//     }
//     return `${new Date(time).getFullYear()}-${new Date(time).getMonth() + 1}-${new Date(time).getDate()}`;
// }

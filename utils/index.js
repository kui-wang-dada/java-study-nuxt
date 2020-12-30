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

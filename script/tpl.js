/*
 * 模板渲染，不能防备xss。
 * 如果有xss防备需求，请使用ejs等具备该功能的模板引擎
 */
'use strtic'
function tpl(str, data) {
    var fn = function(data) {
        var i, variable = [],
            value = [];
        for (i in data) {
            variable.push(i);
            value.push(data[i]);
        }
        return (new Function(variable, fn.code))
            .apply(data, value); // new Function返回渲染结果HTML
    };

    fn.code = fn.code || "var $parts=[]; $parts.push('" + str
        .replace(/\\/g, '\\\\')
        .replace(/[\r\t\n]/g, " ")
        .split("<%").join("\t")
        .replace(/(^|%>)[^\t]*/g, function(str) {
            return str.replace(/'/g, "\\'");
        }) // 将模板中文本部分的单引号替换为\'
        .replace(/\t=(.*?)%>/g, "',$1,'") // 将模板中<%= %>的直接数据引用（无逻辑代码）与两侧的文本用'和,隔开，同时去掉了左标签产生的tab符
        .split("\t").join("');") // 将tab符（上面替换左标签产生）替换为'); 由于上一步已经把<%=产生的tab符去掉，因此这里实际替换的只有逻辑代码的左标签
        .split("%>").join("$parts.push('") // 把剩下的右标签%>（逻辑代码的）替换为"$parts.push('"
        + "'); return $parts.join('');"; // 最后得到的就是一段JS代码，保留模板中的逻辑，并依次把模板中的常量和变量压入$parts数组

    return data ? fn(data) : fn;
}
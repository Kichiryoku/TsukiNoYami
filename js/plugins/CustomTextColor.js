/*:
 * @plugindesc [v1.2] 自定义文字颜色插件：支持 \rgb[r,g,b]、\hex[#rrggbb]、\rgbreset
 * @author ChatGPT
 * 
 * @help
 * ============================================================
 * 【功能说明】
 * 在“显示文字”中使用：
 *   \rgb[r,g,b]   → 使用 RGB 颜色（例：\rgb[255,0,0]）
 *   \hex[#rrggbb] → 使用十六进制颜色（例：\hex[#ffaa33]）
 *   \rgbreset     → 恢复默认文字颜色
 * 
 * 示例：
 *   普通\rgb[255,0,0]红\rgb[0,255,128]绿\hex[#ffaa00]橙\rgbreset默认。
 * ============================================================
 */

(function() {

    const _convert = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _convert.call(this, text);

        // 注意：MV 会把 "\" 转为 "\x1b"，所以我们匹配 \x1brgb 等
        text = text.replace(/\x1brgb\[(\d+),(\d+),(\d+)\]/gi, (_, r, g, b) => {
            return `\x1bRGB(${r},${g},${b})`;
        });

        text = text.replace(/\x1bhex\[(#[0-9a-fA-F]{6})\]/gi, (_, hex) => {
            return `\x1bHEX(${hex})`;
        });

        text = text.replace(/\x1brgbreset/gi, '\x1bRGBRESET');
        return text;
    };

    const _process = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        if (code === 'RGB') {
            const params = this._readParenthesisParams(textState);
            if (params.length >= 3) {
                const [r, g, b] = params.map(Number);
                this.changeTextColor(`rgb(${r},${g},${b})`);
            }
            return;
        }
        if (code === 'HEX') {
            const hex = this._readParenthesisParams(textState)[0];
            this.changeTextColor(hex);
            return;
        }
        if (code === 'RGBRESET') {
            this.resetTextColor();
            return;
        }
        _process.call(this, code, textState);
    };

    // === 辅助函数：支持 () 格式的多参数读取 ===
    Window_Base.prototype._readParenthesisParams = function(textState) {
        const regExp = /^\(([^\)]*)\)/;
        const arr = regExp.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            return arr[1].split(',').map(s => s.trim());
        }
        return [];
    };

})();

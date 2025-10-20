//=============================================================================
// Trb_TextColor.js
//=============================================================================
//Copyright (c) 2017 Trb
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
//twitter https://twitter.com/Trb_surasura
/*:
 * @plugindesc A plugin that allows text color to be selected from Hex Color Code.
 * @author Trb
 * @version 1.00 2017/3/8 First Release
 * 
 * @help When changing the text's color with control character \c[ ]
 * It allows you to define the color code with #000000～#ffffff.
 * 
 * It's a color code that expreses [# + 6 hexidecimal digits]
 * A hex triplet is 6 digits, three-byte hexadecimal number, it's divided by each of 2 digits which represents a hexadecimal value.
 * First 2 digits are RR (red) value
 * Next 2 digits are GG (green) value
 * Last 2 digits are BB (blue) value
 * For each, 00 is the lowest value (that color component will be 0), and ff is the highest value. 
 * For example, if written as #ff0000, this means that the red component is the largest, and because green and blue is 0, it will be a bright red color. 
 * For more detail, please search "color code" online.
 * 
 * <Example>
 * \c[#123456]
 * So like this, you just need to write in the color code instead of the numbers 0-31 inside the brackets []. 
 */
(function () {
 
    var Window_Base_obtainEscapeParam = Window_Base.prototype.obtainEscapeParam;
    Window_Base.prototype.obtainEscapeParam = function(textState) {
        var arr = /^\[\#[0-9A-Fa-f]{6}\]/.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            return arr[0].slice(1,8);
        } else {
            return Window_Base_obtainEscapeParam.apply(this,arguments);
        }
    };
 
    var Window_Base_textColor = Window_Base.prototype.textColor;
    Window_Base.prototype.textColor = function(n) {
        if(typeof n === 'string'){
            return n;
        }else{
            return Window_Base_textColor.apply(this,arguments);
        }
    };
 
})();

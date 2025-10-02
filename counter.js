var box1 = document.getElementById("input");

//ラベル書き換え（汎用）
function changelabel(label, next_text){ 
    var text = document.getElementById(label);
    text.innerHTML = next_text;
}
function count_chars(text){
    var counts = {};
    var i = "";
    var convert_list = {"\n": "(改行)", " ": "(空白)", "　": "(全角空白)", "\t": "(Tab)"}
    //↑単体で分かりにくい文字の置き換え対応一覧
    //出現回数カウント
    for (var n = 0; n < text.length; n++){
        i = text[n];
        if (i in convert_list){
            i = convert_list[i];}
        if (i in counts){
            counts[i] += 1;
        } else {
            counts[i] = 1;
        }
    }
    var result = []
    for (var i of Object.keys(counts)){
        result.push([i, counts[i]]);
    }
    //多い順に並べ替えて表示を成型
    result.sort((a, b) => b[1] - a[1]);
    var temp1 = []
    var rank = 1
    var i1_before = 0
    for (var n = 0; n < result.length; n++){
        i = result[n]
        //同率を同じ数字に
        if (i[1] != i1_before)
            rank = n + 1
        i1_before = result[n][1]
        temp1.push(rank + "/<b>" + i[0] + "</b>/" + i[1] + "回")
    }
    return "順位/文字/回数<br>" + temp1.join("<br>");
}
//メインのラベル書き換え
function count_and_display(){
    box1 = document.getElementById("input");
    changelabel("result", count_chars(box1.value));
}
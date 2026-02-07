let box1 = document.getElementById("input");
let resultdiv = document.getElementById("result");
let regex_check = document.getElementById("regex?");
let regexbox = document.getElementById("regexbox");

//ラベル書き換え（汎用）
function changelabel(label, next_text){ 
    let text = document.getElementById(label);
    text.innerHTML = next_text;
}
function count_chars(text){
    let counts = {};
    let tokens =[]
    let i = "";
    let convert_list = {"\n": "(改行)", " ": "(空白)", "　": "(全角空白)", "\t": "(Tab)"};
    //↑単体で分かりにくい文字の置き換え対応一覧
    let mode = "char";
    if (regex_check.checked){
        mode = "regex";
    }
    //出現回数カウント
    if (mode == "char"){
        for (let n = 0; n < text.length; n++){
            //i = text[n];
            tokens.push(text[n]);
            /*
            if (i in convert_list) {
            //if (!(i in convert_list)) {
                i = convert_list[i];}
            
            if (i in counts){
                counts[i] += 1;
            } else {
                counts[i] = 1;
            }//}
            */
        }
    } else if (mode == "regex"){
        //正規表現の処理
        let pattern = RegExp(regexbox.value, "g");
        tokens = box1.value.match(pattern)
        if (tokens == null){
            tokens = ["(マッチなし)"]
        }
    }

    for (i of tokens){
        if (i in convert_list) {
            i = convert_list[i];}
        if (i in counts){
            counts[i] += 1;
        } else {
            counts[i] = 1;
        }//}
    }

    let result = []
    for (let i of Object.keys(counts)){
        result.push([i, counts[i]]);
    }
    //多い順に並べ替えて表示を成型
    result.sort((a, b) => b[1] - a[1]);//降順に並べ替える
    let temp1 = [];
    let rank = 1;
    let i1_before = 0;
    for (let n = 0; n < result.length; n++){
        i = result[n];
        //同率を同じ順位に
        if (i[1] != i1_before){
            rank = n + 1;
        }
        i1_before = result[n][1];
        temp1.push([rank, i[0] , i[1]]);
    }
    return temp1;
}
//メインのラベル書き換え

function count_and_display(){
    box1 = document.getElementById("input");
    resultdiv = document.getElementById("result");
    resultp = document.getElementById("resulttable");

    //置き換え後の表作成
    let resultlist = count_chars(box1.value);
    let resulttable = document.createElement("table");
    let temp2 = ""
    let temp3 = ""
    temp2 = document.createElement("tr");
    for (let n of ["#", "文字", "回数"]){
        temp3 = document.createElement("th");
        temp3.textContent = n
        temp2.appendChild(temp3)
    resulttable.appendChild(temp2);
    }
    for (let n of resultlist){
        temp2 = document.createElement("tr");
        for (let m of n){
            temp3 = document.createElement("td");
            temp3.textContent = m;
            temp2.appendChild(temp3);
        }
        resulttable.appendChild(temp2);
    }
    resulttable.id="resulttable";

    //changelabel("result", count_chars(box1.value));
    resultdiv.replaceChild(resulttable, resultp);
}

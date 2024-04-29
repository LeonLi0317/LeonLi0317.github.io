
//美金->台幣匯率換算fn
function USDtoTWD() {
    let USD = $('#MASTER_CAP').val();
    $('#MASTER_CAP').val(numberComma(USD));
    let USPCNT = $('#USPCNT').val();
    let TWD =Math.round(Number(replaceComma(USD)) * USPCNT);
    $('#RATE').val(numberComma(TWD));
};
//字元擷取fn
function LEFT(str, num) {
    return str.substring(0, num);
};
function RIGHT(str, num) {
    return str.substring(str.length - num, str.length);
};

//驗證小數點欄位 fn
function numFloat(){
    $('.txtIncome').off().on('keypress',function(e){
        // 獲取字符
        var inputChar = String.fromCharCode(e.which);
        // 判斷輸入是否為數字或小數點
        if (!/^[0-9.]/.test(inputChar)) {
            // 如果不是，阻止该字符的输入
            e.preventDefault();
        }
        // 判斷小數點後是否超過兩位
        if (e.shiftKey && (e.which == 46 || e.which == 106)) { // 如果同时按下了shift键和點號鍵（.）或小鍵盤上的等號鍵（=），則允許輸入三位小數
            e.preventDefault(); // 阻止输入
        }
        // 判斷總長度(含小數點)是否超過五位
        if ($(this).val().length >= 5) { // 如果超過5位數則停止
            e.preventDefault(); // 停止
        }

    });

};

//試算 fn
function Calculate() {
    $('#tbd2').empty();
    $('#tbd3').empty();
    let tbody = $('#tbd2');
    let B_M = 1;
    let E_M = 1;
    let USPCNT = $('#USPCNT').val();
    $('.txtMonth').each(function (index, value) {
        if (index == 0) {
            let IncomePCNT = $('#txtIncome0').val();
            IncomePCNT = '第 '+(Number(index)+1).toString()+' 期　年化收益：'+ IncomePCNT +'%';

            let Mn = $(this).val();
            let MASTER_CAP = $('#MASTER_CAP').val();
            MASTER_CAP = replaceComma(MASTER_CAP);
            let T_MASTER_CAP = MASTER_CAP.replace(RIGHT(MASTER_CAP, 4), '0000');
            let PCNT = $(`#txtIncome${index}`).val();
            PCNT = PCNT / 100;
            let Income = Number(T_MASTER_CAP) * (PCNT / 12) * Number(Mn);
            Income = Math.round(Income);
            let Total = Number(MASTER_CAP) + Income;
            let ToTWD = Math.round(Total * USPCNT);
            let COST = $('#COST').val();
            COST = replaceComma(COST);
            COST = COST * Mn;
            let finalTotalTWD = ToTWD-COST;
            let finalTotalUSD = Math.round(finalTotalTWD / USPCNT);
            //console.log(PCNT);
            //console.log(Income);
            tbody.append(`<tr><td colspan="9" style="text-align:center;" ><span style="font-weight:bold;color:darkmagenta;">${IncomePCNT}</span></td></tr>
            <tr><td><span id="sp_Mn${index}">${"1~" + Mn + "月"}</span></td>
            <td><span id="sp_MASTER_CAP${index}">${numberComma(MASTER_CAP)}</span></td>
            <td><span id="sp_T_MASTER_CAP${index}">${numberComma(T_MASTER_CAP)}</span></td>
            <td><span id="sp_Income${index}">${numberComma(Income)}</span></td>
            <td><span id="sp_Total${index}">${numberComma(Total)}</span></td>
            <td><span id="sp_ToTWD${index}">${numberComma(ToTWD)}</span></td>
            <td><span id="sp_COST${index}">${numberComma(COST)}</span></td>
            <td><span id="sp_finalTotalTWD${index}">${numberComma(finalTotalTWD)}</span></td>
            <td><span id="sp_finalTotalUSD${index}">${numberComma(finalTotalUSD)}</span></td>
            </tr>`)
        } else {
            let IncomePCNT = $(`#txtIncome${index}`).val();
            IncomePCNT = '第 '+(Number(index)+1).toString()+' 期　年化收益：'+ IncomePCNT +'%';
            let Mn = $(this).val();
            //console.log(Mn);
            B_M = index - 1 == 0 ? Number(($(`#txtMonth${index - 1}`).val())) + 1 : E_M + 1;
            E_M = Number($(`#txtMonth${index}`).val());
            E_M = B_M + E_M - 1;
            let MASTER_CAP = $(`#sp_finalTotalUSD${index - 1}`).text();
            MASTER_CAP = replaceComma(MASTER_CAP);
            //console.log(MASTER_CAP);
            let T_MASTER_CAP = MASTER_CAP.replace(RIGHT(MASTER_CAP, 4), '0000');
            let PCNT = $(`#txtIncome${index}`).val();
            PCNT = PCNT / 100;
            let Income = Number(T_MASTER_CAP) * (PCNT / 12) * Number(Mn);
            Income = Math.round(Income);
            let Total = Number(MASTER_CAP) + Income;
            let ToTWD = Math.round(Total * USPCNT);
            let COST = $('#COST').val();
            COST = replaceComma(COST);
            COST = COST * Mn;
            let finalTotalTWD = ToTWD-COST;
            let finalTotalUSD = Math.round(finalTotalTWD / USPCNT);

            tbody.append(`<tr><td colspan="9" style="text-align:center;" ><span style="font-weight:bold;color:darkmagenta;">${IncomePCNT}</span></td></tr>
            <tr><td><span id="sp_Mn${index}">${B_M + "~" + E_M + "月"}</span></td>
            <td><span id="sp_MASTER_CAP${index}">${numberComma(MASTER_CAP)}</span></td>
            <td><span id="sp_T_MASTER_CAP${index}">${numberComma(T_MASTER_CAP)}</span></td>
            <td><span id="sp_Income${index}">${numberComma(Income)}</span></td>
            <td><span id="sp_Total${index}">${numberComma(Total)}</span></td>
            <td><span id="sp_ToTWD${index}">${numberComma(ToTWD)}</span></td>
            <td><span id="sp_COST${index}">${numberComma(COST)}</span></td>
            <td><span id="sp_finalTotalTWD${index}">${numberComma(finalTotalTWD)}</span></td>
            <td><span id="sp_finalTotalUSD${index}">${numberComma(finalTotalUSD)}</span></td>
            </tr>`)
            //console.log(B_M);
            //console.log(E_M);
            let tbd = $('#tbd tr').length;
            if(tbd == index +1 ){
                let tbd3 = $('#tbd3');
                let ORIMASTER_CAP = replaceComma($('#MASTER_CAP').val());
                let totalwithoutCAPTWD = finalTotalUSD - Number(ORIMASTER_CAP);
                let RATE = replaceComma($('#RATE').val());
                let totalwithoutCAPUSD = finalTotalTWD - Number(RATE);
                console.log(MASTER_CAP);
                console.log(finalTotalUSD);
                tbd3.append(`<tr><td class="table-warning"></td>
                    <td class="table-warning">總盈餘(美金)：${numberComma(totalwithoutCAPTWD)}</td>
                    <td class="table-danger"></td>
                    <td class="table-danger">總盈餘(台幣)：${numberComma(totalwithoutCAPUSD)}</td></tr>`);
            }
        };
    });
};
//str轉換千分位
function numberComma(num){
    let comma=/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(comma, ',');
};
//str千分位移除逗號
function replaceComma(num){
    return num.replaceAll(',','');
}


$(document).ready(function () {
    //只允許輸入數字
    $('#MASTER_CAP,#COST').on('keypress',function(e){
        var inputvalue = e.which;
        if(inputvalue < 48 || inputvalue > 57){
            e.preventDefault();
        }
    });
    //小數點限制
    numFloat();

    //加一筆資料 td
    $('#InsertRow').on('click', function () {
        let tbody = $('#tbd');
        let num = $('#tb').find('tbody').find('tr').length;
        tbody.append(`<tr><td class="txtID" style="width:1%">${num+1}</td>
        <td style="width:20%"><input type="number" maxlength="2" min="1" max="12" class="form-control form-control-sm NUM txtMonth" id="txtMonth${num}" placeholder="輸入期數"></td>
        <td style="width:20%"><input type="number" min="10" max="70" class="form-control form-control-sm NUM txtIncome" id="txtIncome${num}" placeholder="輸入(%)"></td></tr>`)
        //重新綁定監聽事件
        numFloat();
    });
    //減一筆資料 td
    $('#DeleteRow').on('click', function () {
        let tbody = $('#tb').find('tbody').find('tr');
        let num = $('#tb').find('tbody').find('tr').length;
        if (num != 1) {
            tbody.eq(num - 1).remove();
        }
    });
    //清空+還原欄位 td
    $('#DeleteALL').on('click', function () {
        let tbody = $('#tbd,#tbd2,#tbd3').find('tr');
        let num = $('#tbd,#tbd2,#tbd3').find('tr').length;
        for (let i = 1; i <= num ; i++) {
            tbody.eq(i).remove();
        }
        $('.NUM').val("");
    });
    //展出試算
    $('#Calculate').on('click', function () {
        var check = true;
        $('.NUM').each(function(index,value){
            let txtbox = $(this).val();
            if(txtbox==''){
                alert('欄位不可為空，請填寫/刪減欄位。');
                check = false;
                return false;
            }
        });
        if(check==false){
            return false;
        }
        Calculate();
    });

    //欄位選取時移除逗號
    $('#MASTER_CAP,#COST').on('focus',function(){
        var val = $(this).val();
        $(this).val(replaceComma(val));
    });

    //本金檢核 必須超過1w
    $('#MASTER_CAP').on('blur',function(){
        let val = $('#MASTER_CAP').val();
        let USPCNT = $('#USPCNT').val();
        val = replaceComma(val);
        if(val==''){
            return false;
        }
        if(USPCNT =='' && val!=''){
            alert('請先輸入美金匯率');
            $('#MASTER_CAP,#RATE').val("");
            return false;
        }
        if(Number(val)<10000 && val !=''){
            alert('本金不可以小於10,000美元');
            $('#MASTER_CAP,#RATE').val("");
            return false;
        }else{
            USDtoTWD();
        }
    });
    $('#COST').on('blur',function(){
        let COST = $('#COST').val();
        COST = numberComma(COST);
        $('#COST').val(COST);
    });
});

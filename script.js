//Creating title bar 
let i = JSON.parse(localStorage.getItem("i")) || 0;
let k = JSON.parse(localStorage.getItem("k")) || 0;
let li_count = [];
let di_count = [];
let Question = JSON.parse(localStorage.getItem("Question")) || {};
// let Value = {};
// Value.Responses = [];
// let response = {};

let titlebar = document.createElement("div");
titlebar.setAttribute("id", "title");
titlebar.innerHTML = "Discussion Portal";
document.body.appendChild(titlebar);

//Creating main div
let main_div = document.createElement("div");
main_div.setAttribute("id", "mainDiv");
main_div.setAttribute("class", "main_Div");
document.body.appendChild(main_div);

//Creating col for main div
let left_div = document.createElement("div");
left_div.setAttribute("id", "leftDiv");
left_div.setAttribute("class", "left-div");
main_div.appendChild(left_div);

//Creating col for main div
let right_div = document.createElement("div");
right_div.setAttribute("id", "rightDiv");
right_div.setAttribute("class", "right-div");
main_div.appendChild(right_div);

//Creating form 
let form = document.createElement("form");
form.setAttribute("id", "Question");
form.setAttribute("class", "form");
form.setAttribute("onsubmit", "return false");
right_div.appendChild(form);

//Creating h1
let h1 = document.createElement("h1");
h1.setAttribute("id", "H1");
h1.setAttribute("class", "h1");
h1.innerHTML = "Welcome to Discussion Portal!";
form.appendChild(h1);

//Creating h4
let h4 = document.createElement("h4");
h4.setAttribute("id", "H4");
h4.setAttribute("class", "h4");
h4.innerHTML = "Enter a subject and question to get started";
form.appendChild(h4);

//Creating input
let input = document.createElement("input");
input.setAttribute("id", "Subject");
input.setAttribute("class", "input");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Subject");
form.appendChild(input);

//Creating textarea
let textarea = document.createElement("textarea");
textarea.setAttribute("id", "ques");
textarea.setAttribute("class", "textarea");
textarea.setAttribute("placeholder", "Question");
form.appendChild(textarea);

//Creating div for search and new form_btn_div
let left_div_row = document.createElement("div");
left_div_row.setAttribute("id", "leftDivRow");
left_div_row.setAttribute("class", "left-div-row");
left_div.appendChild(left_div_row);

//create div for new ques
let form_btn_div = document.createElement("div");
form_btn_div.setAttribute("id", "formBtnDiv");
form_btn_div.setAttribute("class", "form-btn-div");
left_div_row.appendChild(form_btn_div);

//create div for search bar
let search_div = document.createElement("div");
search_div.setAttribute("id", "searchDiv");
search_div.setAttribute("class", "search-div");
left_div_row.appendChild(search_div);

//New ques button
let form_btn = document.createElement("input");
form_btn.setAttribute("id", "formBtn");
form_btn.setAttribute("type", "button");
form_btn.setAttribute("value", "Add Question");
form_btn.setAttribute("class", "form-btn");
form_btn.addEventListener('click', showForm);
form_btn_div.appendChild(form_btn);

//input search
let search = document.createElement("input");
search.setAttribute("id", "Search");
search.setAttribute("type", "search");
search.setAttribute("class", "search");
search.setAttribute("placeholder", "search questions...");
search.addEventListener("input", searching);
search_div.appendChild(search);


function showForm() {
    removeform();
    form.setAttribute("style", "display:flex");
}

//Submit button
let submit_btn = document.createElement("input");
submit_btn.setAttribute("id", "submitBtn");
submit_btn.setAttribute("type", "button");
submit_btn.setAttribute("value", "Submit");
submit_btn.setAttribute("class", "sub-btn");
submit_btn.addEventListener('click', onsubmit);
form.appendChild(submit_btn);

// if(text.value != "" && textArea.value != "")

let left_div_row2 = document.createElement("div");
left_div_row2.setAttribute("id", "leftDivRow2");
left_div_row2.setAttribute("class", "left-div-row2");
left_div.appendChild(left_div_row2);


let left_div_row3 = [];
function onsubmit() {

    let sub = document.getElementById("Subject");
    let sub_value = sub.value;
    sub.value = null;
    let ques = document.getElementById("ques");
    let ques_value = ques.value;
    ques.value = null;


    if (sub_value != "" && ques_value != "") {
        ++i;
        li_count[i - 1] = 0;
        di_count[i - 1] = 0;

        let string = `Question${i}`;
        Question[string] = {};
        Question[string].id = i;
        Question[string].Subject = sub_value;
        Question[string].Description = ques_value;
        Question[string].Responses = {};
        Question[string].fav = 0;
        Question[string].like_count = 0;
        Question[string].dislike_count = 0;
        let date3 = new Date();
        let time3 = date3.getTime();
        time3 = parseInt(time3 / 1000);
        Question[string].timecounter = time3;


        left_div_row3[i - 1] = document.createElement("div");
        left_div_row3[i - 1].setAttribute("id", `leftDivRow3${i}`);
        left_div_row3[i - 1].setAttribute("class", "left-div-row3");
        left_div_row2.appendChild(left_div_row3[i - 1]);

        let innerdiv = document.createElement("div");
        innerdiv.setAttribute("class", "innerdiv1");
        innerdiv.setAttribute("id", `innerdiv1${i}`);
        left_div_row3[i - 1].appendChild(innerdiv);

        let time = document.createElement("p");
        time.setAttribute("class", "time");
        time.setAttribute("id", `time${i}`);
        innerdiv.appendChild(time);
        timer(i);

        let fav_icon = document.createElement("img");
        fav_icon.setAttribute("class", "favicon1");
        fav_icon.setAttribute("id", `favicon1${i}`);
        fav_icon.setAttribute("src", `h1.png`);
        fav_icon.addEventListener('click', addtofav);
        innerdiv.appendChild(fav_icon);


        let fav_icon2 = document.createElement("img");
        fav_icon2.setAttribute("class", "favicon2");
        fav_icon2.setAttribute("id", `favicon2${i}`);
        fav_icon2.setAttribute("src", `h2.png`);
        fav_icon2.addEventListener('click', removefromfav);
        innerdiv.appendChild(fav_icon2);

        //Creating anchor tag
        let anchor = document.createElement("a");
        anchor.setAttribute("class", "a_tag");
        anchor.setAttribute("id", `a_tag${i}`);

        anchor.innerHTML = Question[string].Subject;
        left_div_row3[i - 1].appendChild(anchor);

        //Creating another anchor tag
        let anchor2 = document.createElement("a");
        anchor2.setAttribute("class", "a_tag2");
        anchor2.setAttribute("id", `a_tag2${i}`);

        anchor2.innerHTML = Question[string].Description;//localStorage.getItem(`question${i}.Subject`);
        left_div_row3[i - 1].appendChild(anchor2);

        let innerdiv1 = document.createElement("div");
        innerdiv1.setAttribute("class", "innerdiv2");
        innerdiv1.setAttribute("id", `innerdiv2${i}`);
        left_div_row3[i - 1].appendChild(innerdiv1);


        let like_icon = document.createElement("img");
        like_icon.setAttribute("class", "likeicon");
        like_icon.setAttribute("id", `likeicon${i}`);
        like_icon.setAttribute("src", `like.png`);
        like_icon.addEventListener('click', likecounter);
        innerdiv1.appendChild(like_icon);

        let like_count = document.createElement("p");
        like_count.setAttribute("class", "likecount");
        like_count.setAttribute("id", `likecount${i}`);
        innerdiv1.appendChild(like_count);

        let dislikeicon = document.createElement("img");
        dislikeicon.setAttribute("class", "dislikeicon");
        dislikeicon.setAttribute("id", `dislikeicon${i}`);
        dislikeicon.setAttribute("src", `dislike.png`);
        dislikeicon.addEventListener('click', dislikecounter);
        innerdiv1.appendChild(dislikeicon);

        let dislike_count = document.createElement("p");
        dislike_count.setAttribute("class", "dislikecount");
        dislike_count.setAttribute("id", `dislikecount${i}`);
        innerdiv1.appendChild(dislike_count);
        localStorage.setItem("Question", JSON.stringify(Question));
        localStorage.setItem("i", JSON.stringify(i));

        localStorage.setItem("k", JSON.stringify(k));
        createform(i);
        removeform();

        left_div_row3[i - 1].addEventListener('click', responseform);
    }
}


function timer(i) {
    let strgg = `Question${i}`;
    let date = new Date();
    let time = date.getTime();
    time = parseInt(time / 1000);
    let seconds = time - Question[strgg].timecounter;
    let id = setInterval(function () {
        let timerp = document.getElementById(`time${i}`);
        timerp.innerHTML = seconds;
        seconds++;
        if (seconds < 60) {
            if (seconds == 1) {
                timerp.innerHTML = `${seconds} second ago`;
            }
            else {
                timerp.innerHTML = `${seconds} seconds ago`;
            }
        }
        else if (seconds < 3600) {
            let min = parseInt(seconds / 60);
            if (min == 1) {
                timerp.innerHTML = `${min} minute ago`;
            }
            else {
                timerp.innerHTML = `${min} minutes ago`;
            }
        }
        else if (seconds < 86400) {
            let hour = parseInt(seconds / 3600);
            if (hour == 1) {
                timerp.innerHTML = `${hour} hour ago`;
            }
            else {
                timerp.innerHTML = `${hour} hours ago`;
            }

        }
        else if (seconds < 2592000) {
            let day = parseInt(seconds / 86400);
            if (day == 1) {
                timerp.innerHTML = `${day} day ago`;
            }
            else {
                timerp.innerHTML = `${day} days ago`;
            }
        }
        else if (seconds < 31104000) {
            let month = parseInt(seconds / 2592000);
            if (month == 1) {
                timerp.innerHTML = `${month} month ago`;
            }
            else {
                timerp.innerHTML = `${month} months ago`;
            }
        }
        else {
            let year = parseInt(seconds / 31104000);
            if (year == 1) {
                timerp.innerHTML = `${year} year ago`;
            }
            else {
                timerp.innerHTML = `${year} years ago`;
            }
        }
    }, 1000);
    Question[strgg].timecounter_id = id;
    localStorage.setItem("Question", JSON.stringify(Question));
}

function dislikecounter(element) {
    let id = element.target.id;
    id = id.slice(11, id.length);
    let string = `Question${id}`;
    let x = document.getElementById(`dislikecount${id}`);
    Question[string].dislike_count = Question[string].dislike_count + 1;
    x.innerHTML = Question[string].dislike_count;
    localStorage.setItem("Question", JSON.stringify(Question));
}


function likecounter(element) {
    let id = element.target.id;
    id = id.slice(8, id.length);
    let string = `Question${id}`;
    let x = document.getElementById(`likecount${id}`);
    Question[string].like_count = Question[string].like_count + 1;
    x.innerHTML = Question[string].like_count;
    localStorage.setItem("Question", JSON.stringify(Question));
}

function addtofav(element) {
    let id = element.target.id;
    id = id.slice(8, id.length);
    let x = document.getElementById(`favicon1${id}`);
    x.setAttribute("style", "display: none");
    let y = document.getElementById(`favicon2${id}`);
    y.setAttribute("style", "display: inline");
    let string = `Question${id}`;
    Question[string].fav = 1;
    localStorage.setItem("Question", JSON.stringify(Question));
}

function displayfav(j) {
    let x = document.getElementById(`favicon1${j}`);
    x.setAttribute("style", "display: none");
    let y = document.getElementById(`favicon2${j}`);
    y.setAttribute("style", "display: inline");
}
function removefromfav(element) {
    let id = element.target.id;
    id = id.slice(8, id.length);

    let x = document.getElementById(`favicon2${id}`);
    x.setAttribute("style", "display: none");

    let y = document.getElementById(`favicon1${id}`);
    y.setAttribute("style", "display: inline");
    let string = `Question${id}`;
    Question[string].fav = 0;
    localStorage.setItem("Question", JSON.stringify(Question));
}

let form2 = [];
let res_div = [];
//Creating response form 

function createform(m) {
    let string = `Question${m}`;
    form2[m - 1] = document.createElement("form");
    form2[m - 1].setAttribute("id", `Response${m}`);
    form2[m - 1].setAttribute("class", "form2");
    form2[m - 1].setAttribute("onsubmit", "return false");
    right_div.appendChild(form2[m - 1]);

    //Creating h2
    let h12 = document.createElement("h2");
    h12.setAttribute("id", `H12${m}`);
    h12.setAttribute("class", "h12");
    h12.innerHTML = "Question ";
    form2[m - 1].appendChild(h12);

    //Creating paragraph tags
    let p1 = document.createElement("p");
    p1.setAttribute("id", `ques_name${m}`);
    p1.setAttribute("class", "P1");
    let p1_v = document.getElementById(`a_tag${m}`);
    let p1_value = p1_v.innerHTML;
    p1.innerHTML = Question[string].Subject;
    form2[m - 1].appendChild(p1);

    let p2 = document.createElement("p");
    p2.setAttribute("id", `ques_value${m}`);
    p2.setAttribute("class", "P2");

    let p2_v = document.getElementById(`a_tag2${m}`);
    let p2_value = p2_v.innerHTML;
    p2.innerHTML = Question[string].Description;
    form2[m - 1].appendChild(p2);

    ///resolve button
    let resolve_btn = document.createElement("input");
    resolve_btn.setAttribute("id", `resolveBtn${m}`);
    resolve_btn.setAttribute("type", "button");
    resolve_btn.setAttribute("value", "Resolve");
    resolve_btn.setAttribute("class", "res-btn");
    resolve_btn.addEventListener('click', onresolve);
    form2[m - 1].appendChild(resolve_btn);

    let h13 = document.createElement("h2");
    h13.setAttribute("id", `H13${m}`);
    h13.setAttribute("class", "h13");
    h13.innerHTML = "Response";
    form2[m - 1].appendChild(h13);

    res_div[m - 1] = document.createElement("div");
    res_div[m - 1].setAttribute("id", `res_div${m}`);
    res_div[m - 1].setAttribute("class", `resdiv${m} resdiv`);
    form2[m - 1].appendChild(res_div[m - 1]);

    // add response div
    add_res_div = document.createElement("div");
    add_res_div.setAttribute("id", `add_res_div${m}`);
    add_res_div.setAttribute("class", "add_resdiv");
    form2[m - 1].appendChild(add_res_div);

    let h14 = document.createElement("h2");
    h14.setAttribute("id", `H14${m}`);
    h14.setAttribute("class", "h14");
    h14.innerHTML = "Add Response";
    add_res_div.appendChild(h14);

    let input1 = document.createElement("input");
    input1.setAttribute("id", `name${m}`);
    input1.setAttribute("type", "text");
    input1.setAttribute("class", `input2${m} input2`);
    input1.setAttribute("placeholder", "Enter name");
    add_res_div.appendChild(input1);

    //Creating textarea
    let textarea1 = document.createElement("textarea");
    textarea1.setAttribute("id", `comment${m}`);
    textarea1.setAttribute("class", `textarea2 textarea2${m}`);
    textarea1.setAttribute("placeholder", "Enter comment");
    add_res_div.appendChild(textarea1);

    let submit_btn2 = document.createElement("input");
    submit_btn2.setAttribute("id", `submitBtn2${m}`);
    submit_btn2.setAttribute("type", "button");
    submit_btn2.setAttribute("value", "Submit");
    submit_btn2.setAttribute("class", "sub-btn2");
    submit_btn2.addEventListener('click', onsubmit2);
    add_res_div.appendChild(submit_btn2);
}


function removeform() {
    let F = document.getElementsByTagName("form");
    F[0].setAttribute("style", "display:none");
    let l = F.length;

    for (let k = 1; k < l; k++) {
        if (F[k] != null) {
            F[k].setAttribute("style", "display:none");
        }
    }
}

function responseform(element) {
    let div_v = element.target;
    let d_id = div_v.id;
    let a = d_id.includes('leftDivRow3');

    if (a) {
        let idx = d_id.replace('leftDivRow3', " ");
        removeform();
        form2[idx - 1].setAttribute("style", "display:flex");
    }
}


function onsubmit2(element) {
    let input_id = element.target.id;
    let id_idx = input_id.replace('submitBtn2', " ");
    let str = id_idx.replace(" ", "res_div");

    let str2 = str.replace("res_div", "name");
    sub1 = document.getElementById(str2);

    let str3 = str2.replace("name", "comment");
    sub2 = document.getElementById(str3);

    if (sub1.value != "" && sub2.value != "") {
        let string2 = id_idx.replace(" ", "Question");
        let strk = `Response${k}`;
        Question[string2].Responses[strk] = {};
        Question[string2].Responses[strk].name = sub1.value;
        Question[string2].Responses[strk].comment = sub2.value;
        let date3 = new Date();
        let time3 = date3.getTime();
        time3 = parseInt(time3 / 1000);
        Question[string2].Responses[strk].time = time3;
        k++;
        let resDivIdx = document.getElementById(str);
        let res_divRow = document.createElement("div");
        res_divRow.setAttribute("class", `res_div_row`);
        resDivIdx.appendChild(res_divRow);

        //Creating paragraph tags
        let p1 = document.createElement("p");
        p1.setAttribute("id", `user_name${k}`);
        p1.setAttribute("class", "P4 P3");
        p1.innerHTML = Question[string2].Responses[strk].name;
        sub1.value = null;
        res_divRow.appendChild(p1);

        let p2 = document.createElement("p");
        p2.setAttribute("id", `comment2${k}`);
        p2.setAttribute("class", "P3");
        p2.innerHTML = Question[string2].Responses[strk].comment;
        sub2.value = null;
        res_divRow.appendChild(p2);

        let time2 = document.createElement("p");
        time2.setAttribute("class", "time2");
        time2.setAttribute("id", `time2${k}`);
        res_divRow.appendChild(time2);
        let id = id_idx.replace(" ", "");
        timer2(id, k - 1);

        localStorage.setItem("Question", JSON.stringify(Question));
        localStorage.setItem("k", JSON.stringify(k));
    }
}

function timer2(x, y) {
    let strgg = `Question${x}`;
    if (strgg.includes == " ") {
        strgg = strgg.replace(" ", "");
    }

    let strgg2 = `Response${y}`;
    let date = new Date();
    let time = date.getTime();
    time = parseInt(time / 1000);
    let seconds = time - Question[strgg].Responses[strgg2].time;
    let id = setInterval(function () {
        let timerp = document.getElementById(`time2${y + 1}`);
        timerp.innerHTML = seconds;
        seconds++;
        if (seconds < 60) {
            if (seconds == 1) {
                timerp.innerHTML = `${seconds} second ago`;
            }
            else {
                timerp.innerHTML = `${seconds} seconds ago`;
            }
        }
        else if (seconds < 3600) {
            let min = parseInt(seconds / 60);
            if (min == 1) {
                timerp.innerHTML = `${min} minute ago`;
            }
            else {
                timerp.innerHTML = `${min} minutes ago`;
            }
        }
        else if (seconds < 86400) {
            let hour = parseInt(seconds / 3600);
            if (hour == 1) {
                timerp.innerHTML = `${hour} hour ago`;
            }
            else {
                timerp.innerHTML = `${hour} hours ago`;
            }

        }
        else if (seconds < 259200) {
            let day = parseInt(seconds / 86400);
            if (day == 1) {
                timerp.innerHTML = `${day} day ago`;
            }
            else {
                timerp.innerHTML = `${day} days ago`;
            }
        }
        else if (seconds < 31104000) {
            let month = parseInt(seconds / 2592000);
            if (month == 1) {
                timerp.innerHTML = `${month} month ago`;
            }
            else {
                timerp.innerHTML = `${month} months ago`;
            }
        }
        else {
            let year = parseInt(seconds / 31104000);
            if (year == 1) {
                timerp.innerHTML = `${year} year ago`;
            }
            else {
                timerp.innerHTML = `${year} years ago`;
            }
        }
    }, 1000);
    Question[strgg].Responses[strgg2].time_id = id;
    localStorage.setItem("Question", JSON.stringify(Question));
}


function onresolve(element) {
    let idx = element.target.id.replace('resolveBtn', "");
    let ele2 = `Response${idx}`;
    let remov = document.getElementById(ele2);
    let ele3 = `leftDivRow3${idx}`;
    let remov2 = document.getElementById(ele3);
    let String = ele3.replace("leftDivRow3", "Question");
    let idt = Question[String].timecounter_id;
    clearInterval(idt);

    for (let p = 0; p < Object.keys(Question[String].Responses).length; p++) {
        let temp = Object.keys(Question[String].Responses)[p];
        let idt2 = Question[String].Responses[temp].time_id;
        clearInterval(idt2);
    }
    remov.remove();
    remov2.remove();

    delete Question[String];
    localStorage.setItem("Question", JSON.stringify(Question));
    showForm();
}

for (let j = 0; j < Object.keys(Question).length; j++) {
    let Q = Object.keys(Question)[j];
    Q = Q.slice(8, Q.length);
    creatediv(Q);
    showForm();
    let Strg = `Question${Q}`;
    for (let p = 0; p < Object.keys(Question[Strg].Responses).length; p++) {
        let temp = Object.keys(Question[Strg].Responses)[p];
        temp = temp.slice(8, temp.length);
        addRes(Q, temp);
    }

    if (Question[Strg].fav == 1) {
        displayfav(Q);
    }
}

function addRes(Q, temp) {
    let string2 = `Question${Q}`;
    let strk = `Response${temp}`;
    let resDivIdx = document.getElementById(`res_div${Q}`);
    let res_divRow = document.createElement("div");
    res_divRow.setAttribute("class", `res_div_row`);
    resDivIdx.appendChild(res_divRow);

    //Creating paragraph tags
    let p1 = document.createElement("p");
    p1.setAttribute("id", `user_name${temp}`);
    p1.setAttribute("class", "P4 P3");
    p1.innerHTML = Question[string2].Responses[strk].name;
    res_divRow.appendChild(p1);

    let p2 = document.createElement("p");
    p2.setAttribute("id", `comment2${temp}`);
    p2.setAttribute("class", "P3");
    p2.innerHTML = Question[string2].Responses[strk].comment;
    res_divRow.appendChild(p2);

    let time2 = document.createElement("p");
    time2.setAttribute("class", "time2");
    time2.setAttribute("id", `time2${temp + 1}`);
    res_divRow.appendChild(time2);
    timer2(Q, temp);
}


function creatediv(j) {
    let string = `Question${j}`;

    left_div_row3[j - 1] = document.createElement("div");
    left_div_row3[j - 1].setAttribute("id", `leftDivRow3${j}`);
    left_div_row3[j - 1].setAttribute("class", "left-div-row3");
    left_div_row2.appendChild(left_div_row3[j - 1]);

    let innerdiv = document.createElement("div");
    innerdiv.setAttribute("class", "innerdiv1");
    innerdiv.setAttribute("id", `innerdiv1${j}`);
    left_div_row3[j - 1].appendChild(innerdiv);


    let time = document.createElement("p");
    time.setAttribute("class", "time");
    time.setAttribute("id", `time${j}`);
    innerdiv.appendChild(time);
    timer(j);

    let fav_icon = document.createElement("img");
    fav_icon.setAttribute("class", "favicon1");
    fav_icon.setAttribute("id", `favicon1${j}`);
    fav_icon.setAttribute("src", `h1.png`);
    fav_icon.addEventListener('click', addtofav);
    innerdiv.appendChild(fav_icon);

    let fav_icon2 = document.createElement("img");
    fav_icon2.setAttribute("class", "favicon2");
    fav_icon2.setAttribute("id", `favicon2${j}`);
    fav_icon2.setAttribute("src", `h2.png`);
    fav_icon2.addEventListener('click', removefromfav);
    innerdiv.appendChild(fav_icon2);

    //Creating anchor tag
    let anchor = document.createElement("a");
    anchor.setAttribute("class", "a_tag");
    anchor.setAttribute("id", `a_tag${j}`);

    anchor.innerHTML = Question[string].Subject;
    left_div_row3[j - 1].appendChild(anchor);

    //Creating another anchor tag
    let anchor2 = document.createElement("a");
    anchor2.setAttribute("class", "a_tag2");
    anchor2.setAttribute("id", `a_tag2${j}`);

    anchor2.innerHTML = Question[string].Description;//localStorage.getItem(`question${i}.Subject`);
    left_div_row3[j - 1].appendChild(anchor2);

    let innerdiv1 = document.createElement("div");
    innerdiv1.setAttribute("class", "innerdiv2");
    innerdiv1.setAttribute("id", `innerdiv2${j}`);
    left_div_row3[j - 1].appendChild(innerdiv1);


    let like_icon = document.createElement("img");
    like_icon.setAttribute("class", "likeicon");
    like_icon.setAttribute("id", `likeicon${j}`);
    like_icon.setAttribute("src", `like.png`);
    like_icon.addEventListener('click', likecounter);
    innerdiv1.appendChild(like_icon);

    let like_count = document.createElement("p");
    like_count.setAttribute("class", "likecount");
    like_count.setAttribute("id", `likecount${j}`);
    if (Question[string].like_count != 0) {
        like_count.innerHTML = Question[string].like_count;
    }
    innerdiv1.appendChild(like_count);

    let dislikeicon = document.createElement("img");
    dislikeicon.setAttribute("class", "dislikeicon");
    dislikeicon.setAttribute("id", `dislikeicon${j}`);
    dislikeicon.setAttribute("src", `dislike.png`);
    dislikeicon.addEventListener('click', dislikecounter);
    innerdiv1.appendChild(dislikeicon);

    let dislike_count = document.createElement("p");
    dislike_count.setAttribute("class", "dislikecount");
    dislike_count.setAttribute("id", `dislikecount${j}`);
    if (Question[string].dislike_count != 0) {
        dislike_count.innerHTML = Question[string].dislike_count;
    }
    innerdiv1.appendChild(dislike_count);
    createform(j);
    removeform();
    left_div_row3[j - 1].addEventListener('click', responseform);
}
function searching() {
    for (let j = 0; j < Object.keys(Question).length; j++) {
        let Q = Object.keys(Question)[j];
        Q = Q.slice(8, Q.length);
        let str = `leftDivRow3${Q}`;
        let div = document.getElementById(str);
        div.setAttribute("style", "display:flex");
    }
    for (let j = 0; j < Object.keys(Question).length; j++) {
        let Q = Object.keys(Question)[j];
        let a = Question[Q].Subject;
        let b = Question[Q].Description;
        let s = search.value;
        let f1 = a.includes(`${search.value}`);
        let f2 = b.includes(`${search.value}`);
        Q = Q.slice(8, Q.length);
        let str = `leftDivRow3${Q}`;
        let div2 = document.getElementById(`a_tag${Q}`);
        txt2 = div2.innerHTML;
        let div1 = document.getElementById(`a_tag2${Q}`);
        txt1 = div1.innerHTML;

        let occurence2 = new RegExp("<mark>", "g");
        let newtxt2 = txt2.replace(occurence2, "");
        let occurence4 = new RegExp("</mark>", "g");
        newtxt2 = newtxt2.replace(occurence4, "");
        document.getElementById(`a_tag${Q}`).innerHTML = newtxt2;

        let occurence1 = new RegExp("<mark>", "g");
        let newtxt1 = txt1.replace(occurence1, "");
        let occurence3 = new RegExp("</mark>", "g");
        newtxt1 = newtxt1.replace(occurence3, "");
        document.getElementById(`a_tag2${Q}`).innerHTML = newtxt1;
        if (!f1 && !f2) {
            let str = `leftDivRow3${Q}`;
            let div = document.getElementById(str);
            div.setAttribute("style", "display:none");
        }
        else {
            let div2 = document.getElementById(`a_tag${Q}`);
            txt2 = div2.innerHTML;
            let div1 = document.getElementById(`a_tag2${Q}`);
            txt1 = div1.innerHTML;
            let occurence2 = new RegExp(search.value, "g");
            let newtxt2 = txt2.replace(occurence2, `<mark>${search.value}</mark>`);
            document.getElementById(`a_tag${Q}`).innerHTML = newtxt2;
            let occurence1 = new RegExp(search.value, "g");
            let newtxt1 = txt1.replace(occurence1, `<mark>${search.value}</mark>`);
            document.getElementById(`a_tag2${Q}`).innerHTML = newtxt1;
        }

    }
}



localStorage.setItem("Question", JSON.stringify(Question));
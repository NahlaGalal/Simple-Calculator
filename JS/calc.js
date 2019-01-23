var num1,num2,ob,res,
    point=false, // To ensure that only one point in the number
    flag=false, // To differentiate numbers from each other
    tri_func=false ; // To differentiate trignometric functions and square functions
var text = document.getElementById('res');
var draft = document.getElementById('textbox');

/* Functions */
function Operations (oper){
    switch (oper){
        case '+':
            res = parseFloat(num1) + parseFloat(num2) ;
            break;
        case '-':
            res = parseFloat(num1) - parseFloat(num2) ;
            break;
        case '*':
            res = parseFloat(num1) * parseFloat(num2) ;
            break;
        case '/':
            if(num2 === '0') res = "Can't Devide by Zero !!!";
            else res = parseFloat(num1) / parseFloat(num2) ;
            break;
        case '%':
            res = parseFloat(num1) % parseFloat(num2);
            break;
    }
}

function Clear(){
    num1 = undefined;
    num2 = undefined;
    ob = undefined;
    text.innerHTML = "";
    draft.innerHTML = '';
    flag = true; // A next number is a new number
    point = false; // We can write point 
} // To clear data

function Numbers(n){
    if(tri_func) Clear();  // If we wrtie (sin(8)) then pushed any number
    if(flag || text.innerHTML === "0") text.innerHTML = n ; // We start a new number
    else text.innerHTML += n ; // We continue the number we write
    flag = false; // The next number is write after this numbed
    tri_func = false; // No trignometric or square functions are pushed
} // To write numbers

function Op(n){
    if(num1 === undefined && text.innerHTML !== "Can't Devide by Zero !!!"){ // If this is the first operation
        if(!tri_func) draft.innerHTML += text.innerHTML + n ; 
        else draft.innerHTML += n ; // If we write (sin(8)) then pushed (+ /- / * / / / % )
        num1 = text.innerHTML; // Save the first number
        text.innerHTML = ""; // Clear text
        ob = n; // Save operation
    }else{
        if(text.innerHTML === ''){
            var str = draft.innerHTML;
            str = str.replace(ob, n);
            ob = n;
            draft.innerHTML = str;
        }
        else{
            num2 = text.innerHTML; // Save the second number
            Operations(ob) ; // Operate two numbers
            num1 = res; // Save the result as the first number to use again
            text.innerHTML = res ; // Show result
            if( text.innerHTML === "Can't Devide by Zero !!!"){
                Clear() ;
                text.innerHTML = res;
            }
            else{
                if(!tri_func) draft.innerHTML += num2 + n ;
                else draft.innerHTML += n; // // If we write (sin(8)) then pushed (+ /- / * / / / % )
                ob = n ; // Save new operation
                flag = true; // We start a new number
            }   
        }
    }
    tri_func = false; // We don't write trignometric or square functions
    point = false; // We can write points
} // To manage operations

/* Numbers */
document.getElementById('Num').addEventListener('click',function(e){
    if(e.target.tagName == "BUTTON"){
        if(e.target.classList[2] == "point"){
            if(!point){ // If we can write points
                Numbers('.');
                point = true ; // We cant write points
            }
        }
        else Numbers(e.target.innerHTML);
    }
}, false)

/* Operations */
document.getElementById('Operators').addEventListener('click',function(e){
    if(e.target.tagName == "BUTTON"){
        if(e.target.classList[2] == 'mod') Op('%');
        else Op(e.target.innerHTML) ;
    }
}, false)

/* Clear */
document.getElementById('clear').addEventListener('click', function(){
    Clear();
}, false);

/* Equality */
document.getElementById('equal').addEventListener('click', function(){
    if(num1 != undefined){ // If we don't write operations
        if(text.innerHTML === "") num2 = num1; // If we don't write second number
        else num2 = text.innerHTML;
        Operations(ob); // Make the operation
        text.innerHTML = res; // Show the result 
        draft.innerHTML = ''; 
        num1 = undefined;
        num2 = undefined;
        res = undefined;
        flag = true;
        point = false;
    }
}, false);

/* Degree and Radian */
var method = 'Deg', PI=Math.acos(-1) ;
var x = document.getElementById('method');
x.addEventListener('click', function(){
    if(x.innerHTML === 'Rad'){
        x.innerHTML = 'Deg' ;
        method = 'Deg' ;
    }else{
        x.innerHTML = 'Rad' ;
        method = 'Rad' ;
    }
}, false); // Converting between Deg, Rad 

/* Trignometric functions */
document.getElementById('sin').addEventListener('click', function(){
    if(text.innerHTML!='' && text.innerHTML !== "Can't Devide by Zero !!!"){ // If there is a number
        draft.innerHTML += "Sin(" + text.innerHTML + ')' ;
        if(method === 'Rad') text.innerHTML = Math.sin(text.innerHTML) ;
        else text.innerHTML = Math.sin((text.innerHTML*PI/180));
        tri_func = true;
    }
}, false);
document.getElementById('cos').addEventListener('click', function(){
    if(text.innerHTML!='' && text.innerHTML !== "Can't Devide by Zero !!!"){ // If there is a number
        draft.innerHTML += "Cos(" + text.innerHTML + ')' ;
        if(method === 'Rad') text.innerHTML = Math.cos(text.innerHTML) ;
        else text.innerHTML = Math.cos((text.innerHTML*PI/180));
        tri_func = true;
    }
}, false);
document.getElementById('tan').addEventListener('click', function(){
    if(text.innerHTML!='' && text.innerHTML !== "Can't Devide by Zero !!!"){ // If there is a number
        draft.innerHTML += "Tan(" + text.innerHTML + ')' ;
        if(method === 'Rad') text.innerHTML = Math.tan(text.innerHTML) ;
        else text.innerHTML = Math.tan((text.innerHTML*PI/180));
        tri_func = true;
    }
}, false);

/* Square functions */
document.getElementById('sqrt').addEventListener('click', function(){
    if(text.innerHTML!='' && text.innerHTML !== "Can't Devide by Zero !!!"){ // If there is a number
        draft.innerHTML += "&radic;(" + text.innerHTML + ')';
        text.innerHTML = Math.sqrt(text.innerHTML);
        tri_func = true ;
    }
}, false);
document.getElementById('square').addEventListener('click', function(){
    if(text.innerHTML!='' && text.innerHTML !== "Can't Devide by Zero !!!"){ // If there is a number
        draft.innerHTML += text.innerHTML + '<sup> 2 <sup>';
        text.innerHTML = Math.pow(text.innerHTML, 2);
        tri_func = true;
    }
}, false);
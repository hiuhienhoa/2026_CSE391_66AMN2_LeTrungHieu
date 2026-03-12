const prices={
ao:150000,
quan:200000,
giay:300000
};

function showError(id,msg){
document.getElementById(id).innerText=msg;
}

function clearError(id){
document.getElementById(id).innerText="";
}

function validateProduct(){

let p=document.getElementById("product").value;

if(p===""){
showError("productError","Hãy chọn sản phẩm");
return false;
}

clearError("productError");
return true;
}

function validateQuantity(){

let q=parseInt(document.getElementById("quantity").value);

if(isNaN(q)||q<1||q>99){
showError("quantityError","Số lượng 1-99");
return false;
}

clearError("quantityError");
return true;
}

function validateDate(){

let input=document.getElementById("delivery").value;

if(input===""){
showError("deliveryError","Chọn ngày giao");
return false;
}

let today=new Date();
today.setHours(0,0,0,0);

let max=new Date();
max.setDate(today.getDate()+30);

let d=new Date(input);

if(d<today||d>max){
showError("deliveryError","Ngày phải trong 30 ngày tới");
return false;
}

clearError("deliveryError");
return true;
}

function validateAddress(){

let a=document.getElementById("address").value.trim();

if(a.length<10){
showError("addressError","Địa chỉ ≥ 10 ký tự");
return false;
}

clearError("addressError");
return true;
}

function validateNote(){

let note=document.getElementById("note").value;

if(note.length>200){
showError("noteError","Tối đa 200 ký tự");
return false;
}

clearError("noteError");
return true;
}

function validatePayment(){

let checked=document.querySelector("input[name='payment']:checked");

if(!checked){
showError("paymentError","Chọn phương thức thanh toán");
return false;
}

clearError("paymentError");
return true;
}

function updateTotal(){

let p=document.getElementById("product").value;
let q=parseInt(document.getElementById("quantity").value);

if(prices[p] && q){
let total=prices[p]*q;

document.getElementById("total").innerText=
Number(total).toLocaleString("vi-VN");
}
}

document.getElementById("product").addEventListener("change",updateTotal);
document.getElementById("quantity").addEventListener("input",updateTotal);

document.getElementById("note").addEventListener("input",function(){

let len=this.value.length;

let counter=document.getElementById("noteCount");
counter.innerText=len+"/200";

if(len>200){
counter.classList.add("red");
}else{
counter.classList.remove("red");
}

validateNote();

});

document.getElementById("product").addEventListener("blur",validateProduct);
document.getElementById("quantity").addEventListener("blur",validateQuantity);
document.getElementById("delivery").addEventListener("blur",validateDate);
document.getElementById("address").addEventListener("blur",validateAddress);

document.getElementById("formOrder").addEventListener("submit",function(e){

e.preventDefault();

let valid=
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePayment();

if(!valid) return;

let p=document.getElementById("product").value;
let q=document.getElementById("quantity").value;
let d=document.getElementById("delivery").value;

let total=prices[p]*q;

let text=
"Sản phẩm: "+p+
"<br>Số lượng: "+q+
"<br>Tổng tiền: "+Number(total).toLocaleString("vi-VN")+
"<br>Ngày giao: "+d;

document.getElementById("summary").innerHTML=text;

document.getElementById("confirmBox").style.display="block";

});

document.getElementById("cancelBtn").onclick=function(){
document.getElementById("confirmBox").style.display="none";
};

document.getElementById("confirmBtn").onclick=function(){

document.getElementById("confirmBox").style.display="none";
document.getElementById("formOrder").style.display="none";
document.getElementById("success").style.display="block";

};
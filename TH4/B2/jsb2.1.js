function showError(id,msg){
document.getElementById(id).innerText=msg;
}

function clearError(id){
document.getElementById(id).innerText="";
}

function validateFullname(){

let name=document.getElementById("fullname").value.trim();

if(name.length<3){
showError("fullname-error","Tên ≥ 3 ký tự");
return false;
}

clearError("fullname-error");
return true;
}

function validateEmail(){

let email=document.getElementById("email").value;

let regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!regex.test(email)){
showError("email-error","Email không hợp lệ");
return false;
}

clearError("email-error");
return true;
}

function validatePhone(){

let phone=document.getElementById("phone").value;

let regex=/^0\d{9}$/;

if(!regex.test(phone)){
showError("phone-error","SĐT phải 10 số");
return false;
}

clearError("phone-error");
return true;
}

function validatePassword(){

let pass=document.getElementById("password").value;

let regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

if(!regex.test(pass)){
showError("password-error","Mật khẩu ≥8 ký tự có chữ hoa, thường, số");
return false;
}

clearError("password-error");
return true;
}

function validateConfirm(){

let pass=document.getElementById("password").value;
let confirm=document.getElementById("confirm").value;

if(pass!==confirm){
showError("confirm-error","Mật khẩu không khớp");
return false;
}

clearError("confirm-error");
return true;
}

function validateGender(){

let g=document.querySelector("input[name='gender']:checked");

if(!g){
showError("gender-error","Chọn giới tính");
return false;
}

clearError("gender-error");
return true;
}

function validateTerms(){

let t=document.getElementById("terms").checked;

if(!t){
showError("terms-error","Phải đồng ý điều khoản");
return false;
}

clearError("terms-error");
return true;
}

document.getElementById("fullname").addEventListener("input",function(){

let len=this.value.length;

document.getElementById("nameCount").innerText=len+"/50";

});

document.getElementById("password").addEventListener("input",function(){

let pass=this.value;

let strength=document.getElementById("strength");
let text=document.getElementById("strengthText");

let score=0;

if(pass.length>=8) score++;
if(/[A-Z]/.test(pass)) score++;
if(/[0-9]/.test(pass)) score++;
if(/[^A-Za-z0-9]/.test(pass)) score++;

strength.className="";
strength.style.width="0%";

if(score<=1){
strength.style.width="33%";
strength.classList.add("weak");
text.innerText="Yếu";
}
else if(score<=3){
strength.style.width="66%";
strength.classList.add("medium");
text.innerText="Trung bình";
}
else{
strength.style.width="100%";
strength.classList.add("strong");
text.innerText="Mạnh";
}

});

document.getElementById("togglePass").onclick=function(){

let pass=document.getElementById("password");

if(pass.type==="password"){
pass.type="text";
}else{
pass.type="password";
}

};

document.getElementById("formDangKy").addEventListener("submit",function(e){

e.preventDefault();

let valid=
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm() &
validateGender() &
validateTerms();

if(!valid) return;

let name=document.getElementById("fullname").value;

document.getElementById("formDangKy").style.display="none";

document.getElementById("success").innerText=
"Đăng ký thành công! Xin chào "+name;

});
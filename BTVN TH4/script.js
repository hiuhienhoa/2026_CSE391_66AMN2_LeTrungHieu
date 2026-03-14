var currentStep = 0;
var steps = document.querySelectorAll(".step");
var progressBar = document.getElementById("progress-bar");

function showStep(index){
    steps.forEach(function(step){
        step.classList.remove("active");
    });

    steps[index].classList.add("active");

    progressBar.style.width = ((index+1)/steps.length*100) + "%";

    if(index == 2){
        showConfirm();
    }
}

function nextStep(){

    if(!validateStep()) return;

    currentStep++;
    if(currentStep >= steps.length) currentStep = steps.length-1;

    showStep(currentStep);
}

function prevStep(){

    currentStep--;
    if(currentStep < 0) currentStep = 0;

    showStep(currentStep);
}

function validateStep(){

    if(currentStep == 0){

        var hoten = document.getElementById("hoten").value;
        var ngaysinh = document.getElementById("ngaysinh").value;
        var gioitinh = document.getElementById("gioitinh").value;

        if(hoten=="" || ngaysinh=="" || gioitinh==""){
            alert("Vui lòng nhập đầy đủ thông tin");
            return false;
        }
    }

    if(currentStep == 1){

        var email = document.getElementById("email").value;
        var matkhau = document.getElementById("matkhau").value;
        var xacnhan = document.getElementById("xacnhan").value;

        if(email=="" || matkhau=="" || xacnhan==""){
            alert("Vui lòng nhập đầy đủ thông tin");
            return false;
        }

        if(matkhau != xacnhan){
            alert("Mật khẩu không trùng khớp");
            return false;
        }
    }

    return true;
}

function showConfirm(){

    var hoten = document.getElementById("hoten").value;
    var ngaysinh = document.getElementById("ngaysinh").value;
    var gioitinh = document.getElementById("gioitinh").value;

    var email = document.getElementById("email").value;

    document.getElementById("confirm").innerHTML =
        "Ho ten: " + hoten + "<br>" +
        "Ngay sinh: " + ngaysinh + "<br>" +
        "Gioi tinh: " + gioitinh + "<br>" +
        "Email: " + email;
}

showStep(currentStep);
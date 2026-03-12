let students = [];
let filteredStudents = [];

let sortAsc = true;

function xepLoai(diem){
if(diem >= 8.5) return "Gioi";
if(diem >= 7) return "Kha";
if(diem >= 5) return "Trung binh";
return "Yeu";
}

function themSinhVien(){

let hoten = document.getElementById("hoten").value.trim();
let diem = parseFloat(document.getElementById("diem").value);

if(hoten === ""){
alert("Họ tên không được rỗng");
return;
}

if(isNaN(diem) || diem < 0 || diem > 10){
alert("Điểm phải từ 0 đến 10");
return;
}

students.push({hoten, diem});

document.getElementById("hoten").value="";
document.getElementById("diem").value="";
document.getElementById("hoten").focus();

applyFilters();
}

function applyFilters(){

let keyword = document.getElementById("timkiem").value.toLowerCase();
let loai = document.getElementById("locXeploai").value;

filteredStudents = students.filter(function(sv){

let dkTim = sv.hoten.toLowerCase().includes(keyword);

let xl = xepLoai(sv.diem);

let dkLoc = (loai === "tatca") || (xl === loai);

return dkTim && dkLoc;

});

filteredStudents.sort(function(a,b){
return sortAsc ? a.diem - b.diem : b.diem - a.diem;
});

renderTable();
}

function renderTable(){

let tbody = document.getElementById("tbodySinhVien");
tbody.innerHTML="";

if(filteredStudents.length === 0){

tbody.innerHTML="<tr><td colspan='5'>Không có kết quả</td></tr>";
return;

}

let tong=0;

for(let i=0;i<filteredStudents.length;i++){

let sv = filteredStudents[i];
tong += sv.diem;

let tr = document.createElement("tr");

if(sv.diem < 5){
tr.classList.add("yeu");
}

tr.innerHTML =
"<td>"+(i+1)+"</td>"+
"<td>"+sv.hoten+"</td>"+
"<td>"+sv.diem+"</td>"+
"<td>"+xepLoai(sv.diem)+"</td>"+
"<td><button data-index='"+students.indexOf(sv)+"'>Xóa</button></td>";

tbody.appendChild(tr);

}

let tb = (tong/filteredStudents.length).toFixed(2);

document.getElementById("thongke").innerText =
"Tổng SV: "+filteredStudents.length+" | Điểm TB: "+tb;

}

document.getElementById("btnThem").onclick = themSinhVien;

document.getElementById("diem").addEventListener("keypress",function(e){
if(e.key==="Enter") themSinhVien();
});

document.getElementById("timkiem").addEventListener("input",applyFilters);

document.getElementById("locXeploai").addEventListener("change",applyFilters);

document.getElementById("cotDiem").addEventListener("click",function(){

sortAsc = !sortAsc;

this.innerHTML = sortAsc ? "Điểm ▲" : "Điểm ▼";

applyFilters();

});

document.getElementById("tbodySinhVien").addEventListener("click",function(e){

if(e.target.tagName === "BUTTON"){

let index = e.target.dataset.index;

students.splice(index,1);

applyFilters();

}

});
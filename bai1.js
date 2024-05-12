function xoaKyTuTrang() {
    // Lấy giá trị từ input
    var chuoi = document.getElementById("inputChuoi").value;
    
    // Loại bỏ các ký tự trắng ở đầu và cuối chuỗi
    chuoi = chuoi.trim();
    
    // Thay thế nhiều khoảng trắng giữa các từ bằng một khoảng trắng duy nhất
    chuoi = chuoi.replace(/\s+/g, ' ');

    // Hiển thị kết quả
    document.getElementById("ketQua").innerText = chuoi;
    var words = chuoi.split(' ');
    for (var i = 0; i < words.length; i++) {
        if (words[i] !== "") { // Kiểm tra xem từ có rỗng không
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
        }
    }

    // Kết hợp lại thành chuỗi và hiển thị kết quả
    document.getElementById("ketQua").innerText = words.join(' ');
}
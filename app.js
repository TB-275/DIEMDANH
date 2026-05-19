// 1. IMPORT THƯ VIỆN FIREBASE V9 (MODULAR SDK) TỪ CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    onSnapshot, 
    doc, 
    setDoc, 
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// --- CẤU HÌNH FIREBASE CỦA BẠN ---
const firebaseConfig = {
  apiKey: "AIzaSyDWPq92w48NfPzuec0TPFfni-ZVQMFJOLs",
  authDomain: "thaoluandaihoi.firebaseapp.com",
  databaseURL: "https://thaoluandaihoi-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thaoluandaihoi",
  storageBucket: "thaoluandaihoi.firebasestorage.app",
  messagingSenderId: "843405316234",
  appId: "1:843405316234:web:06d7cd6d1d9dbd49605d73",
  measurementId: "G-HNGH4F39TG"
};

// Khởi tạo ứng dụng và kết nối Database chuẩn v9
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const COLLECTION_NAME = "diemdanh";

// 2. DATA ĐẠI BIỂU
let danhSachDaiBieu = [
    "Nguyễn Bá Duân", "Trương Thị Ngọc Phương", "Nguyễn Thanh Phong", "Nguyễn Thanh Hiền", "Vũ Thanh Nguyên", 
      "Trà Hoàng Sơn", "Nguyễn Đăng Hòa", "Ating Toàn", "Bùi Anh Đức", "Châu Ngọc Cường", 
      "Nguyễn Thị Thanh Long", "Lê Thị Kim Ngọc", "Phạm Thị Thùy Quyên", "Phan Đức Thắng", "Dương Quang Hậu", 
      "Nguyễn Văn Quang", "Trần Tường Vi", "Võ Duy Rin", "Trịnh Thị Hoài Thương", "Trần Quốc Duy", 
      "Nguyễn Thị Ngọc Bích", "Nguyễn Lê Hoài Thanh", "Nguyễn Thanh Thảo Nguyên", "Trần Thị Triều Giang", "Lê Bá Phương", 
      "Lê Thanh Hải", "Hồ Thị Phương Thảo", "Lê Cảnh Phong", "Lê Hoàng", "Nguyễn Thị Bích Ngân", "Võ Thu Uyên", 
      "Ngô Lâm Nhi", "Nguyễn Công Anh", "Phan Phi Hùng", "Trần Hữu Anh Quân", "Nguyễn Thị Thanh Tuyền", 
      "Thới Thị Non", "Phạm Quốc Huy", "Lê Viên Thành", "Nguyễn Thị Khánh Hằng", "Tô Viết Phước Khôi", "Lê Hữu Bình Nguyên", 
      "Phạm Trần Trúc Mai", "Lê Thanh Sơn", "Đinh Thị Thu Thanh", "Lê Đoàn Bảo Nguyên", "Nguyễn Thị Hoài Ân", "Đàm Thạch Thảo", 
      "Hồ Đắc Hạnh", "Võ Thị Như Ý", "Nguyễn Thị Hạnh Quyên", "Trần Quốc Chí Hiếu", "Bạch Ngọc Huyền Thi", "Ngô Thị Hoàng Thi", 
      "Vương Ngọc Sơn", "Lê Đức Thuận", "Mai Văn Việt", "Lê Đức Trung Thông", "Nguyễn Đức Cường", "Nguyễn Lê Kiều Oanh", 
      "Nguyễn Đình Thịnh", "Đinh Thị Thanh Hoa", "Phạm Thanh Thuận", "Đinh Ngọc Hiếu", "Nguyễn Phú Quý", "Nguyễn Thị Chung", 
      "Nguyễn Xuân Nhân", "Đỗ Văn Trân", "Tô Ngọc Hạnh Nữ", "Nguyễn Viết Trình",
      "Nguyễn Duy Thành", "Phan Ngọc Minh", "Nguyễn Lương Thành Đạt", "Lê Duy ", "Lê Ngọc Nhiên Hà",
               "Nguyễn Trọng Huy", "Phạm Tiến", "Ông Văn Tùng", "Nguyễn Văn Quy", "Hoàng Văn Hiệp", "Trương Đức Long", "Huỳnh Thanh Đông",
               "Phạm Thị Hiếu Ngân", "Phan Thành Lưu", "Huỳnh Ngọc Đông", "Võ Như Minh", "Hà Thị Nga", "Nguyễn Ngà ", "Ngô Thị Tú Trinh",
               "Trịnh Võ Anh Khoa", "Lê Anh Tuấn", "Lê Viết Hoàng", "Lê Tự Hoài Ân", "Nguyễn Quang Vinh", "Từ Nguyễn Tương Lai", "Lê Đăng Quốc Hải",
               "Nguyễn Quốc Công", "Nguyễn Văn Tân", "Lê Thị Ngọc Ly", "Hồ Thị Hoàng Tú", "Võ Thị Thu Hòa", "Trương Văn Hòa", "Phạm Thị Huyền Trang", "Trần Phước Vinh", "Nguyễn Hà Vi", "Phạm Hoàng Tuấn", "Nguyễn Thị Mỹ Ngọc ", "Phạm Thị Yến Chi", "Trần Văn Linh", "Trần Thị Nhơn",
               "Châu Ngọc Huy", "Đoàn Xuân Nương", "Huỳnh Minh Phát", "Hoàng Kim Anh", "Nguyễn Văn Hậu ", "Nguyễn Đức Hưng", "Nguyễn Thị Thu Huyền", "Huỳnh Đức Trí", "Đoàn Thanh Lâm",
               "Nguyễn Vũ Như Hoàng", "Cao Văn Nam", "Phạm Thị Trung", "Trần Hồ Thu", "Trương Thị Thanh Tâm", "Lê Thị Ảnh", "Nguyễn Văn Hảo", "Mai Văn Dân", "Vũ Thành Đạt",
               "Trương Thị Tường Vi", "Trần Quốc Vũ", "Phạm Thành An", "Lê Thị Bảo Trâm", "Huỳnh Thị Hoa (Xã Trà Liên)", "Nguyễn Hoài Nhơn",
               "Nguyễn Văn Thạch", "Đinh Văn Mực", "Trần Quang Định", "Hồ Văn Tâm", "Trần Hồng Sơn", "Hồ Văn Dương",
               "Nguyễn Thị Nhung","Bùi Thiên Vỹ", "Đào Kim Long","Lê Xuân Thành ","Phan Hoàng Huy","Nguyễn Lê Hưng","Lê Thị Kim Linh","Đặng Ngọc Châu",
                "Lê Thị Bích Luyện","Hồ Văn Hiếu","Nguyễn Thị Hoàng My","Bùi Văn Liu","Hồ Tư Huỳnh","Huỳnh Văn Hoàng","Nguyễn Văn Thanh","Hồ Văn Dũng (Xã Trà Tập)",
                "Hồ Văn Gương","Nguyễn Hồng Xuyến","Hồ Văn Dấu","Nguyễn Thành Long","Nguyễn Thị Bích Thùy","Hồ Văn Trí","Võ Thị Lệ Thu","Nguyễn Nhật Tuân ",
                "Phạm Thị Diệu","Nguyễn Thị Lin","Võ Ngọc Anh","Ngô Văn Tư","Bùi Văn Khánh","Nguyễn Vũ Việt","Nguyễn Thị Thùy Ngân","Đặng Thành Công",
                "Nguyễn Thị Mỹ Linh (Xã Thăng Phú)","Trần Lê Thị Kim Oanh","Bùi Nguyễn Hiền Vi","Lê Thị Hoài Thương","Nguyễn Thị Ánh Quyên",
                "Nguyễn Thị Thúy Hằng","Trần Văn Thắng","Trần Đại Việt","Đoàn Xuân Lộc","Trần Vũ Ngọc","Hà Tấn anh","Nguyễn Đình An ","Lương Văn Vinh ","Nguyễn Linh","Trương Thị Thu Viên","Phan Văn Pháp",
                "Nguyễn Văn Thuận","Ngô Thị Thảo Nguyên","Nguyễn Thị Mỵ Châu","Nguyễn Phước Tiến Huy","Trần Văn Trọng","Trần Quốc Công",
                "Huỳnh Thị Thùy Trâm","Huỳnh Thị Ngọc Thúy","Nguyễn Dương Hậu ","Trương Minh Quốc","Huỳnh Thị Hoa (Xã Hà Nha)","Lê Thị Long Viên ",
                "Huỳnh Thanh Thiên ","Đỗ Minh Vương","Nguyễn Thị Hương","Nguyễn Thị Yến Vy","Nguyễn Hồng Tươi","Nguyễn Văn Hường","Võ Thanh Luân","A Rất Dương","Bhling Ưi","A Rất Chung",
                "Nguyễn Thành Trung","Hoàng Thị Ý Nhi","Lương Thị Nhẫn","Mai Hồng Anh","Nguyễn Đỗ Bảo Trâm",
                "Lê Lãnh","Lê Thị Hồng Tuyết","Đoàn Thị Thu Ba","Pơ Loong Pao ","Coor Nhung","Un Thị Kim","Plong Thị Phát","Zơ Râm Hải","A Lăng Thế",
                "Coor Thanh Sơn","A Lăng Thị Hằng","Alăng Ứi","A Lăng Thị Bích","Bríu Công","Ating Bi","Ploong Thị Hoài","Hồ Thị Lê","Riah Rục",
                "Bnướch Hút","Bling Vơn","Phạm Trần Lương Tri","Alăng Crom","Alăng Bơm","Ríah Dung","Hốih Anh","Huỳnh Đức Tú","Trần Phục Triều",
                "Nguyễn Thị Kim Thoa","Mai Thị Vân","Hồ Thị Danh","Tạ Thành Công","A Yá","Nguyễn Hoàng Huy","Hồ Thị Ngân","Nguyễn Thị Mỹ Linh (Xã Phước Năng)","Nguyễn Thị Trâm",
                "Phạm Văn Hữu","Hồ Văn Tranh","A Mực","Hồ Văn Dũng (Xã Phước Hiệp)","Nguyễn Thị Thế","Võ Thị Minh Lý","Lê Thị Xuân","Trần Thị Kim Yến",
                "Bùi Thị Thùy Dương","Nguyễn Hoàng Đạt","Trần Thị Lệ Chi","Ngô Văn Thảo Nguyên","Đặng Anh Đào","Lê Minh Dũng","Cao Nam Hải","Đào Hồng Phú Mỹ",
                "Tống Duy Quốc","Ngô Thị Hoàng Vân","Trần Như Quỳnh","Nguyễn Hoàng Khánh Đoan","Hồ Thị Mỹ Hà","Phạm Văn Mãi","Đặng Ngọc Nhung",
                "Lương Lê Ngọc Sương","Lê Thế Vĩnh","Trương Anh Tài","Hồ Hồng Quang Hào","A Râl Vượng","Trần Thị Hoài Linh",
                "Trần Xuân Vĩ","Đỗ Lê Hưng Toàn","Nguyễn Khoa Vỹ","Nguyễn Trọng Nghĩa","Nguyễn Thị Kim Trinh","Nguyễn Thị Hạnh Nguyên","Nguyễn Quốc Khánh","Đinh Quang Lĩnh",
              "Võ Thị Như Ngọc", "Trần Vĩnh Tiến","Trịnh Ngọc Tấn","Nguyễn Viết Hùng","Lê Thị Kim Dung","Nguyễn Thị Yến Nhi",
              "Nguyễn Khoa Điềm","Lê Đình Lượng","Phan Tú Anh","Phan Thị Hoàng Lê","Nguyễn Đức Tài","Cao Anh Tuấn","Đặng Minh Vương","Nguyễn Vinh Huy",
              "Nguyễn Đăng Khoa","Nguyễn Hữu Anh Dũng","Hồng Thị Kim Uyên","Nguyễn Thị Hoàng Vy","Trần Thị Xuân Hương","Trần Thị Thanh Hằng","Nguyễn Hoàng Việt Danh","Huỳnh Lê Triều Vỹ",
              "Võ Văn Nhi","Hoàng Anh Cảm","Nguyễn Hoàng Nam","Đoàn Thị Anh Thư ","Nguyễn Thị Mơ","Nguyễn Thanh Hiếu","Nguyễn Trí Thành","Đỗ Lê Văn Thuấn","Huỳnh Đức",
              "Lê Văn Hiệp","Đỗ Hồng Quang","Nguyễn Văn Điệp","Trần Văn Thơ","Nguyễn Khắc Tuấn ","Nguyễn Anh Tuấn","Hà Phước Thái",
              "Hồ Đình Trí","Phạm Quang Mẫn ","Võ Văn Thành","Phạm Phú Dũng","Nguyễn Văn Hoàng","Đinh Hữu Công","Nguyễn Văn Sơn",
              "Phùng Nhật Tuyên","Nguyễn Ngọc Tâm","Lê Thị Lành","Dương Đình Cường","Trương Thanh Tịnh","Nguyễn Đức Hải","Nguyễn Thi Mây","Hồ Thanh Tâm",
              "Lê Long Khánh","Võ Thị Thanh Minh","Đặng Thị Vân","Trịnh Hồng Minh", "Gia Hân", "Bùi Thị Triều","Trương Công Nhàn","Đặng Tuấn Việt","Hồ Thị Hoàng Châu"
];

// Lọc trùng lặp và khoảng trắng
danhSachDaiBieu = [...new Set(danhSachDaiBieu.map(name => name.trim()).filter(Boolean))];

// Cập nhật tổng số lên giao diện
document.getElementById('totalCount').innerText = danhSachDaiBieu.length;

// Các biến toàn cục quản lý trạng thái
let selectedDelegate = null; 
let attendedList = []; 

// Lấy các DOM Elements (đã gộp các biến bị trùng)
const listElement = document.getElementById('delegateList');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults'); // Dropdown menu
const selectedNameEl = document.getElementById('selectedName');
const btnDiemDanh = document.getElementById('btnDiemDanh');
const attendedCountEl = document.getElementById('attendedCount');
const pendingCountEl = document.getElementById('pendingCount');
const progressTextEl = document.getElementById('progressText');
const progressFillEl = document.getElementById('progressFill');
const loader = document.getElementById('loader');
const toast = document.getElementById('toast');
const toggleListBtn = document.getElementById('toggleListBtn');
const fullListContainer = document.getElementById('fullListContainer');

// Tắt Loader khi trang load xong
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.display = 'none';
    }, 600);
});

function showToast(message) {
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// 3. HÀM VẼ DANH SÁCH TỔNG (Full List)
function renderFullList() {
    listElement.innerHTML = "";
    
    danhSachDaiBieu.forEach(name => {
        const li = document.createElement('li');
        li.innerText = name;

        if (attendedList.includes(name)) {
            li.classList.add('attended');
        }
        listElement.appendChild(li);
    });
}

// 4. HÀM VẼ DANH SÁCH DROPDOWN TÌM KIẾM
function renderDropdownList(filterText) {
    searchResults.innerHTML = "";
    
    const filteredList = danhSachDaiBieu.filter(name => 
        name.toLowerCase().includes(filterText.toLowerCase())
    );

    filteredList.forEach(name => {
        const li = document.createElement('li');
        li.innerText = name;

        if (attendedList.includes(name)) {
            li.innerText = name + " (Đã điểm danh)";
            li.style.color = "#4ade80";
            li.style.pointerEvents = "none"; // Không cho click nữa
        } else {
            // Logic khi bấm chọn tên từ Dropdown
            li.addEventListener('click', () => {
                selectedDelegate = name;
                selectedNameEl.innerText = name;
                selectedNameEl.classList.remove('highlight-none');
                btnDiemDanh.disabled = false;
                
                searchInput.value = name; // Điền tên lên ô tìm kiếm
                searchResults.style.display = 'none'; // Ẩn dropdown đi
            });
        }
        searchResults.appendChild(li);
    });

    if (filteredList.length === 0) {
        const li = document.createElement('li');
        li.innerText = 'Không tìm thấy đại biểu';
        li.style.color = "rgba(255,255,255,0.5)";
        li.style.pointerEvents = "none";
        searchResults.appendChild(li);
    }
}

// 5. SỰ KIỆN TÌM KIẾM (MỞ DROPDOWN)
searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.trim();
    if (keyword.length > 0) {
        searchResults.style.display = 'block';
        renderDropdownList(keyword);
    } else {
        searchResults.style.display = 'none';
        resetSelection();
    }
});

// Ẩn dropdown khi click ra ngoài
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});

// 6. LẮNG NGHE DỮ LIỆU REAL-TIME TỪ FIREBASE
onSnapshot(collection(db, COLLECTION_NAME), (snapshot) => {
    attendedList = []; 
    
    snapshot.forEach((doc) => {
        attendedList.push(doc.id); 
    });

    // Cập nhật thống kê tiến độ
    const attendedCount = attendedList.length;
    const pendingCount = Math.max(danhSachDaiBieu.length - attendedCount, 0);
    const percent = Math.round((attendedCount / danhSachDaiBieu.length) * 100) || 0;

    attendedCountEl.innerText = attendedCount;
    pendingCountEl.innerText = pendingCount;
    progressTextEl.innerText = `${percent}% hoàn thành`;
    progressFillEl.style.width = `${percent}%`;

    // Cập nhật lại UI Danh sách
    renderFullList(); 
    if (searchInput.value.trim().length > 0) {
        renderDropdownList(searchInput.value);
    }
    
    // Nếu người đang chọn (trên UI) vừa được điểm danh ở máy khác, reset
    if (attendedList.includes(selectedDelegate)) {
        resetSelection();
        searchInput.value = "";
    }
}, (error) => {
    console.error("Lỗi đồng bộ Firebase:", error);
    showToast("Không kết nối được dữ liệu Firebase!");
});

// 7. XỬ LÝ NÚT BẤM ĐIỂM DANH
btnDiemDanh.addEventListener('click', async () => {
    if (!selectedDelegate) return;

    btnDiemDanh.disabled = true;
    btnDiemDanh.innerText = "Đang lưu...";

    try {
        const docRef = doc(db, COLLECTION_NAME, selectedDelegate);
        await setDoc(docRef, {
            ho_ten: selectedDelegate,
            thoi_gian: serverTimestamp()
        });
        
        resetSelection();
        searchInput.value = ""; 
        showToast("Đã điểm danh thành công!");
    } catch (error) {
        console.error("Lỗi:", error);
        showToast("Lỗi mạng hoặc chưa thiết lập Rule Firebase!");
        btnDiemDanh.disabled = false;
        btnDiemDanh.innerText = "XÁC NHẬN ĐIỂM DANH";
    }
});

// Hàm reset lựa chọn
function resetSelection() {
    selectedDelegate = null;
    selectedNameEl.innerText = "Chưa chọn đại biểu nào";
    selectedNameEl.classList.add('highlight-none');
    btnDiemDanh.disabled = true;
    btnDiemDanh.innerText = "XÁC NHẬN ĐIỂM DANH";
}

// 8. CHỨC NĂNG THU GỌN / MỞ RỘNG DANH SÁCH TỔNG
toggleListBtn.addEventListener('click', () => {
  if (fullListContainer.style.display === 'none') {
    fullListContainer.style.display = 'block';
    toggleListBtn.textContent = 'Thu gọn ▲';
  } else {
    fullListContainer.style.display = 'none';
    toggleListBtn.textContent = 'Mở rộng ▼';
  }
});
// ================= 3. TRANG ĐẶT BÀN (reservation.html) =================
function getReservations() {
    var data = localStorage.getItem("cafeReservations");
    if (data == null) {
        return [];
    }
    return JSON.parse(data);
}

function saveReservations(list) {
    localStorage.setItem("cafeReservations", JSON.stringify(list));
}

function getToday() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}

function formatDate(dateStr) {
    var parts = dateStr.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
}

function createTimeOptions() {
    var select = document.getElementById("rsv-time");
    for (var hour = 7; hour <= 21; hour++) {
        var h = hour;
        if (hour < 10) {
            h = "0" + hour;
        }
        var times = [h + ":00", h + ":30"];
        for (var i = 0; i < times.length; i++) {
            var option = document.createElement("option");
            option.value = times[i];
            option.textContent = times[i];
            select.appendChild(option);
        }
    }
}

function showError(field, message) {
    document.getElementById("err-" + field).textContent = message;
}

function checkForm(name, phone, email, date, time, guests, area) {
    var isValid = true;
    showError("name", ""); showError("phone", ""); showError("email", "");
    showError("date", ""); showError("time", ""); showError("guests", "");

    if (name.length < 2) { showError("name", "Vui lòng nhập họ tên."); isValid = false; }
    
    var phoneRule = /^0[0-9]{9}$/;
    if (!phoneRule.test(phone)) { showError("phone", "Số điện thoại phải gồm 10 số, bắt đầu bằng 0."); isValid = false; }
    
    if (email != "" && email.indexOf("@") == -1) { showError("email", "Email không hợp lệ."); isValid = false; }
    
    if (date == "") {
        showError("date", "Vui lòng chọn ngày."); isValid = false;
    } else if (date < getToday()) {
        showError("date", "Không thể đặt bàn cho ngày đã qua."); isValid = false;
    }

    if (time == "") {
        showError("time", "Vui lòng chọn giờ."); isValid = false;
    } else if (date == getToday()) {
        var now = new Date();
        var nowMinutes = now.getHours() * 60 + now.getMinutes();
        var timeParts = time.split(":");
        var timeMinutes = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
        if (timeMinutes <= nowMinutes) {
            showError("time", "Giờ này đã qua, vui lòng chọn giờ khác."); isValid = false;
        }
    }

    if (isNaN(guests) || guests < 1 || guests > 20) {
        showError("guests", "Số người phải từ 1 đến 20."); isValid = false;
    } else if (area == "Phòng riêng" && guests < 6) {
        showError("guests", "Phòng riêng dành cho nhóm từ 6 người."); isValid = false;
    }

    if (isValid) {
        var list = getReservations();
        for (var i = 0; i < list.length; i++) {
            var r = list[i];
            if (r.phone == phone && r.date == date && r.time == time && r.status != "Đã hủy") {
                showError("time", "Bạn đã đặt bàn vào giờ này rồi.");
                isValid = false;
            }
        }
    }
    return isValid;
}

function showReservationList() {
    var ul = document.getElementById("rsv-list");
    var emptyText = document.getElementById("rsv-empty");
    var list = getReservations();
    
    if(!ul) return;
    ul.innerHTML = "";

    if (list.length == 0) {
        emptyText.hidden = false;
        return;
    }
    emptyText.hidden = true;

    for (var i = 0; i < list.length; i++) {
        var r = list[i];
        var li = document.createElement("li");
        li.className = "rsv-item";
        if (r.status == "Đã hủy") {
            li.className = "rsv-item cancelled";
        }

        var top = document.createElement("div");
        top.className = "rsv-item-top";
        var code = document.createElement("span"); code.className = "rsv-code"; code.textContent = r.code;
        var status = document.createElement("span"); status.className = "rsv-status"; status.textContent = r.status;
        top.appendChild(code); top.appendChild(status); li.appendChild(top);

        var info = document.createElement("p");
        info.textContent = r.name + " - " + r.guests + " người - " + r.area;
        li.appendChild(info);

        var when = document.createElement("p");
        when.textContent = r.time + ", " + formatDate(r.date);
        li.appendChild(when);

        if (r.status != "Đã hủy") {
            var cancelBtn = document.createElement("button");
            cancelBtn.className = "rsv-cancel";
            cancelBtn.textContent = "Hủy đặt bàn";
            cancelBtn.setAttribute("data-id", r.id);
            cancelBtn.onclick = function () { cancelReservation(this.getAttribute("data-id")); };
            li.appendChild(cancelBtn);
        }
        ul.appendChild(li);
    }
}

function cancelReservation(id) {
    if (!confirm("Bạn có chắc muốn hủy đặt bàn này không?")) return;
    var list = getReservations();
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == id) list[i].status = "Đã hủy";
    }
    saveReservations(list);
    showReservationList();
}

function handleSubmit(event) {
    event.preventDefault();
    var name = document.getElementById("rsv-name").value.trim();
    var phone = document.getElementById("rsv-phone").value.trim();
    var email = document.getElementById("rsv-email").value.trim();
    var date = document.getElementById("rsv-date").value;
    var time = document.getElementById("rsv-time").value;
    var guests = parseInt(document.getElementById("rsv-guests").value);
    var area = document.getElementById("rsv-area").value;
    var note = document.getElementById("rsv-note").value.trim();

    if (!checkForm(name, phone, email, date, time, guests, area)) return;

    var id = Date.now();
    var reservation = {
        id: id, code: "DB" + String(id).slice(-6), name: name, phone: phone,
        email: email, date: date, time: time, guests: guests, area: area,
        note: note, status: "Chờ xác nhận"
    };

    var list = getReservations();
    list.push(reservation);
    saveReservations(list);

    document.getElementById("rsv-success-text").textContent =
        "Mã đặt bàn của bạn: " + reservation.code + ". Bàn cho " + guests +
        " người lúc " + time + " ngày " + formatDate(date) + ".";
    document.getElementById("rsv-success").hidden = false;

    document.getElementById("reservation-form").reset();
    document.getElementById("rsv-guests").value = 2;
    document.getElementById("rsv-date").value = getToday();
    showReservationList();
}
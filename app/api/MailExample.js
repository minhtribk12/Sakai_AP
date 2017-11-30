var mysql = require('mysql');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var db = require(__base + 'config/database');
var config = require(__base + 'config/local_config');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
        user: config.email, // https://www.google.com/settings/security/lesssecureapps
        pass: config.password
    }
}));

module.exports = function (app) {
   
}

var sendMail = function(Name, email, DateTest){
    //Send mail
    transporter.sendMail({
       from: "Admin BKEnglish<bkenglish@hcmut.edu.vn>", // sender address
       to: email, // comma separated list of receivers
       subject: "XÁC NHẬN ĐĂNG KÝ THAM GIA XẾP LỚP-BKEnglish", // Subject line
       text: "", // plaintext body,
       html: "XÁC NHẬN ĐĂNG KÝ THAM GIA XẾP LỚP-BKEnglish<br>" +
             "Xin chào " + Name + "<br>"+
             "Cảm ơn bạn đã quan tâm và lựa chọn các khóa học tại Trung tâm ngoại ngữ Bách Khoa - BKEnglish.<br>"+
             "Nhằm tạo điều kiện tốt nhất cho học viên có thể tham gia học lớp phù hợp, phát triển và nâng cao các kỹ năng ngoại ngữ của mình, Trung tâm rất mong bạn có thể tham gia buổi kiểm tra trình độ diễn ra vào lúc 18h00 Ngày " + DateTest + " (18H).<br>"+
             "Địa điểm: <br>"+
             "- Lầu 1, Nhà C6, Trường Đại học Bách Khoa TP.HCM, 268 Lý Thường Kiệt, P14, Q10. (Nếu bạn chọn học tại Cơ sở Quận 10).<br>"+
             "- Phòng 209, Tòa nhà BKEnglish – ĐHBK (Đối diện ký túc xá Khu A – ĐHQG) (Nếu bạn chọn học tại Cơ sở Thủ Đức).<br>"+
             "Vui lòng gọi về Hotline: 0909 625 988 để được hổ trợ thêm bạn nhé.<br>"+
             "Hẹn gặp lại bạn,<br>"+
             "Thân mến!<br>"+
             "BKEnglish Team"
    },function(error, info){
        if(error){
            console.log(error);
            // res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            // res.json({yo: info.response});
        };
    })
};
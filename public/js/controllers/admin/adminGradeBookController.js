angular.module('adminGradeBookController', []).controller('AdminGradeBookController', function($scope, $rootScope, $route, md5, $window, $cookieStore, AdminGradeBook) {

    var user = $cookieStore.get('user') || null;
    var cdata = $cookieStore.get('cdata') || { 'cid': null, 'announcement_id': null, 'assignment_id': null, 'discussion_id': null, 'gradebook_item_id': null, 'menu_index': null, 'course_name': null, 'is_teacher': false};
    $scope.jsonExcel = null;
    $scope.sheet = {};
    $scope.course_name = cdata.course_name;

    AdminGradeBook.getGradebook(cdata.cid, user.users_id).then(function(data) {
        $scope.gradebooks = data;
    })

    /////////////////////////////////////////////////////////////For teachers
    AdminGradeBook.getGradebookItems(cdata.cid).then(function(data) {
        $scope.gradebook_items = data;
        getGradebookItemDetail();
    })

    $scope.setGradebookItemId = function (id) {
        $cookieStore.put('cdata', {'cid': cdata.cid, 'announcement_id': id, 'assignment_id': cdata.assignment_id, 'discussion_id': cdata.discussion_id, 'gradebook_item_id': id, 'menu_index': cdata.menu_index, 'course_name': cdata.course_name, 'is_teacher': cdata.is_teacher});
        getGradebookItemDetail();
    }

    function getGradebookItemDetail() {
        cdata = $cookieStore.get('cdata');
        AdminGradeBook.getGradebookItemDetail(cdata.gradebook_item_id, cdata.cid).then(function(data){
            $scope.students = data;
        })
    }


    /////////////////////////////////////////////////////////////


    $scope.setJson = function(val) {
        $scope.jsonExcel = JSON.parse(val);
        $scope.choiceSheet()
        $scope.$apply();
    }

    $scope.choiceSheet = function() {
        try {
            if ($scope.sheet.name && $scope.jsonExcel[$scope.sheet.name]) {
                $scope.ListData = $scope.jsonExcel[$scope.sheet.name];;
            }
        } catch (e) {
            alert("Please check your Excel file");
        }
    }

    $scope.submitPoint = function() {
    	AdminGradeBook.summitPoint(user, cdata, $scope.ListData).then(function(data){
    		$scope.jsonExcel = null;
    		$scope.sheet = {};
    		$('#xlfile').val(null);
    	})
    }


    //////////////////////////EXCEL PROCESSING///////////////////////////////
    var X = XLSX;
    var XW = {
        /* worker message */
        msg: 'xlsx',
        /* worker scripts */
        rABS: './xlsxworker2.js',
        norABS: './xlsxworker1.js',
        noxfer: './xlsxworker.js'
    };

    var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";
    if (!rABS) {
        document.getElementsByName("userabs")[0].disabled = true;
        document.getElementsByName("userabs")[0].checked = false;
    }

    var use_worker = typeof Worker !== 'undefined';
    if (!use_worker) {
        document.getElementsByName("useworker")[0].disabled = true;
        document.getElementsByName("useworker")[0].checked = false;
    }

    var transferable = use_worker;
    if (!transferable) {
        document.getElementsByName("xferable")[0].disabled = true;
        document.getElementsByName("xferable")[0].checked = false;
    }

    var wtf_mode = false;

    function fixdata(data) {
        var o = "",
            l = 0,
            w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
    }

    function ab2str(data) {
        var o = "",
            l = 0,
            w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
        return o;
    }

    function s2ab(s) {
        var b = new ArrayBuffer(s.length * 2),
            v = new Uint16Array(b);
        for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
        return [v, b];
    }

    function xw_noxfer(data, cb) {
        var worker = new Worker(XW.noxfer);
        worker.onmessage = function(e) {
            switch (e.data.t) {
                case 'ready':
                    break;
                case 'e':
                    console.error(e.data.d);
                    break;
                case XW.msg:
                    cb(JSON.parse(e.data.d));
                    break;
            }
        };
        var arr = rABS ? data : btoa(fixdata(data));
        worker.postMessage({ d: arr, b: rABS });
    }

    function xw_xfer(data, cb) {
        var worker = new Worker(rABS ? XW.rABS : XW.norABS);
        worker.onmessage = function(e) {
            switch (e.data.t) {
                case 'ready':
                    break;
                case 'e':
                    console.error(e.data.d);
                    break;
                default:
                    xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r");
                    console.log("done");
                    cb(JSON.parse(xx));
                    break;
            }
        };
        if (rABS) {
            var val = s2ab(data);
            worker.postMessage(val[1], [val[1]]);
        } else {
            worker.postMessage(data, [data]);
        }
    }

    function xw(data, cb) {
        transferable = document.getElementsByName("xferable")[0].checked;
        if (transferable) xw_xfer(data, cb);
        else xw_noxfer(data, cb);
    }

    function get_radio_value(radioName) {
        var radios = document.getElementsByName(radioName);
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked || radios.length === 1) {
                return radios[i].value;
            }
        }
    }

    function to_json(workbook) {
        var result = {};
        workbook.SheetNames.forEach(function(sheetName) {
            var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                result[sheetName] = roa;
            }
        });
        return result;
    }

    function to_csv(workbook) {
        var result = [];
        workbook.SheetNames.forEach(function(sheetName) {
            var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
            if (csv.length > 0) {
                result.push("SHEET: " + sheetName);
                result.push("");
                result.push(csv);
            }
        });
        return result.join("\n");
    }

    function to_formulae(workbook) {
        var result = [];
        workbook.SheetNames.forEach(function(sheetName) {
            var formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
            if (formulae.length > 0) {
                result.push("SHEET: " + sheetName);
                result.push("");
                result.push(formulae.join("\n"));
            }
        });
        return result.join("\n");
    }

    function process_wb(wb) {
        var output = "";
        switch (get_radio_value("format")) {
            case "json":
                output = JSON.stringify(to_json(wb), 2, 2);
                break;
            case "form":
                output = to_formulae(wb);
                break;
            default:
                output = to_csv(wb);
        }
        $scope.setJson(output);
    }

    function handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        rABS = document.getElementsByName("userabs")[0].checked;
        use_worker = document.getElementsByName("useworker")[0].checked;
        var files = e.dataTransfer.files;
        var f = files[0]; {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function(e) {
                if (typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
                var data = e.target.result;
                if (use_worker) {
                    xw(data, process_wb);
                } else {
                    var wb;
                    if (rABS) {
                        wb = X.read(data, { type: 'binary' });
                    } else {
                        var arr = fixdata(data);
                        wb = X.read(btoa(arr), { type: 'base64' });
                    }
                    process_wb(wb);
                }
            };
            if (rABS) reader.readAsBinaryString(f);
            else reader.readAsArrayBuffer(f);
        }
    }



    function handleDragover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    function handleFile(e) {
        rABS = document.getElementsByName("userabs")[0].checked;
        use_worker = document.getElementsByName("useworker")[0].checked;
        use_worker = false; //Fix lỗi
        var files = e.target.files;
        var f = files[0]; {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function(e) {
                if (typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
                var data = e.target.result;
                if (use_worker) {
                    xw(data, process_wb);
                } else {
                    var wb;
                    if (rABS) {
                        wb = X.read(data, { type: 'binary' });
                    } else {
                        var arr = fixdata(data);
                        try {
                           wb = X.read(btoa(arr), { type: 'base64' });
                        } catch (e) {
                            alert('Unsupported File');
                            return;
                        }
                    }
                    process_wb(wb);
                }
            };
            if (rABS) reader.readAsBinaryString(f);
            else reader.readAsArrayBuffer(f);
        }
    }

    var xlf = document.getElementById('xlf');
    var drop = document.getElementById('drop');
    if (drop.addEventListener) {
        drop.addEventListener('dragenter', handleDragover, false);
        drop.addEventListener('dragover', handleDragover, false);
        drop.addEventListener('drop', handleDrop, false);
    }

    if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);
});
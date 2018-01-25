(function () {

    function TableDnD() {
        this.dragObject = null;
        this.mouseOffset = null;
        this.oldY = null;
        this.oldWidth = null;
    }

    function DataGrid(data) {
        var dataGrid = [];
        dataGrid[dataGrid.length++] = '<table cellspacing="0" cellpadding="0">';
        dataGrid[dataGrid.length++] = '<tbody>';
        dataGrid[dataGrid.length++] = '<tr>';
        dataGrid = dataGrid.concat($.map(setttings.columns, function (value, index, array) {
            return '<td>' + value.field + '</td>'
        }));
        dataGrid = dataGrid.concat($.map(setttings.records, function (value, index, array) {
            var temp = [];
            temp[temp.length++] = '<tr>'
            temp[temp.length++] = '<td>' + value.recid + '</td>';
            temp[temp.length++] = '<td>' + value.fname + '</td>';
            temp[temp.length++] = '<td>' + value.lname + '</td>';
            temp[temp.length++] = '<td>' + value.email + '</td>';
            temp[temp.length++] = '<td>' + value.sdate + '</td>';
            temp[temp.length++] = '</tr>'
            return temp;
        }));
        dataGrid[dataGrid.length++] = '</tr>';
        dataGrid[dataGrid.length++] = '</tbody>';
        dataGrid[dataGrid.length++] = '</table>';
        this.view = dataGrid.join("");
    }

    $.fn.dataGrid = function (options) {
        var defaults = {
            columns: [
                { field: 'recid', caption: 'ID', size: '50px', sortable: true, attr: 'align=center' },
                { field: 'lname', caption: 'Last Name', size: '30%', sortable: true, resizable: true },
                { field: 'fname', caption: 'First Name', size: '30%', sortable: true, resizable: true },
                { field: 'email', caption: 'Email', size: '40%', resizable: true },
                { field: 'sdate', caption: 'Start Date', size: '120px', resizable: true },
            ],
            records: [
                { recid: 1, fname: 'John', lname: 'doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 9, fname: 'Sergei', lname: 'Rachmaninov', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 20, fname: 'Jill', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 21, fname: 'Frank', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 22, fname: 'Peter', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 23, fname: 'Andrew', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 24, fname: 'Manny', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 25, fname: 'Ben', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 26, fname: 'Doer', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 27, fname: 'Shashi', lname: 'bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
                { recid: 28, fname: 'Av', lname: 'Rachmaninov', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
            ]
        }

        var setttings = $.extend(defaults, options);

        return this.each(function () {
            var dataGrid = new DataGrid(setttings);
            $(this).append(dataGrid);
        });
    }
})();



window.onload = function () {
    $("#dataGrid").dataGrid();
}


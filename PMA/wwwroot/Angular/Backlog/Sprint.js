$(function () {
    var _todo = [];
    var _ip = [];
    var _done = [];

    $('.dd').nestable({
        group: 'categories',
        maxDepth: 1
    });

    $('.dd').on('change', function () {
        var todoList = [];
        var elems = $('.todo').first().children().children();
        for (var i = 0; i < elems.length; i++) {
            todoList.push($(elems[i]).data('id'));
        }
        todoList = todoList.filter(s => s > 0);

        var inProgressList = [];
        var elems = $('.inprogress').first().children().children();
        for (var i = 0; i < elems.length; i++) {
            inProgressList.push($(elems[i]).data('id'));
        }
        inProgressList = inProgressList.filter(s => s > 0);

        var doneList = [];
        var elems = $('.done').first().children().children();
        for (var i = 0; i < elems.length; i++) {
            doneList.push($(elems[i]).data('id'));
        }
        doneList = doneList.filter(s => s > 0);

        if (arrayEquals(todoList, _todo) && arrayEquals(doneList, _done) && arrayEquals(inProgressList, _ip)) return;

        _todo = todoList;
        _ip = inProgressList;
        _done = doneList;

        var param = { 'todo': JSON.stringify(_todo), 'inprogress': JSON.stringify(_ip), 'done': JSON.stringify(_done) }
        JsonCallParam("Backlog", "UpdateIssueStatus", param);
        notify("Issue Updated Successfully!");
    })
    function arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }
    $('.complete-sprint').click(function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "This can not be undone. All the tasks in this sprint will be marked completed",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Complete',
            focusCancel: true
        }).then((result) => {
            if (result.value) {
                let id = $(this).data('id');
                JsonCallParam("Backlog", "CompleteSprint", { sprintId: id });
                window.location.href = "/Backlog/SprintReport/" + id;
            }
        })
    })
    $('#search-issue').on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".dd-list li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
})
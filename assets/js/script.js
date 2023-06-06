

$(function () {
    let toDoContainer = $(".todo-container");
    let addBox = toDoContainer.find(".add-box");
    let listBoxDoTask = toDoContainer.find(".do-task .list-box");
    let listBoxDoneTask = toDoContainer.find(".done-task .list-box");
    let inputAdd = addBox.find(".input-add");
    let buttonAdd = addBox.find(".button-add");
    let buttonRemove = toDoContainer.find(".remove");

    let addTask = function () {
        let val = inputAdd.val().trim();
        if (val === "") {
            alert("Vui lòng nhập nội dung");
            return;
        }

        let newItem = $(`<div class="item">
                                <a class="custome-check">
                                    <i class="fa-sharp fa-solid fa-check check-icon"></i>
                                    <i class="uncheck-icon"></i>
                                    <input type="checkbox" />
                                </a>
                                <label class="title">${val}</label>
                                <a class="remove" href="#">
                                    <i class="fa-solid fa-trash"></i>
                                </a>
                            </div>`);

        newItem.find(".custome-check").click(function () {
            toggleCheck(this);
        });

        newItem.find(".remove").click(function () {
            removeTask(this);
        });

        listBoxDoTask.prepend(newItem);

        inputAdd.val("");
        inputAdd.focus();
    }

    let removeTask = function (e) {
        let result = confirm("Bạn có chắc muốn xóa không?");
        let item = $(e).closest(".item");

        if (result) {
            item.slideUp(500, function () {
                item.remove();
            });
        }
    }

    let toggleCheck = function (e) {
        let $this = $(e);

        //Từ elem hiện tại, tìm ra cha của nó là item
        let item = $this.closest(".item");

        //Kiểm tra xem item cha đó có active chưa?
        if (item.hasClass("active")) {
            item.removeClass("active");
            item.detach().appendTo(listBoxDoTask);
        }
        else {
            item.addClass("active");
            item.detach().appendTo(listBoxDoneTask);
        }
    };

    toDoContainer.find(".item .custome-check").click(function () {
        toggleCheck(this);
    });

    buttonAdd.click(function () {
        addTask();
    });

    inputAdd.keyup(function (event) {
        if (event.which == 13) {
            addTask();
        }
    });

    buttonRemove.click(function () {
        removeTask(this);
    });
});


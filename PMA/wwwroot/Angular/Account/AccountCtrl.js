App.controller("AccountCtrl", function ($scope, $rootScope, $compile) {

    //Account Methods STARTED
    $scope.getAccount = function () {
        JsonCall("Account", "GetAccount");
        $scope.account = list;
    }
    $scope.saveAccount = function () {
        JsonCallParam("Account", "UpdateAccount", { 'account': JSON.stringify($scope.account) });
        notify("Account Updated Successfully");
    }
    //Account Methods ENDED

    //Users Methods STARTED

    $scope.assignUserProject = { projectId: 0, isActive: true };
    $scope.registerUser = {
        fullName: "", firstName: "", lastName: "", email: "",
        userName: "", password: "", mobileNumber: "", accountId: 0
    };
    $scope.getProjects = function () {
        JsonCall("Projects", "GetProjects");
        $scope.projects = list;
    }
    $scope.assignedProjects = function (Uid, userProjects) {
        $scope.assignedUserProjects = userProjects;
        $scope.assignUserProject = { id: Uid, isActive: false, projectId: 0 };
        let toRemove = userProjects.map(s => s.projectId);
        $scope.chooseProjects = $scope.projects.filter((el) => !toRemove.includes(el.projectId));
        $('.userProjects').modal();
    }
    $scope.assignProjectToUser = function () {
        JsonCallParam("Account", "AddUserProject", { 'userProject': JSON.stringify($scope.assignUserProject) });
        notify("You assigned a project to user!");
        $('#addUserProject').slideUp()
        $scope.getUsers();
        $scope.assignedUserProjects = $scope.users.find(s => s.id === $scope.assignUserProject.id).userProjects;
        let toRemove = $scope.assignedUserProjects.map(s => s.projectId);
        $scope.chooseProjects = $scope.projects.filter((el) => !toRemove.includes(el.projectId));
        $scope.assignUserProject.projectId = 0
    }
    $scope.unSelectActiveProject = function (index) {
        $scope.assignedUserProjects.forEach(function (obj, i) {
            if (i !== index)
                obj.isActive = false;
        })
        var uid = $scope.assignedUserProjects[index].id;
        JsonCallParam("Account", "ActivateProject", { id: $scope.assignedUserProjects[index].projectId, userid: uid });
        notify("You activated Project: " + $scope.assignedUserProjects[index].project.projectName);
    }
    $scope.deleteUserProject = function (Id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to unassign this Project to user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Unassign',
            focusCancel: true
        }).then((result) => {
            if (result.value) {
                JsonCallParam("Account", "DeleteUserProject", { id: Id });
                notify('You unassigned Project to user!');
                $scope.getUsers();
                $scope.assignedUserProjects = $scope.users.find(s => s.id === $scope.assignUserProject.id).userProjects;
                applyChanges();
            }
        })
    }
    $scope.saveUser = function () {
        JsonCallParam("Auth", "IsUsernameValid", { username: $scope.registerUser.email });
        $scope.usernameExists = !list;
        if ($scope.usernameExists) return;
        JsonCallParam("Account", "AddUser", {
            "registerDto": JSON.stringify($scope.registerUser),
            "userProject": JSON.stringify($scope.assignUserProject)
        });
        if (list !== true) {
            $('#account-section').waitMe("hide");
            Swal.fire("Error", list, "error");
        }
        else {
            $scope.getUsers();
            $('.userForm').modal('hide');
        }
    }
    $scope.updateUser = function () {
        JsonCallParam("Account", "UpdateUser", { "registerDto": JSON.stringify($scope.registerUser) });
        if (list !== true) {
            $('#account-section').waitMe("hide");
            Swal.fire("Error", list, "error");
        }
        else {
            $scope.getUsers();
            $('.userForm').modal('hide');
        }
    }
    $scope.userform = function (i) {
        if (i > -1)
            $scope.registerUser = $scope.users[i];
        else
            $scope.registerUser = {
                fullName: "", firstName: "", lastName: "", email: "",
                userName: "", password: "", mobileNumber: "", accountId: 0, Id: ""
            };
        $scope.userForm = true;
        $('.userForm').modal();
        $scope.chooseProjects = angular.copy($scope.projects)
    }
    $scope.getUsers = function () {
        JsonCall("Account", "GetAccountUsers");
        $scope.users = list;
    }
    $scope.blockUser = function (Id, username) {
        Swal.fire({
            title: 'Are you sure?',
            text: username + " will not be able to login once blocked. To restore access in the future, you must unblock the user's account. To permanently delete the user, please use the delete button.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Block',
            focusCancel: true
        }).then((result) => {
            if (result.value) {
                JsonCallParam("Account", "BlockUser", { id: Id });
                Swal.fire('Blocked!', 'You blocked ' + username, 'success');
                $scope.getUsers();
                applyChanges();
            }
        })
    }
    $scope.unblockUser = function (Id, username) {
        Swal.fire({
            title: 'Are you sure?',
            text: username + " will be able to login again?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Unblock',
            focusCancel: true
        }).then((result) => {
            if (result.value) {
                JsonCallParam("Account", "UnblockUser", { id: Id });
                Swal.fire('Unblocked!', 'You unblocked ' + username, 'success');
                $scope.getUsers();
                applyChanges();
            }
        })
    }
    $scope.deleteUser = function (Id, username) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will not be able to recover user " + username + "! Are you sure you want to permanently delete user " + username + "?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            focusCancel: true
        }).then((result) => {
            if (result.value) {
                JsonCallParam("Account", "DeleteUser", { id: Id });
                Swal.fire('Deleted!', 'You deleted ' + username, 'success');
                $scope.getUsers();
                applyChanges();
            }
        })
    }
    //Users Methods ENDED

    function applyChanges() {
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }
    }
    $(function () {
        $('.password-icon').click(function () {
            var input = $(this).parent().prev();
            if (input.attr('type') == 'text') {
                $(input).attr('type', 'password');
                $(this).addClass('fa-eye').removeClass('fa-eye-slash');
            }
            else {
                $(input).attr('type', 'text');
                $(this).addClass('fa-eye-slash').removeClass('fa-eye');
            }
        })
    });
});

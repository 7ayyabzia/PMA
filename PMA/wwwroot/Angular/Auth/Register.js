var App = angular.module('PMA', []);

App.controller("Auth", function ($scope, $http) {
    function JsonCallParam(Controller, Action, Parameters) {
        $.ajax({
            type: "POST",
            traditional: true,
            async: false,
            cache: false,
            url: '/' + Controller + '/' + Action,
            context: document.body,
            data: Parameters,
            success: function (json) {
                list = null;
                list = json;
            }
            ,
            error: function (xhr) {
                list = null;
            }
        });
    }
    function JsonCall(Controller, Action) {
        $.ajax({
            type: "POST",
            traditional: true,
            async: false,
            cache: false,
            url: '/' + Controller + '/' + Action,
            context: document.body,
            success: function (json) {
                list = null; list = json;
            },
            error: function (xhr) {
                list = null;
                //debugger;
            }
        });
    }

    $scope.registerUser = {
        fullName: "", firstName: "", lastName: "", email: "",
        userName: "", password: "", mobileNumber: "", accountId: 0
    };
    $scope.loginUser = { username: "", password: "" };

    $scope.account = {
        accountId: 0, accountName: "", accountCode: "", secretKey: "",
        dids: [{ gatewayId: 1, title: "", phonenumber: "", isActive: true}]
    };

    $scope.usernameExists = false;

    $scope.register = function () {
        JsonCallParam("Auth", "Register", {
            "registerDto": JSON.stringify($scope.registerUser),
            "account": JSON.stringify($scope.account)
        });
        $('#account-section').waitMe({
            effect: "ios",
            text: 'Loading...',
            bg: 'rgba(255,255,255,0.90)',
            color: '#555'
        });
        if (list !== "Success") {
            $('#account-section').waitMe("hide");
            swal("Error", list, "error");
            console.log(list);
        }
        else {
            window.location.href = "/Home";
        }
    }

    $scope.forward = function () {
        $('#user-section').waitMe({
            effect: "ios",
            text: 'Loading...',
            bg: 'rgba(255,255,255,0.90)',
            color: '#555'
        });
        validateUsername();

        if (!$scope.usernameExists) {
            $("#user-section").slideToggle();
            $("#account-section").slideToggle();
        }
        setTimeout(function () { $('#user-section').waitMe("hide")}, 100);
    }

    $scope.backward = function () {
        $("#user-section").slideToggle();
        $("#account-section").slideToggle();
    }

    $scope.createAccount = function () {
        //Validate Account Code
        JsonCallParam("Account", "IsCodeExist", { code: $scope.account.accountCode });
        if (list === true) {
            swal("Error", "Account Code already exists! Please try different!", "error");
            return;
        }
        //Validate Phonenumber
        JsonCallParam("Account", "IsPhoneNumberExist", { phonenumber: $scope.account.accountPhonenumber});
        if (list === true) {
            swal("Error", "Phone number already Exist! Please try different", "error");
            return;
        }
        //Register User
        $scope.register();
    }

    function validateUsername() {
        JsonCallParam("Auth", "IsUsernameValid", { username: $scope.registerUser.email });
        $scope.usernameExists = !list;
    }

});
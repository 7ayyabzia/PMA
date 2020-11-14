App.service("$user", function () {

    this.getUserInfo = function () {
        JsonCall("Account", "GetCurrentUserInfo");
        return list;
    }
    this.getProjectsToActivate = function () {
        JsonCall("Projects", "GetUserProjects");
        return list;
    }
    this.activateProject = function (projectId) {
        JsonCallParam("Account", "ActivateProject", { id: projectId });
    }
    this.getAllUsers = function () {
        JsonCall("Account", "GetAccountUsers");
        return list;
    }
});
App.service("$backlog", function () {

    this.sprintId = function () {
        JsonCall("Backlog", "GetActiveSprintId");
        return list;
    }

    this.getIssues = function () {
        JsonCall("Backlog", "GetIssues");
        return list;
    }

    this.saveIssue = function (issue) {
        JsonCallParam("Backlog", "AddIssue", { "Issue": JSON.stringify(issue) });
    }

    this.renderIssueDialogue = async function () {
        JsonCall("Backlog", "RenderIssueDialogue");
        return list;
    }

    this.startSprint = async function (sprint, issues) {
        var param = { "sprint": JSON.stringify(sprint), "issues": JSON.stringify(issues) };
        JsonCallParam("Backlog", "StartSprint", param)
    }

    this.addIssuesInSprint = async function (sprintId, issues) {
        var param = { "sprintId": sprintId, "issues": JSON.stringify(issues) };
        JsonCallParam("Backlog", "AddIssuesInSprint", param)
    }

    this.getActiveSprint = async function () {
        JsonCall("Backlog", "GetActiveSprint");
        return list;
    }
});
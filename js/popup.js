$(function() {
    // Get saved options and set to UI
    chrome.storage.sync.get({
        titleLevel: 'h1',
        includeTitle: true,
        includeInfo: false,
        includeContent: true,
        includeSolution: false
    }, function(items) {
        console.log(items)
        $("#titleLevel").val(items.titleLevel)
        $("#includeTitle").attr("checked", items.includeTitle);
        $("#includeInfo").attr("checked", items.includeInfo);
        $("#includeContent").attr("checked", items.includeContent);
        $("#includeSolution").attr("checked", items.includeSolution);
    });


    // Save options
    $("#btnSave").click(function() {
        var titleLevel = $("#titleLevel").val()
        var includeTitle = $("#includeTitle").prop('checked')
        var includeInfo = $("#includeInfo").prop('checked')
        var includeContent = $("#includeContent").prop('checked')
        var includeSolution = $("#includeSolution").prop('checked')

        chrome.storage.sync.set({
            titleLevel: titleLevel,
            includeTitle: includeTitle,
            includeInfo: includeInfo,
            includeContent: includeContent,
            includeSolution: includeSolution
        }, function() {
            console.log("Options saved successfully.")
        });
    });
});

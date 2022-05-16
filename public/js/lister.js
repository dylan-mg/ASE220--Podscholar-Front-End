'use strict'

function countLoader(type) {
    console.log(type);
    $(".counter").each((i, el)=> {
        let thisID = el.id.substring(0, el.id.length - 6);
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: `/${type}/${thisID}/count`,
            success: function (response) {
                el.textContent = response.count;
            }
        });
    });
}
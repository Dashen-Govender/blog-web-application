$("#updateList .item").on( "click", function() {
    const id = $(this).attr("id");
    const message = document.querySelector("#updateList .i" + id).textContent.trim();
    $(".uEditor").replaceWith(`<textarea class="uDisplay" name="Editor"></textarea>`);
    $(".uDisplay").text(message);
    $("#uColumn").append(`<input id="secretKey" type="text" name="postId" value="${id}" style="visibility: hidden;"/>`)
    $("#uColumn").append('<input id="SubmitBtn" type="submit" value="edit" name="SubmitEntry" />');
});

$("#deleteList .item").on( "click", function() {
    const id = $(this).attr("id");
    const message = document.querySelector("#deleteList .i" + id).textContent.trim();
    $(".dEditor").replaceWith(`<textarea class="dDisplay" name="Editor" readonly ></textarea>`);
    $(".dDisplay").text(message);
    $("#dColumn").append(`<input id="secretKey" type="text" name="postId" value="${id}" style="visibility: hidden;"/>`)
    $("#dColumn").append('<input id="SubmitBtn" type="submit" value="delete" name="SubmitEntry" />');
});
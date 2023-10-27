const list = $(".grocery-list"); //append jquery pseng and js pseng
const alert = document.getElementsByClassName("alert")[0];

//document.getElementById('test').append('<b>test</b>');  pi ng ot doc knea te (តាម jquery render html but js not render)
//$('#test').append('<b>test</b>')

$('.clear-btn').css('display', 'none');

let selectedRow = null;

//Insert Data
$('.submit-btn').on('click', function (event) {
    event.preventDefault();

    if (validate() == true) {
        if (selectedRow != null) {
            editData();
            $('.submit-btn').text('Submit');
            selectedRow = null;
        } else {
            $('.clear-btn').css('display', 'block');
            let item = $('#grocery').val();

            list.append(` <article class="grocery-item"><p class="title">${item}</p>
                                <div class="btn-container">
                                    <!-- check btn -->
                                    <button type="button" class="check-btn" id="check">✔️</button>
                                    <!-- edit btn -->
                                    <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
                                    <!-- delete btn -->
                                    <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>
                                </div>
                            </article>`);
            displayAlert("item added to the list", "success");
        }
        $('#grocery').val('');
    }
});

// Check Data
$(document).on('click', '.check-btn', function () {
    let data = $(this).parent().parent();
    let cross = data.find('.title');
    cross.css('text-decoration', 'line-through');
});

//Edit Data
$(document).on('click', '.edit-btn', function () {
    $('.submit-btn').text('Edit');
    selectedRow = $(this).parent().parent();
    let data = selectedRow.find('.title').text();
    $('#grocery').val(data);
});

function editData() {
    selectedRow.find('.title').text($('#grocery').val());
    displayAlert("value changed", "success");
}

//Delete Each Data
$(document).on('click', '.delete-btn', function () {
    $(this).parent().parent().remove();
    displayAlert("item removed", "danger");
});

//Delete All Data
$('.clear-btn').on('click', function () {
    $('.grocery-item').remove();
    let row = $('.grocery-list').children().length;
    if (row == 0) {
        $(this).css('display', 'none');
        displayAlert("empty list", "danger");
    }
});

//Validate Input
function validate() {
    let item = $('#grocery').val();
    let isCheck = true;

    if (item == '') {
        displayAlert("please enter value", "danger");
        isCheck = false;
    }
    return isCheck;
}

//Message Validate
function displayAlert(text, action) {
    alert.innerText = text;
    alert.classList.add(`alert-${action}`);
    // remove alert
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}






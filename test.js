$(document).ready(function () {

    loadBooks();

    const modal = $('#editBookModal');
    const spanClose = $('.close');

   
    spanClose.click(function () {
        modal.hide();
    });

  
    $(window).click(function (event) {
        if ($(event.target).is(modal)) {
            modal.hide(); 
        }
    });


    function loadBooks() {
        $.ajax({
            url: 'api.php',
            method: 'GET',
            success: function (data) {
                $('#bookList').html(data);
                render(); 
            },
            error: function () {
                alert('Failed to load books.');
            }
        });
    }

    // add btn delete and per book
    function render() {
     
        $('.editBtn').click(function () {
            const row = $(this).closest('tr');
            const id = row.data('id');
            const title = row.find('td:eq(1)').text();
            const author = row.find('td:eq(2)').text();
            const publication_year = row.find('td:eq(3)').text();
            const genre = row.find('td:eq(4)').text();

            $('#editTitle').val(title);
            $('#editAuthor').val(author);
            $('#editPublicationYear').val(publication_year);
            $('#editGenre').val(genre);
            $('#editBookId').val(id);

          
            modal.show();
        });

        // delete 
        $('.deleteBtn').click(function () {
            const id = $(this).closest('tr').data('id');
            if (confirm('Are you sure you want to delete this book?')) {
                $.ajax({
                    url: 'api.php?delete=' + id,
                    method: 'GET',
                    success: function (response) {
                        alert(response);
                        loadBooks(); 
                    },
                    error: function (xhr, status, error) {
                        console.error("Delete Error:", status, error);
                    }
                });
            }
        });
    }

   // HANDLE BOOK SUMISSION
    $('#addBookForm').submit(function (e) {
        e.preventDefault(); 

        const formData = $(this).serialize(); 

        $.ajax({
            type: 'POST',
            url: 'api.php',
            data: formData,
            success: function (response) {
                alert(response); 
                $('#addBookForm')[0].reset();
                loadBooks();
            },
            error: function (xhr, status, error) {
                console.error("Add Book Error:", status, error);
            }
        });
    });

   
    $('#editBookForm').submit(function (e) {
        e.preventDefault(); 

        const formData = $(this).serialize(); 

        $.ajax({
            type: 'POST',
            url: 'api.php',
            data: formData,
            success: function (response) {
                alert(response); 
                modal.hide(); 
                loadBooks(); 
            },
            error: function (xhr, status, error) {
                console.error("Update Error:", status, error);
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function(){

    document.querySelector('#submitBtn').addEventListener('click', () => chat_ajax());

});

function chat_ajax(){

    let text = document.querySelector('#userText').value
    let chatCard = document.querySelector('#chatCard')
    chatCard.innerHTML += `
    <div class="card-body bg bg-primary">
        <h5 class="card-title">${text}</h5>
    </div>
    `
    console.log(text)

    // Clear input:
    document.querySelector('#userText').value = null

    var loading = document.querySelector('#loading')
    loading.innerHTML = `
    <strong>Loading...</strong>
    <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
    `

    $.ajax({
        type: 'POST',
        url: '/ajax/',
        data: {
            'text': text
        },
        success: (res)=> {
            let response = res.data
            chatCard.innerHTML += `
            <div class="card-body bg bg-light text-dark">
                  <h5 class="card-title">${response}</h5>
            </div>
            `
            loading.innerHTML = ''
        },
        error: ()=> {
            console.log("There Was An Error!")
        }
    })
}
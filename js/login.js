const button = document.querySelector('.login_btn')
const input = document.querySelector('.login_input')
const form = document.getElementsByTagName('form')[0]

const handleBtn = () =>{
    // the trim method is used to remove the unnecessary spaces declared at the beginning and/or end of a string 
    if(input.value.trim().length <= 20 && input.value.trim().length >= 3){
        button.disabled = false;
    } else{
        button.disabled = true;
    }
}
const handleForm = (e) =>{
    e.preventDefault()
    // this method change the default behavior of the form, that is submit the infos and reload the page 
    const names = JSON.parse(localStorage.getItem('names')) ?? []
    names.push(input.value)
    localStorage.setItem('names' , JSON.stringify(names))
    window.location = '/pages/game.html'
}

input.addEventListener('input' , handleBtn)
form.addEventListener('submit' , handleForm)
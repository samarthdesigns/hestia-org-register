let details = {
    name: null,
    city: null,
    state: null,
    country: null,
    description: null,
    email: null,
    phone_no: null,
    address: null,
    other_contact: null,
    web_links: null
}

let emailValidity = false;
let phoneNumberValidity = false;

document.getElementById('organisationForm').addEventListener('submit',(e)=>{

    e.preventDefault();

    details.name  = document.getElementById('name').value;
    details.city  = document.getElementById('city').value;
    details.state  = document.getElementById('state').value;
    details.country  = document.getElementById('country').value;
    details.description  = document.getElementById('description').value;
    details.email  = document.getElementById('email').value;
    details.phone_no  = document.getElementById('phone-number').value;
    details.address = document.getElementById('address').value;
    details.other_contact = document.getElementById('other-contact').value;
    details.web_links = document.getElementById('web-link').value;

    pushDetails();

});

function pushDetails(){
    
    fetch('https://hestia-requests.herokuapp.com/api/requests/add_organization/', {
            method:'POST',
            crossDomain:true,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiJ4eXphYmMxMjMifQ.Q_fXFJce6B9DDxCdAwZqOJNwQ18uXXEHpYpFnJi-Q7o'
            },
            body: JSON.stringify({
                name: details.name,
                city: details.city,
                state: details.state,
                country: details.country,
                description: details.description,
                email: details.email,
                phone_no: details.phone_no
            }),
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.message == 'Organization Saved'){
                document.getElementById('popup').classList.add('success');
                document.getElementById('popup').innerHTML = "Form Submitted";
                setTimeout(function(){
                    document.getElementById('popup').classList.remove('success');
                },3000);
            }
            else{
                document.getElementById('popup').classList.add('error');
                document.getElementById('popup').innerHTML = "Please check all the fields";
                setTimeout(function(){
                    document.getElementById('popup').classList.remove('error');
                },3000);
            }
        })
        .catch((error)=>{
            document.getElementById('popup').classList.add('error');
            document.getElementById('popup').innerHTML = "Cannot connect to server";
            setTimeout(function(){
                document.getElementById('popup').classList.remove('error');
            },3000);
        })

}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhone(phoneNumber) {
    var re = /^\d{10}/;
    return re.test(phoneNumber);
}

document.getElementById('email').addEventListener("input", function() {
    
    emailValue = document.getElementById('email').value;

    if(validateEmail(emailValue)){
        document.getElementById('email').classList.remove('text-field-false');
        emailValidity = true;
    }
    else{
        document.getElementById('email').classList.add('text-field-false')
        emailValidity = false;
    }
    
});

document.getElementById('phone-number').addEventListener("input", function() {
    
    phoneNumber = document.getElementById('phone-number').value;

    if(validatePhone(phoneNumber)){
        document.getElementById('phone-number').classList.remove('text-field-false');
        phoneNumberValidity = true;
    }
    else{
        document.getElementById('phone-number').classList.add('text-field-false')
        phoneNumberValidity = false;
    }
    
});

document.getElementById('description').addEventListener("input", function() {
    
    value = document.getElementById('description').value;

    if(value==''){
        document.getElementById('description').classList.add('text-field-false');
    }
    else{
        document.getElementById('description').classList.remove('text-field-false');
    }
    
});
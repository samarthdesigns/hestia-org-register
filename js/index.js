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
let countryValidity = false;

document.getElementById('organisationForm').addEventListener('submit',(e)=>{

    e.preventDefault();

    details.name  = document.getElementById('name').value;
    details.city  = document.getElementById('city').options[document.getElementById('city').selectedIndex].value;
    details.state  = document.getElementById('state').options[document.getElementById('state').selectedIndex].value;
    details.country  = document.getElementById('country').options[document.getElementById('country').selectedIndex].value;
    details.description  = document.getElementById('description').value;
    details.email  = document.getElementById('email').value;
    details.phone_no  = document.getElementById('phone-number').value;
    details.address = document.getElementById('address').value;
    details.other_contact = document.getElementById('other-contact').value;
    details.web_links = document.getElementById('web-link').value;

    pushDetails();

});

let api_token = null;

fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
            method:'GET',
            crossDomain:true,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                "api-token": "kg5Yr2zZ59lUHZb_11ft6sZ5tkbd5vNmqQV2hrfEbtuYrA2z_vADp4W6qXp1k1S3Ie0",
                "user-email": "samarthnayyar123@gmail.com"
            },
        })
        .then((response) => response.json())
        .then((result)=>{
            api_token = 'Bearer ' + result.auth_token;
            fetchCountries();
        })

function fetchCountries(){
    fetch('https://www.universal-tutorial.com/api/countries/', {
            method:'GET',
            crossDomain:true,
            headers:{
                "Authorization": String(api_token),
                "Accept": "application/json"
            },
        })
        .then((response) => response.json())
        .then((result)=>{
            displayCountries(result);
        })
}

function fetchStates(country){
    fetch('https://www.universal-tutorial.com/api/states/'+country, {
            method:'GET',
            crossDomain:true,
            headers:{
                "Authorization": String(api_token),
                "Accept": "application/json"
            },
        })
        .then((response) => response.json())
        .then((result)=>{
            displayStates(result);
        })
}


function fetchCities(state){
    fetch('https://www.universal-tutorial.com/api/cities/'+state, {
            method:'GET',
            crossDomain:true,
            headers:{
                "Authorization": String(api_token),
                "Accept": "application/json"
            },
        })
        .then((response) => response.json())
        .then((result)=>{
            displayCities(result);
        })
}

function displayCountries(data){
    let i;
    document.getElementById('country').style.display="block";
    for(i=0; i< data.length;i++){
        document.getElementById('country').insertAdjacentHTML('beforeend', '<option value='+ data[i].country_name +'>'+data[i].country_name +'</option>');
    }
}

function displayStates(data){
    let i;
    document.getElementById('state').style.display="block";
    document.getElementById('state').innerHTML = '<option value="None">Select State</option>';
    setTimeout(()=>{

        for(i=0; i< data.length;i++){
            document.getElementById('state').insertAdjacentHTML('beforeend', '<option value='+ data[i].state_name +'>'+data[i].state_name +'</option>');
        }

    },200)
}

function displayCities(data){
    let i;
    document.getElementById('city').style.display="block";
    document.getElementById('city').innerHTML = '<option value="None">Select City</option>';
    setTimeout(()=>{

        for(i=0; i< data.length;i++){
            document.getElementById('city').insertAdjacentHTML('beforeend', '<option value='+ data[i].city_name +'>'+data[i].city_name +'</option>');
        }

    },200)
}


document.getElementById('country').addEventListener('input',()=>{
    let countryValue = document.getElementById('country').options[document.getElementById('country').selectedIndex].value;
    if(countryValue!='None'){
        fetchStates(countryValue);
        document.getElementById('country').classList.remove('text-field-false');
        countryValidity = true;
    }
    else{
        document.getElementById('country').classList.add('text-field-false');
        document.getElementById('state').style.display = "None";
        document.getElementById('city').style.display = "None";
        countryValidity = false;
    }
})

document.getElementById('state').addEventListener('input',()=>{
    let stateValue = document.getElementById('state').options[document.getElementById('state').selectedIndex].value;
    fetchCities(stateValue);
})

function pushDetails(){


    
    if(countryValidity==false){
        document.getElementById('popup').classList.add('error');
        document.getElementById('popup').innerHTML = "Check Country";
        setTimeout(function () {
            document.getElementById('popup').classList.remove('error');
        }, 3000);
    }
    else if(emailValidity==false){
        document.getElementById('popup').classList.add('error');
        document.getElementById('popup').innerHTML = "Check Email";
        setTimeout(function () {
            document.getElementById('popup').classList.remove('error');
        }, 3000);
    }
    else if(phoneNumberValidity==false){
        document.getElementById('popup').classList.add('error');
        document.getElementById('popup').innerHTML = "Check Phone Number";
        setTimeout(function () {
            document.getElementById('popup').classList.remove('error');
        }, 3000);
    }
    else{
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
                phone_no: details.phone_no,
                address: details.address,
                other_contact: details.other_contact,
                web_links: details.web_links
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
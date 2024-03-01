const loadPhone = async (searchText='13',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

    const data = await res.json();
    const phones =data.data;
    displayPhones(phones,isShowAll);
}


const displayPhones = (phones,isShowAll) =>{

    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.textContent = '';
    const showAll = document.getElementById('show-all');
    if(phones.length>=12 && !isShowAll){
        showAll.classList.remove('hidden');
    }else{
        showAll.classList.add('hidden');
    }

    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone =>{
        // console.log(phone)
        const phoneCard = document.createElement('div');

        phoneCard.classList='card p-6 bg-base-100 shadow-xl';

        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src=${phone.image} alt="Phone" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Details</button>
            </div>
        </div> 
        `;
        toggleLoadingSpinner(false);
        phoneContainer.appendChild(phoneCard);
    })
}

// Search Button

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');

    const searchText = searchField.value;

    loadPhone(searchText,isShowAll);
}

// const handleSearch2 = () => {
//     const searchField = document.getElementById('search-field2');

//     const searchText = searchField.value;

//     loadPhone(searchText);
// }

// Loading Spinner

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');

    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// Handle Show All

const handleShowAll = () =>{
    handleSearch(true);
}

//Handle Show Details

const handleShowDetails =async (id) =>{
    //console.log(id)

    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);

    const data = await res.json();

    const phone = data.data
    console.log(phone)
    showPhoneDetails(phone);
}

// Modal Details

const showPhoneDetails = (phone)=>{
    const phoneName=document.getElementById('modal-phone-name');
    phoneName.innerText = phone.name;

    const phoneImgDiv = document.getElementById('modal-img');
    phoneImgDiv.innerHTML =`
    <img src="${phone.image}">
    `;


    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML=`
    <h3><b>Brand</b> : ${phone.brand}</h3>
    <p><b>Release Date</b> : ${phone.releaseDate}</p>
    <h3 class="text-center">Main Features</h3>
    <p><b>Chipset:</b> ${phone.mainFeatures.chipSet}</p>
    <p><b>Display Size:</b> ${phone.mainFeatures.displaySize}</p>
    <p><b>Memory:</b> ${phone.mainFeatures.memory}</p>
    <p><b>Sensors:</b> ${phone.mainFeatures.sensors}</p>
    <p><b>Storage:</b> ${phone.mainFeatures.storage}</p>
    <h3 class="text-center">Others</h3>
    <p><b>Bluetooth:</b> ${phone.others.Bluetooth}</p>
    <p><b>GPS:</b> ${phone.others.GPS}</p>
    <p><b>NFC:</b> ${phone.others.NFC}</p>
    <p><b>RADIO:</b> ${phone.others.Radio}</p>
    <p><b>USB:</b> ${phone.others.USB}</p>
    <p><b>WLAN:</b> ${phone.others.WLAN}</p>
    
    `

    show_details_modal.showModal()

}


loadPhone();
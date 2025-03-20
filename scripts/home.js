let allPets = [];

async function lodCategories() {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
        const categoryData = await res.json();
        renderCategory(categoryData.categories);
    } catch (error) {
        console.error(error);
    }
}

function renderCategory(categories) {
    const catDiv = document.getElementById('category');
    catDiv.innerHTML='';

    categories.forEach(cat => {
        const iCat = document.createElement('div');
        // iPet.classList.add('flex','flex-col')
        iCat.innerHTML=`
            <button id="${cat.category}-btn" class="w-auto px-8 py-[0.8rem] border-2 border-gray-300 cursor-pointer rounded-xl mx-auto flex items-center gap-1 cat-btn" onclick="loadPetsByCategory('${cat.category}')"><img class="w-8" src="images/pets/${cat.category}.png" alt="">${cat.category}</button>
        `
        catDiv.appendChild(iCat);
    });
}

async function loadPetsByCategory(cat) {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${cat}`);
        const iCat = await res.json();
        document.querySelectorAll('.cat-btn').forEach(button => {
            button.classList.remove('border-[#4d8c90]','bg-[#f1f4f4]','rounded-3xl');
            button.classList.add('border-gray-300','rounded-xl');
        })
        const catBtn = document.getElementById(`${cat}-btn`);
        if (catBtn) {//This ensures that catBtn is not null before trying to modify its classList, preventing potential runtime errors
            catBtn.classList.add('border-[#4d8c90]','bg-[#f1f4f4]','rounded-3xl');
            catBtn.classList.remove('border-gray-300','rounded-xl');
        }
        renderPets(iCat.data);
    } catch (error) {
        console.error(error);
    }
}


async function loadPets() {
    const petsDiv = document.getElementById('pets');
    const loader = document.getElementById('petsLoader');

    loader.style.display= "flex";
    petsDiv.innerHTML="";

    const delay = new Promise(resolve => setTimeout(resolve,2000));

    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const petData = await res.json();
        allPets = petData.pets; //store all pets

        await Promise.all([delay]);
        renderPets(petData.pets);
    } catch (error) {
        console.error(error);
    } finally {
        loader.style.display= "none";
    }
}

function renderPets(pets) {
    const petDiv = document.getElementById('pets');
    petDiv.innerHTML='';

    if (pets.length===0) {
        petDiv.classList.remove('grid');
        petDiv.innerHTML=`
        <div class="min-h-[300px] w-full mx-auto flex flex-col gap-5 justify-center items-center text-center">
            <img src="images/error.webp" alt="No pets available">
            <h1 class="font-bold text-3xl">No pets available right now</h1>
        </div>
        `
    } else {
        petDiv.classList.add('grid');
    }

    pets.forEach(pet => {
        const iPet = document.createElement('div');
        iPet.innerHTML=`
        <div class="card bg-base-100 w-72 shadow-sm">
        <figure class="h-40">
            <img
            class="w-full h-full object-cover"
            src="${pet.image}"
            alt="Pet-${pet.pet_name}" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">
            ${pet.pet_name}
            </h2>
            <div>
                <div class="flex gap-1">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                        </svg>     
                    </div>
                    <div>Breed: ${!pet.breed ? 'Not Found' : pet.breed }</div>
                </div>
                <div class="flex gap-1">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                          </svg>                           
                    </div>
                    <div>Birth: ${pet.date_of_birth===null ? 'Not Found' : !pet.date_of_birth ? 'Not Found' : pet.date_of_birth}</div>
                </div>
                <div class="flex gap-1">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                          </svg>  
                    </div>
                    <div>Gender: ${pet.gender===null ? 'Not Found' : !pet.gender ? 'Not Found' : pet.gender}</div>
                </div>
                <div class="flex gap-1">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>                               
                    </div>
                    <div>Price: ${pet.price===null ? 'Undeclared' : !pet.price ? 'Undeclared' :`$${pet.price}`}</div>
                </div>
            </div>
            <hr class="w-full text-slate-400">
            
            <div class="flex items-center justify-between">
                <button class="border border-[#0E7A81] rounded-lg px-2 py-1.5 cursor-pointer" onclick="loadFavorites('${pet.petId}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>                                  
                </button>
                
                <button class="bg-[#0E7A81] w-auto border border-[#0E7A81] rounded-lg px-3 py-1.5 hover:bg-[#4d8c90] text-white cursor-pointer" onclick="my_modal_2.showModal()">Adopt</button>
                
                <label for="my_modal_7" class="bg-[#0E7A81] w-auto border border-[#0E7A81] rounded-lg px-3 py-1.5 hover:bg-[#4d8c90] text-white cursor-pointer" onclick="petDetailsLoad(${pet.petId})">Details</label>

            </div>
        </div>
    </div>
        `
        petDiv.appendChild(iPet)
    });
}

function sortPetsByPrice() {
    const sortedPets = [...allPets].sort((a,b) => {
        // (a.price||0) - (b.price || 0) //previous code - undeclared prices (null or undefined) are considered 0, so they appear first.

        if(a.price == null) return 1;//Move undeclared prices to the end
        if(b.price == null) return -1;//Keep valid prices first
        return a.price - b.price;//Sort normally - low to high
    
    });
    renderPets(sortedPets);
}

const favArray = [];
// console.log(favArray);
async function loadFavorites(petId) {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
        const petData = await res.json();

        const favDiv = document.getElementById('favorites');
        if(favArray.some(pet =>pet.petId === petData.petData.petId)){
            const tempMsg = document.createElement('div');
            tempMsg.classList.add('text-red-500', 'text-lg', 'mt-2', 'font-bold');
            tempMsg.innerText="Already in favorites!";
            favDiv.appendChild(tempMsg);
            setTimeout(()=>{
                tempMsg.remove()
            },2000);
            return;
        }

        favArray.push(petData.petData);
        renderFavorites();
    } catch (error) {
        console.error(error);
    }
}

function renderFavorites() {
    const favDiv = document.getElementById('favorites');
    favDiv.innerHTML='';
    favArray.forEach(pet => {
        const iFav = document.createElement('div');
        iFav.innerHTML=`
        <img class="rounded-md" src="${pet.image}" alt="${pet.pet_name}">
        <p>${pet.pet_name}</p>
        `
        favDiv.appendChild(iFav)
    })
}

async function petDetailsLoad(petId) {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
        const iPet = await res.json();
        renderPetDetails(iPet.petData);
    } catch (error) {
        console.error(error);
    }
}

function renderPetDetails(pet) {
    const detailsDiv = document.getElementById('detailsModal');
    detailsDiv.innerHTML='';
    detailsDiv.innerHTML=`
        <figure class="h-auto">
                <img
                class="w-full h-full object-cover"
                src="${pet.image}"
                alt="Pet-${pet.pet_name}" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">
                ${pet.pet_name}
                </h2>
                <div>
                    <div class="flex gap-1">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                            </svg>     
                        </div>
                        <div>Breed: ${!pet.breed ? 'Not Found' : pet.breed }</div>
                    </div>
                    <div class="flex gap-1">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>                           
                        </div>
                        <div>Birth: ${pet.date_of_birth===null ? 'Not Found' : !pet.date_of_birth ? 'Not Found' : pet.date_of_birth}</div>
                    </div>
                    <div class="flex gap-1">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>  
                        </div>
                        <div>Gender: ${pet.gender===null ? 'Not Found' : !pet.gender ? 'Not Found' : pet.gender}</div>
                    </div>
                    <div class="flex gap-1">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>                               
                        </div>
                        <div>Price: ${pet.price===null ? 'Undeclared' : !pet.price ? 'Undeclared' :`$${pet.price}`}</div>
                    </div>
                </div>
                <p class="py-2">${pet.pet_details}</p>

                
                <div class=" flex items-center justify-center gap-2">
                    <div class="border border-[#0E7A81] rounded-lg px-2 py-1.5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>                                  
                    </div>
                    <button class="bg-[#0E7A81] border border-[#0E7A81] rounded-lg px-3 py-1.5 hover:bg-[#4d8c90] text-white cursor-pointer">Adopt</button>
                </div>
            </div>
    `
}

lodCategories()
loadPets()
let allIssues = []

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

function toggleID(id) {

    allBtn.classList.remove('bg-blue-700', 'text-white');
    openBtn.classList.remove('bg-blue-700', 'text-white');
    closedBtn.classList.remove('bg-blue-700', 'text-white');

    allBtn.classList.add('bg-base-200', 'text-black');
    openBtn.classList.add('bg-base-200', 'text-black');
    closedBtn.classList.add('bg-base-200', 'text-black');

    

    console.log(id);
    let selected = document.getElementById(id);
    selected.classList.remove('bg-base-200', 'text-black');
    selected.classList.add('bg-blue-700', 'text-white');
}

const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => {
            allIssues = json.data
            displayIssues(json.data)
        })
};

const filterIssues = (status) => {
    const btn = status === 'all' ? 'all-btn' : status === 'open' ? 'open-btn' : 'closed-btn';

    toggleID(btn);

    if (status === "all") {
        displayIssues(allIssues);
    }
    else {
        const filtered = allIssues.filter((issue) => issue.status === status)
        displayIssues(filtered);
    }
}

const displayIssues = (issues) => {
    console.log(issues);
    const issuesContainer = document.getElementById("issues-container");
    issuesContainer.innerHTML = "";

    const issueCount = document.getElementById('totalIssue');
    issueCount.innerText = `${issues.length} Issues`;

    for (let issue of issues) {
        console.log(issue);
        const btndiv = document.createElement("div");
        btndiv.onclick = () => cardDetails(issues.id);

        btndiv.innerHTML = `<p>${issue.status == "open"
            ? `<div class="w-full h-[350px] bg-white p-3 border-t-3 border-green-700 rounded-md">`
            : `<div class="w-full h-[350px] bg-white p-3 border-t-3 border-purple-700 rounded-md">`
            }
                    </p>
                
                    
                    <div class="flex justify-between items-center mb-2">
                        <p>${issue.status == "open"
                ? `<img src="assets/Open-Status.png" alt="" class="w-5 h-5"></img>`
                : `<img src="assets/Closed-Status.png" alt="" class="w-5 h-5"></img>`
            }</p>
                        <p>${issue.priority == "high"
                ? `<button onclick="cardDetails(${issue.id})" class="btn w-[100%] h-[30px] bg-red-100 text-red-600 font-light rounded-3xl px-8">${issue.priority}</button>`
                : issue.priority == "medium"
                    ? `<button onclick="cardDetails(${issue.id})" class="btn w-[100%] h-[30px] bg-yellow-100 text-yellow-600 font-light rounded-3xl">${issue.priority}</button>`
                    : `<button onclick="cardDetails(${issue.id})" class="btn w-auto h-[30px] bg-gray-100 text-gray-600 font-light rounded-3xl px-8">${issue.priority}</button>`
            }</p>
                    </div>
                    <h2 class="font-semibold text-[17px] mb-2">${issue.title}</h2>
                    <p class="text-gray-400 text-[14px] mb-2">${issue.description}</p>
                    <div class="mb-2">
                        <button class="btn w-auto h-[30px] bg-red-100 border-1 border-red-300 text-[12px] text-red-600 font-light rounded-3xl"><i class="fa-solid fa-bug"></i>${issue.labels[0]}</button>
                        <button class="btn w-auto h-[30px] bg-yellow-100 border-1 border-yellow-500 text-[12px] text-yellow-600 font-light rounded-3xl"><i class="fa-solid fa-life-ring"></i>${issue.labels[1]}</button>
                    </div>
                    <hr class="border-1 border-gray-200 my-5">
                    <p class="text-gray-400 text-[14px] mb-2">#${issue.id} by ${issue.author}</p>
                    <p class="text-gray-400 text-[14px] mb-2">${issue.createdAt}</p>
                </div>
        `;
        issuesContainer.append(btndiv);
    }
};


const cardDetails = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayCard(data.data));
}

const displayCard = (singleissues) => {
    //console.log(singleissue);
    const singleContainer = document.getElementById("detailsCard");
    singleContainer.innerHTML = `
    <div class="w-[80%] h-[300px] md:h-[350px] bg-white ml-10 -mt-130 p-2 md:ml-0 md:-mt-0 md:p-10 rounded-sm">
                        <div class="">
                            <h1 class="text-[24px] md:text-[32px] font-bold text-black leading-tight mb-3">${singleissues.title}</h1>
                        </div>

                        <div class="flex items-center gap-3 mb-3">
                            <span
                                class="bg-green-600 text-white px-4 py-1 rounded-full text-[14px] font-semibold hover:bg-blue-500 hover:text-white hover:border-none">${singleissues.status}</span>
                            <div class="flex items-center gap-2 text-gray-400 text-[10px] md:text-md">
                                <span>•</span>
                                <p>Opened by <span class="font-medium">${singleissues.author}</span></p>
                                <span>•</span>
                                <p>${singleissues.createdAt}</p>
                            </div>
                        </div>

                        <div class="mb-2">
                            <button
                                class="w-auto h-[30px] px-2 rounded-full bg-red-200 text-red-700 border border-red-500 hover:bg-blue-500 hover:text-white hover:border-none"><i class="fa-solid fa-bug"></i>${singleissues.labels[0]}</button>
                            <button
                                class="w-auto h-[30px] px-2 rounded-full bg-yellow-100 text-red-700 border border-yellow-500 hover:bg-blue-500 hover:text-white hover:border-none"><i class="fa-solid fa-life-ring"></i>${singleissues.labels[1]}</button>
                        </div>

                        <div class="mb-2">
                        <p class="text-gray-400 text-[14px] md:text-lg leading-relaxed">
                          ${singleissues.description}
                        </p>
                        </div>

                        <div class="flex gap-[50px]">
                            <div class="">
                                <p class="text-gray-400 text-sm font-medium ">Assignee:</p>
                                <p class="text-black text-[14px] font-bold ">${singleissues.assignee}</p>
                            </div>

                            <div class="">
                                <p class="text-gray-400 text-sm font-medium  ">Priority:</p>
                                <span
                                    class="inline-block bg-red-600 text-white px-5 py-1 rounded-full text-sm font-extrabold shadow-sm hover:bg-blue-500 hover:text-white hover:border-none">${singleissues.priority}</span>
                            </div>
                        </div>
                        
                    </div>
    
    `;
    document.getElementById('modalId').showModal();

}

loadIssues();

document.getElementById('searchBtn').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.trim().toLowerCase();
    console.log(searchValue);

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        console.log(json);

        const allissue = json.data;

        console.log(allissue);

        const filterIssue = allissue.filter((card) => card.title.toLowerCase().includes(searchValue),)
        displayIssues(filterIssue);
        console.log(filterIssue);
    })
})

document.getElementById('searchInput').addEventListener('input', (event) => {
    if(event.target.value.trim() === ''){
        loadIssues();
    }
})
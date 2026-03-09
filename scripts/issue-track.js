let allIssues = []

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
let currentStatus = 'all';

function toggleID(id) {

    allBtn.classList.add('bg-base-200', 'text-black');
    openBtn.classList.add('bg-base-200', 'text-black');
    closedBtn.classList.add('bg-base-200', 'text-black');

    allBtn.classList.remove('bg-blue-700', 'text-white');
    openBtn.classList.remove('bg-blue-700', 'text-white');
    closedBtn.classList.remove('bg-blue-700', 'text-white');

    const selected = document.getElementById(id);
    selected.classList.remove('bg-base-200', 'text-black');
    selected.classList.add('bg-blue-700', 'text-white');
}

const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => {

            displayIssues(json.data)
        })
};

// const filterIssues = (status) => {
//     const btn = status === "all" ? "allBtn" : status === "open" ? "openBtn" : "closedBtn";

//     toggleID(btn);

//     if(status === "all"){
//         displayIssues(allIssues);
//     }
//     else{
//         const filtered = allIssues.filter((issue) => issue.status === status)
//         displayIssues(filtered);
//     }
// }

const displayIssues = (issues) => {
    //console.log(issues);
    const issuesContainer = document.getElementById("issues-container");
    issuesContainer.innerHTML = "";

    for (let issue of issues) {
        console.log(issue);
        const btndiv = document.createElement("div");

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
loadIssues();

const cardDetails = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayCard(data.data));
}

const displayCard = (singleissues) => {
    //console.log(singleissue);
    const singleContainer = document.getElementById("singleIssue-container");
    singleContainer.innerHTML="";

    singleissues.forEach((singleissue) => {
        console.log(singleissue);
    } );
}
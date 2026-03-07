const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayIssues(json.data))
};

const displayIssues = (issues) => {
    //console.log(issues);
    const issuesContainer = document.getElementById("issues-container");
    issuesContainer.innerHTML="";

    for(let issue of issues){
        console.log(issue);
        const btndiv = document.createElement("div");

        btndiv.innerHTML=`
                <div class="w-full h-[320px] bg-white p-3 rounded-md">
                    <div class="flex justify-between items-center mb-2">
                        <p>${
                            issue.status == "open" 
                            ? `<img src="assets/Open-Status.png" alt="" class="w-5 h-5"></img>` 
                            : `<img src="assets/Closed-Status.png" alt="" class="w-5 h-5"></img>`
                        }</p>
                        <button class="btn w-[33%] h-[30px] bg-red-100 text-red-600 font-light rounded-3xl">${issue.priority}</button>
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
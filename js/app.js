// Selectors
const menuBtn = document.getElementById('menu-check');
const menu = document.querySelector('.nav-container nav');

let portfolio = document.querySelector('#portfolio .works-container');
let contentView = document.querySelector('.window-view');
// Selectors

// http request
const getProjects =  (resource) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if(request.readyState === 4 && request.status === 200){
                const data = JSON.parse(request.responseText);
                numOwlItems = data.length;
                resolve(data);
            }else if(request.readyState === 4){
                reject('error getting resources');
            }
        });
    
        request.open('GET', resource);
        request.send();
    });
};

const renderProjects = (projects) => {
    return new Promise((resolve, reject) => {
        projects.forEach(project => {
            
            const html = `
                <div class="project-container">
                    <img src="img/${project.img}" alt=""> 
                    <div class="text-hover" data-project="${project.id}">
                        <p>${project.title}</p>
                    </div>
                </div>  
            `;
            portfolio.innerHTML += html;
        });
        resolve;
    });
};


const renderViewContent = (project) => {
    return new Promise((resolve, reject) => {
        getProjects('json/projects.json').then(data => {

            data.forEach(work => {
                if( work.id == project ){
                    const html = `
                    <div class="view-header">
                        <div class="closed-btn">
                            <label for="close-view">
                                <i class="fas fa-times"></i>
                            </label>
                            <input type="checkbox" id="close-view">
                        </div>
                        <div class="project-title">
                            <p>${work.subTitle}</p>
                        </div>
                    </div>
                    <div class="view-body">
                        <div class="img-container">
                            <img src="img/${work.img}" alt="">
                        </div>
                        <div class="content-container">
                            <p>${work.description}</p>
    
                            <a class="link-project" href="${work.link}" target="_blank"><i class="fas fa-external-link-square-alt"></i></a>
                        </div>
                    </div> 
                    `;
                    contentView.innerHTML = html;
                }
            });
            contentView.style.transform = 'translateY(0%)';

            const closeBtn = document.getElementById('close-view');
            closeBtn.addEventListener('change', () => {
                contentView.style.transform = 'translateY(100%)';
            });
        });
    resolve;
    });
};



const preparingView = () => {

    return new Promise((resolve, reject) => {
        const viewBtn = document.querySelectorAll('#portfolio .text-hover');

        let idProject;

        viewBtn.forEach(btn => {
            btn.addEventListener('click', e => {
                if( e.target.nodeName === 'P' ){
                    idProject = e.target.offsetParent.getAttribute('data-project');
                    renderViewContent(idProject)
                } else {
                    idProject = e.target.getAttribute('data-project');
                    renderViewContent(idProject)
                }
            });
        });

        resolve;
    });
};



menuBtn.addEventListener('change', e => e.target.checked === true ? menu.style.transform = 'translateX(0%)' : menu.style.transform = 'translateX(-100%)');


getProjects('json/projects.json').then(data => {
    renderProjects(data);
}).then(() => { 
    preparingView();
}).catch(err => {
    console.log('promise rejected:', err);
});
var data;
axios.get('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97')
.then(function (response) {
    // handle success
    data = response.data.result.records;
    console.log(data)
    pagination(data,1);
    addList()
})

//宣告變數

const container = document.querySelector('.container');
const choosezone = document.querySelector('.choosezone');
const countrycheck = document.querySelector('.countrycheck');
const list = document.querySelector('.list')
const pageid = document.getElementById('pageid');
const datanum = document.querySelectorAll('.data').length;
var arrdata = [];

// 過濾成乾淨的區域陣列到 areaList
function addList(){
    const zonelist=[];
for(let i = 0 ; data.length > i ; i++)
    {
        zonelist.push(data[i].Zone);
    }

// 再用 foreach 去判斷陣列裡面所有值是否有吻合
const zone = Array.from(new Set(zonelist));
console.log(zone)

let str = '<option value="---請選擇地區---" selected disabled>---請選擇地區---</option>';
for(let i = 0;i<zone.length;i++)
    {
        // const zonei = zone[i];
        // str +=`<option value ="${zonei}">${zonei}</option>`
        str +=`<option value ="${zone[i]}">${zone[i]}</option>`
    };
    countrycheck.innerHTML = str;
}


//新增下拉選單


//下拉選單-選擇地區
function updata(e){
     const select = e.target.value;
     choosezone.innerHTML = select;

     arrdata=[];
     data.forEach(function(item){
        if(select === item.Zone){
            arrdata.push(item)
        }
     })     
     pagination(arrdata,1);
}

// 分頁
function pagination(data, nowPage) {
    const dataTotal = data.length; // 總筆數
    const perPage = 6; // 每頁要顯示的筆數
    let pageTotal = Math.ceil(dataTotal / perPage); // 總頁數
    let currentPage = nowPage; // 當前頁數

    const minData = (currentPage * perPage) - perPage + 1; // 每頁第一筆資料
    const maxData = currentPage * perPage; // 每頁最後一筆資料
    
    const pagedata = [];

    data.forEach((item, index) => {
        // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
        const num = index + 1;
        // 如果是當頁所需要的索引，則存入dataPerPage[]
        if (num >= minData && num <= maxData) {
            pagedata.push(item);
        }
    });
    console.log(pagedata)
    // 用物件方式來傳遞資料
    const page = {
        pageTotal,
        currentPage,
        hasPrevious: currentPage > 1,
        hasNext: currentPage < pageTotal,
    }
    render(pagedata)
    pageBtn(page);
}

// 動態生成pagination
function pageBtn(parameter) {

    let str = '';
    let total = parameter.pageTotal; //總頁數

    if (parameter.hasPrevious) { //判斷是否有前一頁
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(parameter.currentPage) - 1}">
        < prev</a></li>`;
    } 
    // else {
    //     str += `<li class="page-item disabled"><a class="page-link" href="#">
    //     < prev</a></span></li>`;
    // }

    for (let i = 1; i <= total; i++) {
        if (Number(parameter.currentPage) === i) {
            str += `<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        } 
        else {
            str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }
    }

    if (parameter.hasNext) { //判斷是否有下一頁
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(parameter.currentPage) + 1}">next></i></a></li>`;
    } 
    // else {
    //     str += `<li class="page-item disabled"><a class="page-link" href="#">next></a></li>`;
    // }

    pageid.innerHTML = str;
}
function render(pagedata){
    let str ='';
    pagedata.forEach(function(item){
        str +=`
        <div class="data">
        <img src="${item.Picture1}">
        <span class="name">${item.Name}</span><span class="zone">${item.Zone}</span>
        <p><img src="../javascript/images/icons_clock.png">${item.Opentime}</p>
        <p><img src="../javascript/images/icons_pin.png">${item.Add}</p>
        <p><img src="../javascript/images/icons_phone.png">${item.Tel}`
        if(item.Website !==''){
            str +=`<span class="web">
            <img src="../javascript/images/icons_tag.png" class="website">
            <a href="${item.Website}" class="website" target="_blank">歡迎參觀</a>
            </span></p></div>`
        }else{
            str +=`</p></div>`
        }
    })
    list.innerHTML = str
}

//切換
function switchPage(e){
    e.preventDefault();
    const page = e.target.dataset.page;
    
    //判斷顯示全區資料或去特定區域資料
    switch(true){
      case countrycheck.value === "---請選擇地區---" :
      pagination(data, page);
      break
      default:
      pagination(arrdata, page);
      break
    }
  }
  pageid.addEventListener('click',switchPage);//監聽

countrycheck.addEventListener('change',updata,false);
 //按鈕1事件   
    $('.btn-1').click(
        function(){
        const select = (this).value;
        choosezone.innerHTML = select;

        arrdata=[];
        data.forEach(function(item){
            if(select === item.Zone){
             arrdata.push(item)
            }
        })  
        console.log(arrdata)   
        pagination(arrdata,1);
     });
 //按鈕2事件
     $('.btn-2').click(function(){

        const select = (this).value;
        choosezone.innerHTML = select;

        arrdata=[];
        data.forEach(function(item){
            if(select === item.Zone){
             arrdata.push(item)
            }
        })  
        console.log(arrdata)   
        pagination(arrdata,1);
    }); 
//按鈕3事件 
     $('.btn-3').click(function(){
        
        const select = (this).value;
        choosezone.innerHTML = select;

        arrdata=[];
        data.forEach(function(item){
            if(select === item.Zone){
             arrdata.push(item)
            }
        })  
        console.log(arrdata)   
        pagination(arrdata,1);
    });   
 //按鈕4事件   
     $('.btn-4').click(function(){

        const select = (this).value;
        choosezone.innerHTML = select;

        arrdata=[];
        data.forEach(function(item){
            if(select === item.Zone){
             arrdata.push(item)
            }
        })  
        console.log(arrdata)   
        pagination(arrdata,1);
    }); 

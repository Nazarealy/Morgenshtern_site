var useLocalStorage = false;

function switchUseLS(){
  useLocalStorage = !useLocalStorage;
}

window.isOnline = () => this.navigator.onLine;
const getById = (id) => document.getElementById(id);

// REST
class ServerService {
  async sendToServer(data) {
    try {
      await fetch('/news', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Cannot fetch data: ', error);
    }
  }

 async getFromServer() {
    try {
      const data = await fetch('/news/all');
      return data.text();
    } catch (error) {
      console.error('Cannot fetch data: ', error);
    }
  }
}
//

const newsContainer = getById('listElem');

class News{
  constructor(title, body, picture){
    this.title = title;
    this.body = body;
    this.picture = picture;
  }
}

function newsTemplate(news) {
var title = news.title;
var body = news.body;
var picture = news.picture;
var button = document.createElement('input');

button.type  = 'button';
button.addEventListener('click', function() {
    alert(add);
}, false);

return `

<div class='zag block12 col-lg-4 col-md-12 col-xs-12 col-sm-12'>
<img name='img' src="./css/images/face.jpg"height="65%" width="100%">
<p>
${title}
</p>
<p class="newbody">
${body}
</p>
<input type="submit" name="send" class="del" value="Delete" id="delete" onclick="clearAppeals()">
</div>

`
}

function myFunction() {
  if(useLocalStorage){
    localStorage.clear();
    alert("Вашу новину видалено успішно!");
    location.reload();
    show();
  }
  else {
      window.indexedDB.deleteDatabase("news_data");
      location.reload();
      show();
  }
}


//REST
const service = new ServerService();

const initAndRenderData = async () => {
  const items = await service.getFromServer();
  console.log(items);

  const itemsStringified = JSON.stringify(items);

  JSON.parse(items).forEach(({ title, body, picture }) => {
         var tempNews = new News(title, body, picture);
         $('#listElem').append(
           newsTemplate(tempNews),
         );
   });
}

const onOnline = () => {
  initAndRenderData();
  console.log('Network status: online');
}

const onOffline = () => {
  console.log('Connection lost');
}

window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);
window.addEventListener('DOMContentLoaded', initAndRenderData);


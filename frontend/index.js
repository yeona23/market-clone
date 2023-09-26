const calcTime = (timestamp) => {
  const curTime = new Date().getTime() - 1000 * 60 * 60 * 9;
  //   console.log(curTime);
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 0) return `${second}초 전`;
  else return "방금 전";
};

const renderData = (data) => {
  const main = document.querySelector("main");
  data.reverse().forEach(async (obj) => {
    // console.log(obj);
    const Div = document.createElement("div");
    Div.className = "item-list";

    const imgDiv = document.createElement("div");
    imgDiv.className = "item-list__img";

    const img = document.createElement("img");
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const TextDiv = document.createElement("div");
    TextDiv.className = "item-list__text";

    const TitleH4 = document.createElement("h4");
    TitleH4.innerText = obj.title;

    const DesP = document.createElement("p");
    DesP.innerText = obj.place + " " + calcTime(obj.insertAt);

    const PriceH5 = document.createElement("h5");
    PriceH5.innerText = obj.price;

    const div = document.createElement("div");

    Div.appendChild(imgDiv);
    Div.appendChild(TextDiv);
    TextDiv.appendChild(TitleH4);
    TextDiv.appendChild(DesP);
    TextDiv.appendChild(PriceH5);
    imgDiv.appendChild(img);

    main.appendChild(Div);
    // main.Div.appendChild();
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  //   console.log(data);
  renderData(data);
};

fetchList();

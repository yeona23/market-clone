const form = document.querySelector("#signup-form");

const checkPassword = () => {
  const formData = new FormData(form);
  const password1 = formData.get("password");
  const password2 = formData.get("password02");

  if (password1 === password2) {
    return true;
  } else return false;
};

const handleSumit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);
  console.log(formData.get("password"));

  const div = document.querySelector("#info");

  if (checkPassword()) {
    const res = await fetch("/signup", {
      method: "post",
      body: formData,
    });

    const data = await res.json();
    if (data === "200") {
      //   div.innerText = " 회원가입이 완료되었습니다 ";
      //   div.style =
      //     "color: #434343; border: 2px solid #434343; display: flex;justify-content: center;align-items: center;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);background: #fff;width: 300px;height: 100px;";
      alert("회원가입이 완료되었습니다");
      window.location.pathname = "/signin.html";
    }
  } else {
    div.innerText = "비밀번호가 일치하지 않습니다";
    div.style =
      "color: RED; border: 2px solid red; display: flex;justify-content: center;align-items: center;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);background: #fff;width: 300px;height: 100px;";
  }
};

form.addEventListener("submit", handleSumit);

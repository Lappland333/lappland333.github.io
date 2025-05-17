function toggleForm(formName) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  if (formName === 'register') {
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
  } else {
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
  }
}

window.onload = function() {
  // 登录表单提交事件
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.onsubmit = function(e) {
      e.preventDefault();
      // 获取用户名和密码
      const username = loginForm.querySelector('input[name="username"]').value;
      const password = loginForm.querySelector('input[name="password"]').value;

      // 测试账号
      const testUsername = "testuser";
      const testPassword = "123456";

      if (username === testUsername && password === testPassword) {
        localStorage.setItem('username', username);
        localStorage.setItem('email', 'testuser@example.com');
        window.location.href = 'profile.html';
      } else {
        let errorMsg = document.getElementById("error-message");
        if (!errorMsg) {
          errorMsg = document.createElement("div");
          errorMsg.id = "error-message";
          errorMsg.style.color = "red";
          errorMsg.style.marginTop = "10px";
          loginForm.appendChild(errorMsg);
        }
        errorMsg.innerText = "用户名或密码错误";
      }
    };
  }
};
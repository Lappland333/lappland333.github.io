window.onload = function() {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.onsubmit = function(e) {
      e.preventDefault();
      const username = registerForm.querySelector('input[name="username"]').value;
      const email = registerForm.querySelector('input[name="email"]').value;
      // 密码可以根据需要保存或不保存
      // const password = registerForm.querySelector('input[name="password"]').value;

      // 简单保存到本地存储
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);

      // 跳转到个人信息页
      window.location.href = 'profile.html';
    };
  }
};
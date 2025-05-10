fetch("http://127.0.0.1:8000/")
  .then(response => response.json())
  .then(data => {
    document.getElementById("view-count").innerText = `你是第 ${data.total_views} 位访客！`;
  })
  .catch(error => {
    console.error("访问失败：", error);
    document.getElementById("view-count").innerText = "无法获取访问数据。";
  });
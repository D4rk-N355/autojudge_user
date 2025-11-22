document.getElementById("cForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const resultBox = document.getElementById("c_result");
  const rawBox = document.getElementById("c_result_raw");
  const problemIdEl = document.getElementById("c_problem_id");
  const fileEl = document.getElementById("c_file");

  if (!problemIdEl.value || !fileEl.files.length) {
    resultBox.innerText = "請輸入題目編號並選擇檔案。";
    return;
  }

  resultBox.innerText = "已提交，等待伺服器回應…";
  rawBox.innerText = "";

  const formData = new FormData();
  formData.append("problem_id", problemIdEl.value);
  formData.append("file", fileEl.files[0]);

  try {
    const response = await fetch("https://tte1ck3.zeabur.app/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    resultBox.innerText =
      `題目: ${data.problem_id}\n結果: ${data.result}\n輸出預覽: ${data.output_preview}`;
    rawBox.innerText = JSON.stringify(data, null, 2);

    fileEl.value = "";
  } catch (err) {
    resultBox.innerText = "提交失敗，請稍後再試。";
    rawBox.innerText = err.message;
  }
});

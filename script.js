document.getElementById("cForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const resultBox = document.getElementById("c_result");
  const rawBox = document.getElementById("c_result_raw");

  // 顯示提交提示
  resultBox.innerText = "提交成功，等待回傳…";
  rawBox.innerText = "";

  const formData = new FormData();
  formData.append("problem_id", document.getElementById("c_problem_id").value);
  formData.append("file", document.getElementById("c_file").files[0]);

  try {
    const response = await fetch("https://tte1ck3.zeabur.app/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    // 顯示簡化結果
    resultBox.innerText =
      `題目: ${data.problem_id}\n結果: ${data.result}\n輸出預覽: ${data.output_preview}`;

    // 顯示完整 JSON
    rawBox.innerText = JSON.stringify(data, null, 2);

    // 清空檔案選取框
    document.getElementById("c_file").value = "";
  } catch (err) {
    resultBox.innerText = "提交失敗，請稍後再試。";
    console.error(err);
  }
});

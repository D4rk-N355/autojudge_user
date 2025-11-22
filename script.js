document.getElementById("cForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const problemIdEl = document.getElementById("c_problem_id");
  const fileEl = document.getElementById("c_file");
  const rawBox = document.getElementById("c_result_raw");

  const rCard = document.getElementById("resultCard");
  const rProblem = document.getElementById("r_problem");
  const rResult = document.getElementById("r_result");
  const rOutput = document.getElementById("r_output");
  const rFailcase = document.getElementById("r_failcase");

  if (!problemIdEl.value || !fileEl.files.length) {
    alert("請輸入題目編號並選擇檔案。");
    return;
  }

  const formData = new FormData();
  formData.append("problem_id", problemIdEl.value);
  formData.append("file", fileEl.files[0]);

  try {
    const response = await fetch("https://tte1ck3.zeabur.app/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.status === "success") {
      rCard.classList.remove("hidden");
      rProblem.innerText = data.data.problem_id;
      rResult.innerText = data.data.result;
      rResult.className = data.data.result;
      rOutput.innerText = data.data.output_preview;
      rFailcase.innerText = data.data.fail_case ? `失敗測資編號: ${data.data.fail_case}` : "";
    } else {
      rCard.classList.remove("hidden");
      rResult.innerText = "錯誤: " + data.message;
      rResult.className = "";
      rOutput.innerText = "";
      rFailcase.innerText = "";
    }

    rawBox.innerText = JSON.stringify(data, null, 2);
    fileEl.value = "";
  } catch (err) {
    rCard.classList.remove("hidden");
    rResult.innerText = "提交失敗，請稍後再試。";
    rOutput.innerText = "";
    rFailcase.innerText = "";
    rawBox.innerText = err.message;
  }
});

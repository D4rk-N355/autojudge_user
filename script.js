async function submitCode(problemIdId, fileId, resultId, rawResultId) {
  const formData = new FormData();
  formData.append("problem_id", document.getElementById(problemIdId).value);
  formData.append("file", document.getElementById(fileId).files[0]);

  const response = await fetch("https://tte1ck3.zeabur.app/submit", {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  // 顯示簡化結果
  document.getElementById(resultId).innerText =
    `題目: ${data.problem_id}\n結果: ${data.result}\n輸出預覽: ${data.output_preview}`;

  // 顯示完整 JSON
  document.getElementById(rawResultId).innerText =
    JSON.stringify(data, null, 2);
}

document.getElementById("cForm").addEventListener("submit", (e) => {
  e.preventDefault();
  submitCode("c_problem_id", "c_file", "c_result", "c_result_raw");
});

document.getElementById("javaForm").addEventListener("submit", (e) => {
  e.preventDefault();
  submitCode("java_problem_id", "java_file", "java_result", "java_result_raw");
});

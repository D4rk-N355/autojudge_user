async function submitCode(problemIdId, fileId, resultId) {
  const formData = new FormData();
  formData.append("problem_id", document.getElementById(problemIdId).value);
  formData.append("file", document.getElementById(fileId).files[0]);

  const response = await fetch("https://tte1ck3.zeabur.app/submit", {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  document.getElementById(resultId).innerText =
    `題目: ${data.problem_id}\n結果: ${data.result}\n輸出預覽: ${data.output_preview}`;
}

document.getElementById("cForm").addEventListener("submit", (e) => {
  e.preventDefault();
  submitCode("c_problem_id", "c_file", "c_result");
});

document.getElementById("javaForm").addEventListener("submit", (e) => {
  e.preventDefault();
  submitCode("java_problem_id", "java_file", "java_result");
});

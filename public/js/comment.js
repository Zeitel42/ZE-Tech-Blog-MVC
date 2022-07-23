const commentFormHandler = async function (event) {
  event.preventDefault();

  const post_id = document.querySelector('input[name="post_id"]').value;
  const comment_text = document.querySelector(
    'textarea[name="comment_text"]'
  ).value;

  if (comment_text) {
    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    document.location.reload();
  }
};

document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);

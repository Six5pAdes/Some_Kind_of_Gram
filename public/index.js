let upVoteCount = 0;
let downVoteCount = 0;

const getImg = async () => {
  // get img
  const response = await fetch("https://picsum.photos/1000/300");

  const data = await response.blob();
  //   console.log(data);
  const imgUrl = URL.createObjectURL(data);
  console.log(imgUrl);

  return imgUrl;
};

const initializePage = () => {
  // call containers
  const body = document.querySelector("body");

  const head = document.createElement("h1");
  head.innerText = "Some Kind of Gram";

  const nextButton = document.createElement("button");
  nextButton.setAttribute("id", "new");
  nextButton.style.marginBottom = "10px";
  nextButton.innerText = "Get New Image";

  body.style.width = "100%";
  body.style.display = "flex";
  body.style.flexDirection = "column";
  body.style.alignItems = "center";
  body.style.backgroundColor = "beige";

  body.append(head, nextButton);

  createContainer();
  votesCountContain();
  countCommentsContain();
};

const createImg = (imageUrl) => {
  const imgContain = document.getElementById("image-contain");

  if (!imgContain.children[0]) {
    const imgElement = document.createElement("img");
    imgElement.setAttribute("id", "image");

    // imgElement.style.height = "300px";
    // imgElement.style.width = "100%";

    imgElement.setAttribute("src", imageUrl);
    imgContain.appendChild(imgElement);
  } else {
    alert("SEEN IT PLEASE SHOW SOMETHING ELSE");
  }
};

const createContainer = () => {
  // container logic
  const body = document.querySelector("body");

  const outerContain = document.createElement("div");

  outerContain.setAttribute("id", "image-contain");
  body.appendChild(outerContain);

  // const commentContain = document.createElement("div");
  // commentContain.setAttribute("id", "comment-contain");
  // body.appendChild(commentContain);
};

const fetchNewImgButton = () => {
  const newImgButton = document.getElementById("new");
  const thisImg = document.getElementById("image");

  newImgButton.addEventListener("click", async () => {
    clearValuesOnFetch();
    const newThisImg = await getImg();
    thisImg.src = newThisImg;
  });

  // howManyUps();
};

const votesCountContain = () => {
  const body = document.querySelector("body");
  const votesContainer = document.createElement("div");

  votesContainer.setAttribute("id", "votes-contain");

  votesContainer.style.width = "500px";
  votesContainer.style.marginTop = "20px";
  votesContainer.style.display = "flex";
  votesContainer.style.justifyContent = "center";
  votesContainer.style.flexWrap = "wrap";

  const heading = document.createElement("h2");
  heading.innerHTML = "New Wallpaper?";

  heading.style.textAlign = "center";
  heading.style.width = "100%";
  heading.style.margin = "0px 0px 5px";

  votesContainer.appendChild(heading);
  body.appendChild(votesContainer);

  voteButtons();
};

const voteButtons = () => {
  const votesContain = document.getElementById("votes-contain");

  const upVote = document.createElement("button");
  const downVote = document.createElement("button");
  upVote.innerHTML = "Yea 0";
  downVote.innerHTML = "Nay 0";

  upVote.setAttribute("id", "up-vote");
  upVote.setAttribute("class", "voting-buttons");
  downVote.setAttribute("id", "down-vote");
  downVote.setAttribute("class", "voting-buttons");

  upVote.style.margin = "20px";
  upVote.style.color = "ghostwhite";
  upVote.style.backgroundColor = "maroon";
  upVote.style.borderRadius = "25px";

  downVote.style.margin = "20px";
  downVote.style.color = "ghostwhite";
  downVote.style.backgroundColor = "maroon";
  downVote.style.borderRadius = "25px";

  votesContain.append(upVote, downVote);
};

const countCommentsContain = () => {
  const body = document.querySelector("body");

  const commentsContainer = document.createElement("div");
  commentsContainer.setAttribute("id", "comments-contain");

  const heading = document.createElement("h2");
  heading.innerText = "Comments";

  body.append(heading, commentsContainer);

  commentBox();
};

const commentBox = () => {
  let commentContain = document.getElementById("comment-contain");

  if (!commentContain) {
    commentContain = document.createElement("div");
    commentContain.setAttribute("id", "comment-contain");
    document.body.appendChild(commentContain);
  }

  const comments = document.createElement("div");
  comments.setAttribute("id", "comment-box");
  comments.style.border = "1px solid black";
  comments.style.boxSizing = "border-box";
  comments.style.width = "1000px";
  comments.style.height = "300px";
  comments.style.display = "flex";
  comments.style.flexDirection = "column";
  comments.style.padding = "5px";

  commentContain.appendChild(comments);
  inputContainer();
};

const inputContainer = () => {
  const commentBox = document.getElementById("comment-contain");

  const inputContain = document.createElement("form");
  inputContain.setAttribute("id", "input-form-contain");
  inputContain.style.display = "flex";
  inputContain.style.justifyContent = "space-between";
  inputContain.style.width = "100%";
  inputContain.style.marginTop = "10px";

  const commentInput = document.createElement("input");
  commentInput.setAttribute("id", "comment-input");
  commentInput.style.width = "75%";

  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  submitButton.setAttribute("id", "submit-button");
  submitButton.style.width = "20%";

  inputContain.append(commentInput, submitButton);
  commentBox.appendChild(inputContain);
};

const addComment = (inputVal) => {
  const commentBox = document.getElementById("comment-box");

  const comment = document.createElement("p");
  comment.style.margin = "0px";
  comment.innerText = inputVal;

  commentBox.appendChild(comment);
};

const howManyUps = () => {
  const upvoteButton = document.getElementById("up-vote");
  const downvoteButton = document.getElementById("down-vote");

  upVoteCount = 0;
  downVoteCount = 0;

  upvoteButton.addEventListener("click", () => {
    if (upVoteCount >= 0) {
      upVoteCount += 1;
      howManyVotes(upVoteCount, downVoteCount);
    }
  });

  downvoteButton.addEventListener("click", () => {
    if (downVoteCount <= 0) {
      downVoteCount -= 1;
      howManyVotes(upVoteCount, downVoteCount);
    }
  });
};

const howManyVotes = (upVoteVal, downVoteVal) => {
  const upvote = document.getElementById("up-vote");
  const downvote = document.getElementById("down-vote");

  upvote.innerHTML = `Yea ${upVoteVal}`;
  downvote.innerHTML = `Nay ${downVoteVal}`;
};

const allComments = () => {
  const button = document.getElementById("submit-button");

  button.addEventListener("click", (e) => {
    e.preventDefault();

    const commentInput = document.getElementById("comment-input");
    const inputValue = commentInput.value;

    addComment(inputValue);
    commentInput.value = "";
  });
};

const clearValuesOnFetch = () => {
  upVoteCount = 0;
  downVoteCount = 0;

  document.getElementById("up-vote").innerText = `Yea ${upVoteCount}`;
  document.getElementById("down-vote").innerText = `Nay ${downVoteCount}`;

  const commentBox = document.getElementById("comment-box");
  commentBox.innerText = "";
};

const loadPage = async () => {
  initializePage();
  const imageUrl = await getImg();
  createImg(imageUrl);

  allComments();
  howManyUps();
  fetchNewImgButton();
};

window.onload = loadPage;

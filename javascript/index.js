const fetchDataForPagination = (startIndex, endIndex) => {
	return fetch('https://jsonplaceholder.typicode.com/posts')
			.then(response => response.json())
			.then(data => {
				return [data.slice(startIndex, endIndex), data.length];
			});
}

const postsLoad = (posts,div) => {
	div.innerHTML = '';
	posts.forEach(post => {
		div.innerHTML += `<div class="post">
		<h4>${post.title}</h4>
		<p>${post.body}</p>
		</div>`
	});
}

const getButtonIndex = (maxIndex, buttonClicked) => {
	const noOfButtonsDisplayed = Math.min(maxIndex,limit);
	if (buttonClicked == maxIndex-1 || buttonClicked == maxIndex)
		return [maxIndex-noOfButtonsDisplayed+1, maxIndex];
	else if (buttonClicked == 1 || buttonClicked == 2)
		return [1, noOfButtonsDisplayed];
	else
		return [buttonClicked - 2, buttonClicked + 2];
}

const buttonsLoad = (totalNoOfPosts, div) => { 
	const maxIndex = Math.ceil(totalNoOfPosts/limit);
	div.innerHTML = '';
	const middleButton = page;
	const [startIndex, endIndex] = getButtonIndex(maxIndex,middleButton);
	for (let i = startIndex; i <= endIndex; i++) {
		div.innerHTML += `<button class="pagination-btn" 
		onClick="postDisplayOnClick(this)" value="${i}">${i}</button>`;
	}
}

const postDisplayOnClick = (btn) => {
	page = Math.floor(btn.value);
	pagination();
}

const pagination = async () => {
	const [posts, totalNoOfPosts] = await fetchDataForPagination((page-1)*limit, page*limit);	
	if (document.getElementById('posts')) {
		postsLoad(posts, document.getElementById('posts'));
		buttonsLoad(totalNoOfPosts,document.getElementById('pagination-buttons'));
	}
	else {
		const postsDiv = document.createElement('div');
		const paginationButtonDiv = document.createElement('div');
		document.getElementById('posts-page').appendChild(postsDiv);
		document.getElementById('posts-page').appendChild(paginationButtonDiv);
		postsDiv.setAttribute('id', 'posts');
		paginationButtonDiv.setAttribute('id','pagination-buttons');
		postsLoad(posts,postsDiv);		
		buttonsLoad(totalNoOfPosts, paginationButtonDiv);
	}

}

const limit = 5;
var page = 1;
document.getElementById('add-post').addEventListener('focus', () => location.href = 'createpost.html');
// document.getElementById('search-post').addEventListener('focus', () => );
pagination();
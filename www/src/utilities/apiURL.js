let apiURLFragment = 'http://localhost:7777/';
if (process.env.NODE_ENV == 'production') {
	apiURLFragment = 'https://backend.scottabarrow.com/';
}

export const apiURL = apiURLFragment;

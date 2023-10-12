const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
    const movieList = document.getElementById('movie-list');

    if(movies.length === 0){
        movieList.classList.remove('visible');
        return ;
    }else{
        movieList.classList.add('visible');
    }
    movieList.innerHTML = '';

    const filterMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));

    filterMovies.forEach((movie) => {
        const movieEl = document.createElement('li');
        const { info, ...otherProp }= movie;
        console.log(otherProp);
       // const { title: movieTitle } = info;
        let { getFormattedTitle } = movie;
        //getFormattedTitle = getFormattedTitle.bind(movie);
        let text = getFormattedTitle.call(movie) + ' - ';   // or we can use getFormattedTitle.apply(movie,[]);
        for(const key in info){
            if(key !== 'title' && key !== '_title'){
                text = text + `${key} : \*${info[key]}\*`;
            }
        }
        movieEl.textContent = text.toUpperCase();
        movieList.append(movieEl);
    });

};

const addMovieHandle = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if(extraName.trim()==='' || extraValue.trim()===''){
        return ;
    }
    const newMovie = {
        info: {
            set title(val) {
                if(val.trim() === ''){
                    this._title = 'DEFAULT';
                    return;
                }
                this._title = val;
            },
            get title() {
                return this._title;
            },
            [extraName]:extraValue
        },
        id: Math.random().toString(),
        getFormattedTitle : function () {
            console.log(this);
            return this.info.title.toUpperCase();
        }
        /*getFormattedTitle() {
            return this.info.title.toUpperCase();  // This may also work.....
        }*/
    };
    newMovie.info.title = title;
    console.log(newMovie.info.title);
    movies.push(newMovie);
    renderMovies();
    //title='';
    //extraName='';
    //extraValue='';
};

const searchMovieHandler = () => {
    const filterTerm = document.getElementById('filter-title').value;
    renderMovies(filterTerm);
};


addMovieBtn.addEventListener('click',addMovieHandle);
searchBtn.addEventListener('click',searchMovieHandler);

import './searchBar.css'
import { useDispatch } from 'react-redux'
import { setSearchItem } from '../features/search/searchSlice'
import { deleteStore } from '../features/search/searchSlice'
import { setSearchDescription } from '../features/favorites/favoritesSlice'



export const SearchBar = (props) => {
    const dispatch = useDispatch()

    

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const input = document.getElementById('searchInput').value;
        const inputRefactor = input.replace(/\s+/g, "-");
        dispatch(deleteStore());
        dispatch(setSearchItem(inputRefactor)); 
    }


    const onSubmitFavsHandler = (e) =>{
        e.preventDefault();
        const input = document.getElementById('searchInput').value;
        const inputRefactor = input.replace(/\s+/g, "-");
        dispatch(setSearchDescription(inputRefactor)); 

    }

    const onInputFavsHandler = (e) =>{
        const input = document.getElementById('searchInput').value;
        const inputRefactor = input.replace(/\s+/g, "-");
        dispatch(setSearchDescription(inputRefactor)); 
    }


  if(props.page !== "myFavs"){
    return (<>
    <form className="searchBar" onSubmit={onSubmitHandler}>
        
            <i className="searchIcon fa-solid fa-magnifying-glass fa-lg"></i>
            <input id="searchInput" className="searchBarInput" type='search' placeholder="Search images" >
            </input>
            <button><i className="enterIcon fa-solid fa-circle-arrow-up fa-lg"></i></button>
       
    </form>
    </>)} else{
         return (<>
            <form className="searchBar" onSubmit={onSubmitFavsHandler}>
                
                    <i className="searchIcon fa-solid fa-magnifying-glass fa-lg"></i>
                    <input id="searchInput" className="searchBarInput" type='search' placeholder="Search images" onInput={onInputFavsHandler}>
                    </input>
                    <button><i className="enterIcon fa-solid fa-circle-arrow-up fa-lg"></i></button>
               
            </form>
            </>)

    }
}
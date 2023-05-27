const SearchItem = ({search , setSearch}) => {
    return(
    <form className="searchForm" onSubmit={(e) => e.preventDefault}>
        <label> Search </label>

        <input
            type = 'text'
            id = 'searchBox'
            placeholder="Search in your List"
            value = {search}
            onChange = {(e) => setSearch(e.target.value)}
        />
    </form>
    )
}
export default SearchItem;
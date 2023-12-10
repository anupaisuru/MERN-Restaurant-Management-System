import React from 'react'
import './Search.css'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function Search() {
    return (
        <div>
            <form class="d-flex ">
                <input class="form-control me-1 p-2 " type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-sm btn-dark p-2" type="submit">Search</button>

                <PictureAsPdfIcon sx={{ fontSize: 40  }} className='m-1'  />
            </form>
        </div>
    )
}

export default Search
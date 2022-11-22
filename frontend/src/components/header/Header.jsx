import React from 'react'
import search from '../../icons/search.png'
import cart from '../../icons/shopping-cart.png'

export default function Header() {
    return (
        <>
            <div className="container ">
                <div className="d-flex justify-content-center">
                    <form class="d-flex" role="search">
                        <span class="input-group-text" id="basic-addon1">
                            <div class="dropdown">
                                <div class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    All
                                </div>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>

                                </ul>
                            </div>
                        </span>
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" ></input>
                        <span class="" type="submit"><img src={search} alt="" /></span>
                    </form>
                    <div>
                        <span class="" ><img src={cart} alt="" />0</span>
                    </div>

                </div>

            </div>
        </>
    )
}
